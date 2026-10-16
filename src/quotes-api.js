import {supabase} from './supabase';
export const QUOTE_STATUSES={new:'รอติดต่อ',contacted:'ติดต่อแล้ว',quoted:'ส่งราคาแล้ว',closed:'ปิดงาน'};
export const QUOTE_POLICY_VERSION='quotes-v1';

export async function withDeadline(task,ms=20000) {
 const controller=new AbortController();let timer;
 try{return await Promise.race([
  Promise.resolve().then(()=>task(controller.signal)),
  new Promise((_,reject)=>{timer=setTimeout(()=>{reject(new Error('การเชื่อมต่อใช้เวลานาน กรุณาตรวจอินเทอร์เน็ตแล้วลองอีกครั้ง'));controller.abort();},ms);}),
 ]);}finally{clearTimeout(timer);}
}
export function createQuoteAttempt(form,product,file) {
 const id=crypto.randomUUID();
 const extension={'image/jpeg':'jpg','image/png':'png','application/pdf':'pdf'}[file?.type];
 if(file&&(!extension||file.size<1||file.size>10485760))throw Error('ไฟล์แนบต้องเป็น JPG PNG หรือ PDF ขนาดไม่เกิน 10 MB');
 return {id,payload:{name:form.name.trim(),phone:form.phone.trim(),line:form.line.trim(),product,
  quantity:form.quantity?Number(form.quantity):null,date:form.date||null,details:form.details,
  consent:form.consent,policy_version:QUOTE_POLICY_VERSION,website:form.website||'',
  attachment:file?{path:`${id}/${crypto.randomUUID()}.${extension}`,name:file.name,type:file.type,size:file.size}:null}};
}
export async function submitQuote(attempt,file,client=supabase) {
 if(!client)throw Error('ระบบรับคำขอยังไม่พร้อม กรุณาติดต่อทางโทรศัพท์หรือ LINE');
 const {data,error}=await withDeadline(signal=>client.rpc('submit_quote',{p_id:attempt.id,p_payload:attempt.payload}).abortSignal(signal));
 if(error)throw error;
 if(data!==attempt.id)throw Error('ยังไม่ได้รับการยืนยันคำขอ กรุณาลองอีกครั้ง');
 // The request already exists. Attachment failures must not look like a failed request.
 let attachmentError='';
 if(file){
  try{
   const path=attempt.payload.attachment.path;
   const uploaded=await withDeadline(()=>client.storage.from('quote-attachments').upload(path,file,{contentType:file.type,upsert:false}),45000);
   // A retry may encounter the file from a previous successful upload.
   // finish_quote_attachment verifies existence before acknowledging success.
   const completed=await withDeadline(signal=>client.rpc('finish_quote_attachment',{p_id:attempt.id,p_path:path}).abortSignal(signal));
   if(completed.error)throw completed.error;
   if(!completed.data)throw uploaded.error||Error('ยังไม่พบไฟล์แนบในระบบ');
  }catch(e){attachmentError=e.message||'อัปโหลดไฟล์ไม่สำเร็จ';}
 }
 return {id:attempt.id,attachmentError};
}
export async function listQuotes({status='',page=0,pageSize=20},client=supabase){
 const result=await withDeadline(signal=>{
  let query=client.from('quote_requests').select('id,created_at,updated_at,name,phone,line,product,quantity,need_by,details,attachment_path,attachment_name,attachment_ready,status,internal_note',{count:'exact'}).order('created_at',{ascending:false}).range(page*pageSize,(page+1)*pageSize-1);
  if(status)query=query.eq('status',status);
  return query.abortSignal(signal);
 });
 if(result.error)throw result.error;
 return {rows:result.data||[],count:result.count||0};
}
export async function updateQuote(row,status,note,client=supabase){
 const result=await withDeadline(signal=>client.from('quote_requests').update({status,internal_note:note,updated_at:new Date().toISOString()}).eq('id',row.id).eq('updated_at',row.updated_at).select('id,updated_at,status,internal_note').abortSignal(signal));
 if(result.error)throw result.error;
 if(result.data?.length!==1)throw Error('บันทึกไม่ได้ ข้อมูลอาจเปลี่ยนจากหน้าต่างอื่น กรุณาโหลดรายการใหม่');
 return result.data[0];
}
export async function quoteAttachmentUrl(path,client=supabase){
 const {data,error}=await withDeadline(()=>client.storage.from('quote-attachments').createSignedUrl(path,300,{download:true}));
 if(error)throw error;
 return data.signedUrl;
}
