// Bound the entire operation, including time waiting for an Auth session lock.
export async function saveContent(client, content, version, timeoutMs = 15000) {
  if (!version) throw new Error('ยังไม่มีข้อมูลเวอร์ชันล่าสุด กรุณาโหลดหลังบ้านใหม่ก่อนบันทึก');
  const controller = new AbortController();
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error('รอการบันทึกเกิน 15 วินาที กรุณาตรวจอินเทอร์เน็ต แล้วเปิดหน้าเว็บใหม่เพื่อตรวจว่าบันทึกแล้วหรือยัง ข้อมูลที่แก้ยังอยู่ในหน้านี้'));
      controller.abort();
    }, timeoutMs);
  });
  try {
    const result = await Promise.race([
      client.from('site_content')
        .update({content, updated_at: new Date().toISOString()})
        .eq('id', 1).eq('updated_at', version)
        .select('*').abortSignal(controller.signal),
      timeout,
    ]);
    if (result.error) throw result.error;
    if (result.data?.length !== 1) {
      throw new Error('บันทึกไม่ได้: ข้อมูลอาจเปลี่ยนจากหน้าต่างอื่น หรือบัญชีไม่มีสิทธิ์แก้ไข กรุณาคัดลอกสิ่งที่แก้ไว้แล้วโหลดหลังบ้านใหม่');
    }
    return result.data[0];
  } finally {
    clearTimeout(timer);
  }
}
export function errorMessage(error) {
  return error?.message || error?.error_description || 'ดำเนินการไม่สำเร็จ กรุณาตรวจการเชื่อมต่อแล้วลองอีกครั้ง';
}
