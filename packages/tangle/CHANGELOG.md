# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.1.54](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/tangle@1.1.54/packages/tangle) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [1.1.39](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/tangle@1.1.39/packages/tangle) (2025-09-25)

#### ♻️ Refactoring

- simplify CLI impl via cliApp() wrapper ([f6ae3be](https://codeberg.org/thi.ng/umbrella/commit/f6ae3be))

### [1.1.34](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/tangle@1.1.34/packages/tangle) (2025-08-06)

#### ♻️ Refactoring

- update CLI internals, rename `--debug` => `--verbose` ([5756b75](https://codeberg.org/thi.ng/umbrella/commit/5756b75))

## [1.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/tangle@1.1.0/packages/tangle) (2025-02-11)

#### 🚀 Features

- update CLI wrapper ([8fd0ffb](https://codeberg.org/thi.ng/umbrella/commit/8fd0ffb))
  - check if `bun` is available, otherwise fallback to `node`

### [1.0.6](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/tangle@1.0.6/packages/tangle) (2025-01-22)

#### 🧪 Tests

- revert fixtures (remove SPDX headers) ([ca69da0](https://codeberg.org/thi.ng/umbrella/commit/ca69da0))

### [0.2.19](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/tangle@0.2.19/packages/tangle) (2024-07-06)

#### 🧪 Tests

- update remaining testament tests to use bun:test like all other pkgs ([e9d0979](https://codeberg.org/thi.ng/umbrella/commit/e9d0979))
  - update tests & fixture handling
  - update deps
  - update `test:only` script alias in main package.json

### [0.2.17](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/tangle@0.2.17/packages/tangle) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

## [0.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/tangle@0.2.0/packages/tangle) (2024-03-07)

#### 🚀 Features

- add support for code blocks in JS/TS docstrings ([5b68f19](https://codeberg.org/thi.ng/umbrella/commit/5b68f19))
  - update CodeBlockFormat, allow regexps as prefix/suffix
    - add optional body xform fn
  - add ".js", ".ts" as supported file extensions
  - update matching logic in extractBlocks()

#### 🩹 Bug fixes

- off-by-one error in extractBlocks() ([d7d7e03](https://codeberg.org/thi.ng/umbrella/commit/d7d7e03))

### [0.1.86](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/tangle@0.1.86/packages/tangle) (2024-02-22)

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://codeberg.org/thi.ng/umbrella/commit/c71a526))

### [0.1.83](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/tangle@0.1.83/packages/tangle) (2024-02-16)

#### ♻️ Refactoring

- update LOGGER handling ([69b58d6](https://codeberg.org/thi.ng/umbrella/commit/69b58d6))

### [0.1.62](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/tangle@0.1.62/packages/tangle) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://codeberg.org/thi.ng/umbrella/commit/020ef6c))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))
