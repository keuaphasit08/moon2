import {CATALOG, categoryNames, matchesCategory, quoteOptions, categoryUrl, categoryFromPath} from './catalog';
import {createQuoteAttempt,submitQuote} from './quotes-api';
import {errorMessage} from './content-api';
import {useSite, SiteText} from './site.jsx';
import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, ArrowUpRight, ArrowRight, Check, CheckCircle, Palette, Truck, Menu, X, Building2, Factory, Hotel, Coffee, CalendarDays, GraduationCap, Tags, Gift, ChevronDown, Star, Phone, MessageCircle, Facebook, Upload, Package, ClipboardList, FileCheck, LoaderCircle } from 'lucide-react';
// Editable sample data. Replace contacts, statistics and testimonials before launch.


// Real brand images; names describe visible appearance. Materials and MOQ require confirmation.

const AUDIENCES = [[Building2, 'บริษัท / องค์กรธุรกิจ'], [Factory, 'โรงงานอุตสาหกรรม'], [Hotel, 'โรงแรม / รีสอร์ท'], [Coffee, 'ร้านอาหาร / คาเฟ่'], [CalendarDays, 'Event Organizer'], [GraduationCap, 'โรงเรียน / มหาวิทยาลัย'], [Tags, 'แบรนด์สินค้า'], [Gift, 'บริษัทรับทำของพรีเมียม']];
const STEPS = [[Send, 'ส่งแบบ / โลโก้', 'บอกไอเดียที่คุณต้องการ'], [ClipboardList, 'แจ้งสินค้าและจำนวน', 'เลือกให้เหมาะกับงบประมาณ'], [FileCheck, 'รับใบเสนอราคา', 'รายละเอียดชัดเจน ครบถ้วน'], [Palette, 'ทำ Mockup ให้ Confirm', 'เห็นภาพก่อนเริ่มผลิตจริง'], [Package, 'ผลิตสินค้า', 'ใส่ใจคุณภาพทุกขั้นตอน'], [Truck, 'ตรวจสอบและจัดส่ง', 'พร้อมส่งถึงมือคุณ']];


