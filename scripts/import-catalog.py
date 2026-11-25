import json, re, subprocess
from pathlib import Path
folders=[('กระเป๋า','bags','กระเป๋า','กระเป๋า'),('หมวก','hats','หมวก','หมวก'),('แก้วน้ำ','drinkware','แก้วน้ำและกระบอกน้ำ','แก้วน้ำและกระบอกน้ำ'),('สมุดโน๊ต','stationery','เครื่องเขียนและอุปกรณ์สำนักงาน','สมุดโน้ต'),('giftswt','gift-sets','ชุดของขวัญ','ชุดของขวัญ'),('อื่นๆ','promotional-gifts','ของพรีเมียมและของที่ระลึก','ของพรีเมียม')]
products=[]
for group,(folder,slug,category,label) in enumerate(folders):
 files=sorted(Path('images',folder).glob('*.jpg'), key=lambda p:int(re.search(r'_(\d+)\.jpg$',p.name)[1]))
 target=Path('public/images/catalog',slug);target.mkdir(parents=True,exist_ok=True)
 for i,path in enumerate(files,1):
  output=target/f'{i}.jpg'
  subprocess.run(['sips','-Z','1000','-s','formatOptions','82',str(path),'--out',str(output)],check=True,stdout=subprocess.DEVNULL)
  name=f'{label} แบบที่ {i:02}'
  if folder=='อื่นๆ':name=['สายคล้องคอพิมพ์โลโก้','ซองใส่บัตรพนักงาน'][i-1]
  products.append(dict(id=(i if i<=37 else 10000+i) if group==0 else 1000+group*100+i,name=name,category=category,image='/'+str(output.relative_to('public')),source=str(path),features=['ปรับแต่งโลโก้และรูปแบบสำหรับองค์กร','สอบถามวัสดุ จำนวนขั้นต่ำ และราคากับทีมงาน'],visible=True))
Path('src/imported-products.json').write_text(json.dumps(products,ensure_ascii=False,indent=2)+'\n')
print('Imported',len(products),'images')
