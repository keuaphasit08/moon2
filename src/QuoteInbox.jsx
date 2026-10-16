import React,{useEffect,useRef,useState} from 'react';
import {listQuotes,updateQuote,quoteAttachmentUrl,QUOTE_STATUSES} from './quotes-api';
import {errorMessage} from './content-api';
const control='w-full rounded-lg border border-slate-300 bg-white p-3';
const button='rounded-lg bg-indigo-600 px-4 py-3 text-white disabled:opacity-50';
function QuoteCard({row,onSaved}){
 const [status,setStatus]=useState(row.status),[note,setNote]=useState(row.internal_note),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[link,setLink]=useState(null);
 const dirty=status!==row.status||note!==row.internal_note;
 useEffect(()=>{setStatus(row.status);setNote(row.internal_note);setLink(null);},[row]);
 useEffect(()=>{const warn=e=>{if(dirty){e.preventDefault();e.returnValue='';}};window.addEventListener('beforeunload',warn);return ()=>window.removeEventListener('beforeunload',warn);},[dirty]);
 async function run(fn){setBusy(true);setMessage('กำลังดำเนินการ…');try{await fn();}catch(e){setMessage(errorMessage(e));}finally{setBusy(false);}}
 return <article className="space-y-4 rounded-xl border border-slate-200 bg-white p-5" aria-label={`คำขอจาก ${row.name}`}>
  <header className="flex flex-wrap items-center gap-3"><h3 className="mr-auto text-lg font-semibold">{row.name}</h3><span className="rounded-full bg-indigo-50 px-3 py-1 text-sm">{QUOTE_STATUSES[row.status]}</span></header>
  <p className="break-all text-xs text-slate-500">รหัสคำขอ: {row.id}<br/>รับเมื่อ {new Date(row.created_at).toLocaleString('th-TH')}</p>
  <dl className="grid gap-3 text-sm sm:grid-cols-2"><div><dt className="text-slate-500">เบอร์โทร</dt><dd><a className="text-indigo-700 underline" href={`tel:${row.phone}`}>{row.phone}</a></dd></div><div><dt className="text-slate-500">LINE ID</dt><dd>{row.line||'ไม่ได้ระบุ'}</dd></div><div><dt className="text-slate-500">สินค้า</dt><dd>{row.product}</dd></div><div><dt className="text-slate-500">จำนวน</dt><dd>{row.quantity??'ไม่ได้ระบุ'}</dd></div><div><dt className="text-slate-500">วันที่ต้องการใช้</dt><dd>{row.need_by||'ไม่ได้ระบุ'}</dd></div></dl>
  <div><p className="text-sm text-slate-500">รายละเอียดลูกค้า</p><p className="whitespace-pre-wrap break-words">{row.details||'ไม่ได้ระบุ'}</p></div>
  {row.attachment_path&&<div className="space-y-2 rounded-lg bg-slate-50 p-3"><p className="break-all text-sm">ไฟล์แนบ: {row.attachment_name}</p>{!row.attachment_ready&&<p className="text-sm text-amber-800">ลูกค้าส่งคำขอแล้ว แต่ไฟล์แนบยังไม่สมบูรณ์ หากเปิดไม่ได้ กรุณาติดต่อลูกค้าเพื่อขอไฟล์อีกครั้ง</p>}<button type="button" className="text-indigo-700 underline disabled:opacity-50" disabled={busy} onClick={()=>run(async()=>{const url=await quoteAttachmentUrl(row.attachment_path);setLink({url,expires:Date.now()+300000});setMessage('ลิงก์พร้อมแล้ว ใช้ได้ 5 นาที');})}>สร้างลิงก์ดาวน์โหลดไฟล์</button>{link&&<a className="block text-indigo-700 underline" href={link.url} target="_blank" rel="noreferrer">ดาวน์โหลดไฟล์แนบ (ลิงก์ชั่วคราว)</a>}</div>}
  <fieldset disabled={busy} className="grid gap-3 sm:grid-cols-[180px_1fr]"><div><label htmlFor={`quote-status-${row.id}`}>สถานะ</label><select id={`quote-status-${row.id}`} className={control} value={status} onChange={e=>setStatus(e.target.value)}>{Object.entries(QUOTE_STATUSES).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></div><label>บันทึกภายใน<textarea className={control} maxLength={5000} rows={2} value={note} onChange={e=>setNote(e.target.value)}/></label></fieldset>
  <div className="flex flex-wrap items-center gap-3"><button type="button" className={button} disabled={busy||!dirty} onClick={()=>run(async()=>{const saved=await updateQuote(row,status,note);onSaved({...row,...saved});setMessage('บันทึกสถานะและบันทึกภายในแล้ว');})}>บันทึกคำขอ</button><p role="status" className="text-sm">{message||(dirty?'มีการเปลี่ยนแปลงที่ยังไม่บันทึก':'')}</p></div>
 </article>;
}
export default function QuoteInbox(){
 const [rows,setRows]=useState([]),[count,setCount]=useState(0),[page,setPage]=useState(0),[status,setStatus]=useState(''),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const sequence=useRef(0);
 async function load(){const current=++sequence.current;setLoading(true);setError('');try{const result=await listQuotes({page,status});if(sequence.current===current){setRows(result.rows);setCount(result.count);}}catch(e){if(sequence.current===current)setError(errorMessage(e));}finally{if(sequence.current===current)setLoading(false);}}
 useEffect(()=>{load();return ()=>{sequence.current++;};},[page,status]);
 return <section className="space-y-5" aria-label="คำขอใบเสนอราคา"><div className="flex flex-wrap items-end gap-3"><div className="mr-auto"><h2 className="text-2xl font-bold">คำขอใบเสนอราคา</h2><p className="text-sm text-slate-600">ข้อมูลลูกค้าและไฟล์แนบเปิดดูได้เฉพาะผู้ดูแล</p></div><label>กรองสถานะ<select className={control} value={status} onChange={e=>{setStatus(e.target.value);setPage(0);}}><option value="">ทั้งหมด</option>{Object.entries(QUOTE_STATUSES).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label><button type="button" className={button} disabled={loading} onClick={load}>โหลดรายการใหม่</button></div>
 {loading?<p role="status">กำลังโหลดคำขอ…</p>:error?<p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">โหลดคำขอไม่สำเร็จ: {error}</p>:<><p>{count} คำขอ · หน้า {page+1}</p>{rows.length===0?<p className="rounded-lg border p-8 text-center">ยังไม่มีคำขอในรายการนี้</p>:rows.map(row=><QuoteCard key={row.id} row={row} onSaved={updated=>setRows(items=>items.map(item=>item.id===updated.id?updated:item))}/>)}<div className="flex gap-3"><button className={button} disabled={page===0} onClick={()=>setPage(p=>p-1)}>ก่อนหน้า</button><button className={button} disabled={(page+1)*20>=count} onClick={()=>setPage(p=>p+1)}>ถัดไป</button></div></>}
 </section>;
}
