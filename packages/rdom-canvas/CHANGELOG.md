# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [1.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rdom-canvas@1.1.0/packages/rdom-canvas) (2025-11-19)

#### 🚀 Features

- [#554](https://codeberg.org/thi.ng/umbrella/issues/554), add support for `__dpr` control attrib ([40ff38b](https://codeberg.org/thi.ng/umbrella/commit/40ff38b))
  - remove obsolete DPR handling in this pkg,
    now dealt with directly by [@thi.ng/hiccup-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/hiccup-canvas)
  - remove obsolete deps

#### 🩹 Bug fixes

- update `__dpr` logic to accommodate resizing ([7c37f60](https://codeberg.org/thi.ng/umbrella/commit/7c37f60))

### [1.0.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rdom-canvas@1.0.2/packages/rdom-canvas) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://codeberg.org/thi.ng/umbrella/commit/c5a0a13))

### [0.5.36](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rdom-canvas@0.5.36/packages/rdom-canvas) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [0.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rdom-canvas@0.5.0/packages/rdom-canvas) (2023-04-08)

#### 🚀 Features

- set fallback canvas size if given as sub ([7fe9d63](https://codeberg.org/thi.ng/umbrella/commit/7fe9d63))

#### 🩹 Bug fixes

- fix generics, internal refactoring ([18ebe32](https://codeberg.org/thi.ng/umbrella/commit/18ebe32))
  - update internal resize handling
  - remove obsolete bg/clear handling (now part of hiccup-canvas)
  - add subscription IDs
  - update deps
