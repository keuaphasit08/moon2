import {build} from 'esbuild';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
const dir=mkdtempSync(join(tmpdir(),'moon-test-'));
try{
 const result=await build({entryPoints:['tests/content.test.jsx'],bundle:true,write:false,platform:'node',format:'cjs',define:{'import.meta.env.VITE_SUPABASE_URL':'""','import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY':'""'}});
 const file=join(dir,'test.cjs');writeFileSync(file,result.outputFiles[0].contents);await import(pathToFileURL(file));
}finally{rmSync(dir,{recursive:true,force:true});}
