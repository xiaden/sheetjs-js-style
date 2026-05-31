# Upstream Notes

Track upstream changes from reference repositories and record port decisions.

## Sources

- SheetJS reference: `https://github.com/SheetJS/sheetjs`
- xlsx-js-style reference: `https://github.com/gitbrent/xlsx-js-style`

## Decision Log Template

| Date | Source Repo | Upstream Commit | Area | Decision | Local Commit | Notes |
|---|---|---|---|---|---|---|
| YYYY-MM-DD | sheetjs / xlsx-js-style | `<sha>` | parser / writer / build / tests | ported / skipped / rewritten | `<sha>` | rationale |

## Current Position

- Repository identity: standalone hybrid line
- Upstream policy: selective backporting
- Default approach: prefer minimal, test-backed ports over large sync merges
