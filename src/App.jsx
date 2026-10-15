import React, { useState, useEffect } from 'react';
import { Send, ArrowUpRight, ArrowRight, Check, CheckCircle, ShieldCheck, Palette, Truck, Menu, X, Building2, Factory, Hotel, Coffee, CalendarDays, GraduationCap, Tags, Gift, ChevronDown, Star, Phone, MessageCircle, Facebook, Upload, Package, ClipboardList, FileCheck, LoaderCircle } from 'lucide-react';
// Editable sample data. Replace contacts, statistics and testimonials before launch.
const CONTACT = {
  phone: '099-XXX-XXXX',
  line: 'https://line.me/',
  facebook: 'https://facebook.com/'
};
const STATS = [['500+', 'องค์กรที่ไว้วางใจ'], ['1,000,000+', 'ชิ้นที่ผลิตแล้ว'], ['10+', 'ปีประสบการณ์'], ['98%', 'ลูกค้าพึงพอใจ']];
// Real brand images; names describe visible appearance. Materials and MOQ require confirmation.
const PRODUCTS = [
  {
    "id": 1,
    "name": "กระเป๋าถือหูสีม่วง",
    "category": "กระเป๋าถือ",
    "image": "/images/product-1.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_1.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 2,
    "name": "กระเป๋าใสเหลือบสีหูสีน้ำเงิน",
    "category": "กระเป๋าใส",
    "image": "/images/product-2.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_2.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 3,
    "name": "กระเป๋าถือสีธรรมชาติ",
    "category": "กระเป๋าถือ",
    "image": "/images/product-3.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_3.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 4,
    "name": "กระเป๋าทรงนุ่มสีม่วง",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-4.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_4.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 5,
    "name": "กระเป๋าบุนวมสีครีม",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-5.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_5.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 6,
    "name": "กระเป๋าบุนวมสีเหลือง",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-6.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_6.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 7,
    "name": "กระเป๋าบุนวมสีเขียว",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-7.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_7.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 8,
    "name": "กระเป๋าบุนวมสีน้ำเงิน",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-8.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_8.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 9,
    "name": "กระเป๋าหูรูดสีชมพู",
    "category": "กระเป๋าทรงนุ่ม",
    "image": "/images/product-9.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_9.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 10,
    "name": "กระเป๋าสะพายสีดำ แบบที่ 1",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-10.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_10.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 11,
    "name": "กระเป๋าสะพายสีขาว แบบที่ 1",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-11.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_11.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 12,
    "name": "กระเป๋าสะพายสีขาว แบบที่ 2",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-12.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_12.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 13,
    "name": "กระเป๋าสะพายสีดำ แบบที่ 2",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-13.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_13.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 14,
    "name": "กระเป๋าสะพายข้างสีเขียว",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-14.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_14.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 15,
    "name": "กระเป๋าสะพายข้างสีครีม",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-15.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_15.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 16,
    "name": "กระเป๋าสะพายข้างสีน้ำเงิน",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-16.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_16.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 17,
    "name": "กระเป๋าใสเหลือบสีทรงสูง",
    "category": "กระเป๋าใส",
    "image": "/images/product-17.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_17.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 18,
    "name": "กระเป๋าใสเหลือบสีทรงกว้าง",
    "category": "กระเป๋าใส",
    "image": "/images/product-18.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_18.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 19,
    "name": "กระเป๋าถือสีดำ",
    "category": "กระเป๋าถือ",
    "image": "/images/product-19.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_19.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 20,
    "name": "กระเป๋าถือสีขาว",
    "category": "กระเป๋าถือ",
    "image": "/images/product-20.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_20.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 21,
    "name": "กระเป๋าถือสีน้ำเงิน",
    "category": "กระเป๋าถือ",
    "image": "/images/product-21.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_21.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 22,
    "name": "กระเป๋าซิปสีเหลือง",
    "category": "กระเป๋าซิป",
    "image": "/images/product-22.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_22.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 23,
    "name": "กระเป๋าทูโทนขาวน้ำเงิน",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-23.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_23.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 24,
    "name": "กระเป๋าสายคาดสีฟ้าหม่น",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-24.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_24.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 25,
    "name": "กระเป๋าสายคาดสีเขียวอมฟ้า",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-25.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_25.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 26,
    "name": "กระเป๋าสายคาดสีเหลือง",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-26.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_26.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 27,
    "name": "กระเป๋าสายคาดสีน้ำตาลอ่อน",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-27.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_27.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 28,
    "name": "กระเป๋าสายคาดสีชมพู",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-28.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_28.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 29,
    "name": "กระเป๋าสายคาดสีม่วงอ่อน",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-29.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_29.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 30,
    "name": "กระเป๋าทรงเหลี่ยมสีม่วง",
    "category": "กระเป๋าถือ",
    "image": "/images/product-30.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_30.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 31,
    "name": "กระเป๋าทูโทนหูสีน้ำตาล",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-31.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_31.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 32,
    "name": "กระเป๋าสะพายสายสีน้ำเงิน",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-32.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_32.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 33,
    "name": "กระเป๋าหูสีฟ้า",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-33.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_33.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 34,
    "name": "กระเป๋าหูสีแดง",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-34.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_34.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 35,
    "name": "กระเป๋าหูสีน้ำเงิน",
    "category": "กระเป๋าทูโทน",
    "image": "/images/product-35.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_35.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 36,
    "name": "กระเป๋าสะพายสีชมพู",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-36.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_36.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  },
  {
    "id": 37,
    "name": "กระเป๋าสะพายสีครีม",
    "category": "กระเป๋าสะพาย",
    "image": "/images/product-37.jpg",
    "source": "LINE_ALBUM_รูปกระเป๋า_261016_37.jpg",
    "features": [
      "ชมรูปแบบจากภาพสินค้าจริง",
      "แจ้งรายละเอียดโลโก้ที่ต้องการ",
      "สอบถามตัวเลือกกับทีมงาน"
    ]
  }
];
const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];
const HERO_PRODUCTS = [1, 25, 18, 4].map(id => PRODUCTS.find(p => p.id === id));
const AUDIENCES = [[Building2, 'บริษัท / องค์กรธุรกิจ'], [Factory, 'โรงงานอุตสาหกรรม'], [Hotel, 'โรงแรม / รีสอร์ท'], [Coffee, 'ร้านอาหาร / คาเฟ่'], [CalendarDays, 'Event Organizer'], [GraduationCap, 'โรงเรียน / มหาวิทยาลัย'], [Tags, 'แบรนด์สินค้า'], [Gift, 'บริษัทรับทำของพรีเมียม']];
const STEPS = [[Send, 'ส่งแบบ / โลโก้', 'บอกไอเดียที่คุณต้องการ'], [ClipboardList, 'แจ้งสินค้าและจำนวน', 'เลือกให้เหมาะกับงบประมาณ'], [FileCheck, 'รับใบเสนอราคา', 'รายละเอียดชัดเจน ครบถ้วน'], [Palette, 'ทำ Mockup ให้ Confirm', 'เห็นภาพก่อนเริ่มผลิตจริง'], [Package, 'ผลิตสินค้า', 'ใส่ใจคุณภาพทุกขั้นตอน'], [Truck, 'ตรวจสอบและจัดส่ง', 'พร้อมส่งถึงมือคุณ']];
const PORTFOLIO = [3, 9, 17, 24, 34, 36].map(id => PRODUCTS.find(p => p.id === id));
const TESTIMONIALS = [['ทีมงานให้คำแนะนำดีมาก ตั้งแต่เลือกสินค้าไปจนถึงออกแบบโลโก้ ได้สินค้าตรงตามที่ต้องการ และทันวันจัดงานค่ะ', 'คุณณัฐชา', 'ฝ่ายจัดซื้อ · บริษัทตัวอย่าง A'], ['งานปักสวย รายละเอียดเรียบร้อย ทีมงานอัปเดตงานตลอด ทำให้วางแผนกิจกรรมของบริษัทได้ง่ายขึ้นมากครับ', 'คุณธนกร', 'ฝ่ายการตลาด · บริษัทตัวอย่าง B'], ['ประทับใจที่มีแบบให้ดูก่อนผลิตจริง สินค้าดูดี เหมาะกับนำไปมอบให้ลูกค้าของเราค่ะ', 'คุณพิมพ์ชนก', 'ฝ่ายบุคคล · บริษัทตัวอย่าง C']];
const FAQS = [['สั่งขั้นต่ำกี่ชิ้น', 'จำนวนขั้นต่ำขึ้นอยู่กับแบบสินค้าและรายละเอียดงาน กรุณาแจ้งสินค้าและจำนวนที่ต้องการให้ทีมงานตรวจสอบก่อนเสนอราคา'], ['ใช้เวลาผลิตกี่วัน', 'โดยทั่วไปประมาณ 15–30 วันหลังยืนยันแบบ ระยะเวลาจริงขึ้นอยู่กับจำนวนและรายละเอียด โดยจะระบุในใบเสนอราคา'], ['มีตัวอย่างให้ดูก่อนผลิตไหม', 'มีภาพ Mockup ให้ยืนยันก่อนผลิต ส่วนตัวอย่างจริงและค่าใช้จ่ายจะแจ้งตามรายละเอียดงาน'], ['จัดส่งต่างจังหวัดได้ไหม', 'จัดส่งทั่วประเทศไทย โดยแจ้งค่าขนส่งและระยะเวลาให้ทราบก่อนยืนยันงาน'], ['ชำระเงินอย่างไร', 'โอนเงินตามรายละเอียดในใบเสนอราคา ทีมงานจะแจ้งยอดมัดจำและยอดคงเหลือก่อนเริ่มผลิต'], ['ไฟล์โลโก้แบบไหนที่ใช้ได้', 'แนะนำ AI หรือ PDF แบบเวกเตอร์ สามารถแนบ JPG หรือ PNG ความละเอียดสูงให้ตรวจสอบเบื้องต้นได้']];
const NAV = [['home', 'หน้าแรก'], ['products', 'สินค้า'], ['services', 'บริการรับผลิต'], ['portfolio', 'ผลงาน'], ['quote', 'ติดต่อเรา']];
const wrap = 'mx-auto max-w-6xl px-5 md:px-8';
const section = 'py-16 md:py-24';
const btn = 'inline-flex items-center justify-center gap-2 rounded-full bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4338CA] disabled:opacity-60';
const outline = 'inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#4F46E5] transition hover:border-[#4F46E5]';
function Title({
  eyebrow,
  children,
  subtitle
}) {
  return <div className="mx-auto mb-10 max-w-2xl text-center"><p className="mb-3 text-xs font-semibold tracking-wider text-[#4F46E5]">{eyebrow}</p><h2 className="text-2xl font-bold leading-relaxed md:text-3xl">{children}</h2>{subtitle && <p className="mt-3 text-sm leading-7 text-[#6B7280]">{subtitle}</p>}</div>;
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
  return <header className="sticky top-0 z-40 border-b border-[#E5E7EB]/70 bg-white/90 backdrop-blur-xl"><div className={`${wrap} flex h-20 items-center justify-between gap-3`}><a href="#home" className="text-xl font-bold tracking-tight md:text-2xl">Moonvera <span className="font-medium">Plus<span className="text-[#4F46E5]">+</span></span></a><nav aria-label="เมนูหลัก" className="hidden gap-7 lg:flex">{NAV.map(([id, name]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} className={`border-b-2 py-7 text-xs ${active === id ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent text-[#6B7280]'}`}>{name}</a>)}</nav><div className="flex gap-2"><a href="#quote" className={`${btn} hidden sm:inline-flex`}>ขอใบเสนอราคา <Send size={15} /></a><button aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="rounded-xl p-2 text-[#4F46E5] lg:hidden">{open ? <X /> : <Menu />}</button></div></div>{open && <nav id="mobile-menu" aria-label="เมนูมือถือ" className="border-t border-[#E5E7EB] px-5 pb-4 lg:hidden">{NAV.map(([id, name]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block py-3 text-sm text-[#4F46E5]">{name}</a>)}</nav>}</header>;
}
function Hero() {
  return <section id="home" className="scroll-mt-24 bg-[#F8F9FB] pb-16 pt-12 md:pb-20 md:pt-20"><div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-10`}><div><span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-[11px] text-[#4F46E5]"><span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />รับผลิตสินค้าพรีเมียมสำหรับองค์กร</span><h1 className="mt-6 text-[34px] font-bold leading-[1.5] tracking-tight sm:text-[43px] lg:text-[45px]">ตอบโจทย์ทุกธุรกิจ<br />ทุกกิจกรรม<br /><span className="text-[#4F46E5]">โซลูชันสินค้าพรีเมียม</span><br />สำหรับองค์กร</h1><p className="mt-5 max-w-md text-sm leading-7 text-[#6B7280]">สร้างภาพลักษณ์ที่ดีให้แบรนด์ของคุณ ด้วยสินค้าคุณภาพ ดีไซน์ทันสมัย ผลิตตามแบบ พร้อมบริการครบวงจร</p><div className="mt-7 flex flex-wrap gap-3"><a href="#quote" className={btn}>ขอใบเสนอราคาฟรี <ArrowUpRight size={17} /></a><a href="#products" className={outline}>ดูสินค้า <ArrowRight size={16} /></a></div><div className="mt-9 flex flex-col gap-4 border-t border-[#E5E7EB] pt-6 sm:flex-row">{[[ShieldCheck, 'คุณภาพได้มาตรฐานสากล'], [Palette, 'ผลิตตามแบบ ไม่จำกัดไอเดีย'], [Truck, 'ส่งตรงเวลา ดูแลทุกขั้นตอน']].map(([Icon, text]) => <div key={text} className="flex items-center gap-2"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#4F46E5]"><Icon size={17} /></span><span className="max-w-24 text-[10px] leading-5">{text}</span></div>)}</div></div><div className="relative grid grid-cols-2 gap-3 pb-6 md:gap-4">{[HERO_PRODUCTS.slice(0, 2), HERO_PRODUCTS.slice(2)].map((row, i) => <div key={i} className={`space-y-4 ${i === 0 ? 'pt-10' : ''}`}>{row.map((product, j) => <div key={product.id} className={`group relative overflow-hidden rounded-2xl bg-white ${i === j ? 'h-60' : 'h-44'}`}><img src={product.image} alt={product.name} loading="eager" className="h-full w-full object-contain transition duration-500" /><span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10px]">{product.name}</span></div>)}</div>)}<div className="absolute bottom-0 left-1/2 flex w-max -translate-x-1/2 items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 shadow-md"><Gift className="text-[#4F46E5]" size={26} /><div><p className="text-xs font-semibold">สร้างสรรค์ในแบบแบรนด์คุณ</p><p className="mt-1 text-[10px] text-[#6B7280]">ไอเดียของคุณ เราพร้อมทำให้เป็นจริง</p></div></div></div></div></section>;
}
function SocialProof() {
  return <section className="border-y border-[#E5E7EB] bg-white py-10"><div className={wrap}><div className="grid grid-cols-2 gap-7 md:grid-cols-4">{STATS.map(([n, t]) => <div key={t} className="text-center"><p className="text-3xl font-bold md:text-4xl">{n}</p><p className="mt-2 text-xs text-[#6B7280]">{t}</p></div>)}</div><div className="mt-9 border-t border-[#E5E7EB] pt-6"><p className="text-center text-[10px] text-[#6B7280]">สถิติและโลโก้เป็นข้อมูลตัวอย่างสำหรับการออกแบบ</p><div className="mt-5 grid grid-cols-3 gap-5 md:grid-cols-6">{Array.from({
            length: 6
          }, (_, i) => <div key={i} className="flex h-12 items-center justify-center gap-1 text-lg font-bold tracking-widest text-[#6B7280]/40"><Building2 size={20} />LOGO</div>)}</div></div></div></section>;
}
function Audience() {
  return <section className={section}><div className={wrap}><Title eyebrow="ทุกธุรกิจ มีไอเดียที่เป็นไปได้" subtitle="เราพร้อมดูแลทุกความต้องการของธุรกิจคุณ">เหมาะสำหรับทุกองค์กร</Title><div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4">{AUDIENCES.map(([Icon, name]) => <div key={name} className="flex items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#4F46E5]"><Icon size={20} /></span><span className="text-xs font-medium">{name}</span></div>)}</div></div></section>;
}
function Products({
  onSelect
}) {
  const [category, setCategory] = useState('ทั้งหมด');
  return <section id="products" className={`${section} scroll-mt-20 bg-white`}><div className={wrap}><Title eyebrow="สินค้าในแบบของคุณ" subtitle="เลือกสินค้าที่ใช่ แล้วให้เราช่วยเติมเอกลักษณ์ของแบรนด์ลงไป">สินค้ารับผลิตสำหรับแบรนด์และองค์กร</Title><div role="tablist" aria-label="หมวดสินค้า" className="mb-9 flex gap-2 overflow-x-auto pb-2">{['ทั้งหมด', ...CATEGORIES].map(c => <button key={c} role="tab" id={`tab-${c}`} aria-selected={c === category} aria-controls="products-panel" onClick={() => setCategory(c)} className={`shrink-0 rounded-full border px-7 py-2.5 text-sm ${c === category ? 'border-[#4F46E5] bg-[#4F46E5] text-white' : 'border-[#E5E7EB] text-[#4F46E5]'}`}>{c}</button>)}</div><div id="products-panel" role="tabpanel" aria-labelledby={`tab-${category}`} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{PRODUCTS.filter(p => category === 'ทั้งหมด' || p.category === category).map(p => <article key={p.name} className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"><div className="relative aspect-square"><img src={p.image} alt={`ตัวอย่าง${p.name}`} loading="lazy" className="h-full w-full object-contain" /><span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[9px]">{p.category}</span></div><div className="p-5"><h3 className="font-semibold">{p.name}</h3><ul className="mt-4 space-y-2">{p.features.map(f => <li key={f} className="flex gap-2 text-[11px] text-[#6B7280]"><Check size={14} className="shrink-0 text-[#4F46E5]" />{f}</li>)}</ul><p className="mt-4 border-t border-[#E5E7EB] pt-3 text-[10px] text-[#6B7280]">สอบถามจำนวนขั้นต่ำ</p><button onClick={() => onSelect(p.name)} className={`${btn} mt-4 w-full py-2.5`}>ขอราคา <ArrowUpRight size={15} /></button></div></article>)}</div><p className="mt-6 text-center text-[10px] text-[#6B7280]">ภาพกระเป๋าจริงจากแบรนด์ครบ 37 แบบ • รายละเอียดการผลิตและจำนวนขั้นต่ำสอบถามทีมงาน</p></div></section>;
}
function Steps() {
  return <section id="services" className={`${section} scroll-mt-20`}><div className={wrap}><Title eyebrow="จากไอเดีย สู่สินค้าจริง" subtitle="พร้อมดูตัวอย่างก่อนผลิต มั่นใจได้ในทุกขั้นตอน">6 ขั้นตอนการสั่งผลิต ง่าย สะดวก รวดเร็ว</Title><div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">{STEPS.map(([Icon, title, sub], i) => <div key={title} className="relative flex gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 md:block"><span className="text-3xl font-semibold text-[#4F46E5]/25">0{i + 1}</span><div><Icon size={23} className="my-4 hidden text-[#4F46E5] md:block" /><h3 className="text-xs font-semibold">{title}</h3><p className="mt-2 text-[10px] leading-5 text-[#6B7280]">{sub}</p></div>{i < 5 && <><ArrowRight size={16} className="absolute -right-3 top-1/2 z-10 hidden bg-[#F8F9FB] text-[#4F46E5] lg:block" /><span className="absolute -bottom-5 left-8 h-5 border-l-2 border-[#E5E7EB] md:hidden" /></>}</div>)}</div></div></section>;
}
function Portfolio() {
  return <section id="portfolio" className={`${section} scroll-mt-20 bg-white`}><div className={wrap}><Title eyebrow="ใส่ใจในทุกรายละเอียด" subtitle="ตัวอย่างแนวทางสินค้า เพื่อเป็นแรงบันดาลใจให้โปรเจกต์ถัดไป">ผลงานของเรา</Title><div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">{PORTFOLIO.map(product => <figure key={product.id} className="group relative aspect-[4/3] overflow-hidden rounded-2xl"><img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-contain transition duration-500" /><div className="absolute inset-0 transition group-hover:bg-[#2D2A70]/10" /><figcaption className="absolute inset-x-2 bottom-2 rounded-xl bg-white/95 p-3 md:inset-x-4 md:bottom-4"><p className="text-[9px] text-[#4F46E5]">{product.category}</p><h3 className="mt-1 text-[11px] font-semibold md:text-sm">{product.name}</h3></figcaption></figure>)}</div><p className="mt-5 text-center text-[10px] text-[#6B7280]">ภาพสินค้าของ Moonvera Plus+ ไม่ใช่ผลงานอ้างอิงจากลูกค้าองค์กร</p></div></section>;
}
function Testimonials() {
  return <section className={section}><div className={wrap}><Title eyebrow="ความไว้วางใจที่เราตั้งใจดูแล" subtitle="ข้อมูลรีวิวตัวอย่าง สำหรับแทนที่ด้วยเสียงจากลูกค้าจริง">รีวิวจากลูกค้า</Title><div className="grid gap-5 md:grid-cols-3">{TESTIMONIALS.map(([text, name, role]) => <article key={name} className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm"><div aria-label="5 จาก 5 ดาว" className="flex gap-1 text-[#4F46E5]">{Array.from({
              length: 5
            }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div><blockquote className="mb-7 mt-5 flex-1 text-sm leading-7 text-[#6B7280]">“{text}”</blockquote><div className="border-t border-[#E5E7EB] pt-5"><p className="text-xs font-semibold">{name}</p><p className="mt-1 text-[10px] text-[#6B7280]">{role}</p></div></article>)}</div></div></section>;
}
function FAQ() {
  const [opened, setOpened] = useState(null);
  return <section className={`${section} bg-white`}><div className={`${wrap} max-w-3xl`}><Title eyebrow="เราพร้อมตอบทุกข้อสงสัย">คำถามที่พบบ่อย</Title><div className="space-y-3">{FAQS.map(([q, a], i) => <div key={q} className="rounded-2xl border border-[#E5E7EB]"><h3><button id={`faq-${i}`} aria-expanded={opened === i} aria-controls={`answer-${i}`} onClick={() => setOpened(opened === i ? null : i)} className="flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left text-sm font-medium"><span><span className="mr-4 text-xs text-[#4F46E5]">0{i + 1}</span>{q}</span><ChevronDown size={18} className={`shrink-0 text-[#4F46E5] transition ${opened === i ? 'rotate-180' : ''}`} /></button></h3><div id={`answer-${i}`} role="region" aria-labelledby={`faq-${i}`} hidden={opened !== i} className="px-5 pb-5 text-sm leading-7 text-[#6B7280]">{a}</div></div>)}</div></div></section>;
}
const INITIAL = {
  name: '',
  phone: '',
  line: '',
  quantity: '',
  date: '',
  details: '',
  consent: false
};
function QuoteForm({
  product,
  setProduct,
  openPolicy
}) {
  const [form, setForm] = useState(INITIAL);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
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
    const issues = {};
    if (!form.name.trim()) issues.name = 'กรุณากรอกชื่อและบริษัท';
    if (!/^\d{9,10}$/.test(form.phone)) issues.phone = 'กรุณากรอกเบอร์โทรเป็นตัวเลข 9–10 หลัก';
    if (!product) issues.product = 'กรุณาเลือกสินค้าที่สนใจ';
    if (!form.consent) issues.consent = 'กรุณายินยอมให้ติดต่อกลับ';
    if (form.quantity && (!Number.isInteger(+form.quantity) || +form.quantity < 1)) issues.quantity = 'กรุณาระบุจำนวนเต็มตั้งแต่ 1 ชิ้น';
    if (form.date && form.date < today()) issues.date = 'กรุณาเลือกวันที่ตั้งแต่วันนี้';
    if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) issues.file = 'รองรับเฉพาะ JPG, PNG และ PDF';
    if (file && file.size > 10 * 1024 * 1024) issues.file = 'ขนาดไฟล์ต้องไม่เกิน 10 MB';
    setErrors(issues);
    if (Object.keys(issues).length) {
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, String(v)));
    data.append('product', product);
    if (file) data.append('logo', file);
    setStatus('sending');
    try {
      // Replace simulation with your real Formspree / Google Apps Script endpoint:
      // const response = await fetch('YOUR_ENDPOINT', { method: 'POST', body: data });
      // if (!response.ok) throw new Error('Submission failed');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
    } catch {
      setErrors({
        submit: 'ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง'
      });
      setStatus('idle');
    }
  }
  const field = 'mt-2 w-full min-w-0 rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-3 text-sm text-[#2D2A70] outline-none placeholder:text-[#6B7280]/60 focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10';
  const error = k => errors[k] && <p id={`error-${k}`} className="mt-1 text-xs text-red-600">{errors[k]}</p>;
  const attrs = k => ({
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `error-${k}` : undefined
  });
  const input = (key, label, type = 'text', required = false, placeholder = '') => <div className="min-w-0"><label htmlFor={key} className="text-xs font-medium">{label}{required && <span className="text-[#4F46E5]"> *</span>}</label><input id={key} name={key} type={type} required={required} value={form[key]} onChange={update} placeholder={placeholder} min={type === 'number' ? '1' : type === 'date' ? today() : undefined} step={type === 'number' ? '1' : undefined} autoComplete={key === 'phone' ? 'tel' : key === 'name' ? 'organization' : undefined} inputMode={type === 'tel' ? 'numeric' : undefined} {...attrs(key)} className={field} />{error(key)}</div>;
  return <section id="quote" className={`${section} scroll-mt-20 bg-[#2D2A70]`}><div className={`${wrap} grid items-center gap-10 lg:grid-cols-2 lg:gap-20`}><div className="text-white"><span className="text-xs tracking-wider text-white/65">เริ่มต้นโปรเจกต์ใหม่ไปด้วยกัน</span><h2 className="mt-5 text-3xl font-bold leading-relaxed md:text-4xl">สั่งผลิตกับ<br />Moonvera Plus+<br />เพื่อสร้างเอกลักษณ์<br />ให้แบรนด์ของคุณ</h2><p className="mt-5 max-w-sm text-sm leading-7 text-white/65">เล่าไอเดียของคุณให้เราฟัง ทีมงานพร้อมช่วยเลือกสินค้าและแนะนำรายละเอียดที่เหมาะกับธุรกิจคุณ</p><ul className="mt-8 grid grid-cols-2 gap-5">{['สินค้าคุณภาพสูง', 'บริการครบวงจร', 'ดูแลโดยทีมงานมืออาชีพ', 'ราคาคุ้มค่า'].map(t => <li key={t} className="flex items-center gap-2 text-xs"><CheckCircle size={17} className="shrink-0" />{t}</li>)}</ul><div className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs"><Gift size={16} />ขอใบเสนอราคาฟรี ไม่มีค่าใช้จ่าย!</div><div className="mt-8"><a href={CONTACT.line} target="_blank" rel="noreferrer" className={outline}><MessageCircle size={18} />หรือทักไลน์เลย <ArrowUpRight size={16} /></a><p className="mt-3 text-[10px] text-white/60">ช่องทางติดต่อเป็นตัวอย่าง กรุณาอัปเดตก่อนใช้จริง</p></div></div><div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">{status === 'success' ? <div role="status" className="py-20 text-center"><CheckCircle size={60} className="mx-auto text-[#4F46E5]" /><h3 className="mt-6 text-2xl font-bold">ขอบคุณที่ไว้วางใจเรา</h3><p className="mt-4 text-sm leading-7 text-[#6B7280]">ส่งข้อมูลตัวอย่างเรียบร้อยแล้ว<br />นี่คือการจำลอง ยังไม่มีข้อมูลส่งถึงทีมงาน</p><button onClick={() => {
            setStatus('idle');
            setForm(INITIAL);
            setFile(null);
            setProduct('');
          }} className={`${outline} mt-7`}>ส่งคำขอใหม่</button></div> : <><h3 className="text-xl font-bold">ขอใบเสนอราคาฟรี</h3><p className="mt-2 text-xs text-[#6B7280]">กรอกรายละเอียด แล้วให้เราช่วยดูแลส่วนที่เหลือ</p><form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">{input('name', 'ชื่อ-บริษัท', 'text', true, 'ชื่อผู้ติดต่อ / ชื่อบริษัท')}<div className="grid gap-4 sm:grid-cols-2">{input('phone', 'เบอร์โทรศัพท์', 'tel', true, 'กรอกเบอร์โทรศัพท์')}{input('line', 'LINE ID', 'text', false, 'LINE ID ของคุณ')}</div><div><label htmlFor="product" className="text-xs font-medium">เลือกสินค้าที่สนใจ <span className="text-[#4F46E5]">*</span></label><select id="product" name="product" required value={product} onChange={e => setProduct(e.target.value)} {...attrs('product')} className={field}><option value="">เลือกสินค้าที่ต้องการ</option>{CATEGORIES.map(c => <optgroup key={c} label={c}>{PRODUCTS.filter(p => p.category === c).map(p => <option key={p.name}>{p.name}</option>)}</optgroup>)}<option>อื่น ๆ / ต้องการคำแนะนำ</option></select>{error('product')}</div><div className="grid gap-4 sm:grid-cols-2">{input('quantity', 'จำนวนที่ต้องการ', 'number', false, 'จำนวน (ชิ้น)')}{input('date', 'วันที่ต้องการใช้สินค้า', 'date')}</div><div><label htmlFor="logo" className="text-xs font-medium">แนบไฟล์โลโก้ / แบบ</label><div className="relative mt-2 rounded-xl border border-dashed border-[#E5E7EB] p-4 text-center focus-within:ring-4 focus-within:ring-[#4F46E5]/20"><Upload size={19} className="mx-auto text-[#4F46E5]" /><p className="mt-2 break-all text-xs text-[#6B7280]">{file ? file.name : 'คลิกเพื่อแนบไฟล์ JPG, PNG หรือ PDF'}</p><p className="mt-1 text-[10px] text-[#6B7280]">ขนาดไม่เกิน 10 MB</p><input id="logo" name="logo" type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e => setFile(e.target.files?.[0] || null)} {...attrs('file')} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" /></div>{error('file')}</div><div><label htmlFor="details" className="text-xs font-medium">รายละเอียดเพิ่มเติม</label><textarea id="details" name="details" rows={3} value={form.details} onChange={update} placeholder="สี รูปแบบ งบประมาณ หรือรายละเอียดที่ต้องการ" className={`${field} resize-y`} /></div><div><div className="flex items-start gap-2.5"><input id="consent" name="consent" type="checkbox" required checked={form.consent} onChange={update} {...attrs('consent')} className="mt-1 h-4 w-4 shrink-0 accent-[#4F46E5]" /><div className="text-[10px] leading-5 text-[#6B7280]"><label htmlFor="consent">ข้าพเจ้ายินยอมให้เก็บและใช้ข้อมูลเพื่อติดต่อกลับตาม</label><button type="button" onClick={() => openPolicy('privacy')} className="ml-1 text-[#4F46E5] underline">นโยบายความเป็นส่วนตัว</button> *</div></div>{error('consent')}</div><p className="text-[10px] text-[#6B7280]">ฟอร์มตัวอย่าง ยังไม่ได้เชื่อมต่อระบบรับข้อมูลจริง</p>{error('submit')}<button disabled={status === 'sending'} type="submit" className={`${btn} w-full`}>{status === 'sending' ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />} {status === 'sending' ? 'กำลังส่งข้อมูล...' : 'ส่งข้อมูลขอใบเสนอราคา'}</button><p className="text-center text-[10px] text-[#6B7280]">ตอบกลับภายใน 24 ชั่วโมง • ข้อมูลของคุณปลอดภัย</p></form></>}</div></div></section>;
}
function Footer({
  openPolicy
}) {
  return <footer className="bg-white pb-28 pt-14 md:pb-7"><div className={wrap}><div className="grid gap-8 border-b border-[#E5E7EB] pb-10 md:grid-cols-[1.5fr_1fr_auto]"><div><a href="#home" className="text-2xl font-bold">Moonvera <span className="font-medium">Plus<span className="text-[#4F46E5]">+</span></span></a><p className="mt-3 text-xs leading-6 text-[#6B7280]">สินค้าพรีเมียมที่สะท้อนตัวตนของแบรนด์<br />พร้อมดูแลทุกไอเดีย ทุกขั้นตอน</p></div><div className="space-y-3 text-xs"><p className="mb-4 font-semibold">ติดต่อเรา</p><p className="flex items-center gap-2 text-[#6B7280]"><Phone size={15} />{CONTACT.phone} (ตัวอย่าง)</p><a href={CONTACT.line} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#4F46E5]"><MessageCircle size={15} />LINE <ArrowUpRight size={12} /></a><a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#4F46E5]"><Facebook size={15} />Facebook <ArrowUpRight size={12} /></a></div><div><div className="flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-[#E5E7EB] bg-[#F8F9FB] text-center text-[10px] text-[#6B7280]">พื้นที่ QR Code<br />LINE Official</div><p className="mt-2 text-[10px] text-[#6B7280]">เพิ่มเพื่อนเพื่อคุยกับเรา</p></div></div><div className="flex flex-col justify-between gap-4 pt-6 text-[10px] text-[#6B7280] sm:flex-row"><p>© {new Date().getFullYear()} Moonvera Plus. All rights reserved.</p><div className="flex gap-5"><button onClick={() => openPolicy('privacy')} className="text-[#4F46E5]">นโยบายความเป็นส่วนตัว</button><button onClick={() => openPolicy('terms')} className="text-[#4F46E5]">เงื่อนไขการให้บริการ</button></div></div></div></footer>;
}
function FloatingContact() {
  const [notice, setNotice] = useState(false);
  return <><div className="fixed bottom-24 right-4 z-30 flex flex-col gap-3 md:bottom-7 md:right-6"><a href={CONTACT.line} target="_blank" rel="noreferrer" aria-label="ติดต่อ LINE (ลิงก์ตัวอย่าง)" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#06C755] text-white shadow-md transition hover:-translate-y-1"><MessageCircle size={23} /></a><button aria-label="ดูเบอร์โทรศัพท์" aria-expanded={notice} onClick={() => setNotice(!notice)} className={`${btn} h-12 w-12 p-0 shadow-md`}><Phone size={20} /></button>{notice && <div role="status" className="absolute bottom-0 right-16 w-52 rounded-2xl border border-[#E5E7EB] bg-white p-4 text-xs shadow-md">{CONTACT.phone}<p className="mt-2 text-[#6B7280]">รออัปเดตเบอร์โทรจริง</p></div>}</div><div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E5E7EB] bg-white/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur md:hidden"><a href="#quote" className={`${btn} w-full`}>ขอใบเสนอราคา <Send size={16} /></a></div></>;
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
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D2A70]/60 p-5" onClick={onClose}><div id="policy-dialog" role="dialog" aria-modal="true" aria-labelledby="policy-title" onClick={e => e.stopPropagation()} className="relative w-full max-w-lg rounded-2xl bg-white p-8"><button id="policy-close" aria-label="ปิดหน้าต่าง" onClick={onClose} className="absolute right-3 top-3 rounded-full p-2 text-[#4F46E5]"><X size={20} /></button><h2 id="policy-title" className="pr-6 text-xl font-bold">{type === 'privacy' ? 'นโยบายความเป็นส่วนตัว' : 'เงื่อนไขการให้บริการ'}</h2><p className="mt-5 text-sm leading-7 text-[#6B7280]">{type === 'privacy' ? 'ฟอร์มนี้เป็นระบบสาธิต ข้อมูลและไฟล์จะไม่ถูกส่งไปยังเซิร์ฟเวอร์ ก่อนเปิดใช้งานจริงต้องระบุผู้ควบคุมข้อมูล วัตถุประสงค์ ระยะเวลาเก็บรักษา สิทธิของเจ้าของข้อมูล และช่องทางติดต่อให้ครบถ้วน' : 'เนื้อหา สถิติ รีวิว จำนวนขั้นต่ำ และระยะเวลาบนหน้านี้เป็นตัวอย่าง เงื่อนไขการสั่งผลิตจริงต้องยืนยันตามใบเสนอราคาของบริษัทก่อนชำระเงิน'}</p><button onClick={onClose} className={`${btn} mt-6`}>รับทราบ</button></div></div>;
}
export default function App() {
  const [product, setProduct] = useState('');
  const [policy, setPolicy] = useState(null);
  useEffect(() => {
    document.title = 'Moonvera Plus+ | รับผลิตสินค้าพรีเมียมและของแจกองค์กร';
    document.documentElement.style.scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }, []);
  const select = name => {
    setProduct(name);
    document.getElementById('quote')?.scrollIntoView();
  };
  return <div className="min-h-screen bg-[#F8F9FB] font-['Noto_Sans_Thai'] text-[#2D2A70] [&_a]:focus-visible:outline-none [&_a]:focus-visible:ring-4 [&_a]:focus-visible:ring-[#4F46E5]/25 [&_button]:cursor-pointer [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-4 [&_button]:focus-visible:ring-[#4F46E5]/25 [&_input]:focus-visible:ring-4 [&_input]:focus-visible:ring-[#4F46E5]/25 motion-reduce:[&_*]:transition-none"><Navbar /><main><Hero /><SocialProof /><Audience /><Products onSelect={select} /><Steps /><Portfolio /><Testimonials /><FAQ /><QuoteForm product={product} setProduct={setProduct} openPolicy={setPolicy} /></main><Footer openPolicy={setPolicy} /><FloatingContact />{policy && <PolicyDialog type={policy} onClose={() => setPolicy(null)} />}</div>;
}
