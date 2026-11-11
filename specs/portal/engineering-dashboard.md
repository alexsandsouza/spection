# FEAT-PORTAL-008 - Engineering Dashboard

## Product Brief
Connect Builder draft artifacts to an editable engineering workspace. Audience: developers and learners. Success: import Builder ZIP, manage requirements/tasks, inspect architecture, record traceability and export a project snapshot. No backend, AI inference or autonomous release approval.

## PRD and acceptance
| ID | Requirement | Acceptance |
|---|---|---|
| RF-DASH-001 | Import Builder ZIP | Recognize fixed Markdown paths; reject missing PRD or oversized archives |
| RF-DASH-002 | Requirements | Edit text and review status; stable IDs |
| RF-DASH-003 | Kanban | Move tasks between Todo, Doing, Done |
| RF-DASH-004 | Architecture | Read HLD, LLD and ADR as plain text |
| RF-DASH-005 | Traceability | Link a requirement to task and test/evidence |
| RF-DASH-006 | Quality gates | Show evidence gaps; no automatic approval |
| RF-DASH-007 | Evidence | Record manual evidence and distinguish unverified claims |
| RF-DASH-008 | Export | JSON snapshot import/export with validation |

## HLD
Browser UI -> local workspace state -> ZIP adapter / JSON adapter. No external transmission or persistence. Trust boundary: imported files are untrusted, displayed as text. Limit archive size and decompressed text; never extract onto filesystem.

## LLD
Workspace: title, docs, requirements, tasks, evidence. Fixed paths and stable IDs; derive counts from state. ZIP parser recognizes Builder RF/RNF and TASK lines. JSON import validates schema and limits. Kanban statuses todo/doing/done; requirement draft/reviewed. Evidence is user-reported, not independently verified.

## ADR-0001
Reuse Next.js and JSZip; avoid backend and new dependencies. Session memory plus explicit export. A future server-backed workspace requires separate consent/security review.

## Tasks
TASK-DASH-001 specification; TASK-DASH-002 parser and model; TASK-DASH-003 UI; TASK-DASH-004 tests; TASK-DASH-005 navigation and release verification.

## Quality and evidence
Run node --test site/app/dashboard/model.test.mjs and portal build/typecheck. CI and browser deployment must be independently confirmed. Human release approval pending.
