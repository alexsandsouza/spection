export const paths=["README.md","AGENTS.md","docs/product-brief.md","docs/prd.md","docs/hld.md","docs/lld.md","docs/adr/0001-candidate-architecture.md","docs/security-review.md","specs/001-feature/feature-spec.md","specs/001-feature/plan.md","specs/001-feature/tasks.md","docs/traceability.md"];
export function fromDocs(docs){
 if(!docs["docs/prd.md"])throw Error("Missing docs/prd.md");
 const req=[...docs["docs/prd.md"].matchAll(/^- (RF|RNF)-(\d+): (.+)$/gm)].map(m=>({id:m[1]+"-"+m[2],text:m[3],reviewed:false}));
 const tasks=[...(docs["specs/001-feature/tasks.md"]||"").matchAll(/^- \[[ xX]\] (TASK-\d+): (.+)$/gm)].map(m=>({id:m[1],text:m[2],status:"todo",requirement:""}));
 if(new Set(req.map(x=>x.id)).size!==req.length||new Set(tasks.map(x=>x.id)).size!==tasks.length)throw Error("Duplicate IDs");
 return {title:(docs["README.md"]||"").split("\n")[0].replace(/^# /,"")||"Project",docs,requirements:req,tasks,evidence:[]};
}
export function validate(w){
 const str=(v,n=4000)=>typeof v==="string"&&v.length<=n;
 if(!w||!str(w.title,200)||!w.docs||!Array.isArray(w.requirements)||!Array.isArray(w.tasks)||!Array.isArray(w.evidence))throw Error("Invalid workspace");
 if([w.requirements,w.tasks,w.evidence].some(a=>a.length>500)||Object.entries(w.docs).some(([k,v])=>!paths.includes(k)||!str(v,100000)))throw Error("Workspace limits");
 if(!w.requirements.every(x=>x&&str(x.id,40)&&str(x.text)&&typeof x.reviewed==="boolean")||!w.tasks.every(x=>x&&str(x.id,40)&&str(x.text)&&["todo","doing","done"].includes(x.status)&&str(x.requirement,40))||!w.evidence.every(x=>x&&str(x.id,40)&&str(x.requirement,40)&&str(x.text)&&str(x.test,200)))throw Error("Invalid records");
 for(const a of [w.requirements,w.tasks,w.evidence])if(new Set(a.map(x=>x.id)).size!==a.length)throw Error("Duplicate IDs");
 return w;
}
export function slug(name){return String(name).normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,64)||"project"}
export function uniqueId(list){let id;do{id="proj-"+(globalThis.crypto?.randomUUID?.()||Math.random().toString(36).slice(2)+Date.now().toString(36))}while(list.some(p=>p.id===id));return id}
export function migrateProjects(input){if(!Array.isArray(input)||input.length>20)throw Error("Invalid projects");
 const used=new Set();return input.map((item,index)=>{const w=validate(item);let id=typeof item.id==="string"&&/^proj-[a-zA-Z0-9-]{8,}$/.test(item.id)&&!used.has(item.id)?item.id:"proj-legacy-"+String(index+1).padStart(3,"0");used.add(id);return {...w,id,archived:item.archived===true}});
}
export function sameProject(a,b){return a.id===b.id}
export function gaps(w){return w.requirements.filter(r=>!r.reviewed||!w.tasks.some(t=>t.requirement===r.id&&t.status==="done")||!w.evidence.some(e=>e.requirement===r.id&&e.text.trim()&&e.test.trim()));}
