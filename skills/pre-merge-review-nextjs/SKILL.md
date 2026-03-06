---
name: pre-merge-review-nextjs
description: Strict pre-merge review for Next.js + TypeScript changes with GO/NO-GO verdict. Use when validating pull requests or local diffs before merge, including behavior/regression checks, mandatory lint/typecheck runs, UI scroll edge-cases (Safari/trackpad/mobile), and project-specific architecture/comment rules in changed .tsx files.
---

# Pre-Merge Review Next.js

Run a strict review of current changes and produce a merge decision.

## Workflow

1. Collect scope of review.
- Run `git status --short`.
- Collect unstaged files: `git diff --name-only --diff-filter=ACMRTUXB`.
- Collect staged files: `git diff --cached --name-only --diff-filter=ACMRTUXB`.
- Collect committed-but-not-merged files against upstream:
  - `UPSTREAM=$(git rev-parse --abbrev-ref --symbolic-full-name @{upstream} 2>/dev/null || true)`
  - If `UPSTREAM` is not empty:
    - `BASE=$(git merge-base HEAD "$UPSTREAM")`
    - `git diff --name-only --diff-filter=ACMRTUXB "$BASE"...HEAD`
  - If `UPSTREAM` is empty, fallback:
    - try `origin/main`, then `origin/master`
    - use `BASE=$(git merge-base HEAD <fallback-branch>)`
    - run `git diff --name-only --diff-filter=ACMRTUXB "$BASE"...HEAD`
- Build one deduplicated review file list from all sources above. Do not review only working tree diff when branch has local commits.

2. Review changed files for behavior and regressions.
- Focus on runtime behavior, broken flows, and side effects.
- For each finding, capture severity: `Critical`, `Major`, or `Minor`.
- Always report exact `file + line + risk`.

3. Enforce project rules on changed `.tsx` files.
- Confirm a header comment exists at line 0 in each changed `.tsx`.
- Confirm comments exist above important blocks:
  - page data holders,
  - auto-run logic on load,
  - click/submit handlers,
  - large UI sections (lists/forms/modals).
- Confirm no HOC patterns.
- Confirm no render props patterns.
- Confirm no custom hooks (no new project logic extracted into `use*` helpers).

4. Run mandatory checks.
- Run `npm run lint`.
- Run `npm run typecheck`.
- Save pass/fail and key error summary.

5. Validate UI scroll edge-cases for relevant UI changes.
- Use checklist in `references/checklist.md`.
- Explicitly cover Safari behavior, trackpad inertial scrolling, and mobile viewport/overscroll.

6. Produce final report in this exact structure:
- `Verdict: GO` or `Verdict: NO-GO`
- `Scope summary:` what sources were used (`unstaged`, `staged`, `committed-vs-upstream`) and how many files were reviewed
- `Findings:`
  - `Critical`
  - `Major`
  - `Minor`
- For each finding: `file:line` + risk statement
- `Manual checks:` checklist with pass/fail
- `Command results:` output summary for lint/typecheck
- If no blockers: `Blocking issues not found.`

## Severity Rules

- `Critical`: merge blocker, high risk of broken core behavior, data loss, build/runtime failure, or policy violation.
- `Major`: significant quality/UX/performance issue with meaningful regression risk.
- `Minor`: low-risk issue, readability/consistency/small UX concerns.

If any `Critical` exists, return `Verdict: NO-GO`.

## Output Template

```text
Verdict: GO|NO-GO

Scope summary:
- unstaged: <count/files>
- staged: <count/files>
- committed-vs-upstream: <count/files>
- deduplicated total: <count/files>

Findings:
Critical:
- <file:line> - <risk>
Major:
- <file:line> - <risk>
Minor:
- <file:line> - <risk>

Manual checks:
- [ ] <check item> - Pass|Fail - <note>

Command results:
- npm run lint: Pass|Fail - <short summary>
- npm run typecheck: Pass|Fail - <short summary>

Blocking issues not found.
```

Remove `Blocking issues not found.` when blockers exist.
