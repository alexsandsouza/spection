# Model & Agent Evaluation Plan

## Evaluation profile

- User journey and business outcome:
- Model / version / provider:
- Prompt / tool configuration:
- Data classification / approval:
- Test dataset provenance:
- Date / execution environment:

## Metrics

| Dimension | Example measurement | Acceptance threshold | Actual evidence |
|---|---|---|---|
| Task quality | Task success rate on representative cases | Set before test | Pending |
| Safety | Allowed/disallowed behavior and prompt-injection tests | Set before test | Pending |
| Privacy | Sensitive data exposure cases | Set before test | Pending |
| Reliability | Repeated-run variance and tool failures | Set before test | Pending |
| Latency | p50 / p95 end-to-end response | Set before test | Pending |
| Cost | Cost per successful transaction | Set before test | Pending |
| Human experience | Satisfaction, accessibility and overrides | Set before test | Pending |

## Evaluation rules

Use representative, legally obtained datasets. Keep holdout examples. Test actual tool boundaries, not only text quality. Track failures and regressions. Do not say 'passed' unless there is a verifiable run identifier.
