# Pre-Merge Manual Checklist (Next.js/TypeScript)

Use this checklist in the `Manual checks` section of the report.

## 1) Behavior and Regressions
- [ ] Main user flow still works after changes.
- [ ] No new console errors or visible runtime failures.
- [ ] Empty/loading/error states are handled.
- [ ] Changed logic does not break related pages/components.

## 2) Project Rules in Changed `.tsx`
- [ ] Header comment exists at line 0 in every changed `.tsx`.
- [ ] Important blocks have plain-language comments above them.
- [ ] No HOC introduced.
- [ ] No render props pattern introduced.
- [ ] No custom hook introduced (`use*` helper for extracted logic).

## 3) UI Scroll Edge-Cases
- [ ] Safari: scroll container behaves correctly (no stuck/jerky scroll).
- [ ] Safari: sticky/fixed elements do not overlap content while scrolling.
- [ ] Trackpad: inertial scroll does not cause jumpy snapping or scroll lock.
- [ ] Trackpad: nested scroll areas keep expected focus and direction.
- [ ] Mobile: page does not trap scroll unexpectedly.
- [ ] Mobile: no layout jump from dynamic browser bars.
- [ ] Mobile: overscroll/bounce does not expose broken background or clipped content.

## 4) Commands
- [ ] `npm run lint` passed.
- [ ] `npm run typecheck` passed.
