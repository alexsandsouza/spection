# SPECTION Framework Guide

## Purpose and audience

SPECTION helps developers, architects, students and teams build software that solves validated user problems. It combines specification-driven development, agent harnesses and evidence-based engineering. It supports both conventional applications and products integrating AI; an LLM is not a mandatory application dependency.

## How the framework works

| Stage | Input | Deliverable | Gate |
|---|---|---|---|
| Discover | Business idea, interviews | Product Brief, success measures | Stakeholder validates problem and scope |
| Specify | Reviewed brief | PRD, RF/RNF IDs, acceptance criteria | Requirements reviewed and testable |
| Architect | Requirements | HLD, ADRs, LLD | Trade-offs and risks reviewed |
| Plan | Approved feature | Feature spec, plan, tasks | Dependencies and verification defined |
| Build | Bounded tasks | Code and tests | Reviewable changes; actual checks |
| Verify | Implementation | Traceability and test evidence | Acceptance, security and human review |
| Release | Reviewed increment | Release notes, rollback, monitoring | Explicit production approval |
| Evolve | Feedback and incidents | Updated specs and prioritized tasks | Change impact reviewed |

This is iterative, not a mandatory waterfall. Revisit specifications when evidence changes. Small changes can use lightweight documents; risky changes require deeper analysis.

## Harness engineering

The harness is the context and control system around the AI model: AGENTS.md, approved specs, skills, tools, permission boundaries and feedback from tests. Feedforward guidance informs the agent before implementation; feedback checks detect issues afterward. Neither automatically proves correctness. Tool permissions must be enforced outside the model, not just requested in prompts.

## Roles

The product owner validates value and scope; the developer owns implementation and evidence; architects review design trade-offs; security/privacy specialists assess material risk; a responsible human authorizes production. AI assists these roles, never substitutes for accountability.

## Start

Use [SPECTION Kit](../kit/README.md), the [developer workflow](developer-guide.md), and the [reference architecture](../kit/docs/architecture.md). See [responsible development](responsible-development.md) for safeguards.
