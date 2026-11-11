import {test} from "node:test";import assert from "node:assert/strict";import {fromDocs,validate,gaps} from "./model.mjs";
test("Builder contract",()=>{const w=fromDocs({"README.md":"# Demo","docs/prd.md":"- RF-001: Register\n- RNF-001: Privacy","specs/001-feature/tasks.md":"- [ ] TASK-001: Implement"});assert.equal(w.requirements.length,2);assert.equal(w.tasks.length,1);assert.equal(gaps(w).length,2);assert.equal(validate(w),w)});
test("Missing PRD rejected",()=>assert.throws(()=>fromDocs({})));
test("Invalid snapshot rejected",()=>assert.throws(()=>validate({title:"x"})));
test("Evidence gap remains until review task and evidence",()=>{const w=fromDocs({"docs/prd.md":"- RF-001: Register"});w.requirements[0].reviewed=true;w.tasks.push({id:"TASK-001",text:"Implement",status:"done",requirement:"RF-001"});assert.equal(gaps(w).length,1);w.evidence.push({id:"E-001",requirement:"RF-001",test:"test-1",text:"Manual result"});assert.equal(gaps(w).length,0)});
