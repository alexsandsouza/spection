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

## Dashboard 2.0 increment
RF-DASH-009 multiple workspaces (maximum 20); RF-DASH-010 explicit local storage opt-in and revocation; RF-DASH-011 accessible file selection plus drop; RF-DASH-012 Kanban drag and select; RF-DASH-013 Mermaid preview in sandboxed iframe with strict rendering; RF-DASH-014 responsive sidebar and language controls. ADR: retain session state by default, optional browser storage, no backend. Acceptance: import two projects, edit and switch without data loss, reload only after opt-in, revoke and clear saved state, move task by both controls, render valid Mermaid block, preserve Builder. Browser and CI verification pending.

## Dashboard 2.1 - FEAT-PORTAL-009

### Product brief
Improve practical two-project validation by eliminating ambiguous duplicate imports, adding lifecycle actions, a responsive navigation hierarchy, complete UI localization, safer export naming and usable architecture diagrams.

### Requirements and acceptance
- RF-DASH-015: each workspace gets an internal stable `proj-*` ID; migrate existing persisted 2.0 arrays without discarding projects or their task/evidence state.
- RF-DASH-016: reject new imports with an existing ID or case-insensitive title; existing legacy duplicates remain accessible for manual rename or deletion.
- RF-DASH-017: rename projects with uniqueness and length validation; archive/restore without deleting documents; delete only after confirmation.
- RF-DASH-018: export JSON with a sanitized project-specific filename and metadata. Archived projects can still be exported.
- RF-DASH-019: remove the duplicated desktop section navigation; use the workspace sidebar.
- RF-DASH-020: localize all workspace controls and operational status messages in English, Brazilian Portuguese and Spanish. Imported content is never translated automatically.
- RF-DASH-021: Mermaid viewer provides zoom, fit, expand/close (Esc), and an isolated preview.
- RNF-DASH-010: respect local persistence opt-in; preserve existing storage key and privacy revocation.
- RNF-DASH-011: never transmit imported project data or create accounts.
- RNF-DASH-012: preserve the Builder, portal and Academic Lab.

### Architecture / ADR
Retain Next.js static export, React browser state and JSZip adapter. Project identity belongs to the client workspace wrapper; keep JSON compatible with 2.0 by allowing legacy objects without IDs. In-browser migration assigns reproducible legacy IDs according to list position. New IDs are generated client-side. Existing archived workspaces are read-only until restored. Mermaid code is validated before rendering in strict mode inside a sandboxed iframe.

### Planned verification
- Migration of two legacy projects retains distinct IDs and previously recorded tasks.
- Importing duplicates does not overwrite existing workspaces.
- Rename, archive, restore, delete and project-specific JSON names.
- Import Builder ZIP, traceability, quality gaps and optional storage after upgrade.
- Zoom, fit, expanded layout and Esc; no script execution from imported diagrams.
- EN/PT/ES for controls and statuses.
- Run Node model tests, TypeScript typecheck and Next.js export in GitHub Actions.
- Manual browser regression on desktop and mobile.

### Status
Source changes published to main. Model helper exercised with representative input. CI results, deploy and end-to-end interaction confirmation pending. Human approval pending.
