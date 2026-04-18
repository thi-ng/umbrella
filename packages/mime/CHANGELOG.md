# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.8.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/mime@2.8.2/packages/mime) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

## [2.8.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/mime@2.8.0/packages/mime) (2025-11-25)

#### 🚀 Features

- update conversion tool & MIME type overrides ([266a191](https://codeberg.org/thi.ng/umbrella/commit/266a191))
- update MIME index, add overrides ([44a0a2e](https://codeberg.org/thi.ng/umbrella/commit/44a0a2e))
  - add typescript MIME types
  - update preferred .m4a, .ts, .wav mappings
  - update preferrd `video/quicktime` mapping (.mov)

## [2.7.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/mime@2.7.0/packages/mime) (2025-01-29)

#### 🚀 Features

- add `preferredTypeForPath()` syntax sugar ([872808f](https://codeberg.org/thi.ng/umbrella/commit/872808f))

## [2.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/mime@2.6.0/packages/mime) (2024-03-06)

#### 🚀 Features

- add extensionsForType() ([4453ec6](https://codeberg.org/thi.ng/umbrella/commit/4453ec6))

#### 🩹 Bug fixes

- revert jpeg extension overrides ([cc8ee6f](https://codeberg.org/thi.ng/umbrella/commit/cc8ee6f))

#### 🧪 Tests

- revert jpeg test case ([e25e135](https://codeberg.org/thi.ng/umbrella/commit/e25e135))

## [2.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/mime@2.5.0/packages/mime) (2024-02-17)

#### 🚀 Features

- update DB conversion, mime types & compression handling ([d67499c](https://codeberg.org/thi.ng/umbrella/commit/d67499c))
- update generated DB, add isCompressible() ([3875d3b](https://codeberg.org/thi.ng/umbrella/commit/3875d3b))

#### 🧪 Tests

- add tests ([1c138ef](https://codeberg.org/thi.ng/umbrella/commit/1c138ef))

## [2.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/mime@2.4.0/packages/mime) (2024-02-16)

#### 🚀 Features

- force lowercase file extension in preferredType() ([2cb0f1f](https://codeberg.org/thi.ng/umbrella/commit/2cb0f1f))
  - update docs

## [2.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/mime@2.3.0/packages/mime) (2023-12-09)

#### 🚀 Features

- add MIME_IMAGE_COMMON preset ([7afba57](https://codeberg.org/thi.ng/umbrella/commit/7afba57))

### [2.2.27](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/mime@2.2.27/packages/mime) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))
