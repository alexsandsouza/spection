export type Requirement={id:string;text:string;reviewed:boolean};
export type Task={id:string;text:string;status:"todo"|"doing"|"done";requirement:string};
export type Evidence={id:string;requirement:string;test:string;text:string};
export type Workspace={title:string;docs:Record<string,string>;requirements:Requirement[];tasks:Task[];evidence:Evidence[]};
export const paths:string[];
export function fromDocs(docs:Record<string,string>):Workspace;
export function validate(w:unknown):Workspace;
export function gaps(w:Workspace):Requirement[];
