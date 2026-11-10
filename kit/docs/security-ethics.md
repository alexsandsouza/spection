# Security, Privacy & Responsible AI

SPECTION is a process aid, **not a certification or compliance guarantee**. Organizations must obtain expert legal and security review for their context.

## Threats to consider

- Prompt injection through user input, documents, search results and tool outputs
- Jailbreak attempts and unsafe model behavior
- Sensitive-information leakage via prompts, logs, embeddings, telemetry and responses
- Excessive agent authority, unintended tool invocation and privilege escalation
- Unsafe output consumption (SQL, shell commands, HTML, code, external URLs)
- Model supply-chain and dependency risks
- Poisoned retrieval content, manipulated vector indexes and misleading citations
- Denial-of-wallet, quotas, latency spikes and service failures

## Controls

1. Least privilege for users, models, agents and integrations.
2. Strict schema validation and output encoding at trust boundaries.
3. Credential handling via secret managers / environment; never commit secrets.
4. Human authorization for payments, data deletion, bulk modifications, messages and deployment.
5. Vendor/data-transfer review; minimize data sent to model providers.
6. Rate limits, budgets, retries, circuit breakers and incident response plans.
7. Meaningful eval sets covering misuse, multilingual inputs, false claims and regressions.
8. Record real evidence, model versions and uncertainties; avoid invented metrics.

## Ethical design review

Ask: Is the system accessible? Are users informed where AI is used? Are impacts on vulnerable groups assessed? Is automation reversible? Are harms observable and contestable? Is privacy respected?

## References

- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/)
- [OWASP Agentic AI](https://genai.owasp.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Brazilian LGPD official law text](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)

Standards evolve. Check the official sources and applicable jurisdiction before declaring compliance.
