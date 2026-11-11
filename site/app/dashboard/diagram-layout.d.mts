export type Size={width:number;height:number};
export function dimensions(svg:string):Size;
export function fitScale(diagram:Size,viewport:Size):number;
export function scaleDimensions(diagram:Size,scale:number):Size;
