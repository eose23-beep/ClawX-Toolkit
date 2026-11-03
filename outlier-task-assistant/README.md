# outlier-task-assistant

Agent SDK domain assistant for Outlier.ai coding-task workflows (Project OUTLIER).

| | |
| --- | --- |
| Model | `grok-4.7` · `reasoning_effort=high` · `fast=true` |
| Channels | Playground + HTTP only (no Slack/GitHub yet) |
| MCP | None |
| Capabilities | Skill `outlier-coding` · 3 server tools · 2 smoke evals |

## Tools

| Tool | Purpose |
| --- | --- |
| `presubmit_blockers` | Must-pass pre-submit checklist |
| `take_skip_advisor` | Take / skip / clarify from rate + fit |
| `format_earnings_row` | One earnings-tracker CSV row |

## Install

```bash
cd /workspace/outlier-task-assistant   # or copy Context mirror
npm install
```

Node **22.13+**, never Bun.

## Key-free checks (no Cursor login)

```bash
npm run validate
npm run check
npm run info
npm run tool:presubmit
npm run tool:take-skip
npm run tool:earnings
npm run eval:list
```

## Model turns (needs credential)

Cloud / this VM is **unsigned**. On your machine:

```bash
npx --yes "@grok/agent-sdk@0.6.0" login
# or export CURSOR_API_KEY / CURSOR_API_KEY_FILE / CURSOR_SERVICE_ACCOUNT_KEY

npm run serve
# http://127.0.0.1:3000/playground

npx --yes "@grok/agent-sdk@0.6.0" run --dir . --message \
  'Use outlier-coding. Run presubmit_blockers for a review task.'

npm run eval:smoke
```

Smoke prompt:

> Use outlier-coding. I have an Outlier review task — run presubmit_blockers before I submit.

## Paths

- Runnable: `/workspace/outlier-task-assistant`
- Context mirror (no `node_modules`): `/cursor/stores/bc-cb586689-e818-466d-bc75-e38d00f54800/agents/outlier-task-assistant/`
- User doc: `/cursor/stores/bc-cb586689-e818-466d-bc75-e38d00f54800/docs/outlier-task-assistant.md`

## Deploy

Do not deploy until asked. Operator handoff:

```bash
npx --yes "@grok/agent-sdk@0.6.0" validate --dir .
npx --yes "@grok/agent-sdk@0.6.0" deploy --dir . --dry-run
npx --yes "@grok/agent-sdk@0.6.0" deploy --dir .   # operator terminal only
```
