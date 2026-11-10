#!/usr/bin/env python3
"""SPECTION Kit CLI: safe, offline, standard-library project scaffolding."""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

NAME = re.compile(r"^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$")
REQUIRED = (
    "AGENTS.md",
    "docs/product-brief.md",
    "docs/prd.md",
    "docs/hld.md",
    "docs/lld.md",
    "docs/adr/0001-template.md",
    "docs/security-review.md",
    "specs/_template/feature-spec.md",
    "specs/_template/plan.md",
    "specs/_template/tasks.md",
)
DOCUMENTS = {
    "AGENTS.md": """# AI Agent Operating Rules

Read the approved brief, requirements, architecture and feature spec before writing code.
Do not invent approvals, business rules, successful tests or citations.
Protect secrets and personal data. Ask before deployments, destructive actions,
payments, external communications or sharing data with third parties.
Keep requirement -> task -> test -> evidence traceability.
A human reviewer must approve decisions and release.
""",
    "docs/product-brief.md": """# Product Brief

**Project:** {project}
**Status:** Draft - human approval required

## Problem and evidence
[Who needs what, and why?]

## Users, goals and success metrics
[Personas, outcomes, measurements]

## Scope and exclusions
[In scope / out of scope]

## Risks, constraints and assumptions
[Data, budget, timing, accessibility and compliance]

## Human approval
[Reviewer, date, decision]
""",
    "docs/prd.md": """# Product Requirements

**Status:** Draft - human approval required

| ID | Requirement | Acceptance criteria | Status |
|---|---|---|---|
| RF-001 | [Observable behavior] | Given ... When ... Then ... | Draft |
| RNF-001 | [Measurable quality attribute] | [Objective test method] | Draft |

## Data and privacy
[Classification, processing purpose, retention and access]

## Outstanding questions
[Clarification required]
""",
    "docs/hld.md": """# High-Level Design

**Status:** Draft

## System context, components and boundaries
[Users, external systems, trust boundaries]

## Architecture diagram
\`\`\`mermaid
flowchart LR
  User --> Application
  Application --> Storage
\`\`\`

## Quality trade-offs and ADR references
[Alternatives and decisions to review]
""",
    "docs/lld.md": """# Low-Level Design

**Status:** Draft

## Interfaces and contracts
[Endpoints, input/output, errors, authentication]

## Data and algorithms
[Entities, constraints, transactions and edge cases]

## Observability, security and tests
[Expected evidence, not invented results]
""",
    "docs/adr/0001-template.md": """# ADR-0001: [Decision title]

**Status:** Proposed

## Context
[Why is a decision needed?]

## Alternatives and trade-offs
[Options and evaluation]

## Proposed decision and consequences
[Reviewable rationale and risks]

## Approval
[Reviewer and date]
""",
    "docs/security-review.md": """# Security, Privacy and Ethics Review

**Status:** Pending review

## Assets, actors and trust boundaries
[Threat model]

## Threats and controls
[Injection, access, secrets, insecure output and model risks if AI is used]

## Privacy and fairness
[Data minimization, notices, accessibility and human recourse]

## Verification evidence and risk acceptance
[Commands, results and human reviewer]
""",
    "specs/_template/feature-spec.md": """# FEAT-001: [Feature]

**Status:** Draft
**Requirements:** RF-001

## User story
As a [role] I want [behavior] so that [outcome].

## Acceptance criteria
- AC-001: Given ... When ... Then ...

## Edge cases and permissions
[Required behavior and failures]

## Human review
[Decision]
""",
    "specs/_template/plan.md": """# Implementation Plan

**Feature:** FEAT-001

## Approach and dependencies
[Smallest safe increment; HLD, LLD and ADR references]

## Test strategy and rollback
[How to verify and revert]

## Review
[Owner and decision]
""",
    "specs/_template/tasks.md": """# Tasks

| ID | Requirement | Task | Acceptance | Test | Status |
|---|---|---|---|---|---|
| TASK-001 | RF-001 | [Task] | AC-001 | TEST-001 | Todo |

## Evidence log
[Actual executed commands and results]
""",
}
FEATURE_DOCS = {
    "feature-spec.md": """# Feature: {feature}

**Status:** Draft
**Related requirements:** RF-001

## User story
As a [role], I want [capability], so that [outcome].

## Acceptance criteria
- AC-001: Given ... When ... Then ...

## Threats, failures and accessibility
[Assess for this feature]

## Human approval
[Reviewer, date]
""",
    "plan.md": """# Plan: {feature}

## Solution and architecture references
[HLD, LLD and ADR references]

## Tasks and dependencies
[Incremental stages]

## Test strategy and rollback
[Tests to execute and safe reversal]
""",
    "tasks.md": """# Tasks: {feature}

| ID | Requirement | Acceptance | Task | Verification | Status |
|---|---|---|---|---|---|
| TASK-001 | RF-001 | AC-001 | [Implement] | TEST-001 | Todo |

## Executed evidence
[No unverified claims]
""",
}

