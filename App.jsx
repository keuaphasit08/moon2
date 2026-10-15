import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "tailwindcss/index.css";
import { ArrowUpRight, ArrowRight, Check, CheckCircle, ChevronDown, Menu, X, Send, ShieldCheck, Palette, Truck, Building2, Factory, Hotel, Coffee, CalendarDays, GraduationCap, Tag, Gift, MessageCircle, Phone, Star, Upload, Package, FileCheck, PencilRuler, ClipboardList, Boxes, QrCode, Facebook } from "lucide-react";
// PLACEHOLDER: confirm business contacts and endpoint before launch.
const CONTACT = { phone: null, phoneLabel: "099-XXX-XXXX", line: null, facebook: null, response: "ระยะเวลาตอบกลับอยู่ระหว่างยืนยัน", endpoint: null };
// PLACEHOLDER: sample metrics, not verified business claims.
const STATS = [{ value: "500+", label: "องค์กรที่ไว้วางใจ" }, { value: "1,000,000+", label: "ชิ้นที่ผลิตแล้ว" }, { value: "10+", label: "ปีประสบการณ์" }, { value: "98%", label: "ลูกค้าพึงพอใจ" }];
// PLACEHOLDER: replace with authorized customer logos.
const CLIENTS = Array.from({ length: 6 }, () => "LOGO");
// Names describe visible appearance only; materials and MOQ are unconfirmed.
const PRODUCTS = [
  {
    "id": 1,
    "name": "กระเป๋าถือหูสีม่วง",
    "category": "กระเป๋าถือ",
    "image": "/images/product-1.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_1.jpg"
  },
  {
    "id": 2,
    "name": "กระเป๋าใสเหลือบสีหูสีน้ำเงิน",
    "category": "กระเป๋าใส",
    "image": "/images/product-2.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_2.jpg"
  },
  {
    "id": 3,
    "name": "กระเป๋าถือสีธรรมชาติ",
    "category": "กระเป๋าถือ",
    "image": "/images/product-3.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_3.jpg"
  },
  {
    "id": 4,
    "name": "กระเป๋าทรงนุ่มสีม่วง",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-4.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_4.jpg"
  },
  {
    "id": 5,
    "name": "กระเป๋าบุนวมสีครีม",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-5.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_5.jpg"
  },
  {
    "id": 6,
    "name": "กระเป๋าบุนวมสีเหลือง",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-6.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_6.jpg"
  },
  {
    "id": 7,
    "name": "กระเป๋าบุนวมสีเขียว",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-7.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_7.jpg"
  },
  {
    "id": 8,
    "name": "กระเป๋าบุนวมสีน้ำเงิน",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-8.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_8.jpg"
  },
  {
    "id": 9,
    "name": "กระเป๋าหูรูดสีชมพู",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-9.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_9.jpg"
  },
  {
    "id": 10,
    "name": "กระเป๋าสะพายสีดำ แบบที่ 1",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-10.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_10.jpg"
  },
  {
    "id": 11,
    "name": "กระเป๋าสะพายสีขาว แบบที่ 1",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-11.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_11.jpg"
  },
  {
    "id": 12,
    "name": "กระเป๋าสะพายสีขาว แบบที่ 2",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-12.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_12.jpg"
  },
  {
    "id": 13,
    "name": "กระเป๋าสะพายสีดำ แบบที่ 2",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-13.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_13.jpg"
  },
  {
    "id": 14,
    "name": "กระเป๋าสะพายข้างสีเขียว",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-14.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_14.jpg"
  },
  {
    "id": 15,
    "name": "กระเป๋าสะพายข้างสีครีม",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-15.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_15.jpg"
  },
  {
    "id": 16,
    "name": "กระเป๋าสะพายข้างสีน้ำเงิน",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-16.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_16.jpg"
  },
  {
    "id": 17,
    "name": "กระเป๋าใสเหลือบสีทรงสูง",
    "category": "กระเป๋าใส",
    "image": "/images/product-17.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_17.jpg"
  },
  {
    "id": 18,
    "name": "กระเป๋าใสเหลือบสีทรงกว้าง",
    "category": "กระเป๋าใส",
    "image": "/images/product-18.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_18.jpg"
  },
  {
    "id": 19,
    "name": "กระเป๋าถือสีดำ",
    "category": "กระเป๋าถือ",
    "image": "/images/product-19.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_19.jpg"
  },
  {
    "id": 20,
    "name": "กระเป๋าถือสีขาว",
    "category": "กระเป๋าถือ",
    "image": "/images/product-20.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_20.jpg"
  },
  {
    "id": 21,
    "name": "กระเป๋าถือสีน้ำเงิน",
    "category": "กระเป๋าถือ",
    "image": "/images/product-21.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_21.jpg"
  },
  {
    "id": 22,
    "name": "กระเป๋าซิปสีเหลือง",
    "category": "กระเป๋าซิป",
    "image": "/images/product-22.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_22.jpg"
  },
  {
    "id": 23,
    "name": "กระเป๋าทูโทนขาวน้ำเงิน",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-23.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_23.jpg"
  },
  {
    "id": 24,
    "name": "กระเป๋าสายคาดสีฟ้าหม่น",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-24.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_24.jpg"
  },
  {
    "id": 25,
    "name": "กระเป๋าสายคาดสีเขียวอมฟ้า",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-25.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_25.jpg"
  },
  {
    "id": 26,
    "name": "กระเป๋าสายคาดสีเหลือง",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-26.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_26.jpg"
  },
  {
    "id": 27,
    "name": "กระเป๋าสายคาดสีน้ำตาลอ่อน",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-27.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_27.jpg"
  },
  {
    "id": 28,
    "name": "กระเป๋าสายคาดสีชมพู",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-28.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_28.jpg"
  },
  {
    "id": 29,
    "name": "กระเป๋าสายคาดสีม่วงอ่อน",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-29.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_29.jpg"
  },
  {
    "id": 30,
    "name": "กระเป๋าทรงเหลี่ยมสีม่วง",
    "category": "กระเป๋าถือ",
    "image": "/images/product-30.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_30.jpg"
  },
  {
    "id": 31,
    "name": "กระเป๋าทูโทนหูสีน้ำตาล",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-31.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_31.jpg"
  },
  {
    "id": 32,
    "name": "กระเป๋าสะพายสายสีน้ำเงิน",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-32.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_32.jpg"
  },
  {
    "id": 33,
    "name": "กระเป๋าหูสีฟ้า",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-33.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_33.jpg"
  },
  {
    "id": 34,
    "name": "กระเป๋าหูสีแดง",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-34.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_34.jpg"
  },
  {
    "id": 35,
    "name": "กระเป๋าหูสีน้ำเงิน",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-35.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_35.jpg"
  },
  {
    "id": 36,
    "name": "กระเป๋าสะพายสีชมพู",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-36.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_36.jpg"
  },
  {
    "id": 37,
    "name": "กระเป๋าสะพายสีครีม",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-37.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_37.jpg"
  }
];
const CATEGORIES = ["ทั้งหมด", ...new Set(PRODUCTS.map((p) => p.category))];
const AUDIENCES = [[Building2, "บริษัท / องค์กรธุรกิจ"], [Factory, "โรงงานอุตสาหกรรม"], [Hotel, "โรงแรม / รีสอร์ท"], [Coffee, "ร้านอาหาร / คาเฟ่"], [CalendarDays, "Event Organizer"], [GraduationCap, "โรงเรียน / มหาวิทยาลัย"], [Tag, "แบรนด์สินค้า"], [Gift, "บริษัทของพรีเมียม"]];
const STEPS = [[Send, "ส่งแบบ / โลโก้", "เล่าไอเดียที่คุณต้องการ"], [ClipboardList, "แจ้งสินค้าและจำนวน", "เลือกแบบที่เหมาะกับคุณ"], [FileCheck, "รับใบเสนอราคา", "ตรวจสอบรายละเอียดร่วมกัน"], [PencilRuler, "ยืนยันแบบ Mockup", "เห็นภาพก่อนเริ่มผลิต"], [Boxes, "ผลิตสินค้า", "ดำเนินการตามแบบที่ยืนยัน"], [Truck, "ตรวจสอบและจัดส่ง", "เตรียมส่งมอบให้กับคุณ"]];
// PLACEHOLDER: fictional reviews for layout demonstration only.
const REVIEWS = [{ text: "ทีมงานให้คำแนะนำดี ช่วยดูรายละเอียดแบบให้ครบตั้งแต่เริ่มต้น", name: "คุณเอ · ฝ่ายจัดซื้อ", company: "บริษัทตัวอย่าง A" }, { text: "ได้เห็นภาพสินค้าก่อนผลิต ทำให้วางแผนของแจกสำหรับกิจกรรมได้ง่ายขึ้น", name: "คุณบี · ฝ่ายการตลาด", company: "บริษัทตัวอย่าง B" }, { text: "ประสานงานสะดวก มีตัวเลือกกระเป๋าหลายรูปแบบให้เลือกตามโจทย์", name: "คุณซี · ผู้ประสานงาน", company: "บริษัทตัวอย่าง C" }];
const FAQS = [["สั่งขั้นต่ำกี่ชิ้น", "จำนวนขั้นต่ำขึ้นอยู่กับรูปแบบสินค้าและรายละเอียดงาน กรุณาเลือกสินค้าที่สนใจและแจ้งจำนวนให้ทีมงานประเมินก่อนเสนอราคา"], ["ใช้เวลาผลิตกี่วัน", "ระยะเวลาต้องยืนยันตามแบบ จำนวน และคิวผลิต กรุณาระบุวันที่ต้องการใช้สินค้าในฟอร์มเพื่อให้ทีมงานตรวจสอบ"], ["มีตัวอย่างให้ดูก่อนผลิตไหม", "แจ้งความต้องการ Mockup หรือตัวอย่างกับทีมงาน เงื่อนไขและค่าใช้จ่ายต้องยืนยันในใบเสนอราคาก่อนเริ่มงาน"], ["จัดส่งต่างจังหวัดได้ไหม", "ระบุจังหวัดและที่อยู่จัดส่งเพื่อให้ทีมงานตรวจสอบวิธีจัดส่งและค่าใช้จ่ายก่อนยืนยันคำสั่งซื้อ"], ["ชำระเงินอย่างไร", "เงื่อนไขการชำระเงินจะระบุในใบเสนอราคาที่ได้รับการยืนยัน กรุณาตรวจสอบรายละเอียดกับทีมงานก่อนชำระเงิน"], ["ไฟล์โลโก้แบบไหนที่ใช้ได้", "แบบฟอร์มรองรับ JPG, PNG และ PDF ทีมงานจะตรวจสอบความคมชัดและความเหมาะสมของไฟล์ก่อนเริ่มผลิต"]];
const BENEFITS = [[ShieldCheck, "คุณภาพได้มาตรฐานสากล"], [Palette, "ผลิตตามแบบ ไม่จำกัดไอเดีย"], [Truck, "ส่งตรงเวลา ดูแลทุกขั้นตอน"]];
const btn = "inline-flex items-center justify-center gap-2 rounded-full bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4338CA] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4F46E5]/30 disabled:opacity-50";
const outline = "inline-flex items-center justify-center gap-2 rounded-full border border-[#4F46E5]/25 bg-white px-6 py-3 text-sm font-semibold text-[#4F46E5] transition hover:bg-[#F8F9FB] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4F46E5]/30";
const wrap = "mx-auto w-full max-w-6xl px-5 md:px-8";
const section = "py-16 md:py-24";
function SectionTitle({ eyebrow, title, children }) {
  return <div className="mb-10">
<p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-[#4F46E5]">{eyebrow}</p>
<h2 className="text-2xl font-semibold leading-snug md:text-3xl">{title}</h2>{children && <p className="mt-3 max-w-xl text-sm leading-7 text-[#6B7280]">{children}</p>}</div>;
}
function ProductImage({ id, hero = false, className = "" }) {
  const p = PRODUCTS.find((p2) => p2.id === id);
  return <img src={p.image} alt={p.name} width="900" height="900" loading={hero ? "eager" : "lazy"} decoding="async" className={"h-full w-full object-contain " + className} />;
}
function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const links = [["home", "หน้าแรก"], ["products", "สินค้า"], ["services", "บริการรับผลิต"], ["portfolio", "ผลงาน"], ["quote", "ติดต่อเรา"]];
  useEffect(() => {
    const update = () => {
      let current = "home";
      for (const [id] of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className="sticky top-0 z-40 border-b border-[#E5E7EB]/70 bg-white/90 backdrop-blur-xl">
<div className={wrap + " flex h-20 items-center justify-between gap-4"}>
<a href="#home" aria-label="Moonvera Plus+ หน้าแรก" className="text-xl font-bold tracking-tight">Moonvera <span className="font-medium text-[#4F46E5]">Plus<sup>+</sup>
</span>
</a>
<nav aria-label="เมนูหลัก" className="hidden items-center gap-7 lg:flex">{links.map(([id, label]) => <a key={id} href={"#" + id} aria-current={active === id ? "location" : void 0} className={"border-b-2 py-2 text-sm transition hover:text-[#4F46E5] " + (active === id ? "border-[#4F46E5] text-[#4F46E5]" : "border-transparent text-[#6B7280]")}>{label}</a>)}</nav>
<div className="flex items-center gap-2">
<a href="#quote" className={btn + " hidden sm:inline-flex"}>ขอใบเสนอราคา <Send size={15} />
</a>
<button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "ปิดเมนู" : "เปิดเมนู"} className="rounded-full p-3 text-[#4F46E5] focus-visible:ring-2 lg:hidden">{open ? <X /> : <Menu />}</button>
</div>
</div>{open && <nav id="mobile-menu" aria-label="เมนูมือถือ" className="border-t border-[#E5E7EB] bg-white p-5 lg:hidden">{links.map(([id, label]) => <a key={id} href={"#" + id} onClick={() => setOpen(false)} className="block rounded-xl p-3 text-sm text-[#4F46E5] hover:bg-[#F8F9FB]">{label}</a>)}</nav>}</header>;
}
function Hero() {
  return <section id="home" className="relative overflow-hidden border-b border-[#E5E7EB] bg-white pb-12 pt-12 md:pb-16 md:pt-16">
<div className={wrap + " grid items-center gap-12 lg:grid-cols-[1.03fr_1fr] lg:gap-10"}>
<div>
<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F8F9FB] px-3 py-2 text-[11px] font-medium">
<span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />รับผลิตสินค้าพรีเมียมสำหรับองค์กร</div>
<h1 className="text-[35px] font-semibold leading-[1.42] tracking-tight sm:text-[43px] lg:text-[46px]">ตอบโจทย์ทุกธุรกิจ<br />ทุกกิจกรรม<br />
<span className="text-[#4F46E5]">โซลูชันสินค้าพรีเมียม</span>
<br />สำหรับองค์กร</h1>
<p className="mt-5 max-w-md text-sm leading-7 text-[#6B7280]">สร้างภาพลักษณ์ที่ดีให้แบรนด์ของคุณ ด้วยสินค้าคุณภาพ ดีไซน์ทันสมัย ผลิตตามแบบ พร้อมบริการครบวงจร</p>
<div className="mt-7 flex flex-wrap gap-3">
<a href="#quote" className={btn}>ขอใบเสนอราคาฟรี <ArrowUpRight size={17} />
</a>
<a href="#products" className={outline}>ดูสินค้า <ArrowRight size={17} />
</a>
</div>
<div className="mt-9 flex items-center gap-3 border-t border-[#E5E7EB] pt-5">
<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F9FB]">
<Gift size={18} />
</div>
<p className="text-xs leading-5 text-[#6B7280]">จากไอเดียของคุณ สู่ของขวัญที่มีความหมาย<br />
<span className="font-medium text-[#2D2A70]">ออกแบบให้แบรนด์คุณอยู่ในทุกวัน</span>
</p>
</div>
</div>
<div className="relative grid grid-cols-2 gap-3 pb-7 sm:gap-4">
<div className="col-span-2 flex items-center justify-between pb-1 text-[10px] font-medium tracking-[.18em] text-[#6B7280]">
<span>MADE FOR YOUR BRAND</span>
<span>MOONVERA COLLECTION / 01</span>
</div>
<div className="relative row-span-2 overflow-hidden rounded-2xl bg-[#F8F9FB]">
<ProductImage id={1} hero />
<span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px]">เรียบง่าย มีเอกลักษณ์</span>
</div>
<div className="aspect-[1.45] overflow-hidden rounded-2xl bg-[#F8F9FB]">
<ProductImage id={25} hero />
</div>
<div className="aspect-[1.45] overflow-hidden rounded-2xl bg-[#F8F9FB]">
<ProductImage id={18} hero />
</div>
<div className="aspect-[1.45] overflow-hidden rounded-2xl bg-[#F8F9FB]">
<ProductImage id={4} hero />
</div>
<div className="aspect-[1.45] overflow-hidden rounded-2xl bg-[#F8F9FB]">
<ProductImage id={35} hero />
</div>
<div className="absolute -bottom-1 right-4 flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm">
<span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4F46E5]/10 text-[#4F46E5]">
<Palette size={18} />
</span>
<div className="text-xs font-semibold">Your brand. Your story.<p className="mt-1 text-[10px] font-normal text-[#6B7280]">สร้างสรรค์สินค้าที่เป็นคุณ</p>
</div>
</div>
</div>
</div>
<div className={wrap + " mt-12 grid gap-4 border-t border-[#E5E7EB] pt-6 sm:grid-cols-3"}>{BENEFITS.map(([Icon, text]) => <div key={text} className="flex items-center justify-start gap-3 sm:justify-center">
<span className="rounded-full bg-[#F8F9FB] p-2.5 text-[#4F46E5]">
<Icon size={18} />
</span>
<span className="text-xs font-medium">{text}</span>
</div>)}</div>
<p className={wrap + " mt-3 text-center text-[10px] text-[#6B7280]"}>แนวทางบริการที่นำเสนอ • รายละเอียดมาตรฐานและกำหนดส่งต้องยืนยันในใบเสนอราคา</p>
</section>;
}
function SocialProof() {
  return <section className="bg-[#F8F9FB] py-12">
<div className={wrap}>
<p className="mb-6 text-center text-[10px] text-[#6B7280]">ข้อมูลตัวอย่างสำหรับจัดวาง • ตัวเลขและโลโก้ยังไม่ได้รับการยืนยัน</p>
<div className="grid grid-cols-2 gap-y-7 md:grid-cols-4">{STATS.map((s) => <div key={s.label} className="border-r border-[#E5E7EB] text-center last:border-0">
<p className="text-2xl font-semibold tracking-tight md:text-3xl">{s.value}</p>
<p className="mt-2 text-xs text-[#6B7280]">{s.label}</p>
</div>)}</div>
<div className="mt-9 grid grid-cols-3 gap-4 border-t border-[#E5E7EB] pt-7 sm:grid-cols-6">{CLIENTS.map((c, i) => <div key={i} className="text-center text-xl font-bold tracking-[.2em] text-[#6B7280]/35">{c}</div>)}</div>
</div>
</section>;
}
function Audience() {
  return <section className="border-y border-[#E5E7EB] bg-white py-14">
<div className={wrap + " grid gap-9 lg:grid-cols-[1fr_2fr]"}>
<div>
<p className="mb-3 text-xs tracking-widest text-[#4F46E5]">FOR EVERY BUSINESS</p>
<h2 className="text-2xl font-semibold">เหมาะสำหรับทุกองค์กร</h2>
<p className="mt-3 text-sm leading-7 text-[#6B7280]">เราพร้อมดูแลทุกความต้องการ<br />ของธุรกิจคุณ</p>
</div>
<div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">{AUDIENCES.map(([Icon, text]) => <div key={text} className="flex flex-col gap-2">
<span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F9FB] text-[#4F46E5]">
<Icon size={19} />
</span>
<span className="text-xs leading-5">{text}</span>
</div>)}</div>
</div>
</section>;
}
function Products({ onQuote }) {
  const [category, setCategory] = useState("ทั้งหมด");
  const filtered = PRODUCTS.filter((p) => category === "ทั้งหมด" || p.category === category);
  return <section id="products" className={section}>
<div className={wrap}>
<div className="flex flex-wrap items-end justify-between gap-4">
<SectionTitle eyebrow="OUR PRODUCTS" title="สินค้ารับผลิตสำหรับแบรนด์และองค์กร">เลือกกระเป๋าที่สะท้อนตัวตนของแบรนด์คุณ แล้วบอกเราเกี่ยวกับไอเดียที่ต้องการ</SectionTitle>
<span className="mb-10 flex items-center gap-2 text-xs text-[#6B7280]">
<Package size={15} /> ภาพสินค้าจริงจากแบรนด์ 37 แบบ</span>
</div>
<div role="tablist" aria-label="หมวดสินค้า" className="mb-8 flex max-w-full gap-2 overflow-x-auto pb-3">{CATEGORIES.map((c) => <button type="button" role="tab" id={"tab-" + CATEGORIES.indexOf(c)} aria-controls="product-panel" aria-selected={category === c} key={c} onClick={() => {
    setCategory(c);
  }} className={"shrink-0 rounded-full border px-5 py-2.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-[#4F46E5] " + (category === c ? "border-[#4F46E5] bg-[#4F46E5] text-white" : "border-[#E5E7EB] bg-white text-[#4F46E5] hover:border-[#4F46E5]")}>{c}</button>)}</div>
<div id="product-panel" role="tabpanel" aria-labelledby={"tab-" + CATEGORIES.indexOf(category)} className="grid grid-cols-1 gap-5 min-[430px]:grid-cols-2 lg:grid-cols-4">{filtered.map((p) => <article key={p.id} className="group overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
<div className="relative aspect-square overflow-hidden bg-white">
<ProductImage id={p.id} />
<span className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[9px] text-[#6B7280]">{p.category}</span>
</div>
<div className="p-5">
<h3 className="min-h-12 text-sm font-semibold leading-6">{p.name}</h3>
<ul className="mt-3 space-y-2 text-[11px] text-[#6B7280]">{["ชมรูปแบบจากภาพสินค้าจริง", "แจ้งรายละเอียดโลโก้ที่ต้องการ", "สอบถามตัวเลือกกับทีมงาน"].map((t) => <li key={t} className="flex items-center gap-2">
<Check size={12} className="shrink-0 text-[#4F46E5]" />{t}</li>)}</ul>
<div className="mt-5 border-t border-[#E5E7EB] pt-4">
<p className="mb-3 text-center text-[10px] text-[#6B7280]">สอบถามจำนวนขั้นต่ำ</p>
<button type="button" onClick={() => onQuote(p.name)} className={outline + " w-full !px-3 !py-2.5 !text-xs group-hover:border-[#4F46E5]"}>ขอราคา <ArrowUpRight size={14} />
</button>
</div>
</div>
</article>)}</div>
</div>
</section>;
}
function Steps() {
  return <section id="services" className={section + " border-y border-[#E5E7EB] bg-white"}>
<div className={wrap}>
<div className="text-center">
<SectionTitle eyebrow="HOW IT WORKS" title="6 ขั้นตอนการสั่งผลิต ง่าย สะดวก รวดเร็ว" />
<p className="-mt-6 mb-12 text-sm text-[#6B7280]">พร้อมดูตัวอย่างก่อนผลิต เพื่อให้ทุกชิ้นตรงกับไอเดียของคุณ</p>
</div>
<div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">{STEPS.map(([Icon, title, desc], i) => <div key={title} className="relative flex gap-4 border-l border-[#E5E7EB] pb-6 pl-5 md:block md:border-0 md:pb-0 md:pl-0">
<div className="relative mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F8F9FB] text-[#4F46E5]">
<Icon size={23} />
<span className="absolute -right-1 -top-2 rounded-full bg-white px-1 text-[10px] font-semibold">0{i + 1}</span>
</div>
<div>
<h3 className="text-sm font-semibold">{title}</h3>
<p className="mt-2 text-[11px] leading-5 text-[#6B7280]">{desc}</p>
</div>{i < 5 && <ArrowRight size={14} className="absolute right-3 top-5 hidden text-[#6B7280]/40 lg:block" />}</div>)}</div>
</div>
</section>;
}
function Portfolio() {
  return <section id="portfolio" className={section}>
<div className={wrap}>
<SectionTitle eyebrow="THE COLLECTION" title="ไอเดียที่จับต้องได้ ในแบบของแบรนด์คุณ">ภาพตัวอย่างสินค้าของ Moonvera Plus+ เพื่อเป็นแรงบันดาลใจในการออกแบบ ไม่ใช่การอ้างอิงลูกค้าองค์กร</SectionTitle>
<div className="grid grid-cols-2 gap-4 md:grid-cols-3">{[3, 9, 17, 24, 34, 36].map((id) => <figure key={id} className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
<div className="aspect-square">
<ProductImage id={id} />
</div>
<figcaption className="absolute inset-x-0 bottom-0 bg-white/95 px-4 py-3 text-xs backdrop-blur-sm transition group-hover:bg-[#2D2A70] group-hover:text-white">
<span className="flex items-center justify-between gap-2">{PRODUCTS[id - 1].name}<ArrowUpRight size={16} className="shrink-0" />
</span>
</figcaption>
</figure>)}</div>
</div>
</section>;
}
function Testimonials() {
  return <section className="border-y border-[#E5E7EB] bg-white py-16">
<div className={wrap}>
<div className="text-center">
<SectionTitle eyebrow="CUSTOMER STORIES" title="ความประทับใจจากลูกค้า" />
<p className="-mt-6 mb-8 text-xs text-[#6B7280]">รีวิวตัวอย่างเพื่อแสดงรูปแบบเท่านั้น • ต้องเปลี่ยนเป็นรีวิวที่ได้รับอนุญาตก่อนเผยแพร่</p>
</div>
<div className="grid gap-5 md:grid-cols-3">{REVIEWS.map((r) => <article key={r.name} className="rounded-2xl border border-[#E5E7EB] bg-[#F8F9FB] p-7">
<div aria-label="คะแนนตัวอย่าง 5 จาก 5 ดาว" className="mb-5 flex gap-1 text-[#4F46E5]">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
<blockquote className="min-h-24 text-sm leading-7">“{r.text}”</blockquote>
<div className="mt-6 flex items-center gap-3 border-t border-[#E5E7EB] pt-5">
<span className="rounded-full bg-white p-3 text-[#4F46E5]">
<Building2 size={18} />
</span>
<div>
<p className="text-xs font-semibold">{r.name}</p>
<p className="mt-1 text-[11px] text-[#6B7280]">{r.company} · ข้อมูลสมมติ</p>
</div>
</div>
</article>)}</div>
</div>
</section>;
}
function FAQ() {
  const [open, setOpen] = useState(null);
  return <section className={section}>
<div className={wrap + " grid gap-8 md:grid-cols-[1fr_1.6fr]"}>
<div>
<SectionTitle eyebrow="FAQ" title="คำถามที่พบบ่อย">ทุกเรื่องที่คุณอยากรู้ ก่อนเริ่มสร้างสรรค์สินค้าพรีเมียมให้กับแบรนด์</SectionTitle>
<a href="#quote" className="inline-flex items-center gap-2 text-sm font-medium text-[#4F46E5]">สอบถามรายละเอียดเพิ่มเติม <ArrowUpRight size={16} />
</a>
</div>
<div>{FAQS.map(([q, a], i) => <div key={q} className="border-b border-[#E5E7EB]">
<h3>
<button type="button" aria-expanded={open === i} aria-controls={"answer-" + i} id={"question-" + i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#4F46E5]">
<span>
<span className="mr-4 text-[10px] text-[#6B7280]">0{i + 1}</span>{q}</span>
<ChevronDown size={17} className={"shrink-0 text-[#4F46E5] transition " + (open === i ? "rotate-180" : "")} />
</button>
</h3>
<div id={"answer-" + i} aria-labelledby={"question-" + i} hidden={open !== i} className="pb-5 pl-8 text-sm leading-7 text-[#6B7280]">{a}</div>
</div>)}</div>
</div>
</section>;
}
function ContactLink({ kind, children, className = "" }) {
  const url = kind === "phone" ? CONTACT.phone ? "tel:" + CONTACT.phone : null : CONTACT[kind];
  return url ? <a className={className} href={url} target={kind === "phone" ? void 0 : "_blank"} rel="noreferrer">{children}</a> : <button type="button" onClick={() => document.getElementById("contact-note").showModal()} className={className}>{children}</button>;
}
function QuoteForm({ selected, setSelected }) {
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState("");
  const [status, setStatus] = useState("idle");
  const [policy, setPolicy] = useState(false);
  const input = "mt-2 block w-full min-w-0 rounded-xl border border-[#E5E7EB] bg-white px-3 py-3 text-sm text-[#2D2A70] outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15";
  function err(name) {
    return errors[name] && <p id={name + "-error"} role="alert" className="mt-1.5 text-xs text-red-600">{errors[name]}</p>;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = {};
    if (!String(data.get("name") || "").trim()) next.name = "กรุณากรอกชื่อและบริษัท";
    if (!/^\d{9,10}$/.test(String(data.get("phone") || ""))) next.phone = "กรุณากรอกเบอร์โทรเป็นตัวเลข 9–10 หลัก";
    if (!data.get("product")) next.product = "กรุณาเลือกสินค้าที่สนใจ";
    if (!data.get("consent")) next.consent = "กรุณาให้ความยินยอมก่อนทดสอบแบบฟอร์ม";
    const attachment = data.get("logo");
    if (attachment?.size) {
      if (!/\.(jpg|jpeg|png|pdf)$/i.test(attachment.name)) next.logo = "รองรับ JPG, PNG และ PDF เท่านั้น";
      if (attachment.size > 10 * 1024 * 1024) next.logo = "กรุณาเลือกไฟล์ขนาดไม่เกิน 10 MB";
    }
    if (data.get("quantity") && Number(data.get("quantity")) < 1) next.quantity = "กรุณาระบุจำนวนอย่างน้อย 1 ชิ้น";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    setStatus("sending");
    // Integration point: replace this simulation with your Formspree / Google Apps Script endpoint.
    // const response = await fetch(CONTACT.endpoint, { method: "POST", body: data });
    // Check response.ok before showing a real submission confirmation.
    // Do not set Content-Type manually when uploading FormData.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("demo-success");
  }
  return <section id="quote" className="bg-[#2D2A70] py-16 md:py-24">
<div className={wrap + " grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16"}>
<div className="pt-5 text-white">
<p className="mb-5 text-xs tracking-[.2em] text-white/65">LET’S CREATE SOMETHING GREAT</p>
<h2 className="text-3xl font-semibold leading-relaxed md:text-4xl">สั่งผลิตกับ<br />Moonvera Plus+<br />เพื่อสร้างเอกลักษณ์<br />ให้แบรนด์ของคุณ</h2>
<p className="mt-5 max-w-sm text-sm leading-7 text-white/65">เล่าไอเดียของคุณให้เราฟัง แล้วเริ่มต้นสร้างสินค้าพรีเมียมที่เหมาะกับธุรกิจไปด้วยกัน</p>
<ul className="mt-8 space-y-4">{["สินค้าคุณภาพสูง", "บริการครบวงจร", "ดูแลโดยทีมงานมืออาชีพ", "ราคาคุ้มค่า"].map((t) => <li key={t} className="flex items-center gap-3 text-sm">
<span className="rounded-full bg-white/10 p-1">
<Check size={14} />
</span>{t}</li>)}</ul>
<span className="mt-8 inline-block rounded-full border border-white/20 px-4 py-2 text-xs">ขอใบเสนอราคาฟรี ไม่มีค่าใช้จ่าย!</span>
<div className="mt-8 border-t border-white/15 pt-7">
<p className="mb-3 text-xs text-white/65">สะดวกคุยกับทีมงานโดยตรง?</p>
<ContactLink kind="line" className={btn}>
<MessageCircle size={18} />หรือทักไลน์เลย <ArrowUpRight size={15} />
</ContactLink>
</div>
</div>
<div className="min-w-0 rounded-2xl bg-white p-6 shadow-xl md:p-8">{status === "demo-success" ? <div role="status" className="flex min-h-[520px] flex-col items-center justify-center text-center">
<CheckCircle size={52} className="mb-6 text-[#4F46E5]" />
<h3 className="text-xl font-semibold">ขอบคุณที่ทดลองกรอกข้อมูล</h3>
<p className="mt-4 text-sm leading-7 text-[#6B7280]">แบบฟอร์มจำลองทำงานเรียบร้อย<br />ข้อมูลยังไม่ได้ถูกส่งหรือบันทึกไปยังทีมงาน<br />ต้องเชื่อมต่อระบบรับข้อมูลก่อนใช้งานจริง</p>
<button type="button" onClick={() => {
    setStatus("idle");
    setFile("");
  }} className={btn + " mt-7"}>กลับไปที่แบบฟอร์ม</button>
</div> : <form noValidate onSubmit={handleSubmit}>
<h3 className="text-2xl font-semibold">ขอใบเสนอราคาฟรี</h3>
<p className="mt-2 text-xs leading-6 text-[#6B7280]">กรอกข้อมูลเพื่อให้ทีมงานเข้าใจความต้องการของคุณ</p>
<p className="my-5 rounded-xl border border-[#E5E7EB] bg-[#F8F9FB] p-3 text-[11px] leading-5 text-[#6B7280]">แบบฟอร์มสาธิต • ยังไม่ส่งข้อมูลจริง กรุณาใช้ข้อมูลทดสอบ</p>
<div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
<div className="sm:col-span-2">
<label className="text-xs font-medium" htmlFor="name">ชื่อ-บริษัท <span className="text-[#4F46E5]">*</span>
</label>
<input id="name" name="name" required autoComplete="organization" placeholder="ชื่อผู้ติดต่อ / ชื่อบริษัท" className={input} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : void 0} />{err("name")}</div>
<div>
<label className="text-xs font-medium" htmlFor="phone">เบอร์โทรศัพท์ <span className="text-[#4F46E5]">*</span>
</label>
<input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" required placeholder="เบอร์โทร 9–10 หลัก" className={input} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : void 0} />{err("phone")}</div>
<div>
<label className="text-xs font-medium" htmlFor="line">LINE ID</label>
<input id="line" name="line" placeholder="LINE ID ของคุณ" className={input} />
</div>
<div className="sm:col-span-2">
<label className="text-xs font-medium" htmlFor="product">สินค้าที่สนใจ <span className="text-[#4F46E5]">*</span>
</label>
<select id="product" name="product" required value={selected} onChange={(e) => setSelected(e.target.value)} className={input} aria-invalid={!!errors.product} aria-describedby={errors.product ? "product-error" : void 0}>
<option value="">เลือกสินค้าที่สนใจ</option>{PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}<option value="อื่น ๆ / ขอคำแนะนำ">อื่น ๆ / ขอคำแนะนำ</option>
</select>{err("product")}</div>
<div>
<label className="text-xs font-medium" htmlFor="quantity">จำนวนที่ต้องการ</label>
<input id="quantity" name="quantity" type="number" min="1" placeholder="ระบุจำนวน (ชิ้น)" className={input} aria-invalid={!!errors.quantity} />{err("quantity")}</div>
<div className="min-w-0">
<label className="text-xs font-medium" htmlFor="date">วันที่ต้องการใช้สินค้า</label>
<input id="date" name="date" type="date" className={input + " appearance-none"} />
</div>
<div className="sm:col-span-2">
<label className="text-xs font-medium" htmlFor="logo">แนบไฟล์โลโก้ / แบบ</label>
<div className="relative mt-2 rounded-xl border border-dashed border-[#E5E7EB] p-4 text-center focus-within:ring-2 focus-within:ring-[#4F46E5]">
<Upload size={18} className="mx-auto mb-2 text-[#4F46E5]" />
<span className="block break-all text-xs text-[#6B7280]">{file || "เลือกไฟล์ JPG, PNG หรือ PDF (ไม่เกิน 10 MB)"}</span>
<input id="logo" name="logo" type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setFile(e.target.files[0]?.name || "")} aria-label="เลือกไฟล์โลโก้หรือแบบ" aria-invalid={!!errors.logo} className="absolute inset-0 w-full cursor-pointer opacity-0" />
</div>{err("logo")}</div>
<div className="sm:col-span-2">
<label className="text-xs font-medium" htmlFor="details">รายละเอียดเพิ่มเติม</label>
<textarea id="details" name="details" rows="3" placeholder="เช่น รูปแบบ สีที่ต้องการ หรือรายละเอียดของกิจกรรม" className={input} />
</div>
</div>
<div className="mt-5">
<label className="flex items-start gap-3 text-[11px] leading-6 text-[#6B7280]">
<input id="consent" name="consent" type="checkbox" required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : void 0} className="mt-1 h-4 w-4 shrink-0 accent-[#4F46E5] focus-visible:ring-2" />
<span>ข้าพเจ้ายินยอมให้เก็บและใช้ข้อมูลเพื่อติดต่อกลับตาม<button type="button" onClick={() => setPolicy(true)} className="ml-1 text-[#4F46E5] underline">นโยบายความเป็นส่วนตัว</button>
</span>
</label>{err("consent")}</div>
<button disabled={status === "sending"} className={btn + " mt-5 w-full"} type="submit">{status === "sending" ? "กำลังทดสอบการส่ง…" : "ส่งข้อมูลขอใบเสนอราคา"} <Send size={16} />
</button>
<p className="mt-3 text-center text-[10px] leading-5 text-[#6B7280]">ระบบสาธิตยังไม่ส่งข้อมูล • {CONTACT.response}</p>
</form>}</div>
</div>{policy && <InfoModal title="นโยบายความเป็นส่วนตัว — ฉบับร่าง" onClose={() => setPolicy(false)}>แบบฟอร์มนี้เป็นระบบจำลอง ข้อมูลไม่ถูกส่งไปยังเซิร์ฟเวอร์ ก่อนใช้งานจริงต้องระบุผู้ควบคุมข้อมูล วัตถุประสงค์ ระยะเวลาเก็บรักษา ช่องทางใช้สิทธิ และผู้รับข้อมูลให้ครบถ้วน</InfoModal>}</section>;
}
function InfoModal({ title, children, onClose }) {
  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, []);
  return <dialog aria-label={title} open ref={(el) => {
    if (el && !el.dataset.ready) {
      el.dataset.ready = "1";
      el.removeAttribute("open");
      el.showModal();
    }
  }} onCancel={onClose} onClick={(e) => {
    if (e.target === e.currentTarget) onClose();
  }} className="fixed inset-0 m-auto w-[calc(100%_-_2rem)] max-w-lg rounded-2xl border border-[#E5E7EB] bg-white p-7 text-[#2D2A70] shadow-xl backdrop:bg-[#2D2A70]/40">
