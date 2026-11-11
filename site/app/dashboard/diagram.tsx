"use client";
import {useEffect,useId,useState} from "react";
export default function Diagram({text}:{text:string}){
 const id=useId().replace(/[^a-zA-Z0-9]/g,"");
 const [svg,setSvg]=useState(""),[failed,setFailed]=useState(false);
 const source=text.match(/\x60\x60\x60mermaid\s*\n([\s\S]*?)\x60\x60\x60/)?.[1]||"";
 useEffect(()=>{let canceled=false;setSvg("");setFailed(false);if(!source)return;async function run(){try{if(source.length>12000||/%%\{|<|https?:|\bclick\b/i.test(source))throw Error("Unsupported diagram");const {default:mermaid}=await import("mermaid");mermaid.initialize({startOnLoad:false,securityLevel:"strict",flowchart:{htmlLabels:false}});const result=await mermaid.render("eng"+id,source);if(!canceled)setSvg(result.svg)}catch{if(!canceled)setFailed(true)}}void run();return()=>{canceled=true}},[source,id]);
 if(!source)return null;
 return <div className="eng-diagram">{failed?<p>Mermaid preview unavailable / Prévia indisponível / Vista previa no disponible</p>:svg?<iframe title="Mermaid diagram" sandbox="" srcDoc={svg} style={{width:"100%",height:350,border:0}}/>:<p>Mermaid…</p>}</div>
}
