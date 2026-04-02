# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.2.3](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/expose@1.2.3/packages/expose) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [1.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/expose@1.2.0/packages/expose) (2023-10-24)

#### 🚀 Features

- update import.meta.env check ([#425](https://codeberg.org/thi.ng/umbrella/issues/425)) ([c8aa353](https://codeberg.org/thi.ng/umbrella/commit/c8aa353))
  - also check for `import.meta.env.UMBRELLA_GLOBALS` for non-ViteJS tooling
  - btw. this is **not** a fix for the esbuild issue in [#425](https://codeberg.org/thi.ng/umbrella/issues/425)
  (but part of its solution posted in comments)