<div className="flex items-start justify-between gap-4">
<h2 className="font-semibold">{title}</h2>
<button autoFocus type="button" onClick={onClose} aria-label="ปิดหน้าต่าง" className="rounded-full p-1 text-[#4F46E5] focus-visible:ring-2">
<X size={20} />
</button>
</div>
<p className="mt-4 text-sm leading-7 text-[#6B7280]">{children}</p>
</dialog>;
}
function Footer() {
  const [modal, setModal] = useState(null);
  return <footer className="bg-white pb-28 pt-12 md:pb-6">
<div className={wrap}>
<div className="grid gap-8 border-b border-[#E5E7EB] pb-10 md:grid-cols-[1.4fr_1fr_auto]">
<div>
<a href="#home" className="text-xl font-bold">Moonvera <span className="text-[#4F46E5]">Plus<sup>+</sup>
</span>
</a>
<p className="mt-4 text-xs leading-6 text-[#6B7280]">สร้างสรรค์สินค้าพรีเมียม เพื่อทุกความเป็นไปได้ของแบรนด์คุณ</p>
<p className="mt-2 text-[10px] text-[#6B7280]">ข้อมูลติดต่อด้านข้างเป็น Placeholder รอยืนยัน</p>
</div>
<div className="space-y-3 text-xs text-[#4F46E5]">
<ContactLink kind="phone" className="flex items-center gap-3">
<Phone size={15} />{CONTACT.phoneLabel}</ContactLink>
<ContactLink kind="line" className="flex items-center gap-3">
<MessageCircle size={15} />LINE · รอระบุบัญชี</ContactLink>
<ContactLink kind="facebook" className="flex items-center gap-3">
<Facebook size={15} />Facebook · รอระบุเพจ</ContactLink>
</div>
<div className="flex w-24 flex-col items-center justify-center rounded-xl border border-dashed border-[#E5E7EB] p-3 text-[#6B7280]">
<QrCode size={42} />
<span className="mt-2 text-[9px]">QR ตัวอย่างเท่านั้น</span>
</div>
</div>
<div className="flex flex-col justify-between gap-4 pt-6 text-[10px] text-[#6B7280] sm:flex-row">
<p>© {(/* @__PURE__ */ new Date()).getFullYear()} Moonvera Plus. All rights reserved.</p>
<div className="flex flex-wrap gap-5">
<button type="button" onClick={() => setModal("privacy")} className="text-[#4F46E5]">นโยบายความเป็นส่วนตัว</button>
<button type="button" onClick={() => setModal("terms")} className="text-[#4F46E5]">เงื่อนไขการให้บริการ</button>
</div>
</div>
</div>{modal && <InfoModal title={modal === "privacy" ? "นโยบายความเป็นส่วนตัว — รอยืนยัน" : "เงื่อนไขการให้บริการ — รอยืนยัน"} onClose={() => setModal(null)}>{modal === "privacy" ? "เว็บไซต์นี้เป็นต้นแบบ แบบฟอร์มไม่ส่งข้อมูล ต้องเพิ่มนโยบายฉบับจริงและข้อมูลผู้ควบคุมข้อมูลก่อนเปิดรับข้อมูลส่วนบุคคล" : "เงื่อนไขด้านราคา การผลิต การชำระเงิน การแก้ไขงาน และการจัดส่ง ต้องได้รับการยืนยันในใบเสนอราคาก่อนสั่งผลิต"}</InfoModal>}</footer>;
}
function FloatingContact() {
  return <>
<div className="fixed bottom-24 right-4 z-30 flex flex-col gap-3 md:bottom-7 md:right-6">
<ContactLink kind="line" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#06C755] text-white shadow-md transition hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-[#4F46E5]/30">
<MessageCircle size={23} />
<span className="sr-only">ติดต่อทาง LINE</span>
</ContactLink>
<ContactLink kind="phone" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4F46E5] text-white shadow-md transition hover:bg-[#4338CA] focus-visible:ring-4 focus-visible:ring-[#4F46E5]/30">
<Phone size={21} />
<span className="sr-only">โทรหาเรา</span>
</ContactLink>
</div>
<div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E5E7EB] bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
<a href="#quote" className={btn + " w-full"}>ขอใบเสนอราคา <Send size={16} />
</a>
</div>
<dialog aria-label="ช่องทางติดต่ออยู่ระหว่างยืนยัน" id="contact-note" className="fixed inset-0 m-auto w-[calc(100%_-_2rem)] max-w-sm rounded-2xl border border-[#E5E7EB] bg-white p-7 text-[#2D2A70] shadow-xl backdrop:bg-[#2D2A70]/40">
<h2 className="font-semibold">ช่องทางติดต่ออยู่ระหว่างยืนยัน</h2>
<p className="mt-3 text-sm leading-7 text-[#6B7280]">ยังไม่มีเบอร์โทรหรือบัญชีติดต่อจริงในต้นแบบนี้ ช่องทางติดต่อจะเปิดใช้งานเมื่อได้รับการยืนยันจากแบรนด์</p>
<form method="dialog">
<button className={btn + " mt-5"}>รับทราบ</button>
</form>
</dialog>
</>;
}
function App() {
  const [selected, setSelected] = useState("");
  useEffect(() => {
    document.title = "Moonvera Plus+ | รับผลิตสินค้าพรีเมียมสำหรับองค์กร";
  }, []);
  function onQuote(name) {
    setSelected(name);
    document.getElementById("quote")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    setTimeout(() => document.getElementById("product")?.focus({ preventScroll: true }), 500);
  }
  return <>
<a href="#products" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:p-4 focus:text-[#4F46E5]">ข้ามไปยังสินค้า</a>
<Navbar />
<main>
<Hero />
<SocialProof />
<Audience />
<Products onQuote={onQuote} />
<Steps />
<Portfolio />
<Testimonials />
<FAQ />
<QuoteForm selected={selected} setSelected={setSelected} />
</main>
<Footer />
<FloatingContact />
</>;
}
createRoot(document.getElementById("root")).render(<App />);
export default App;
