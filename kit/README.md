# SPECTION Kit

**Open, vendor-neutral toolkit for responsible AI-guided software delivery.**

SPECTION Kit is the practical, executable companion to the SPECTION framework. It is an original implementation, not a fork or replacement of GitHub Spec Kit.

## What is included

- A minimal Python standard-library CLI (`kit/spection.py`)
- Reusable product, architecture and feature templates
- Guided workflow descriptions for new projects, features, fixes and releases
- Policy templates for security, ethical review and AI evaluation
- Repository checks and local unit tests
- Documentation in English and Portuguese

## Quickstart

Requirements: Python 3.10 or newer. No API keys or paid services required.

Clone this repository and run:

```bash
python kit/spection.py init my-project
python kit/spection.py doctor my-project
python kit/spection.py feature my-project user-registration
python kit/spection.py check my-project
```

Commands create files locally; no AI API is called and nothing is deployed. The CLI refuses to overwrite existing files and rejects unsafe path names. Review generated templates before giving them to an AI agent.

## Workflow

1. **Discover:** define problem, users, outcomes and exclusions.
2. **Specify:** record RF/RNF requirements and testable acceptance criteria.
3. **Architect:** draft HLD and LLD with ADRs for trade-offs.
4. **Plan:** split feature work into traceable, small tasks.
5. **Build:** develop with an AI agent constrained by AGENTS.md.
6. **Verify:** execute tests, review security and record evidence.
7. **Release:** obtain human approval, document rollback and monitor.

In production-facing workflows, human review is mandatory.

## Important distinctions

- **SPECTION Framework:** methodology and documentation (root `docs/`, `.agents/skills/`).
- **SPECTION Kit:** bootstrap and validation tooling plus repeatable workflows (`kit/`).
- **GitHub Spec Kit:** separate upstream project. SPECTION does not claim compatibility with Spec Kit commands or extensions.

## Documentation

- [User guide](docs/user-guide.md)
- [Architecture diagram](docs/architecture.md)
- [Security, privacy and ethics](docs/security-ethics.md)
- [Workflow catalog](workflows/README.md)
- [Glossary](../GLOSSARY.md)

## Scope

Version 0.2 foundation is an offline CLI and templates. It is **not** a web application, an AI model, a guaranteed compliance audit or a substitute for secure software review.
