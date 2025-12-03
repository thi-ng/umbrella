# Change Log

- **Last updated**: 2025-12-03T22:43:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.1.54](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@1.1.54) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

### [1.1.39](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@1.1.39) (2025-09-25)

#### ♻️ Refactoring

- simplify CLI impl via cliApp() wrapper ([f6ae3be](https://github.com/thi-ng/umbrella/commit/f6ae3be))

### [1.1.34](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@1.1.34) (2025-08-06)

#### ♻️ Refactoring

- update CLI internals, rename `--debug` => `--verbose` ([5756b75](https://github.com/thi-ng/umbrella/commit/5756b75))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@1.1.0) (2025-02-11)

#### 🚀 Features

- update CLI wrapper ([8fd0ffb](https://github.com/thi-ng/umbrella/commit/8fd0ffb))
  - check if `bun` is available, otherwise fallback to `node`

### [0.2.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@0.2.17) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@0.2.0) (2024-03-07)

#### 🚀 Features

- add support for code blocks in JS/TS docstrings ([5b68f19](https://github.com/thi-ng/umbrella/commit/5b68f19))
  - update CodeBlockFormat, allow regexps as prefix/suffix
    - add optional body xform fn
  - add ".js", ".ts" as supported file extensions
  - update matching logic in extractBlocks()

#### 🩹 Bug fixes

- off-by-one error in extractBlocks() ([d7d7e03](https://github.com/thi-ng/umbrella/commit/d7d7e03))

### [0.1.86](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@0.1.86) (2024-02-22)

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://github.com/thi-ng/umbrella/commit/c71a526))

### [0.1.83](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@0.1.83) (2024-02-16)

#### ♻️ Refactoring

- update LOGGER handling ([69b58d6](https://github.com/thi-ng/umbrella/commit/69b58d6))

### [0.1.62](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@0.1.62) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://github.com/thi-ng/umbrella/commit/020ef6c))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@0.1.1) (2022-09-22)

#### 🩹 Bug fixes

- in-memory rel path handling ([d184eb2](https://github.com/thi-ng/umbrella/commit/d184eb2))
  - update test fixtures

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/tangle@0.1.0) (2022-09-21)

#### 🚀 Features

- import as new package ([99e789e](https://github.com/thi-ng/umbrella/commit/99e789e))
- update/fix tangle logic, filesys context, CLI ([85a3968](https://github.com/thi-ng/umbrella/commit/85a3968))
  - add block concatenation if multiple blocks w/ same target
  - fix block boundary regex
  - add absolute path checks for outputs
  - refactor TangleCtx, extract FileSys, update in-memory impl
  - expose CLI in package.json
