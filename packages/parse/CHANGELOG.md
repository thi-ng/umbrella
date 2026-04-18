# Change Log

- **Last updated**: 2026-04-18T11:32:54Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.6.43](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/parse@2.6.43/packages/parse) (2026-02-07)

#### ♻️ Refactoring

- replace deprecated `unsupported()` call sites in all pkgs ([3abbddf](https://codeberg.org/thi.ng/umbrella/commit/3abbddf))

### [2.6.39](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/parse@2.6.39/packages/parse) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

## [2.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/parse@2.6.0/packages/parse) (2025-01-21)

#### 🚀 Features

- expose more built-in grammar presets ([6e5a057](https://codeberg.org/thi.ng/umbrella/commit/6e5a057))
  - expose as new builtins:
    - `BINARY_UINT`
    - `HEX_UINT`
    - `SPACE`
    - `UINT`

#### ⏱ Performance improvements

- optimize char selection grammar compilation ([0476baa](https://codeberg.org/thi.ng/umbrella/commit/0476baa))
  - check if char selection only contains characters (no ranges)
  - if so, compile using `oneOf()` instead of `alt()` (avoiding extra level of iteration)
- update grammar rule compilation ([8341af6](https://codeberg.org/thi.ng/umbrella/commit/8341af6))
  - avoid `dynamic()` wrapper for grammar rules which don't require it (to avoid extraneous indirection)

## [2.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/parse@2.5.0/packages/parse) (2025-01-17)

#### 🚀 Features

- update `DynamicParser`, add `IDeref` support ([cf0d51c](https://codeberg.org/thi.ng/umbrella/commit/cf0d51c))

#### ♻️ Refactoring

- remove `ParseState.last`, update `IReader` & impls ([20fc5cf](https://codeberg.org/thi.ng/umbrella/commit/20fc5cf))
  - remove `ParseState.last` to lower RAM usage
  - add `IReader.prev()` to obtain previous char, add docs
  - update reader impls
  - update anchor parsers
  - update tests
- minor internal updates ([ef97aee](https://codeberg.org/thi.ng/umbrella/commit/ef97aee))
  - update `ParseContext.start()`
  - update `check()` combinator impl

#### 🧪 Tests

- minor updates ([d6d703f](https://codeberg.org/thi.ng/umbrella/commit/d6d703f))
- update tests ([08d5558](https://codeberg.org/thi.ng/umbrella/commit/08d5558))

### [2.4.64](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/parse@2.4.64/packages/parse) (2025-01-14)

#### ♻️ Refactoring

- various minor updates ([42ce3f6](https://codeberg.org/thi.ng/umbrella/commit/42ce3f6))

### [2.4.52](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/parse@2.4.52/packages/parse) (2024-08-29)

#### ⏱ Performance improvements

- update ParseState & ParseScope handling (result: 1.2-1.6x faster) ([c94b5cf](https://codeberg.org/thi.ng/umbrella/commit/c94b5cf))
  - refactor ParseState/Scope as data classes (keep same structure)
  - minor update scope transforms
  - update tests

### [2.4.43](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/parse@2.4.43/packages/parse) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://codeberg.org/thi.ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [2.4.5](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/parse@2.4.5/packages/parse) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [2.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/parse@2.4.0/packages/parse) (2023-09-19)

#### 🚀 Features

- add ParseContext.peakDepth, update recursion limit ([0a2b7db](https://codeberg.org/thi.ng/umbrella/commit/0a2b7db))

## [2.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/parse@2.3.0/packages/parse) (2023-09-06)

#### 🚀 Features

- add altS() combinator ([52c76ca](https://codeberg.org/thi.ng/umbrella/commit/52c76ca))

### [2.2.31](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/parse@2.2.31/packages/parse) (2023-03-27)

#### 🧪 Tests

- update all tests (mainly imports) ([63a85f9](https://codeberg.org/thi.ng/umbrella/commit/63a85f9))
