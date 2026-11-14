# SPECTION + FreeClaw AI Bridge (MVP)

**Status:** experimental, review-first integration. This is **not** a complete OpenClaw/OmniRoute installation or autonomous software factory.

The bridge reads four SPECTION artifacts, constructs a supervised engineering prompt and can optionally send it to an **OpenAI-compatible chat-completions endpoint** (for example, a *separately configured* local OmniRoute or another compatible gateway).

## Start on Windows (PowerShell)

From the SPECTION repository:

```powershell
python kit/spection.py init demo-app
# Edit and review demo-app/docs/{product-brief,prd,hld,lld}.md first.
python integrations/freeclaw/bridge.py demo-app
```

The last command is a **dry run** and makes **no API request**.

To opt in after reviewing the documents and configuring an endpoint:

```powershell
$env:FREECLAW_ENDPOINT = "http://127.0.0.1:8080/v1/chat/completions"
$env:FREECLAW_MODEL = "your-provider-model-id"
$env:FREECLAW_API_KEY = "your-local-key-if-required"
python integrations/freeclaw/bridge.py demo-app --task "Propose an RF-001 implementation plan" --send --output draft-plan.md
```

The endpoint above is an **example**, not a claim that OmniRoute runs on port 8080. Set the actual URL exposed by the gateway. `draft-plan.md` must not already exist. Nothing automatically applies model output to the project.

## Safety and costs

- All network calls require explicit `--send`.
- Uses standard-library Python (3.10+). No API key is committed or logged.
- The code blocks a few common key patterns, but **cannot reliably detect every secret or personal detail**. Review documents manually before transmitting.
- Outbound HTTPS is required, except HTTP to localhost; avoid exposing a local gateway publicly.
- Providers control billing, quotas and available models. This bridge **does not** guarantee zero cost or provide fallback; configure those policies in your gateway before sending.
- No auto-install, execution of generated code, deployment, or autonomous GitHub pushes.
- Maintain SPECTION's human quality gates and requirement -> test -> evidence traceability.

## Run tests

```bash
python -m unittest discover -s tests -p 'test_freeclaw_bridge.py' -v
```

## Next steps

1. Add an explicit free-only gateway policy and usage monitoring.
2. Implement model capability discovery and a mocked failover integration test.
3. Create a SPECTION skill for guided specification-to-code development.
4. Add an optional local dashboard and explicit approval for edits / pull requests.
