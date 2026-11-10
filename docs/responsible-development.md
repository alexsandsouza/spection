# Responsible Software Engineering

## Market alignment

Validate the problem with real stakeholders. Define measurable outcomes and constraints before selecting technology. Prioritize valuable, feasible features, accessibility, maintainability and total cost. Review results after release rather than equating shipped features with impact.

## Security, privacy and ethics gates

Before implementation: identify assets, trust boundaries, misuse cases, data classification, applicable obligations and owners. Use least privilege, secrets management, input validation, dependency review and secure defaults. For AI features, address prompt injection, excessive agency, data leakage, unsafe output handling, retrieval poisoning and cost abuse.

Before release: execute applicable tests and record actual evidence; review privacy notices, retention, consent or other lawful basis where applicable, accessibility and foreseeable harms. Provide human review and recourse for consequential automated decisions. Require human approval for production changes and sensitive actions.

After release: monitor reliability, cost, security incidents and user outcomes; document rollback and incident handling.

## AI-specific design

Compare deterministic approaches with model-based alternatives. Evaluate quality, latency, costs, privacy and failure behavior using representative cases. Use AI gateways, RAG, agents, vector databases or cloud services only when justified. Review [model evaluation](../kit/docs/model-evaluation.md), [AI architecture](../kit/docs/architecture.md) and [security guidance](../kit/docs/security-ethics.md).

SPECTION is not a certification or legal opinion. Obtain qualified review for relevant laws, regulated domains and security requirements. A checklist cannot guarantee security or ethical outcomes.
