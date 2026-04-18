# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.2.3](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom-canvas@4.2.3/packages/hdom-canvas) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

## [4.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom-canvas@4.2.0/packages/hdom-canvas) (2025-11-19)

#### 🚀 Features

- [#554](https://codeberg.org/thi.ng/umbrella/issues/554), add support for `__dpr` control attrib ([9939f13](https://codeberg.org/thi.ng/umbrella/commit/9939f13))
  - remove obsolete DPR handling in this pkg,
    now dealt with directly by [@thi.ng/hiccup-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/hiccup-canvas)

#### 🩹 Bug fixes

- update `__dpr` logic to accommodate resizing ([4244160](https://codeberg.org/thi.ng/umbrella/commit/4244160))

### [4.1.174](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom-canvas@4.1.174/packages/hdom-canvas) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://codeberg.org/thi.ng/umbrella/commit/c5a0a13))

### [4.1.91](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/hdom-canvas@4.1.91/packages/hdom-canvas) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))
