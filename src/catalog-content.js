import importedProducts from './imported-products.json';
// Keep existing edits and visibility; add the supplied photo catalog once.
export function upgradeCatalog(content) {
 if(content.catalogVersion>=2)return content;
 const products=[...(content.products||[])];
 for(const imported of importedProducts){
  const index=products.findIndex(p=>p.id===imported.id);
  if(index<0)products.push({...imported});
  else if(imported.id<=37 && products[index].image===`/images/product-${imported.id}.jpg`){
   products[index]={...products[index],image:imported.image,source:imported.source};
  }
 }
 return {...content,products,catalogVersion:2};
}
export {importedProducts};