def validate_name(value: str) -> str:
    if not NAME.fullmatch(value):
        raise ValueError("Use lowercase letters, digits and hyphens, starting with a letter.")
    return value

def ensure_target(parent: Path, name: str) -> Path:
    validate_name(name)
    return parent.resolve() / name

def write_new(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("x", encoding="utf-8") as stream:
        stream.write(content)

def init(parent: Path, name: str) -> Path:
    target = ensure_target(parent, name)
    if target.exists():
        raise FileExistsError("Target already exists; SPECTION never overwrites a project.")
    target.mkdir(parents=True)
    for rel, content in DOCUMENTS.items():
        write_new(target / rel, content.replace("{project}", name))
    print("Created:", target)
    print("Next: fill docs/product-brief.md and request stakeholder approval.")
    return target

def doctor(project: Path) -> int:
    if not project.is_dir():
        print("Project directory not found:", project, file=sys.stderr)
        return 1
    missing = [rel for rel in REQUIRED if not (project / rel).is_file()]
    if missing:
        for rel in missing:
            print("MISSING:", rel)
        return 1
    print("OK: required SPECTION files are present.")
    return 0

def check(project: Path) -> int:
    if doctor(project):
        return 1
    issues = []
    for rel in REQUIRED:
        if not (project / rel).read_text(encoding="utf-8").strip():
            issues.append(rel + " is empty")
    for issue in issues:
        print("ISSUE:", issue)
    if issues:
        return 1
    print("OK: basic file checks completed; content, security and tests still require review.")
    return 0

def feature(project: Path, slug: str) -> Path:
    validate_name(slug)
    if doctor(project):
        raise ValueError("Project is not initialized or required files are missing.")
    target = project.resolve() / "specs" / slug
    if target.exists():
        raise FileExistsError("Feature already exists; nothing overwritten.")
    target.mkdir(parents=True)
    for filename, content in FEATURE_DOCS.items():
        write_new(target / filename, content.replace("{feature}", slug))
    print("Created feature:", target)
    print("Next: map RF/RNF IDs, define acceptance criteria and request review.")
    return target

def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="SPECTION Kit: safe offline SDD scaffolding")
    commands = parser.add_subparsers(dest="command", required=True)
    p_init = commands.add_parser("init", help="Create a new project in the current directory")
    p_init.add_argument("name")
    p_feature = commands.add_parser("feature", help="Create a feature spec in a project")
    p_feature.add_argument("project", type=Path)
    p_feature.add_argument("slug")
    for command in ("doctor", "check"):
        p = commands.add_parser(command, help="Inspect project documentation")
        p.add_argument("project", type=Path)
    args = parser.parse_args(argv)
    try:
        if args.command == "init":
            init(Path.cwd(), args.name)
            return 0
        if args.command == "feature":
            feature(args.project, args.slug)
            return 0
        if args.command == "doctor":
            return doctor(args.project)
        if args.command == "check":
            return check(args.project)
    except (ValueError, OSError) as exc:
        print("ERROR:", exc, file=sys.stderr)
        return 1
    return 2

if __name__ == "__main__":
    raise SystemExit(main())
