---
name: outlier-coding
description: >-
  Use when the user mentions Outlier, Outlier.ai, DataAnnotation, Alignerr,
  Mercor, Scale AI freelance coding, AI-training coding tasks, Day-0 onboarding,
  take/skip decisions, pre-submit review, escalation after reject, earnings
  logging, or Phase 1 income.
---

# Outlier coding (Phase 1 AI-task skill)

Operate coding/AI-eval contractor work with this Project's docs and ops kit.
**Canonical store:** `/cursor/stores/bc-cb586689-e818-466d-bc75-e38d00f54800/`
**Path index:** `references.md` (same folder). Install: `docs/outlier-skill-install.md`.

**USA default:** If Outlier is geo-blocked, drive **DataAnnotation** (`docs/dataannotation-usa-walkthrough.md`). Keep Outlier flows when the user is eligible.

## Hard rules (never violate)
1. No unauthorized AI/bots/scripts on platform assessments or tasks unless an admin requires a tool
2. No VPN/location spoof; payout accounts in the user's legal name only
3. No policy circumvention, fabricated results, plagiarism, or secret leakage
4. Trust **in-project shown rate**, not marketing "up to" ceilings
5. Treat assessment/onboarding pay as **UNCERTAIN** until the dashboard proves otherwise — log all minutes
6. Prefer escalate/clarify over guessing on critical requirements
7. Refuse requests to bypass platform Terms / Community Guidelines

## Authoritative docs (read, don't reinvent)
| Need | Doc |
|---|---|
| USA DataAnnotation onboarding | `docs/dataannotation-usa-walkthrough.md` |
| Verified open alternatives | `docs/phase1-alternatives.md` |
| Outlier Day 0 (if eligible) | `docs/day0-execution-runbook.md` |
| Economics + cadence | `docs/phase-1-outlier-playbook.md` |
| Outlier platform facts | `docs/outlier-platform-map.md` |
| Funnel → cash | `docs/first-paid-path.md` |
| Template index | `docs/outlier-ops-kit.md` |
| Install this skill | `docs/outlier-skill-install.md` |

Templates live under `internal/ops-kit/` — see `references.md`.

## Workflow A — Onboarding
1. USA / Outlier-blocked: follow `docs/dataannotation-usa-walkthrough.md`
2. Outlier-eligible: `docs/day0-execution-runbook.md` Sessions A→D
3. Confirm country eligibility before deep time investment
4. Log onboarding rows in `internal/ops-kit/earnings-tracker.csv`
5. Ask user for: account status, languages, hours/$, country, payout, blockers

## Workflow B — Task assist (paid work)
1. Identify type: **implement | review | fix | evaluate | explain**
2. Load matching brief from `internal/ops-kit/prompt-packs.md` (brief only — still verify)
3. Restate requirements; list open questions **before** producing work
4. Produce the smallest correct deliverable; include verification steps/commands
5. Run `internal/ops-kit/presubmit-checklist.md` — **all blockers must pass** or do not submit
6. If unclear/rejected: fill `internal/ops-kit/escalation-notes.md`
7. Log `task_id`, minutes, shown rate, status in earnings CSV

## Workflow C — Take / skip
**Take** when shown rate ≥ floor (default **$20/hr effective**), skill fit strong, guidelines clear, finish fits estimate, no banned tooling.

**Skip** when rate unclear/low, weak domain, banned tooling needed, tired, or empty-queue filler grind.

## Workflow D — Daily cadence
- Start: ≤5 min standup from `internal/ops-kit/daily-standup-eod.md`
- End: paid vs unpaid minutes, quality notes, tomorrow's first action
- Empty marketplace: 15–30 min check, then **stop**

## Output shapes
### Pre-submit review
- Blockers: pass/fail vs checklist
- Risks: ranked
- Ready to submit: **YES/NO** + next action

### Daily wrap
- Paid / unpaid minutes / logged $
- Quality notes
- Tomorrow's first action (≤15 min)

## Stop conditions
- 2 quality failures on one project → pause, requalify or switch
- Empty marketplace → 15–30 min check, then stop
- User asks to bypass platform policy → refuse and cite Terms / Guidelines
