# Releasing and Publishing

This repository uses GitHub Actions for CI, GitHub Releases, and npm package publishing.

## Workflows

- CI: `.github/workflows/ci.yml`
- GitHub Release on tag push: `.github/workflows/release.yml`
- Manual npm publish: `.github/workflows/publish-npm.yml`

## Prerequisites

1. Repository secret `NPM_TOKEN` must be configured.
   - GitHub: Settings → Secrets and variables → Actions → New repository secret
   - Name: `NPM_TOKEN`
   - Value: npm automation token with publish rights
2. You must be authorized to publish the package name in `package.json`.
   - Current package name: `@xiaden/sheetjs-js-style`

## Recommended Release Flow

1. Ensure `main` is green and up to date.
2. Update version and changelog.
3. Commit version/changelog updates.
4. Create and push a release tag:
   - `v<version>` (example: `v0.18.13`)
5. Tag push triggers `Release` workflow, which:
   - installs dependencies
   - runs tests
   - builds artifacts
   - creates an npm tarball (`npm pack`)
   - creates a GitHub Release and uploads the tarball asset
6. Run `Publish Package` workflow manually and select npm dist-tag (`latest`, `next`, etc.).

## Notes

- npm publish is intentionally manual to prevent accidental releases.
- If npm publish fails with package ownership or scope access errors, verify
   npm org access and token permissions before retrying.
- Keep `CHANGELOG.md` entries aligned with release tags.
