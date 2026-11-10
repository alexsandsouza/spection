# SPECTION Examples

These are illustrative specification exercises, not deployed applications.

## 1. Booking API (conventional software)
Read the [worked example](../docs/developer-guide.md). Start with RF-001 booking creation and RF-002 conflict prevention. Design a transaction boundary and test simultaneous requests. Record results in the traceability matrix.

## 2. AI document assistant
Specify approved sources, permissions and citations. Compare deterministic search with RAG in an ADR. Define refusal when no evidence exists, test prompt injection and unauthorized retrieval, and measure quality, p95 latency and cost. Use the [AI integration workflow](../kit/workflows/ai-integration.md) and [evaluation template](../kit/docs/model-evaluation.md).

## 3. Existing application
Choose one small change, inventory current behavior, write an acceptance test and feature spec, then implement a minimal patch. Follow the [bug-fix workflow](../kit/workflows/bug-fix.md).

No example claims executed tests or production readiness.
