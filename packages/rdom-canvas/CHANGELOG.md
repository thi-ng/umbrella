# Change Log

- **Last updated**: 2025-12-03T22:43:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@1.1.0) (2025-11-19)

#### 🚀 Features

- [#554](https://github.com/thi-ng/umbrella/issues/554), add support for `__dpr` control attrib ([40ff38b](https://github.com/thi-ng/umbrella/commit/40ff38b))
  - remove obsolete DPR handling in this pkg,
    now dealt with directly by [@thi.ng/hiccup-canvas](https://github.com/thi-ng/umbrella/tree/main/packages/hiccup-canvas)
  - remove obsolete deps

#### 🩹 Bug fixes

- update `__dpr` logic to accommodate resizing ([7c37f60](https://github.com/thi-ng/umbrella/commit/7c37f60))

### [1.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@1.0.2) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [0.5.36](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@0.5.36) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@0.5.0) (2023-04-08)

#### 🚀 Features

- set fallback canvas size if given as sub ([7fe9d63](https://github.com/thi-ng/umbrella/commit/7fe9d63))

#### 🩹 Bug fixes

- fix generics, internal refactoring ([18ebe32](https://github.com/thi-ng/umbrella/commit/18ebe32))
  - update internal resize handling
  - remove obsolete bg/clear handling (now part of hiccup-canvas)
  - add subscription IDs
  - update deps
