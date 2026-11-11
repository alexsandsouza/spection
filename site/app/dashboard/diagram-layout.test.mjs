import {test} from "node:test";
import assert from "node:assert/strict";
import {dimensions,fitScale,scaleDimensions} from "./diagram-layout.mjs";
test("Mermaid viewBox determines content size",()=>assert.deepEqual(dimensions('<svg viewBox="0 0 600 800"></svg>'),{width:600,height:800}));
test("Unknown viewBox uses safe fallback",()=>assert.deepEqual(dimensions("<svg></svg>"),{width:900,height:600}));
test("Fit respects both available dimensions",()=>{
 assert.equal(fitScale({width:600,height:800},{width:1000,height:500}),.585);
 assert.equal(fitScale({width:500,height:200},{width:1032,height:600}),2);
});
test("Sizing maps zoom without introducing inner scrolling",()=>assert.deepEqual(scaleDimensions({width:600,height:800},1.25),{width:750,height:1000}));