const NAV = [['home', 'หน้าแรก'], ['products', 'สินค้า'], ['services', 'บริการรับผลิต'], ['portfolio', 'ผลงาน'], ['quote', 'ติดต่อเรา']];
const wrap = 'mx-auto max-w-6xl px-5 md:px-8';
const section = 'py-16 md:py-24';
const storefrontCategoryOrder = new Map([
  'hats', 'apparel', 'kitchen-uniforms',
  'bags', 'drinkware', 'umbrellas',
  'stationery', 'promotional-gifts', 'gift-sets',
].map((slug, index) => [`/products/${slug}`, index]));
const btn = 'brand-button inline-flex items-center justify-center gap-2 rounded-full bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6D28D9] disabled:opacity-60';
const outline = 'secondary-button inline-flex items-center justify-center gap-2 rounded-full border border-[#E9E1F2] bg-white px-6 py-3 text-sm font-semibold text-[#7C3AED] transition hover:border-[#7C3AED]';
function Title({
  eyebrow,
  children,
  subtitle
}) {
  return <div className="section-title mx-auto mb-10 max-w-2xl text-center"><p className="mb-3 text-xs font-semibold tracking-wider text-[#7C3AED]">{eyebrow}</p><h2 className="text-2xl font-bold leading-relaxed md:text-3xl">{children}</h2>{subtitle && <p className="mt-3 text-sm leading-7 text-[#756A83]">{subtitle}</p>}</div>;
}
function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    }), {
      rootMargin: '-15% 0px -65% 0px'
    });
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return <header className="site-header sticky top-0 z-40 border-b border-[#E9E1F2]/70 bg-white/90 backdrop-blur-xl"><div className={`${wrap} flex h-20 items-center justify-between gap-3`}><a href="/#home" className="site-brand text-xl font-bold tracking-tight md:text-2xl">Moonvera <span className="font-medium">Plus<span className="text-[#7C3AED]">+</span></span></a><nav aria-label="เมนูหลัก" className="hidden gap-7 lg:flex">{NAV.map(([id, name]) => <a key={id} href={`/#${id}`} aria-current={active === id ? 'location' : undefined} className={`border-b-2 py-7 text-xs ${active === id ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-transparent text-[#756A83]'}`}>{name}</a>)}</nav><div className="flex gap-2"><a href="#quote" className={`${btn} hidden sm:inline-flex`}><SiteText id="text_43" fallback="ขอใบเสนอราคา " /><Send size={15} /></a><button aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="rounded-xl p-2 text-[#7C3AED] lg:hidden">{open ? <X /> : <Menu />}</button></div></div>{open && <nav id="mobile-menu" aria-label="เมนูมือถือ" className="border-t border-[#E9E1F2] px-5 pb-4 lg:hidden">{NAV.map(([id, name]) => <a key={id} href={`/#${id}`} onClick={() => setOpen(false)} className="block py-3 text-sm text-[#7C3AED]">{name}</a>)}</nav>}</header>;
}
function Hero() {
  const {data: site} = useSite();
  const products = [1, 25, 18, 4]
    .map(id => site.products.find(product => product.id === id && product.visible !== false))
    .filter(Boolean);

  return (
    <section id="home" className="hero-section">
      <div className={wrap}>
        <div className="hero-intro">
          <p className="hero-label"><SiteText id="text_1" fallback="รับผลิตสินค้าพรีเมียมสำหรับองค์กร" /></p>
          <h1>
            <span><SiteText id="text_44" fallback="ตอบโจทย์ทุกธุรกิจ" /> <SiteText id="text_45" fallback="ทุกกิจกรรม" /></span>
            <span className="hero-highlight"><SiteText id="text_2" fallback="โซลูชันสินค้าพรีเมียม" /> <SiteText id="text_3" fallback="สำหรับองค์กร" /></span>
          </h1>
          <div className="hero-details">
            <p className="hero-description"><SiteText id="text_4" fallback="สร้างภาพลักษณ์ที่ดีให้แบรนด์ของคุณ ด้วยสินค้าคุณภาพ ดีไซน์ทันสมัย ผลิตตามแบบ พร้อมบริการครบวงจร" /></p>
            <div className="flex flex-wrap gap-3">
              <a href="#quote" className={btn}><SiteText id="text_46" fallback="ขอใบเสนอราคาฟรี " /><ArrowUpRight size={17} /></a>
              <a href="#products" className={outline}><SiteText id="text_47" fallback="ดูสินค้า " /><ArrowRight size={16} /></a>
            </div>
          </div>
        </div>
        {products.length > 0 && (
          <div className="hero-showcase">
            {products.map(product => (
              <figure key={product.id} className="hero-feature">
                <div className="hero-feature-image"><img src={product.image} alt={product.name} loading="eager" /></div>
                <figcaption>{product.name}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
function Audience() {
  return <section className={`audience-section ${section}`}><div className={wrap}><Title eyebrow={<SiteText id="text_57" fallback="ทุกธุรกิจ มีไอเดียที่เป็นไปได้" />} subtitle={<SiteText id="text_58" fallback="เราพร้อมดูแลทุกความต้องการของธุรกิจคุณ" />}><SiteText id="text_8" fallback="เหมาะสำหรับทุกองค์กร" /></Title><div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4">{AUDIENCES.map(([Icon, name]) => <div key={name} className="flex items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E9E1F2] bg-white text-[#7C3AED]"><Icon size={20} /></span><span className="text-xs font-medium">{name}</span></div>)}</div></div></section>;
}
function Products({onSelect, category=null}) {
 const {data:site}=useSite();
 const [search,setSearch]=useState('');
 const products=site.products.filter(p=>p.visible!==false);
 const categories = categoryNames(site.categories).sort((first, second) =>
   (storefrontCategoryOrder.get(categoryUrl(first)) ?? storefrontCategoryOrder.size)
   - (storefrontCategoryOrder.get(categoryUrl(second)) ?? storefrontCategoryOrder.size)
 );
 const family=CATALOG.find(c=>c.name===category);
 const visible=category?products.filter(p=>matchesCategory(p,category)&&`${p.name} ${p.features.join(' ')}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())):[];
 return <section id="products" className={`catalog-section ${section} scroll-mt-20 bg-white`}><div className={wrap}>
 {category ? <><nav aria-label="เส้นทางหน้าเว็บ" className="mb-7 flex flex-wrap gap-2 text-sm text-slate-500"><a href="/">หน้าแรก</a><span>/</span><a href="/#products">หมวดสินค้า</a><span>/</span><span aria-current="page">{category}</span></nav><Title eyebrow={family?.english || 'Products'} subtitle="เลือกแบบที่คุณสนใจ แล้วให้เราช่วยปรับแต่งสำหรับแบรนด์ของคุณ">{category}</Title><a href="/#products" className={`${outline} mb-8`}>← กลับไปเลือกหมวดสินค้า</a><p className="mb-6 text-sm text-slate-500">ตัวอย่างสินค้าในหมวดนี้ {visible.length} แบบ</p>
 <label className="catalog-search"><Search size={20}/><input aria-label="ค้นหาสินค้าในหมวดนี้" placeholder="ค้นหาสินค้าในหมวดนี้…" value={search} onChange={e=>setSearch(e.target.value)}/>{search&&<button type="button" aria-label="ล้างคำค้นหา" onClick={()=>setSearch('')}><X size={18}/></button>}</label><div role="status" className="sr-only">พบ {visible.length} แบบสินค้า</div>{search&&!visible.length&&<div className="search-empty"><Search size={28}/><h3>ไม่พบสินค้าที่ค้นหา</h3><p>ลองใช้คำอื่น หรือดูสินค้าทั้งหมดในหมวดนี้</p><button className={outline} onClick={()=>setSearch('')}>ดูสินค้าทั้งหมด</button></div>}<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map(p=><article key={p.id} className="product-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="aspect-square bg-slate-50"><img src={p.image} alt={p.name} loading="lazy" width="1000" height="1000" className="h-full w-full object-contain"/></div><div className="product-card-details p-5"><p className="text-xs text-violet-600">{category}</p><h3 className="mt-2 font-semibold">{p.name}</h3><ul className="mt-3 space-y-2 text-xs leading-6 text-slate-500">{p.features.map(f=><li key={f}>{f}</li>)}</ul><button onClick={()=>onSelect(p.name)} className={`${btn} mt-5 w-full`}>ขอราคาสินค้านี้ <ArrowUpRight size={16}/></button></div></article>)}</div>
 {!search&&!visible.length&&<div className="rounded-2xl border border-violet-100 bg-violet-50 p-8 text-center"><Package size={36} className="mx-auto text-violet-400"/><h3 className="mt-4 font-semibold">สอบถามสินค้าในหมวด{category}</h3><p className="mt-2 text-sm text-slate-500">กำลังเตรียมภาพตัวอย่าง แจ้งรูปแบบที่ต้องการเพื่อให้ทีมงานแนะนำได้</p><button onClick={()=>onSelect('อื่น ๆ / ต้องการคำแนะนำ')} className={`${btn} mt-5`}>สอบถาม / ขอใบเสนอราคา</button></div>}</> : <><Title eyebrow="PRODUCT CATEGORIES" subtitle="เลือกหมวดที่สนใจ เพื่อดูภาพตัวอย่างและสินค้าในหมวดนั้น">หมวดหมู่สินค้า</Title><div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">{categories.map(name=>{
 const items = products.filter(product => matchesCategory(product, name));
 return <a key={name} href={categoryUrl(name)} className="category-card group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"><div className="category-stage">
   {items.length ? (
     <img src={items[0].image} alt="" width="1000" height="750" loading="lazy" />
   ) : (
     <div className="category-placeholder flex h-full items-center justify-center">
       <Package size={32} strokeWidth={1.5} aria-hidden="true" />
     </div>
   )}
 </div><div className="category-card-details">
   <h3 className="mt-2 text-lg font-semibold">{name}</h3>
   <div className="category-card-footer">
     <span>{items.length ? `${items.length} แบบสินค้า` : 'สอบถามรายละเอียดสินค้า'}</span>
     <ArrowUpRight size={16} aria-hidden="true" />
   </div>
 </div></a>;
 })}</div></>}
 </div></section>;
}
function Steps() {
  return <section id="services" className={`steps-section ${section} scroll-mt-20`}><div className={wrap}><Title eyebrow={<SiteText id="text_61" fallback="จากไอเดีย สู่สินค้าจริง" />} subtitle={<SiteText id="text_62" fallback="พร้อมดูตัวอย่างก่อนผลิต มั่นใจได้ในทุกขั้นตอน" />}><SiteText id="text_12" fallback="6 ขั้นตอนการสั่งผลิต ง่าย สะดวก รวดเร็ว" /></Title><div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">{STEPS.map(([Icon, title, sub], i) => <div key={title} className="relative flex gap-4 rounded-2xl border border-[#E9E1F2] bg-white p-5 md:block"><span className="text-3xl font-semibold text-[#7C3AED]/25">0{i + 1}</span><div><Icon size={23} className="my-4 hidden text-[#7C3AED] md:block" /><h3 className="text-xs font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-[#756A83]">{sub}</p></div>{i < 5 && <><ArrowRight size={16} className="absolute -right-3 top-1/2 z-10 hidden bg-[#FAF8FD] text-[#7C3AED] lg:block" /><span className="absolute -bottom-5 left-8 h-5 border-l-2 border-[#E9E1F2] md:hidden" /></>}</div>)}</div></div></section>;
}
function Portfolio() {
  const {data: site} = useSite();
  const PRODUCTS=site.products.filter(p=>p.visible!==false);
  const PORTFOLIO=[3,9,17,24,34,36].map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  return <section id="portfolio" className={`${section} scroll-mt-20 bg-white`}><div className={wrap}><Title eyebrow={<SiteText id="text_63" fallback="ใส่ใจในทุกรายละเอียด" />} subtitle={<SiteText id="text_64" fallback="ตัวอย่างแนวทางสินค้า เพื่อเป็นแรงบันดาลใจให้โปรเจกต์ถัดไป" />}><SiteText id="text_13" fallback="ผลงานของเรา" /></Title><div className="portfolio-grid">{PORTFOLIO.map(product => <figure key={product.id} className="group portfolio-item"><div className="portfolio-image"><img src={product.image} alt={product.name} loading="lazy" /></div><figcaption><p className="text-xs text-[#7C3AED]">{product.category}</p><h3 className="mt-1 text-xs font-semibold md:text-sm">{product.name}</h3></figcaption></figure>)}</div><p className="mt-5 text-center text-xs text-[#756A83]"><SiteText id="text_14" fallback="ภาพสินค้าของ Moonvera Plus+ ไม่ใช่ผลงานอ้างอิงจากลูกค้าองค์กร" /></p></div></section>;
}
function Testimonials() {
  const {data: site} = useSite();
  const TESTIMONIALS=site.testimonials;
  return <section className={section}><div className={wrap}><Title eyebrow={<SiteText id="text_65" fallback="ความไว้วางใจที่เราตั้งใจดูแล" />} subtitle={<SiteText id="text_66" fallback="ข้อมูลรีวิวตัวอย่าง สำหรับแทนที่ด้วยเสียงจากลูกค้าจริง" />}><SiteText id="text_15" fallback="รีวิวจากลูกค้า" /></Title><div className="grid gap-5 md:grid-cols-3">{TESTIMONIALS.map(([text, name, role]) => <article key={name} className="flex flex-col rounded-2xl border border-[#E9E1F2] bg-white p-7 shadow-sm"><div aria-label="5 จาก 5 ดาว" className="flex gap-1 text-[#7C3AED]">{Array.from({
              length: 5
            }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div><blockquote className="mb-7 mt-5 flex-1 text-sm leading-7 text-[#756A83]">“{text}”</blockquote><div className="border-t border-[#E9E1F2] pt-5"><p className="text-xs font-semibold">{name}</p><p className="mt-1 text-xs text-[#756A83]">{role}</p></div></article>)}</div></div></section>;
}
function FAQ() {
  const {data: site} = useSite();
  const FAQS=site.faqs;
  const [opened, setOpened] = useState(null);
  return <section className={`faq-section ${section}`}><div className={`${wrap} max-w-3xl`}><Title eyebrow={<SiteText id="text_67" fallback="เราพร้อมตอบทุกข้อสงสัย" />}><SiteText id="text_16" fallback="คำถามที่พบบ่อย" /></Title><div className="space-y-3">{FAQS.map(([q, a], i) => <div key={q} className="rounded-2xl border border-[#E9E1F2]"><h3><button id={`faq-${i}`} aria-expanded={opened === i} aria-controls={`answer-${i}`} onClick={() => setOpened(opened === i ? null : i)} className="flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left text-sm font-medium"><span><span className="mr-4 text-xs text-[#7C3AED]">0{i + 1}</span>{q}</span><ChevronDown size={18} className={`shrink-0 text-[#7C3AED] transition ${opened === i ? 'rotate-180' : ''}`} /></button></h3><div id={`answer-${i}`} role="region" aria-labelledby={`faq-${i}`} hidden={opened !== i} className="px-5 pb-5 text-sm leading-7 text-[#756A83]">{a}</div></div>)}</div></div></section>;
}
const INITIAL = {
  name: '',
  phone: '',
  line: '',
  quantity: '',
  date: '',
  details: '',
  consent: false,
  website: ''
};
function QuoteForm({
  category,
  product,
  setProduct,
  openPolicy
}) {
  const {data: site} = useSite();
  const CONTACT=site.contact;
  const PRODUCTS=site.products.filter(p=>p.visible!==false);
  const CATEGORIES=category ? [category] : categoryNames(site.categories);
  const [form, setForm] = useState(INITIAL);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [receipt,setReceipt]=useState(null);
  const attempt=useRef(null);
  const sending=useRef(false);
  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const update = e => setForm({
    ...form,
    [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
  });
  async function handleSubmit(e) {
    e.preventDefault();
    if(sending.current)return;
    const issues = {};
    if (!form.name.trim()||form.name.trim().length>200) issues.name = 'กรุณากรอกชื่อและบริษัทไม่เกิน 200 ตัวอักษร';
    if (!/^\d{9,10}$/.test(form.phone)) issues.phone = 'กรุณากรอกเบอร์โทรเป็นตัวเลข 9–10 หลัก';
    if (!product) issues.product = 'กรุณาเลือกสินค้าที่สนใจ';
    if (!form.consent) issues.consent = 'กรุณายินยอมให้ติดต่อกลับ';
    if (form.quantity && (!Number.isInteger(+form.quantity) || +form.quantity < 1 || +form.quantity > 10000000)) issues.quantity = 'กรุณาระบุจำนวนเต็ม 1–10,000,000 ชิ้น';
    if (form.date && form.date < today()) issues.date = 'กรุณาเลือกวันที่ตั้งแต่วันนี้';
    if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) issues.file = 'รองรับเฉพาะ JPG, PNG และ PDF';
    if(form.details.length>5000)issues.details='รายละเอียดต้องไม่เกิน 5,000 ตัวอักษร';
    if(form.line.length>100)issues.line='LINE ID ต้องไม่เกิน 100 ตัวอักษร';
    if (file && (file.size<1||file.size > 10 * 1024 * 1024)) issues.file = 'ขนาดไฟล์ต้องไม่เกิน 10 MB';
    setErrors(issues);
    if (Object.keys(issues).length) {
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    sending.current=true;
    setStatus('sending');
    try {
      const fingerprint=JSON.stringify([form,product,file&&[file.name,file.type,file.size,file.lastModified]]);
      if(attempt.current?.fingerprint!==fingerprint)attempt.current={fingerprint,...createQuoteAttempt(form,product,file)};
      const result=await submitQuote(attempt.current,file);
      setReceipt(result);
      setStatus('success');
    } catch(e) {
      setErrors({submit:errorMessage(e)});
      setStatus('idle');
    } finally { sending.current=false; }
  }
  const field = 'mt-2 w-full min-w-0 rounded-xl border border-[#E9E1F2] bg-white px-3.5 py-3 text-sm text-[#32164F] outline-none placeholder:text-[#756A83]/60 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10';
  const error = k => errors[k] && <p id={`error-${k}`} className="mt-1 text-xs text-red-600">{errors[k]}</p>;
  const attrs = k => ({
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `error-${k}` : undefined
  });
  const input = (key, label, type = 'text', required = false, placeholder = '') => <div className="min-w-0"><label htmlFor={key} className="text-xs font-medium">{label}{required && <span className="text-[#7C3AED]"> *</span>}</label><input id={key} name={key} type={type} required={required} value={form[key]} onChange={update} placeholder={placeholder} min={type === 'number' ? '1' : type === 'date' ? today() : undefined} step={type === 'number' ? '1' : undefined} autoComplete={key === 'phone' ? 'tel' : key === 'name' ? 'organization' : undefined} inputMode={type === 'tel' ? 'numeric' : undefined} {...attrs(key)} className={field} />{error(key)}</div>;
  return <section id="quote" className={`quote-section ${section} scroll-mt-20 bg-[#32164F]`}><div className={`${wrap} grid items-center gap-10 lg:grid-cols-2 lg:gap-20`}><div className="text-white"><span className="text-xs tracking-wider text-white/65"><SiteText id="text_17" fallback="เริ่มต้นโปรเจกต์ใหม่ไปด้วยกัน" /></span><h2 className="mt-5 text-3xl font-bold leading-relaxed md:text-4xl"><SiteText id="text_49" fallback="สั่งผลิตกับ" /><br />Moonvera Plus+<br /><SiteText id="text_50" fallback="เพื่อสร้างเอกลักษณ์" /><br /><SiteText id="text_18" fallback="ให้แบรนด์ของคุณ" /></h2><p className="mt-5 max-w-sm text-sm leading-7 text-white/65"><SiteText id="text_19" fallback="เล่าไอเดียของคุณให้เราฟัง ทีมงานพร้อมช่วยเลือกสินค้าและแนะนำรายละเอียดที่เหมาะกับธุรกิจคุณ" /></p><ul className="mt-8 grid grid-cols-2 gap-5">{['สินค้าคุณภาพสูง', 'บริการครบวงจร', 'ดูแลโดยทีมงานมืออาชีพ', 'ราคาคุ้มค่า'].map(t => <li key={t} className="flex items-center gap-2 text-xs"><CheckCircle size={17} className="shrink-0" />{t}</li>)}</ul><div className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs"><Gift size={16} /><SiteText id="text_20" fallback="ขอใบเสนอราคาฟรี ไม่มีค่าใช้จ่าย!" /></div><div className="mt-8"><a href={CONTACT.line} target="_blank" rel="noreferrer" className={outline}><MessageCircle size={18} /><SiteText id="text_51" fallback="หรือทักไลน์เลย " /><ArrowUpRight size={16} /></a><p className="mt-3 text-xs text-white/60"><SiteText id="text_21" fallback="ช่องทางติดต่อเป็นตัวอย่าง กรุณาอัปเดตก่อนใช้จริง" /></p></div></div><div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">{status === 'success' ? <div role="status" className="py-20 text-center"><CheckCircle size={60} className="mx-auto text-[#7C3AED]" /><h3 className="mt-6 text-2xl font-bold"><SiteText id="text_22" fallback="ขอบคุณที่ไว้วางใจเรา" /></h3><p className="mt-4 text-sm leading-7 text-[#756A83]">ส่งคำขอถึงทีมงานแล้ว<br />รหัสคำขอ: <span className="break-all">{receipt?.id}</span></p>{receipt?.attachmentError&&<p role="alert" className="mt-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">คำขอถูกบันทึกแล้ว แต่ไฟล์แนบยังส่งไม่สำเร็จ กรุณาติดต่อทางโทรศัพท์หรือ LINE พร้อมแจ้งรหัสคำขอเพื่อส่งไฟล์เพิ่มเติม</p>}<button onClick={() => {
            attempt.current=null;setReceipt(null);
            setStatus('idle');
            setForm(INITIAL);
            setFile(null);
            setProduct('');
          }} className={`${outline} mt-7`}><SiteText id="text_24" fallback="ส่งคำขอใหม่" /></button></div> : <><h3 className="text-xl font-bold"><SiteText id="text_25" fallback="ขอใบเสนอราคาฟรี" /></h3><p className="mt-2 text-xs text-[#756A83]"><SiteText id="text_26" fallback="กรอกรายละเอียด แล้วให้เราช่วยดูแลส่วนที่เหลือ" /></p><form onSubmit={handleSubmit} noValidate className="mt-7"><fieldset disabled={status==='sending'} className="space-y-4"><div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update}/></label></div>{input('name', 'ชื่อ-บริษัท', 'text', true, 'ชื่อผู้ติดต่อ / ชื่อบริษัท')}<div className="grid gap-4 sm:grid-cols-2">{input('phone', 'เบอร์โทรศัพท์', 'tel', true, 'กรอกเบอร์โทรศัพท์')}{input('line', 'LINE ID', 'text', false, 'LINE ID ของคุณ')}</div><div><label htmlFor="product" className="text-xs font-medium"><SiteText id="text_53" fallback="เลือกสินค้าที่สนใจ " /><span className="text-[#7C3AED]">*</span></label><select id="product" name="product" required value={product} onChange={e => setProduct(e.target.value)} {...attrs('product')} className={field}><option value=""><SiteText id="text_27" fallback="เลือกสินค้าที่ต้องการ" /></option>{CATEGORIES.map(c => <optgroup key={c} label={c}>{quoteOptions(c, PRODUCTS).map(name => <option key={name}>{name}</option>)}</optgroup>)}<option value="อื่น ๆ / ต้องการคำแนะนำ"><SiteText id="text_28" fallback="อื่น ๆ / ต้องการคำแนะนำ" /></option></select>{error('product')}</div><div className="grid gap-4 sm:grid-cols-2">{input('quantity', 'จำนวนที่ต้องการ', 'number', false, 'จำนวน (ชิ้น)')}{input('date', 'วันที่ต้องการใช้สินค้า', 'date')}</div><div><label htmlFor="logo" className="text-xs font-medium"><SiteText id="text_29" fallback="แนบไฟล์โลโก้ / แบบ" /></label><div className="relative mt-2 rounded-xl border border-dashed border-[#E9E1F2] p-4 text-center focus-within:ring-4 focus-within:ring-[#7C3AED]/20"><Upload size={19} className="mx-auto text-[#7C3AED]" /><p className="mt-2 break-all text-xs text-[#756A83]">{file ? file.name : 'คลิกเพื่อแนบไฟล์ JPG, PNG หรือ PDF'}</p><p className="mt-1 text-xs text-[#756A83]"><SiteText id="text_30" fallback="ขนาดไม่เกิน 10 MB" /></p><input id="logo" name="logo" type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e => setFile(e.target.files?.[0] || null)} {...attrs('file')} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" /></div>{error('file')}</div><div><label htmlFor="details" className="text-xs font-medium"><SiteText id="text_31" fallback="รายละเอียดเพิ่มเติม" /></label><textarea id="details" name="details" rows={3} value={form.details} maxLength={5000} onChange={update} {...attrs('details')} placeholder="สี รูปแบบ งบประมาณ หรือรายละเอียดที่ต้องการ" className={`${field} resize-y`} />{error('details')}</div><div><div className="flex items-start gap-2.5"><input id="consent" name="consent" type="checkbox" required checked={form.consent} onChange={update} {...attrs('consent')} className="mt-1 h-4 w-4 shrink-0 accent-[#7C3AED]" /><div className="text-xs leading-5 text-[#756A83]"><label htmlFor="consent"><SiteText id="text_32" fallback="ข้าพเจ้ายินยอมให้เก็บและใช้ข้อมูลเพื่อติดต่อกลับตาม" /></label><button type="button" onClick={() => openPolicy('privacy')} className="ml-1 text-[#7C3AED] underline"><SiteText id="text_33" fallback="นโยบายความเป็นส่วนตัว" /></button> *</div></div>{error('consent')}</div><p className="text-xs text-[#756A83]">ข้อมูลจะส่งถึงทีมงานเพื่อจัดทำใบเสนอราคาและติดต่อกลับ</p>{error('submit')}<button disabled={status === 'sending'} type="submit" className={`${btn} w-full`}>{status === 'sending' ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />} {status === 'sending' ? 'กำลังส่งข้อมูล...' : 'ส่งข้อมูลขอใบเสนอราคา'}</button><p className="text-center text-xs text-[#756A83]"><SiteText id="text_35" fallback="ตอบกลับภายใน 24 ชั่วโมง • ข้อมูลของคุณปลอดภัย" /></p></fieldset></form></>}</div></div></section>;
}
function Footer({
  openPolicy
}) {
  const {data: site} = useSite();
  const CONTACT=site.contact;
  return <footer className="site-footer bg-white pb-28 pt-14 md:pb-7"><div className={wrap}><div className="grid gap-8 border-b border-[#E9E1F2] pb-10 md:grid-cols-[1.5fr_1fr_auto]"><div><a href="/#home" className="text-2xl font-bold">Moonvera <span className="font-medium">Plus<span className="text-[#7C3AED]">+</span></span></a><p className="mt-3 text-xs leading-6 text-[#756A83]"><SiteText id="text_54" fallback="สินค้าพรีเมียมที่สะท้อนตัวตนของแบรนด์" /><br /><SiteText id="text_36" fallback="พร้อมดูแลทุกไอเดีย ทุกขั้นตอน" /></p></div><div className="space-y-3 text-xs"><p className="mb-4 font-semibold"><SiteText id="text_37" fallback="ติดต่อเรา" /></p><p className="flex items-center gap-2 text-[#756A83]"><Phone size={15} />{CONTACT.phone}</p><a href={CONTACT.line} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#7C3AED]"><MessageCircle size={15} />LINE <ArrowUpRight size={12} /></a><a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#7C3AED]"><Facebook size={15} />Facebook <ArrowUpRight size={12} /></a></div><div><div className="flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-[#E9E1F2] bg-[#FAF8FD] text-center text-xs text-[#756A83]"><SiteText id="text_55" fallback="พื้นที่ QR Code" /><br />LINE Official</div><p className="mt-2 text-xs text-[#756A83]"><SiteText id="text_38" fallback="เพิ่มเพื่อนเพื่อคุยกับเรา" /></p></div></div><div className="flex flex-col justify-between gap-4 pt-6 text-xs text-[#756A83] sm:flex-row"><p>© {new Date().getFullYear()} Moonvera Plus. All rights reserved.</p><div className="flex gap-5"><button onClick={() => openPolicy('privacy')} className="text-[#7C3AED]"><SiteText id="text_39" fallback="นโยบายความเป็นส่วนตัว" /></button><button onClick={() => openPolicy('terms')} className="text-[#7C3AED]"><SiteText id="text_40" fallback="เงื่อนไขการให้บริการ" /></button></div></div></div></footer>;
}
function FloatingContact() {
  const {data: site} = useSite();
  const CONTACT=site.contact;
  const [notice, setNotice] = useState(false);
  return <><div className="fixed bottom-24 right-4 z-30 flex flex-col gap-3 md:bottom-7 md:right-6"><a href={CONTACT.line} target="_blank" rel="noreferrer" aria-label="ติดต่อ LINE (ลิงก์ตัวอย่าง)" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#06C755] text-white shadow-md transition hover:-translate-y-1"><MessageCircle size={23} /></a><button aria-label="ดูเบอร์โทรศัพท์" aria-expanded={notice} onClick={() => setNotice(!notice)} className={`${btn} h-12 w-12 p-0 shadow-md`}><Phone size={20} /></button>{notice && <div role="status" className="absolute bottom-0 right-16 w-52 rounded-2xl border border-[#E9E1F2] bg-white p-4 text-xs shadow-md">{CONTACT.phone}<p className="mt-2 text-[#756A83]"><SiteText id="text_41" fallback="รออัปเดตเบอร์โทรจริง" /></p></div>}</div><div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E9E1F2] bg-white/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur md:hidden"><a href="#quote" className={`${btn} w-full`}><SiteText id="text_56" fallback="ขอใบเสนอราคา " /><Send size={16} /></a></div></>;
}
function PolicyDialog({
  type,
  onClose
}) {
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.getElementById('policy-close')?.focus();
    const handler = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const buttons = [...document.querySelectorAll('#policy-dialog button')];
        if (e.shiftKey && document.activeElement === buttons[0]) {
          e.preventDefault();
          buttons.at(-1).focus();
        } else if (!e.shiftKey && document.activeElement === buttons.at(-1)) {
          e.preventDefault();
          buttons[0].focus();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', handler);
      previous?.focus();
    };
  }, [onClose]);
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#32164F]/60 p-5" onClick={onClose}><div id="policy-dialog" role="dialog" aria-modal="true" aria-labelledby="policy-title" onClick={e => e.stopPropagation()} className="relative w-full max-w-lg rounded-2xl bg-white p-8"><button id="policy-close" aria-label="ปิดหน้าต่าง" onClick={onClose} className="absolute right-3 top-3 rounded-full p-2 text-[#7C3AED]"><X size={20} /></button><h2 id="policy-title" className="pr-6 text-xl font-bold">{type === 'privacy' ? 'นโยบายความเป็นส่วนตัว' : 'เงื่อนไขการให้บริการ'}</h2><p className="mt-5 text-sm leading-7 text-[#756A83]">{type === 'privacy' ? <SiteText id="quote_privacy" fallback="Moonvera Plus+ เก็บชื่อ ข้อมูลติดต่อ รายละเอียดสินค้า และไฟล์ที่คุณส่ง เพื่อจัดทำใบเสนอราคาและติดต่อกลับ ข้อมูลเข้าถึงได้เฉพาะผู้ดูแลที่ได้รับสิทธิ์ หากต้องการสอบถาม แก้ไข หรือขอลบข้อมูล กรุณาติดต่อผ่านช่องทางของบริษัทที่แสดงบนเว็บไซต์" /> : 'เนื้อหา สถิติ รีวิว จำนวนขั้นต่ำ และระยะเวลาบนหน้านี้เป็นตัวอย่าง เงื่อนไขการสั่งผลิตจริงต้องยืนยันตามใบเสนอราคาของบริษัทก่อนชำระเงิน'}</p><button onClick={onClose} className={`${btn} mt-6`}><SiteText id="text_42" fallback="รับทราบ" /></button></div></div>;
}
export default function App({pathname=typeof window==='undefined'?'/':window.location.pathname}) {
  const category=pathname.startsWith('/products/')?categoryFromPath(pathname):null;
  const [product, setProduct] = useState('');
  const [policy, setPolicy] = useState(null);
  useEffect(() => {
    document.title = category ? `${category} | Moonvera Plus+` : 'Moonvera Plus+ | รับผลิตสินค้าพรีเมียมและของแจกองค์กร';
    document.documentElement.style.scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }, []);
  const select = name => {
    setProduct(name);
    document.getElementById('quote')?.scrollIntoView();
  };
  return <div className="storefront min-h-screen bg-[#FAF8FD] font-['Noto_Sans_Thai'] text-[#32164F] [&_a]:focus-visible:outline-none [&_a]:focus-visible:ring-4 [&_a]:focus-visible:ring-[#7C3AED]/25 [&_button]:cursor-pointer [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-4 [&_button]:focus-visible:ring-[#7C3AED]/25 [&_input]:focus-visible:ring-4 [&_input]:focus-visible:ring-[#7C3AED]/25 motion-reduce:[&_*]:transition-none"><a className="skip-link" href="#main-content">ข้ามไปยังเนื้อหา</a><Navbar /><main id="main-content">{category ? <Products category={category} onSelect={select}/> : <><Hero /><Products onSelect={select} /><Steps /><Portfolio /><Audience /><FAQ /></>}<QuoteForm category={category} product={product} setProduct={setProduct} openPolicy={setPolicy} />{!category && <Testimonials />}</main><Footer openPolicy={setPolicy} /><FloatingContact />{policy && <PolicyDialog type={policy} onClose={() => setPolicy(null)} />}</div>;
}
