# Change Log

- **Last updated**: 2026-01-23T13:09:44Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.6.39](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.6.39) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

## [2.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.6.0) (2025-01-21)

#### 🚀 Features

- expose more built-in grammar presets ([6e5a057](https://github.com/thi-ng/umbrella/commit/6e5a057))
  - expose as new builtins:
    - `BINARY_UINT`
    - `HEX_UINT`
    - `SPACE`
    - `UINT`

#### ⏱ Performance improvements

- optimize char selection grammar compilation ([0476baa](https://github.com/thi-ng/umbrella/commit/0476baa))
  - check if char selection only contains characters (no ranges)
  - if so, compile using `oneOf()` instead of `alt()` (avoiding extra level of iteration)
- update grammar rule compilation ([8341af6](https://github.com/thi-ng/umbrella/commit/8341af6))
  - avoid `dynamic()` wrapper for grammar rules which don't require it (to avoid extraneous indirection)

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.5.0) (2025-01-17)

#### 🚀 Features

- update `DynamicParser`, add `IDeref` support ([cf0d51c](https://github.com/thi-ng/umbrella/commit/cf0d51c))

#### ♻️ Refactoring

- remove `ParseState.last`, update `IReader` & impls ([20fc5cf](https://github.com/thi-ng/umbrella/commit/20fc5cf))
  - remove `ParseState.last` to lower RAM usage
  - add `IReader.prev()` to obtain previous char, add docs
  - update reader impls
  - update anchor parsers
  - update tests
- minor internal updates ([ef97aee](https://github.com/thi-ng/umbrella/commit/ef97aee))
  - update `ParseContext.start()`
  - update `check()` combinator impl

### [2.4.64](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.4.64) (2025-01-14)

#### ♻️ Refactoring

- various minor updates ([42ce3f6](https://github.com/thi-ng/umbrella/commit/42ce3f6))

### [2.4.52](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.4.52) (2024-08-29)

#### ⏱ Performance improvements

- update ParseState & ParseScope handling (result: 1.2-1.6x faster) ([c94b5cf](https://github.com/thi-ng/umbrella/commit/c94b5cf))
  - refactor ParseState/Scope as data classes (keep same structure)
  - minor update scope transforms
  - update tests

### [2.4.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.4.43) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [2.4.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.4.5) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.4.0) (2023-09-19)

#### 🚀 Features

- add ParseContext.peakDepth, update recursion limit ([0a2b7db](https://github.com/thi-ng/umbrella/commit/0a2b7db))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/parse@2.3.0) (2023-09-06)

#### 🚀 Features

- add altS() combinator ([52c76ca](https://github.com/thi-ng/umbrella/commit/52c76ca))
