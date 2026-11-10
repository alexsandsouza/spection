# Developer Guide - Accelerate software delivery with SPECTION

## Installation and first project

Install Git and Python 3.10+. From a terminal:

```bash
git clone https://github.com/alexsandsouza/spection.git
cd spection
python kit/spection.py init my-app
python kit/spection.py feature my-app account-login
python kit/spection.py doctor my-app
python kit/spection.py check my-app
```

No API key is required by the CLI. It generates local documents, not application code. Open my-app in your editor and supply AGENTS.md plus relevant project files to your chosen coding assistant. Skills live in the SPECTION repository; provide the relevant SKILL.md explicitly if your agent does not discover them.

## Practical scenario: appointment booking

1. **Discover:** Interview reception staff and customers; record appointment conflicts and expected outcomes in the Product Brief.
2. **Specify:** RF-001: a customer requests an available slot. RF-002: overlapping bookings are rejected. RNF-001: define measurable response-time target with stakeholders.
3. **Architect:** HLD: browser, API, transactional database. ADR: choose database constraints rather than relying on client-side checks. LLD: define booking endpoint, authorization, conflict response and transaction behavior.
4. **Plan:** FEAT-001 links RF-001/RF-002; AC-001 accepts an available slot; AC-002 rejects concurrent conflicts; TASK-001 implements data constraint; TASK-002 tests concurrency.
5. **Build:** Ask the agent for a minimal patch on a branch. Review code and run unit/integration tests with the chosen stack.
6. **Verify:** Record command, environment, actual result and commit. Mark criteria verified only when evidence supports them.
7. **Release:** review privacy, backup, migration, rollback and monitoring. Obtain explicit approval.

## Example prompt to use with your agent

> Read AGENTS.md, docs/prd.md, docs/hld.md, docs/lld.md and the active feature spec. Restate the goal, assumptions and acceptance criteria. Propose the smallest implementation plan with requirement IDs, tests and security considerations. Do not edit unrelated files or deploy. After implementation, run applicable checks and report exact results, remaining risks and documentation changes.

## How SPECTION can accelerate work

- Reduce repeated context setup using stable, versioned specifications and skills.
- Reduce rework by resolving ambiguity before implementation.
- Split work into small parallelizable tasks only after dependencies are known.
- Generate drafts, test cases and review checklists; humans validate outputs.
- Automate repeatable checks in CI and reuse architectural decisions.

Measure before claiming improvement: lead time from accepted requirement to release, review/rework hours, escaped defects, change failure rate, deployment frequency and cost per delivered feature. Compare equivalent work against a baseline. There is no guaranteed speedup.

## Existing projects

Start in a separate directory; inventory current interfaces, tests, dependencies and architecture. Copy only reviewed templates, preserve existing conventions, and introduce SPECTION incrementally around one feature. Never overwrite existing files blindly.
