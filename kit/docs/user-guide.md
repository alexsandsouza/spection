# SPECTION Kit - Practical developer guide

## Who should use it?

Developers, students, software architects and teams building new systems or improving existing ones, with or without AI components.

## Prerequisites

Python 3.10+, a terminal, Git and an editor or coding assistant. The CLI uses only the Python standard library.

## First project

From the SPECTION repository:

```bash
python kit/spection.py init sample-app
cd sample-app
```

Read `AGENTS.md`; complete `docs/product-brief.md` and `docs/prd.md`. Do not mark anything Approved before stakeholder review.

Then complete `docs/hld.md`, `docs/lld.md`, and one or more `docs/adr/` decision records. Add a feature:

```bash
cd ..
python kit/spection.py feature sample-app account-login
```

The feature has `feature-spec.md`, `plan.md`, and `tasks.md`. Link RF-### / RNF-### IDs and explicit acceptance criteria.

## How to work with an AI assistant

Provide the assistant with the local `AGENTS.md`, the approved project context and only the relevant specification and skills. Ask it to:

1. Restate requirements and flag uncertainty.
2. Produce a plan without modifying production systems.
3. Make a bounded implementation.
4. Run available checks and report commands, outputs and failures.
5. Request human review and document deviations.

Never paste credentials, personal data or regulated information into a model unless an approved data-processing agreement, access controls and policy permit it.

## Checks

```bash
python kit/spection.py doctor sample-app
python kit/spection.py check sample-app
python -m unittest discover -s kit/tests -v
```

`doctor` checks structural prerequisites. `check` checks the presence of key artifacts and selected placeholder labels, **not** code correctness, OWASP compliance or successful product acceptance.

## Existing applications

Do not overwrite your repository. Run `init` in a separate staging directory, review the files, and selectively copy the documents into the existing application, preserving established conventions. Adoption guidance for existing codebases will expand in future releases.

## Human approval checkpoints

Before architecture commitment, changes to sensitive data handling, expensive infrastructure, external tool permissions, destructive database migrations and production deployment.

## Example

A booking application might start with RF-001 `A customer can request a booking`; FEAT-001 adds acceptance criteria, TASK-001 implements the endpoint, and TEST-001 validates expected and error paths. Do not claim success without an execution record.
