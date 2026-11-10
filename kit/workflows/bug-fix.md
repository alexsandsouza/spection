# Bug fix: Reproduce → Investigate → Patch → Regress

1. Record observable failure, environment and severity, redacting private data.
2. Create a failing regression test or reproducible procedure.
3. Investigate root cause and evaluate impact of alternatives.
4. Produce the smallest safe change.
5. Run the regression and related checks; keep actual evidence.
6. Review changes with the owner, update docs and release notes as required.

If production data is at risk, stop the affected operation and escalate.
