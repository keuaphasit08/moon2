import {CATALOG, categoryNames, matchesCategory, quoteOptions, categoryUrl, categoryFromPath} from '../src/catalog';
import {upgradeCatalog,importedProducts} from '../src/catalog-content';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import App from '../src/App';
import {SiteProvider} from '../src/site';
import {defaults,PRODUCTS} from '../src/defaults';
import texts from '../src/texts.json';
const render=(data,path='/')=>renderToStaticMarkup(<SiteProvider initialData={data}><App pathname={path}/></SiteProvider>);
const html=render(defaults);
assert.equal(defaults.products.length,137);
assert.equal(new Set(defaults.products.map(p=>p.id)).size,137);
for(const product of defaults.products){assert.ok(existsSync('public'+product.image));assert.ok(existsSync(product.source));}
assert.ok(!html.match(/<section id="products"[\s\S]*?<\/section>/)[0].includes('<article'));
assert.equal(CATALOG.length,9);
assert.ok(!html.includes('กระเป๋าผ้าแคนวาส'));
assert.deepEqual(quoteOptions('ร่ม',defaults.products),[]);
for(const family of CATALOG){
 assert.ok(html.includes(categoryUrl(family.name)));
 assert.equal(categoryFromPath(categoryUrl(family.name)),family.name);
 const page=render(defaults,categoryUrl(family.name));
 const expected=defaults.products.filter(p=>matchesCategory(p,family.name));
 const articles=[...page.matchAll(/<article\b/g)];
 assert.equal(articles.length,expected.length);
 for(const product of defaults.products){
  assert.equal(page.includes(`src="${product.image}"`),expected.includes(product),`${family.name}: ${product.name}`);
 }
 assert.deepEqual(quoteOptions(family.name,defaults.products), [...new Set(expected.map(p=>p.name))]);
 const section=page.match(/<section id="products"[\s\S]*?<\/section>/)[0];
 for(const type of family.types){assert.ok(!section.includes(`>${type} <`));}
 assert.ok(page.includes('กลับไปเลือกหมวดสินค้า'));
}
const edited=structuredClone(defaults);
edited.products.forEach(p=>p.visible=false);
edited.products.push({id:30000,name:'ขวดน้ำทดสอบ',category:'ขวดน้ำ',image:'/images/bottle.jpg',features:['รายละเอียดทดสอบ'],visible:true});
edited.categories=['ขวดน้ำ'];edited.contact.phone='0812345678';edited.texts.text_2='หัวข้อแก้ไขจากหลังบ้าน';
const changed=render(edited,'/products/drinkware');
assert.ok(changed.includes('ขวดน้ำทดสอบ'));assert.ok(changed.includes('รายละเอียดทดสอบ'));assert.ok(changed.includes('0812345678'));
assert.ok(!changed.includes('src="/images/catalog/bags/1.jpg"'));
assert.ok(render(edited).includes('หัวข้อแก้ไขจากหลังบ้าน'));
assert.doesNotThrow(()=>render({...edited,products:[],categories:[]}));
assert.doesNotThrow(()=>render(defaults,'/products/%invalid'));
const source=readFileSync('src/App.jsx','utf8');
for(const match of source.matchAll(/<SiteText id="([^"]+)"/g))assert.ok(Object.hasOwn(texts,match[1]));
assert.ok(PRODUCTS.every(p=>matchesCategory(p,'กระเป๋า')));
assert.ok(matchesCategory({category:'หมวกแม่ครัว'},'หมวกแม่ครัวและผ้ากันเปื้อน'));
assert.ok(!matchesCategory(PRODUCTS[0],'หมวก'));
assert.ok(categoryNames(['หมวดเพิ่มเติม','กระเป๋าถือ']).includes('หมวดเพิ่มเติม'));
assert.ok(!categoryNames(['กระเป๋าถือ']).includes('กระเป๋าถือ'));
const old={products:PRODUCTS.map(p=>({...p,visible:p.id!==1})),categories:['กระเป๋าถือ']};
old.products[0].name='ชื่อที่แก้ไข';
const upgraded=upgradeCatalog(old);
assert.equal(upgraded.products.length,137);assert.equal(upgraded.products[0].visible,false);assert.equal(upgraded.products[0].name,'ชื่อที่แก้ไข');
assert.deepEqual(upgradeCatalog(upgraded),upgraded);
const deleted={...upgraded,products:upgraded.products.filter(p=>p.id!==1101)};
assert.ok(!upgradeCatalog(deleted).products.some(p=>p.id===1101));
assert.equal(importedProducts.length,137);
console.log('PASS: 137 image/source paths, unique IDs, 9 separate category pages, no cross-category images, directory links, quotations, hidden/custom products, legacy migration and saved deletions');
