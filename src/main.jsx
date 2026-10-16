import React, {lazy,Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import './tailwind.css';
import App from './App.jsx';
const Admin=lazy(()=>import('./Admin.jsx'));
import {SiteProvider,useSite} from './site.jsx';
function PublicSite(){const {loading}=useSite();return loading?<p role="status" className="p-10 text-center">กำลังโหลดเว็บไซต์…</p>:<App/>;}
createRoot(document.getElementById('root')).render(<SiteProvider>{location.pathname.replace(/\/$/,'')==='/admin'?<Suspense fallback={<p className="p-10">กำลังโหลด…</p>}><Admin/></Suspense>:<PublicSite/>}</SiteProvider>);
