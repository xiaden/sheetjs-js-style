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
  - `style_version`: `1.3.0`
- Workbook smoke test vs company files (`inbound reports/*.xlsx`):
  - total: 10
  - ok: 10
  - fail: 0
- `npm run ship` succeeds using new `esbuild`-based `scripts/ship.mjs` pipeline.
- `npm test` succeeds (`tests/smoke.cjs` + `tsc -p tests/tsconfig.json`).

## Caveats

- This branch is intended as a **pin/stability artifact branch** (validated dist), not yet a fully modernized build-maintainer branch.

## Next Modernization Steps (if desired)

1. Normalize package metadata (`name`, scripts, lockfile sync).
2. Re-introduce a deterministic build pipeline for dist regeneration.
3. Port skipped style/type commits onto current upstream source architecture (instead of legacy file paths).

## Migration checklist

- [x] Inventory current fork build/test gaps
- [x] Confirm upstream still uses legacy test tooling in places
- [x] Import upstream-style test corpus and fixture manifests
- [x] Replace Makefile-era script hooks with local Node/ESLint runners
- [x] Add fork-specific style smoke coverage
- [x] Reintroduce richer upstream-style test coverage incrementally
- [x] Revisit deprecated QA-only dependencies after tests are stable
- [x] Replace dtslint with compiler-based typecheck
- [x] Remove sinon from the dependency tree
- [x] Review gulp-sourcemaps tradeoff
- [x] Migrate ship pipeline from gulp to esbuild (with sourcemaps + banner + cpexcel path rewrite)

## Checklist execution notes

- First execution pass: replace the broken `make`-based `npm test` path with a local smoke test runner.
- Imported a small, fork-specific fixture-backed smoke suite to validate style roundtrips.
- Keep the upstream test corpus import as the next step, rather than blocking on legacy tooling parity.
- Replaced `dtslint` with `npm run typecheck` powered by `tsc -p tests/tsconfig.json`.
- Upgraded `typescript` to `^5.8.3` so the local compiler can parse the current dependency graph.
- Removed `sinon`; the fork’s tests now use built-in assertions and a small fixture runner instead.
- `ship` now runs through `scripts/ship.mjs` (esbuild), preserving output filenames, banner format, sourcemaps, cpexcel path rewrite, and demo copy behavior.
- Added `tests/fixtures/corpus-manifest.json` and `tests/corpus.cjs` to validate read/write roundtrips against an internet-sourced public corpus (`tests/fixtures/public-corpus`, 5 fixtures).
- ESLint is now configured to stop flagging legacy `eslint-disable` directives as warnings (`reportUnusedDisableDirectives: "off"`), eliminating the remaining lint noise in this branch.
