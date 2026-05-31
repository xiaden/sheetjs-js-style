# Full Rebase Surgery Notes

Date: 2026-05-31  
Branch: `fork/full-rebase-success`  
Pin SHA: `53a86521238ec8c53fee69ca500a6b559a5b535a`

## Goal

Rebase `origin/version-1.3.0` onto upstream default branch `upstream/github` while preserving practical runtime compatibility for browser bundle pinning.

## Outcome

- Rebase completed on `fork/full-rebase-success`.
- Decision log captured at:
  - `D:\Github\report-thingy\build_resoources\rebase-surgery.log`
- Summary from decision log:
  - `action=keep-upstream`: 308
  - `action=skip`: 6
  - `action=rm`: 1

## Explicitly Skipped Commits

These were skipped to avoid unreconcilable legacy conflicts with modern upstream layout:

1. `d2fb130` — added style code from `sheetjs-style` and `sheetjs-style-v2` (legacy `xlsx.js` monolith conflict)
2. `43c3519` — added typedefs for styles (legacy type path conflict)
3. `7c5a6d8` — commented ga (legacy demo/index conflict)
4. `5d06ae7` — removed unused sheetjs project files (`test_files` gitlink conflict)
5. `179007b` — updated for new project (`bower.json` resurrection conflict)
6. `13df513` — moved dep libs to libs folder (legacy libs rename/delete conflict)

## Practical Pin Target

Use browser dist artifact from this branch/SHA:

- `dist/xlsx.bundle.js`

## Validation Done

- Runtime loaded directly from `dist/xlsx.min.js`:
  - `version`: `0.18.5`
  - `style_version`: `1.2.0`
- Workbook smoke test vs company files (`inbound reports/*.xlsx`):
  - total: 10
  - ok: 10
  - fail: 0

## Caveats

- `npm ci` is not currently lockfile-synced on this rebased branch.
- `npm run ship` is unavailable in this post-rebase package metadata shape.
- This branch is intended as a **pin/stability artifact branch** (validated dist), not yet a fully modernized build-maintainer branch.

## Next Modernization Steps (if desired)

1. Normalize package metadata (`name`, scripts, lockfile sync).
2. Re-introduce a deterministic build pipeline for dist regeneration.
3. Port skipped style/type commits onto current upstream source architecture (instead of legacy file paths).
