# Change Log

- **Last updated**: 2026-02-07T14:15:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/expose@1.2.3) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/expose@1.2.0) (2023-10-24)

#### 🚀 Features

- update import.meta.env check ([#425](https://github.com/thi-ng/umbrella/issues/425)) ([c8aa353](https://github.com/thi-ng/umbrella/commit/c8aa353))
  - also check for `import.meta.env.UMBRELLA_GLOBALS` for non-ViteJS tooling
  - btw. this is **not** a fix for the esbuild issue in [#425](https://github.com/thi-ng/umbrella/issues/425)
  (but part of its solution posted in comments)
