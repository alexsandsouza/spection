# FEAT-PORTAL-007 - Interactive Project Builder

Status: implemented draft; verification pending.

## Scope
Offline browser wizard for project discovery, requirements, architecture, feature planning and ZIP export. No AI inference, accounts, persistence of project contents or backend.

## Acceptance
- Required inputs gate progression; previous steps remain editable.
- Preview 12 Markdown files with draft status, requirement IDs and explicit unresolved mappings.
- ZIP export contains only fixed safe paths and user-entered text.
- EN/PT/ES interface; generated documents use English headings and preserve user input.
- Existing consent preferences respected; no project data transmitted.
- Static export compatible with /spection.

## ADR
Use local React state and JSZip, avoiding server APIs. Generated documentation is a scaffold, not validated software or automatic AI design.

## Verification
Build/typecheck, browser wizard navigation, ZIP contents, mobile and keyboard checks required. No successful execution claimed.
