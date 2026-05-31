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
