# Security Policy

## Reporting a Vulnerability

Please open a private security advisory in the repository or contact the
maintainers directly through your preferred secure channel.

Include:

- affected version / commit
- impact summary
- reproduction details
- proposed fix (if available)

## Supported Versions

Security fixes are applied to the actively maintained default branch.

## Upstream Intake Policy

This project is a hybrid code line derived from multiple upstream projects.
Security and reliability fixes are reviewed from upstream sources and ported
selectively.

- We do not automatically merge all upstream commits.
- Each upstream fix is reviewed for compatibility with this repository.
- Ported fixes are documented in `UPSTREAM_NOTES.md`.

## Disclosure and Release

- Critical issues: expedited patch release
- High/Medium issues: included in next scheduled patch release
- Low issues: best-effort, bundled with routine maintenance
