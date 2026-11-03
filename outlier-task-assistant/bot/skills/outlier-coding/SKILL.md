---
name: outlier-coding
description: >-
  Use when the user mentions Outlier, Outlier.ai, Scale AI freelance coding,
  AI-training coding tasks, Day-0 onboarding, take/skip decisions, pre-submit
  review, escalation after reject, earnings logging, or Phase 1 Outlier income.
---

# Outlier coding

Operate Outlier.ai coding/AI-eval work with this Project’s docs and ops kit.
**Canonical store:** `/cursor/stores/bc-cb586689-e818-466d-bc75-e38d00f54800/`
**Path index:** `references.md` (same folder). Install: `docs/outlier-skill-install.md`.

## Hard rules (never violate)
1. No unauthorized AI/bots/scripts on Outlier assessments or tasks unless an admin requires a tool
2. No VPN/location spoof; payout accounts in the user’s legal name only
3. No policy circumvention, fabricated results, plagiarism, or secret leakage
4. Trust **in-project shown rate**, not marketing “up to” ceilings
5. Treat assessment/onboarding pay as **UNCERTAIN** until the dashboard proves otherwise — log all minutes
6. Prefer escalate/clarify over guessing on critical requirements
7. Refuse requests to bypass Outlier Community Guidelines / Terms

## Authoritative docs (read, don’t reinvent)
| Need | Doc |
|---|---|
| Execute Day 0 | `docs/day0-execution-runbook.md` (Sessions A→D) |
| Economics + cadence | `docs/phase-1-outlier-playbook.md` |
| Sourced platform facts | `docs/outlier-platform-map.md` |
| Funnel → cash | `docs/first-paid-path.md` |
| Template index | `docs/outlier-ops-kit.md` |
| Install this skill | `docs/outlier-skill-install.md` |

Templates live under `internal/ops-kit/` — see `references.md`.

## Workflow A — Day 0 / onboarding
1. Open `docs/day0-execution-runbook.md`; drive Sessions A→D in order
2. Confirm permitted country before deep time investment
3. Profile defaults from `internal/ops-kit/profile-blurbs.md`
4. Log onboarding rows in `internal/ops-kit/earnings-tracker.csv` (`onboarding` / unpaid-or-unknown)
5. End of Day-0: fill `internal/ops-kit/daily-standup-eod.md`
6. Ask user for: account status, languages, hours/$, country, payout, blockers

## Workflow B — Task assist (paid work)
1. Identify type: **implement | review | fix | evaluate | explain**
2. Load matching brief from `internal/ops-kit/prompt-packs.md` (brief only — user/agent still verifies)
3. Restate requirements; list open questions **before** producing work
4. Produce the smallest correct deliverable; include verification steps/commands
5. Run `internal/ops-kit/presubmit-checklist.md` — **all blockers must pass** or do not submit
6. If unclear/rejected: fill `internal/ops-kit/escalation-notes.md` (verbatim feedback + next action)
7. Log `task_id`, minutes, shown rate, status in earnings CSV (+ markdown table if useful)
8. Prefer verified submits inside **Tue–Mon midnight UTC** for Tuesday processing

## Workflow C — Take / skip
**Take** when shown rate ≥ floor (default **$20/hr effective**, all minutes), skill fit is strong, guidelines clear, finish fits estimate, and work needs no banned tooling.

**Skip** when rate unclear/low, weak domain, banned tooling needed, tired (quality risk), or empty-queue filler grind.

Three tasks in a row under the floor after honest time → exit or raise the bar (playbook).

## Workflow D — Daily cadence
- Start: ≤5 min standup from `internal/ops-kit/daily-standup-eod.md` (queue? rate? first ≤15 min action?)
- End: paid vs unpaid minutes, quality notes, one process tweak, tomorrow’s first action
- Empty marketplace: 15–30 min profile/opportunity check, then **stop**

## Output shapes
### Pre-submit review
- Blockers: pass/fail vs `presubmit-checklist.md`
- Risks: ranked
- Ready to submit: **YES/NO** + next action

### Daily wrap
- Paid minutes / unpaid minutes / logged $
- Quality notes (rejects, near-misses)
- Tomorrow’s first action (≤15 min)

### Escalation packet
- Task ID, verbatim conflict excerpt, what was submitted, QM/reviewer feedback, decision (War Room / redo / abandon)

## Stop conditions
- 2 quality failures on one project → pause, re-read guidelines, requalify or switch
- Empty marketplace → 15–30 min check, then stop
- User asks to bypass Outlier policy → refuse and cite Community Guidelines / Terms
