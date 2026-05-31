# sheetjs-js-style

Standalone spreadsheet toolkit with style support.

## Project lineage

This project is a **hybrid modernization** derived from both:

- `SheetJS/sheetjs`
- `gitbrent/xlsx-js-style`

It is **not** a pure fork or drop-in mirror of either upstream. Structure,
packaging, and implementation details intentionally diverge.

## Scope

- Parse spreadsheet formats (XLSX/XLSB/XLS/CSV and more)
- Generate spreadsheets for modern and legacy consumers
- Preserve and write style metadata used by this codebase

## Maintenance model

This repository tracks upstream work from both projects as **reference sources**.
Security fixes and critical regressions are ported selectively and documented.

See:

- `SECURITY.md` for vulnerability reporting and patch intake policy
- `UPSTREAM_NOTES.md` for upstream sync decisions and backport history

## Branching model

- `main` is the stable default branch.
- Feature work should use short-lived topic branches (for example `feat/*` and
	`fix/*`) and merge back into `main`.
- Long-running divergence branches are discouraged; this repository favors
	small, reviewable changes merged frequently.

## Release model

- Releases are cut from `main` and marked with annotated Git tags.
- Security or upstream backports should reference decisions in
	`UPSTREAM_NOTES.md`.
- User-visible behavior changes should be noted in `CHANGELOG.md`.

## CI, Releases, and Package Publishing

- CI runs on pushes and pull requests to `main` via `.github/workflows/ci.yml`.
- GitHub Releases are created automatically when pushing a tag matching `v*`
	(for example `v0.18.13`) via `.github/workflows/release.yml`.
- npm publishing is manual via GitHub Actions (`Publish Package` workflow) and
	requires a repository secret named `NPM_TOKEN`.

For full release steps and publish notes, see `RELEASING.md`.

## Development

Install dependencies:

- `npm ci`

Run checks:

- `npm run lint`
- `npm test`

Build bundles:

- `npm run build`

## Compatibility note

Because this is a hybrid line, behavior may differ from either upstream in edge
cases. Changes should be validated against this repository's own tests and
release notes.

## License

Licensed under Apache-2.0. See `LICENSE`.
