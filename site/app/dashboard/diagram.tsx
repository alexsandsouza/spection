"use client";
import {useEffect,useId,useState} from "react";
export default function Diagram({text,lang="en"}:{text:string;lang?:string}){
 const id=useId().replace(/[^a-zA-Z0-9]/g,"");
 const [svg,setSvg]=useState(""),[failed,setFailed]=useState(false),[zoom,setZoom]=useState(1),[expanded,setExpanded]=useState(false);
 const source=text.match(/\x60\x60\x60mermaid\s*\n([\s\S]*?)\x60\x60\x60/)?.[1]||"";
 const tr=(en:string,pt:string,es:string)=>lang==="pt"?pt:lang==="es"?es:en;
 useEffect(()=>{let canceled=false;setSvg("");setFailed(false);setZoom(1);if(!source)return;
 async function run(){try{
  if(source.length>12000||/%%\{|<|https?:|\bclick\b/i.test(source))throw Error("Unsupported diagram");
  const {default:mermaid}=await import("mermaid");
  mermaid.initialize({startOnLoad:false,securityLevel:"strict",flowchart:{htmlLabels:false}});
  const result=await mermaid.render("eng"+id,source);
  if(!canceled)setSvg(result.svg);
 }catch{if(!canceled)setFailed(true)}}void run();return()=>{canceled=true}
 },[source,id]);
 useEffect(()=>{if(!expanded)return;const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setExpanded(false)};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[expanded]);
 if(!source)return null;
 return <div className={"eng-diagram"+(expanded?" eng-diagram-expanded":"")} role="region" aria-label={tr("Architecture diagram","Diagrama de arquitetura","Diagrama de arquitectura")}>
 <div className="eng-diagram-toolbar"><strong>Mermaid</strong><span>{Math.round(zoom*100)}%</span>
 <button type="button" aria-label={tr("Zoom out","Reduzir zoom","Reducir zoom")} onClick={()=>setZoom(v=>Math.max(.5,Math.round((v-.25)*100)/100))}>−</button>
 <button type="button" aria-label={tr("Zoom in","Ampliar zoom","Ampliar zoom")} onClick={()=>setZoom(v=>Math.min(2.5,Math.round((v+.25)*100)/100))}>+</button>
 <button type="button" onClick={()=>setZoom(1)}>{tr("Fit","Ajustar","Ajustar")}</button>
 <button type="button" aria-expanded={expanded} onClick={()=>setExpanded(v=>!v)}>{expanded?tr("Close","Fechar","Cerrar"):tr("Expand","Expandir","Expandir")}</button>
 </div>
 {failed?<p role="alert">{tr("Mermaid preview unavailable","Prévia do Mermaid indisponível","Vista previa de Mermaid no disponible")}</p>:svg?
 <div className="eng-diagram-scroll"><iframe title={tr("Architecture diagram","Diagrama de arquitetura","Diagrama de arquitectura")} sandbox="" srcDoc={svg} style={{width:(zoom*100)+"%",height:(Math.max(350,zoom*500))+"px",border:0,display:"block"}}/></div>:
 <p role="status">{tr("Rendering diagram","Renderizando diagrama","Renderizando diagrama")}…</p>}
 </div>
}
