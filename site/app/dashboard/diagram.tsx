"use client";
import {useEffect,useId,useMemo,useRef,useState} from "react";
import {dimensions,fitScale,scaleDimensions} from "./diagram-layout.mjs";

export default function Diagram({text,lang="en"}:{text:string;lang?:string}){
 const id=useId().replace(/[^a-zA-Z0-9]/g,"");
 const [svg,setSvg]=useState(""),[failed,setFailed]=useState(false),[expanded,setExpanded]=useState(false);
 const [userScale,setUserScale]=useState<number|null>(null);
 const [viewport,setViewport]=useState({width:800,height:400});
 const scrollRef=useRef<HTMLDivElement>(null);
 const closeRef=useRef<HTMLButtonElement>(null);
 const source=text.match(/\x60\x60\x60mermaid\s*\n([\s\S]*?)\x60\x60\x60/)?.[1]||"";
 const tr=(en:string,pt:string,es:string)=>lang==="pt"?pt:lang==="es"?es:en;
 useEffect(()=>{let canceled=false;setSvg("");setFailed(false);setUserScale(null);if(!source)return;
  async function render(){try{
   if(source.length>12000||/%%\{|<|https?:|\bclick\b/i.test(source))throw Error("Unsupported diagram");
   const {default:mermaid}=await import("mermaid");
   mermaid.initialize({startOnLoad:false,securityLevel:"strict",flowchart:{htmlLabels:false}});
   const result=await mermaid.render("eng"+id,source);
   if(!canceled)setSvg(result.svg);
  }catch{if(!canceled)setFailed(true)}}void render();
  return()=>{canceled=true};
 },[source,id]);
 useEffect(()=>{const el=scrollRef.current;if(!el)return;
  const measure=()=>setViewport({width:el.clientWidth||800,height:el.clientHeight||400});
  measure();const observer=new ResizeObserver(measure);observer.observe(el);return()=>observer.disconnect();
 },[expanded,svg]);
 useEffect(()=>{if(!expanded)return;
  const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setExpanded(false)};
  window.addEventListener("keydown",onKey);closeRef.current?.focus();
  return()=>window.removeEventListener("keydown",onKey);
 },[expanded]);
 useEffect(()=>{if(!expanded)return;const prev=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=prev}},[expanded]);
 const natural=useMemo(()=>dimensions(svg),[svg]);
 const scale=userScale??fitScale(natural,viewport);
 const frame=scaleDimensions(natural,scale);
 const doc=useMemo(()=>`<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:transparent}svg{display:block!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important}</style></head><body>${svg}</body></html>`,[svg]);
 if(!source)return null;
 return <div className={"eng-diagram"+(expanded?" eng-diagram-expanded":"")} role={expanded?"dialog":"region"} aria-modal={expanded?true:undefined} aria-label={tr("Architecture diagram","Diagrama de arquitetura","Diagrama de arquitectura")}>
 <div className="eng-diagram-toolbar"><strong>Mermaid</strong><span aria-live="polite">{Math.round(scale*100)}%</span>
 <button type="button" aria-label={tr("Zoom out","Reduzir zoom","Reducir zoom")} disabled={!svg||scale<=.25} onClick={()=>setUserScale(Math.max(.25,Math.round((scale-.25)*100)/100))}>−</button>
 <button type="button" aria-label={tr("Zoom in","Ampliar zoom","Ampliar zoom")} disabled={!svg||scale>=3} onClick={()=>setUserScale(Math.min(3,Math.round((scale+.25)*100)/100))}>+</button>
 <button type="button" onClick={()=>setUserScale(null)} disabled={!svg}>{tr("Fit to view","Ajustar à tela","Ajustar a pantalla")}</button>
 <button type="button" ref={closeRef} aria-expanded={expanded} onClick={()=>{setExpanded(v=>!v);setUserScale(null)}}>{expanded?tr("Close","Fechar","Cerrar"):tr("Expand","Expandir","Expandir")}</button>
 </div>
 {failed?<p role="alert">{tr("Mermaid preview unavailable","Prévia do Mermaid indisponível","Vista previa de Mermaid no disponible")}</p>:
 <div className="eng-diagram-scroll" ref={scrollRef} tabIndex={0} aria-label={tr("Scrollable diagram canvas","Área do diagrama com rolagem","Lienzo del diagrama con desplazamiento")}>
 {svg?<div className="eng-diagram-stage" style={{width:Math.max(frame.width,viewport.width),height:Math.max(frame.height,viewport.height)}}>
 <iframe title={tr("Architecture diagram preview","Prévia do diagrama de arquitetura","Vista previa del diagrama de arquitectura")} sandbox="" scrolling="no" srcDoc={doc} style={{width:frame.width,height:frame.height,border:0,display:"block",flexShrink:0}}/>
 </div>:<p role="status">{tr("Rendering diagram","Renderizando diagrama","Renderizando diagrama")}…</p>}
 </div>}
 </div>;
}
