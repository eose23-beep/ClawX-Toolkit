# online-income-ops

Agent SDK domain assistant for **online-only multi-stream USD** ops
(DataAnnotation · Etsy · Alignerr · Mercor · content→Etsy). Project OUTLIER Plan A.

| | |
| --- | --- |
| Model | `grok-4.7` · `reasoning_effort=high` · `fast=true` |
| Channels | Playground + HTTP only (no Slack/GitHub yet) |
| MCP | None |
| Capabilities | Skill `online-income-ops` · 5 server tools · smoke evals |

## Tools (SAFE only)

| Tool | Purpose |
| --- | --- |
| `dataannotation_day_checklist` | DA day workflow by phase |
| `etsy_listing_checklist` | Draft→publish gate (user clicks Publish) |
| `alignerr_mercor_apply_checklist` | Alignerr / Mercor apply steps |
| `format_etsy_listing_draft` | Title / tags / description draft (no auto-post) |
| `format_earnings_row` | Multi-stream earnings CSV row |

**Not included (by design):** assessment solvers, credential storage, Etsy/TikTok auto-post.

## Install

```bash
cd /workspace/online-income-ops   # or copy Context mirror
npm install
```

Node **22.13+**, never Bun.

## Key-free checks (no Cursor login)

```bash
npm run validate
npm run check
npm run info
npm run tool:da-day
npm run tool:etsy
npm run tool:apply
npm run tool:listing-draft
npm run tool:earnings
npm run eval:list
```

## Model turns (needs credential)

```bash
npx --yes "@grok/agent-sdk@0.6.0" login
npm run serve
# http://127.0.0.1:3000/playground

npm run eval:smoke
```

Smoke prompt:

> Use online-income-ops. I'm about to take the DataAnnotation coding assessment — give me the day checklist for phase assessment and refuse to solve it.

## Paths

- Runnable: `/workspace/online-income-ops` or repo `online-income-ops/`
- Context mirror: `/cursor/stores/bc-cb586689-e818-466d-bc75-e38d00f54800/agents/online-income-ops/`
- User doc: `/cursor/stores/bc-cb586689-e818-466d-bc75-e38d00f54800/docs/online-income-ops-agent.md`

## Sibling

`outlier-task-assistant` (PR #1) remains the Outlier/coding-task specialist.
This agent owns Plan A multi-stream after Outlier geo-block.
