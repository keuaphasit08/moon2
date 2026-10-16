import {test,expect} from '@playwright/test';
import {defaults} from '../../src/defaults.js';
const origin='https://bkynqkvjorgxozmfrpnp.supabase.co';
const owner='00000000-0000-0000-0000-000000000001';
const rowTemplate={created_at:'2026-10-16T08:14:30Z',updated_at:'2026-10-16T08:14:30Z',status:'new',internal_note:'',attachment_ready:false};
async function auth(page,allowed=true){
 const b=value=>Buffer.from(JSON.stringify(value)).toString('base64url');
 const session={access_token:[b({alg:'HS256',typ:'JWT'}),b({sub:owner,exp:Math.floor(Date.now()/1000)+3600,role:'authenticated'}),'signature'].join('.'),refresh_token:'test-refresh',token_type:'bearer',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,user:{id:owner,email:'owner@example.com',role:'authenticated',aud:'authenticated'}};
 await page.addInitScript(session=>localStorage.setItem('sb-bkynqkvjorgxozmfrpnp-auth-token',JSON.stringify(session)),session);
 return allowed;
}
async function mock(page,{failSubmit=false,failUpload=false,allowed=true,rows=[]}={}){
 const state={rows,submissions:[],uploads:[],updates:[],listCalls:0};
 await page.route(origin+'/**',async route=>{
  const req=route.request(),url=req.url(),body=req.postDataJSON?.bind(req);
  if(req.method()==='OPTIONS')return route.fulfill({status:204});
  if(url.includes('/rpc/is_site_admin'))return route.fulfill({json:allowed});
  if(url.includes('/site_content'))return route.fulfill({json:{id:1,content:defaults,updated_at:rowTemplate.updated_at}});
  if(url.includes('/rpc/submit_quote')){
   const p=body();state.submissions.push(p);
   if(failSubmit)return route.fulfill({status:503,json:{message:'ระบบขัดข้องชั่วคราว'}});
   if(!state.rows.some(r=>r.id===p.p_id))state.rows.unshift({...rowTemplate,id:p.p_id,...p.p_payload,need_by:p.p_payload.date,attachment_path:p.p_payload.attachment?.path||null,attachment_name:p.p_payload.attachment?.name||null});
   return route.fulfill({json:p.p_id});
  }
  if(url.includes('/rpc/finish_quote_attachment')){const p=body();const row=state.rows.find(r=>r.id===p.p_id);row.attachment_ready=!failUpload;return route.fulfill({json:!failUpload});}
  if(url.includes('/storage/v1/object/sign/'))return route.fulfill({json:{signedURL:'/object/sign/quote-attachments/test.pdf?token=test'}});
  if(url.includes('/storage/v1/object/quote-attachments/')){state.uploads.push(url);return failUpload?route.fulfill({status:500,json:{message:'upload failed'}}):route.fulfill({json:{Key:'quote-attachments/file.pdf'}});}
  if(url.includes('/quote_requests')){
   if(req.method()==='PATCH'){const change=body();state.updates.push(change);const id=new URL(url).searchParams.get('id').replace('eq.','');const row=state.rows.find(r=>r.id===id);Object.assign(row,change);return route.fulfill({json:[row]});}
   state.listCalls++;const status=new URL(url).searchParams.get('status')?.replace('eq.','');const filtered=status?state.rows.filter(r=>r.status===status):state.rows;
   return route.fulfill({headers:{'content-range':`0-${Math.max(0,filtered.length-1)}/${filtered.length}`},json:filtered});
  }
  return route.fulfill({json:{}});
 });
 return state;
}
async function fill(page){
 await page.goto('/#quote');
 await page.getByLabel('ชื่อ-บริษัท').fill('บริษัททดสอบ');
 await page.locator('#phone').fill('0812345678');
 await page.getByLabel('LINE ID').fill('customer-line');
 await page.getByLabel('เลือกสินค้าที่สนใจ').selectOption({label:'กระเป๋าถือหูสีม่วง'});
 await page.getByLabel('จำนวนที่ต้องการ').fill('100');
 await page.getByLabel('รายละเอียดเพิ่มเติม').fill('ต้องการโลโก้สีม่วง');
 await page.locator('#consent').check();
}
test('public request and PDF appear in owner inbox with status and private download',async({page})=>{
 const state=await mock(page);await fill(page);
 await page.locator('#logo').setInputFiles({name:'logo.pdf',mimeType:'application/pdf',buffer:Buffer.from('%PDF-1.4 test')});
 await page.getByRole('button',{name:'ส่งข้อมูลขอใบเสนอราคา',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('ส่งคำขอถึงทีมงานแล้ว');
 expect(state.rows).toHaveLength(1);expect(state.uploads).toHaveLength(1);expect(state.rows[0].attachment_ready).toBe(true);
 const id=state.rows[0].id;
 await auth(page);await page.goto('/admin');
 await page.getByRole('button',{name:'คำขอใบเสนอราคา',exact:true}).click();
 const card=page.getByRole('article',{name:'คำขอจาก บริษัททดสอบ'});
 await expect(card).toContainText(id);await expect(card).toContainText('0812345678');await expect(card).toContainText('ต้องการโลโก้สีม่วง');
 await card.getByLabel('สถานะ',{exact:true}).selectOption('quoted');await card.getByLabel('บันทึกภายใน').fill('ส่งราคา 100 ชิ้นแล้ว');
 await card.getByRole('button',{name:'บันทึกคำขอ'}).click();
 await expect(card.getByRole('status')).toContainText('บันทึกสถานะและบันทึกภายในแล้ว');
 expect(state.updates[0].status).toBe('quoted');
 await card.getByRole('button',{name:'สร้างลิงก์ดาวน์โหลดไฟล์'}).click();
 await expect(card.getByRole('link',{name:'ดาวน์โหลดไฟล์แนบ (ลิงก์ชั่วคราว)'})).toHaveAttribute('href',/token=test/);
 await page.getByLabel('กรองสถานะ').selectOption('new');
 await expect(page.getByText('ยังไม่มีคำขอในรายการนี้')).toBeVisible();
});
test('invalid form is not submitted',async({page})=>{
 const state=await mock(page);await page.goto('/#quote');await page.getByRole('button',{name:'ส่งข้อมูลขอใบเสนอราคา',exact:true}).click();
 await expect(page.getByText('กรุณากรอกเบอร์โทรเป็นตัวเลข 9–10 หลัก')).toBeVisible();expect(state.submissions).toHaveLength(0);
});
test('server error keeps customer data and retry uses the same receipt',async({page})=>{
 const state=await mock(page,{failSubmit:true});await fill(page);
 const submit=page.getByRole('button',{name:'ส่งข้อมูลขอใบเสนอราคา',exact:true});
 await submit.click();await expect(page.getByText('ระบบขัดข้องชั่วคราว')).toBeVisible();
 await expect(page.getByLabel('ชื่อ-บริษัท')).toHaveValue('บริษัททดสอบ');
 await submit.click();await expect.poll(()=>state.submissions.length).toBe(2);
 expect(state.submissions[0].p_id).toBe(state.submissions[1].p_id);
});
test('attachment failure acknowledges saved request with a clear warning',async({page})=>{
 const state=await mock(page,{failUpload:true});await fill(page);
 await page.locator('#logo').setInputFiles({name:'logo.png',mimeType:'image/png',buffer:Buffer.from('png')});
 await page.getByRole('button',{name:'ส่งข้อมูลขอใบเสนอราคา',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('ส่งคำขอถึงทีมงานแล้ว');
 await expect(page.getByRole('alert')).toContainText('คำขอถูกบันทึกแล้ว แต่ไฟล์แนบยังส่งไม่สำเร็จ');expect(state.rows).toHaveLength(1);
});
test('signed-in non-owner does not load inbox',async({page})=>{
 await auth(page);const state=await mock(page,{allowed:false});await page.goto('/admin');
 await expect(page.getByText('บัญชีนี้ยังไม่มีสิทธิ์ผู้ดูแล กรุณาตั้งค่าตาม ADMIN-SETUP.md')).toBeVisible();expect(state.listCalls).toBe(0);
});
