// Main product families. Legacy type names only support existing product assignments.
export const CATALOG = [
  {name:'กระเป๋า', english:'Bags', types:['กระเป๋าผ้าแคนวาส','กระเป๋าผ้าสปันบอนด์','กระเป๋าหูรูด','กระเป๋าช้อปปิ้ง','กระเป๋าเก็บความเย็น']},
  {name:'หมวก', english:'Caps & Hats', types:['หมวกแก๊ป','หมวกบักเก็ต','หมวกไวเซอร์','หมวกปีกรอบ','หมวกซาฟารี','หมวกแม่ครัว']},
  {name:'เสื้อผ้าและเครื่องแต่งกาย', english:'Apparel', types:['เสื้อยืด','เสื้อโปโล','เสื้อกีฬา','เสื้อแจ็กเก็ต','ผ้ากันเปื้อน']},
  {name:'แก้วน้ำและกระบอกน้ำ', english:'Drinkware', types:['แก้วเก็บความเย็น','แก้วสแตนเลส','แก้วเซรามิก','แก้วพลาสติก','กระบอกน้ำ','ขวดน้ำ']},
  {name:'ร่ม', english:'Umbrellas', types:['ร่มพับ','ร่มตอนเดียว','ร่มกอล์ฟ','ร่มอัตโนมัติ','ร่มสกรีนโลโก้']},
  {name:'เครื่องเขียนและอุปกรณ์สำนักงาน', english:'Stationery & Office', types:['สมุดโน้ต','ปากกา','แฟ้มเอกสาร','โพสต์อิท','กล่องใส่นามบัตร']},
  {name:'ของพรีเมียมและของที่ระลึก', english:'Promotional Gifts', types:['พวงกุญแจ','สายคล้องคอ','ป้ายห้อยบัตร','เข็มกลัด','ของแจกงานอีเวนต์']},
  {name:'ชุดของขวัญ', english:'Gift Sets', types:['ชุดของขวัญองค์กร','ชุดต้อนรับพนักงาน','ชุดของขวัญปีใหม่','ชุดของขวัญลูกค้า']},
  {name:'หมวกแม่ครัวและผ้ากันเปื้อน', english:'Kitchen Uniforms', types:['หมวกแม่ครัว','ผ้ากันเปื้อน']},
];
const legacyBags=['กระเป๋าถือ','กระเป๋าใส','กระเป๋าทรงนุ่ม','กระเป๋าสะพาย','กระเป๋าซิป','กระเป๋าทูโทน'];
export const categoryNames = categories => [...new Set([...CATALOG.map(c=>c.name), ...categories.filter(c=>!legacyBags.includes(c))])];
export function matchesCategory(product, category) {
  if(category==='ทั้งหมด'||product.category===category)return true;
  const family=CATALOG.find(c=>c.name===category);
  return Boolean(family && (family.types.includes(product.category) || (category==='กระเป๋า' && legacyBags.includes(product.category))));
}
export const quoteOptions = (category, products) => [...new Set([
  ...products.filter(p=>matchesCategory(p,category)).map(p=>p.name),
])];

const slugs=['bags','hats','apparel','drinkware','umbrellas','stationery','promotional-gifts','gift-sets','kitchen-uniforms'];
CATALOG.forEach((family,index)=>{family.slug=slugs[index];});
export const categoryUrl = name => '/products/' + (CATALOG.find(c=>c.name===name)?.slug || encodeURIComponent(name));
export const categoryFromPath = path => {
 const slug=path.replace(/\/$/,'').split('/')[2];
 if(!slug)return null;
 try { return CATALOG.find(c=>c.slug===slug)?.name || decodeURIComponent(slug); } catch { return ''; }
};
