import React,{createContext,useContext,useEffect,useState} from 'react';
import {defaults} from './defaults';
import {supabase} from './supabase';
const Context=createContext(null);
export function SiteProvider({children,initialData=defaults}) {
 const [data,setData]=useState(initialData),[loading,setLoading]=useState(true),[error,setError]=useState(''),[version,setVersion]=useState(null);
 function acceptSaved(row){setData({...defaults,...row.content});setVersion(row.updated_at);setError('');}
 async function reload(){
  if(!supabase){setLoading(false);return;}
  setLoading(true); setError('');
  try{const {data:row,error:e}=await supabase.from('site_content').select('*').eq('id',1).single();if(e)throw e;setData({...defaults,...row.content});setVersion(row.updated_at);}
  catch(e){setError(e.message);}finally{setLoading(false);}
 }
 useEffect(()=>{reload();},[]);
 return <Context.Provider value={{data,setData,loading,error,version,reload,acceptSaved}}>{children}</Context.Provider>;
}
export const useSite=()=>useContext(Context);
export function SiteText({id,fallback}){const {data}=useSite();return <>{data.texts?.[id]??fallback}</>;}
