import {test} from "node:test";import assert from "node:assert/strict";import {fromDocs,validate,gaps,slug,uniqueId,migrateProjects,sameProject} from "./model.mjs";
test("Builder contract",()=>{const w=fromDocs({"README.md":"# Demo","docs/prd.md":"- RF-001: Register\n- RNF-001: Privacy","specs/001-feature/tasks.md":"- [ ] TASK-001: Implement"});assert.equal(w.requirements.length,2);assert.equal(w.tasks.length,1);assert.equal(gaps(w).length,2);assert.equal(validate(w),w)});
test("Missing PRD rejected",()=>assert.throws(()=>fromDocs({})));
test("Invalid snapshot rejected",()=>assert.throws(()=>validate({title:"x"})));
test("Evidence gap remains until review task and evidence",()=>{const w=fromDocs({"docs/prd.md":"- RF-001: Register"});w.requirements[0].reviewed=true;w.tasks.push({id:"TASK-001",text:"Implement",status:"done",requirement:"RF-001"});assert.equal(gaps(w).length,1);w.evidence.push({id:"E-001",requirement:"RF-001",test:"test-1",text:"Manual result"});assert.equal(gaps(w).length,0)});

test("Legacy workspaces receive distinct stable IDs",()=>{
 const d={"README.md":"# Demo","docs/prd.md":"- RF-001: Test"};
 const w=fromDocs(d), migrated=migrateProjects([w,{...w}]);
 assert.notEqual(migrated[0].id,migrated[1].id);
 assert.equal(migrated[0].id,"proj-legacy-001");
 assert.equal(migrated[1].id,"proj-legacy-002");
 assert.equal(validate(migrated[0]),migrated[0]);
});
test("Preserve existing project identifiers and archive state",()=>{
 const w={...fromDocs({"README.md":"# Project","docs/prd.md":"- RF-001: Test"}),id:"proj-existing-12345",archived:true};
 const [restored]=migrateProjects([w]);
 assert.equal(restored.id,w.id);
 assert.equal(restored.archived,true);
 assert.equal(sameProject(restored,w),true);
});
test("Duplicate IDs are repaired on legacy migration",()=>{
 const w={...fromDocs({"docs/prd.md":"- RF-001: Test"}),id:"proj-duplicate-1234"};
 const p=migrateProjects([w,w]);
 assert.notEqual(p[0].id,p[1].id);
});
test("Export filename slug is safe and consistent",()=>{
 assert.equal(slug("Gestão de Eventos 2026"),"gestao-de-eventos-2026");
 assert.equal(slug("../"),"project");
 assert.match(uniqueId([]),/^proj-[a-z0-9-]{8,}$/i);
});
test("Invalid old project payload is rejected",()=>assert.throws(()=>migrateProjects([{title:"Invalid"}])));
