# FEAT-PORTAL-001 - Documentation portal

Status: Draft, implementation started; human acceptance pending.

## Product brief
Developers need a clear entry point to SPECTION documentation and the kit. MVP: static portal, no accounts or AI execution.

## Requirements
- RF-PORTAL-001: navigate to verified repository guides.
- RF-PORTAL-002: filter guides by keyword.
- RF-PORTAL-003: copy quickstart commands and toggle theme.
- RNF-PORTAL-001: responsive layout, keyboard access, no secrets or tracking.

## HLD / LLD
Next.js App Router, static export, client-side search over a local guide catalog, CSS theme tokens, repository links. No API, database or model calls.

## ADR
Choose static Next.js + TypeScript to support future expansion; trade-off: dependency/build maintenance versus plain HTML. Use GitHub Pages for MVP; dynamic features require another hosting model.

## Plan and tasks
1. Build landing and catalog.
2. Verify build, keyboard navigation, search, links and mobile layout.
3. Review dependency security and deploy only after verification.

## Evidence
Implementation files created; build and browser acceptance pending. No claim of deployed site.

## Redesign 2.0
RF-PORTAL-004: responsive sticky navigation, localized interface and persistent theme/language.
RF-PORTAL-005: interactive workflow with stage details and links to manuals.
RF-PORTAL-006: author, responsible AI, examples and roadmap sections.
AC: keyboard-selectable stages; mobile layout without horizontal overflow; language preferences persist; links resolve under /spection; reduced motion respected.
ADR: retain CSS and React instead of adding a UI framework to minimize dependencies and preserve static export.
Verification plan: build, typecheck, inspect mobile/desktop, test navigation and controls. Results pending.

## Visual refinement
Added a responsive onboarding section, expanded CLI quickstart, value proposition cards, interactive release-readiness self-assessment, grouped footer, and refined documentation layout. Preserve consent controls and existing author links. Acceptance: no horizontal overflow at narrow widths, keyboard-accessible controls, actual copy feedback, checklist updates without network transmission, and valid static-export links. Build and browser checks pending for this revision.
