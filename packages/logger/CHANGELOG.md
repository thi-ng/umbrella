# Change Log

- **Last updated**: 2026-03-11T09:59:17Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/logger@3.3.0) (2026-03-11)

#### 🚀 Features

- add Error & RegExp support for `expandArgsJSON()` ([0bd9ad5](https://codeberg.org/thi.ng/umbrella/commit/0bd9ad5))

### [3.2.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/logger@3.2.1) (2025-10-07)

#### 🩹 Bug fixes

- update `StreamLogger` to accept `WritableStream` as target ([d6fa3d6](https://codeberg.org/thi.ng/umbrella/commit/d6fa3d6))
  - previously used: `NodeJS.WriteStream` => `NodeJS.WritableStream`
  - update docs

## [3.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/logger@3.2.0) (2025-09-25)

#### 🚀 Features

- update MemoryLogger & `expandArgsJSON()` ([2bf3731](https://codeberg.org/thi.ng/umbrella/commit/2bf3731))
  - add MemoryLogger ctor, add optional expand arg
  - update `expandArgsJSON()` to return array (not string), same as `expandArgs()`

## [3.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/logger@3.1.0) (2025-02-10)

#### 🚀 Features

- add `ILogger.none()`, add `methodForLevel()` ([66651b1](https://codeberg.org/thi.ng/umbrella/commit/66651b1))
  - update `ILogger`
  - update all impls (`ALogger`, `NULL_LOGGER`)

#### 🩹 Bug fixes

- fix import ([0a68035](https://codeberg.org/thi.ng/umbrella/commit/0a68035))

### [3.0.27](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/logger@3.0.27) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://codeberg.org/thi.ng/umbrella/commit/c5a0a13))

# [3.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/logger@3.0.0) (2024-02-16)

#### 🛑 Breaking changes

- update/extend ILogger interface ([887e839](https://codeberg.org/thi.ng/umbrella/commit/887e839))
- BREAKING CHANGE: update/extend ILogger interface to support
  hierarchies of loggers
  - update ALogger impl, update ctor
  - update ConsoleLogger, MemoryLogger, StreamLogger classes
  - update NULL_LOGGER
  - add ROOT logger and ProxyLogger class
  - add/update docs
  - update tests
  - update pkg exports

## [2.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/logger@2.1.0) (2023-12-18)

#### 🚀 Features

- add StreamLogger (for Node/Bun) ([d4c8fe2](https://codeberg.org/thi.ng/umbrella/commit/d4c8fe2))

# [2.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/logger@2.0.0) (2023-11-24)

#### 🛑 Breaking changes

- add ILogger.enabled() predicate, update impls ([d768486](https://codeberg.org/thi.ng/umbrella/commit/d768486))
- BREAKING CHANGE: add ILogger.enabled() predicate

### [1.4.23](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/logger@1.4.23) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))
