-- Run AFTER setup.sql. Safe to rerun; existing requests are preserved.
begin;
create table if not exists public.quote_requests (
  id uuid primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (length(name) between 1 and 200),
  phone text not null check (phone ~ '^[0-9]{9,10}$'),
  line text not null default '' check (length(line) <= 100),
  product text not null check (length(product) between 1 and 300),
  quantity integer check (quantity between 1 and 10000000),
  need_by date,
  details text not null default '' check (length(details) <= 5000),
  consent boolean not null check (consent),
  policy_version text not null check (policy_version = 'quotes-v1'),
  attachment_path text unique,
  attachment_name text,
  attachment_type text,
  attachment_size integer,
  attachment_ready boolean not null default false,
  status text not null default 'new' check (status in ('new','contacted','quoted','closed')),
  internal_note text not null default '' check (length(internal_note) <= 5000),
  submission jsonb not null
);
create index if not exists quote_requests_created on public.quote_requests(created_at desc);
create index if not exists quote_requests_phone_created on public.quote_requests(phone, created_at desc);
alter table public.quote_requests enable row level security;
revoke all on public.quote_requests from public, anon, authenticated;
grant select on public.quote_requests to authenticated;
grant update(status, internal_note, updated_at) on public.quote_requests to authenticated;
drop policy if exists "Owner read quotes" on public.quote_requests;
create policy "Owner read quotes" on public.quote_requests for select to authenticated using ((select public.is_site_admin()));
drop policy if exists "Owner update quotes" on public.quote_requests;
create policy "Owner update quotes" on public.quote_requests for update to authenticated
using ((select public.is_site_admin())) with check ((select public.is_site_admin()));

-- The public RPC returns only the caller's random receipt ID, never customer data.
create or replace function public.submit_quote(p_id uuid, p_payload jsonb)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  previous jsonb;
  attachment jsonb := p_payload->'attachment';
  requested_date date;
  qty integer;
begin
  if p_id is null or jsonb_typeof(p_payload) is distinct from 'object'
     or p_payload->>'consent' is distinct from 'true'
     or p_payload->>'policy_version' is distinct from 'quotes-v1'
     or coalesce(p_payload->>'website','') <> '' then
    raise exception 'ข้อมูลคำขอหรือการยินยอมไม่ถูกต้อง';
  end if;
  if length(trim(coalesce(p_payload->>'name',''))) not between 1 and 200
     or coalesce(p_payload->>'phone','') !~ '^[0-9]{9,10}$'
     or length(trim(coalesce(p_payload->>'product',''))) not between 1 and 300
     or length(coalesce(p_payload->>'line','')) > 100
     or length(coalesce(p_payload->>'details','')) > 5000 then
    raise exception 'กรุณาตรวจชื่อ เบอร์โทร สินค้า และรายละเอียด';
  end if;
  -- Serialize both same-ID retries and same-phone submissions.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_payload->>'phone', 0));
  select submission into previous from public.quote_requests where id=p_id;
  if found then
    if previous = p_payload then return p_id; end if;
    raise exception 'รหัสคำขอนี้ถูกใช้แล้ว กรุณาเปิดฟอร์มใหม่';
  end if;
  qty := nullif(p_payload->>'quantity','')::integer;
  requested_date := nullif(p_payload->>'date','')::date;
  if requested_date < (now() at time zone 'Asia/Bangkok')::date then
    raise exception 'กรุณาเลือกวันที่ตั้งแต่วันนี้';
  end if;
  if (select count(*) from public.quote_requests where phone=p_payload->>'phone' and created_at>now()-interval '10 minutes') >= 3 then
    raise exception 'ส่งคำขอหลายครั้งแล้ว กรุณารอ 10 นาทีหรือติดต่อทางโทรศัพท์หรือ LINE';
  end if;
  if attachment is not null and attachment <> 'null'::jsonb then
    if jsonb_typeof(attachment) <> 'object'
       or coalesce(attachment->>'path','') !~ ('^' || p_id::text || '/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|pdf)$')
       or length(coalesce(attachment->>'name','')) not between 1 and 255
       or coalesce(attachment->>'type','') not in ('image/jpeg','image/png','application/pdf')
       or coalesce((attachment->>'size')::integer,0) not between 1 and 10485760
       or (attachment->>'type'='image/jpeg' and attachment->>'path' not like '%.jpg')
       or (attachment->>'type'='image/png' and attachment->>'path' not like '%.png')
       or (attachment->>'type'='application/pdf' and attachment->>'path' not like '%.pdf') then
      raise exception 'ไฟล์แนบต้องเป็น JPG PNG หรือ PDF ขนาดไม่เกิน 10 MB';
    end if;
  end if;
  insert into public.quote_requests(id,name,phone,line,product,quantity,need_by,details,consent,policy_version,
    attachment_path,attachment_name,attachment_type,attachment_size,submission)
  values(p_id,trim(p_payload->>'name'),p_payload->>'phone',coalesce(p_payload->>'line',''),trim(p_payload->>'product'),
    qty,requested_date,coalesce(p_payload->>'details',''),true,'quotes-v1',
    attachment->>'path',attachment->>'name',attachment->>'type',(attachment->>'size')::integer,p_payload);
  return p_id;
end; $$;
revoke all on function public.submit_quote(uuid,jsonb) from public, anon, authenticated;
grant execute on function public.submit_quote(uuid,jsonb) to anon, authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('quote-attachments','quote-attachments',false,10485760,array['image/jpeg','image/png','application/pdf'])
on conflict(id) do update set public=false,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

-- A random per-request path is the upload capability. No public listing/read/update/delete.
create or replace function public.can_upload_quote_attachment(object_name text)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.quote_requests
    where attachment_path=object_name and not attachment_ready and created_at>now()-interval '1 hour');
$$;
revoke all on function public.can_upload_quote_attachment(text) from public, anon, authenticated;
grant execute on function public.can_upload_quote_attachment(text) to anon, authenticated;
drop policy if exists "Submitter upload quote attachment" on storage.objects;
create policy "Submitter upload quote attachment" on storage.objects for insert to anon, authenticated
with check(bucket_id='quote-attachments' and public.can_upload_quote_attachment(name));
drop policy if exists "Owner read quote attachments" on storage.objects;
create policy "Owner read quote attachments" on storage.objects for select to authenticated
using(bucket_id='quote-attachments' and (select public.is_site_admin()));

create or replace function public.finish_quote_attachment(p_id uuid, p_path text)
returns boolean language plpgsql security definer set search_path = '' as $$
begin
  -- Verifies the reserved random path AND the actual uploaded object.
  update public.quote_requests q set attachment_ready=true, updated_at=now()
  where q.id=p_id and q.attachment_path=p_path
    and exists(select 1 from storage.objects o where o.bucket_id='quote-attachments' and o.name=p_path);
  return found;
end; $$;
revoke all on function public.finish_quote_attachment(uuid,text) from public, anon, authenticated;
grant execute on function public.finish_quote_attachment(uuid,text) to anon, authenticated;
commit;

notify pgrst, 'reload schema';
