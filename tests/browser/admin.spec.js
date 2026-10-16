import {test,expect} from '@playwright/test';
import {defaults} from '../../src/defaults.js';
const owner='00000000-0000-0000-0000-000000000001';
const version='2026-10-16T08:14:30.498449+00:00';
async function setup(page,patch){
 const base64=value=>Buffer.from(JSON.stringify(value)).toString('base64url');
 const token=[base64({alg:'HS256',typ:'JWT'}),base64({sub:owner,exp:Math.floor(Date.now()/1000)+3600,role:'authenticated'}),'signature'].join('.');
 await page.addInitScript(session=>localStorage.setItem('sb-bkynqkvjorgxozmfrpnp-auth-token',JSON.stringify(session)),{access_token:token,refresh_token:'test-refresh',token_type:'bearer',expires_at:Math.floor(Date.now()/1000)+3600,expires_in:3600,user:{id:owner,aud:'authenticated',role:'authenticated',email:'owner@example.com'}});
 await page.route('https://bkynqkvjorgxozmfrpnp.supabase.co/**',async route=>{
  const req=route.request(),url=req.url();
  if(req.method()==='OPTIONS')return route.fulfill({status:204});
  if(url.includes('/rpc/is_site_admin'))return route.fulfill({json:true});
  if(url.includes('/site_content')){
   if(req.method()==='PATCH')return patch(route);
   return route.fulfill({json:{id:1,content:structuredClone(defaults),updated_at:version}});
  }
  return route.fulfill({json:{}});
 });
 await page.goto('/admin');
 await expect(page.getByRole('heading',{name:'จัดการ Moonvera'})).toBeVisible();
 await page.getByRole('button',{name:'ข้อมูลติดต่อ',exact:true}).click();
 await page.getByLabel('เบอร์โทร').fill('0812345678');
}
test('edits are sent and successful save is visible',async({page})=>{
 let sent;
 await setup(page,async route=>{sent=route.request().postDataJSON();return route.fulfill({json:[{id:1,...sent}]});});
 await page.getByRole('button',{name:'บันทึกและเผยแพร่',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('บันทึกและเผยแพร่แล้ว');
 expect(sent.content.contact.phone).toBe('0812345678');
});

test('pending and server errors are visible without discarding edits',async({page})=>{
 let finish;
 const waiting=new Promise(resolve=>{finish=resolve;});
 await setup(page,async route=>{await waiting;return route.fulfill({status:403,json:{message:'permission denied for table site_content'}});});
 await page.getByRole('button',{name:'บันทึกและเผยแพร่',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('กำลังบันทึกข้อมูล');
 finish();
 await expect(page.getByRole('status')).toContainText('permission denied');
 await expect(page.getByLabel('เบอร์โทร')).toHaveValue('0812345678');
 await expect(page.getByRole('button',{name:'บันทึกและเผยแพร่',exact:true})).toBeEnabled();
});

test('conflict does not report success or clear edits',async({page})=>{
 await setup(page,route=>route.fulfill({json:[]}));
 await page.getByRole('button',{name:'บันทึกและเผยแพร่',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('บันทึกไม่ได้');
 await expect(page.getByLabel('เบอร์โทร')).toHaveValue('0812345678');
});

test('stalled request times out visibly and keeps the draft',async({page})=>{
 await setup(page,()=>{});
 await page.clock.install();
 await page.getByRole('button',{name:'บันทึกและเผยแพร่',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('กำลังบันทึกข้อมูล');
 await page.clock.fastForward(16000);
 await expect(page.getByRole('status')).toContainText('รอการบันทึกเกิน 15 วินาที');
 await expect(page.getByLabel('เบอร์โทร')).toHaveValue('0812345678');
 await expect(page.getByRole('button',{name:'บันทึกและเผยแพร่',exact:true})).toBeEnabled();
});
