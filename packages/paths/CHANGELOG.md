# Change Log

- **Last updated**: 2025-02-19T20:59:58Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [5.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@5.2.0) (2025-01-29)

#### 🚀 Features

- update `deleteIn()` path coercion/check ([8e5e680](https://github.com/thi-ng/umbrella/commit/8e5e680))
  - update path coercion to use `disallowProtoPath()` (like `mutIn()` already does)
  - update docs

#### 🩹 Bug fixes

- update `toPath()` & docs ([202ee9c](https://github.com/thi-ng/umbrella/commit/202ee9c))
  - update `toPath()` to ensure converted string path is valid
    - disallow empty-string path segments
    - only top-level empty string (or array) is allowed
  - update doc strings to correct & clarify extended checking via `disallowProtoPath()`
  - add tests

### [5.1.82](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@5.1.82) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [5.1.79](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@5.1.79) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([8e242f1](https://github.com/thi-ng/umbrella/commit/8e242f1))

### [5.1.63](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@5.1.63) (2024-01-30)

#### 🩹 Bug fixes

- fix [#445](https://github.com/thi-ng/umbrella/issues/445), update toPath(), disallowProtoPath() ([c78b484](https://github.com/thi-ng/umbrella/commit/c78b484))
  - update docs
  - add tests

### [5.1.48](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@5.1.48) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [5.1.39](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@5.1.39) (2023-08-04)

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://github.com/thi-ng/umbrella/commit/b6db053))
