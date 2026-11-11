export function dimensions(svg){
 const vb=svg.match(/\bviewBox=["']\s*([-+\d.eE]+)[,\s]+([-+\d.eE]+)[,\s]+([-+\d.eE]+)[,\s]+([-+\d.eE]+)\s*["']/i);
 if(!vb)return {width:900,height:600};
 const width=Number(vb[3]),height=Number(vb[4]);
 return Number.isFinite(width)&&Number.isFinite(height)&&width>0&&height>0?{width:Math.min(width,10000),height:Math.min(height,10000)}:{width:900,height:600};
}
export function fitScale(diagram,viewport){
 if(!diagram.width||!diagram.height||!viewport.width||!viewport.height)return 1;
 return Math.min(2.5,Math.max(.1,Math.min((viewport.width-32)/diagram.width,(viewport.height-32)/diagram.height)));
}
export function scaleDimensions(diagram,scale){
 return {width:Math.ceil(diagram.width*scale),height:Math.ceil(diagram.height*scale)};
}
