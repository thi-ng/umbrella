# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.6.37](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.6.37/packages/bench) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [3.6.8](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.6.8/packages/bench) (2024-12-27)

#### ♻️ Refactoring

- migrate timestamp fns to [@thi.ng/timestamp](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/timestamp) ([f178b1a](https://codeberg.org/thi.ng/umbrella/commit/f178b1a))
  - update deps
  - update exports
  - update readme

## [3.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.6.0/packages/bench) (2024-08-10)

#### 🚀 Features

- add poisson-image example ([87ec9e7](https://codeberg.org/thi.ng/umbrella/commit/87ec9e7))
  - update readmes
  - cc @nkint :)

### [3.5.10](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.5.10/packages/bench) (2024-07-06)

#### 🧪 Tests

- update remaining testament tests to use bun:test like all other pkgs ([e9d0979](https://codeberg.org/thi.ng/umbrella/commit/e9d0979))
  - update tests & fixture handling
  - update deps
  - update `test:only` script alias in main package.json

### [3.5.7](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.5.7/packages/bench) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [3.5.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.5.1/packages/bench) (2024-03-27)

#### 🩹 Bug fixes

- fix optional arg type for timeDiff() ([29825ac](https://codeberg.org/thi.ng/umbrella/commit/29825ac))

## [3.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.5.0/packages/bench) (2024-03-13)

#### 🚀 Features

- add frequency stat (i.e. ops/sec) ([0e6576a](https://codeberg.org/thi.ng/umbrella/commit/0e6576a))
  - add `BenchmarkOpts.extSize`
  - update `benchmark()`
  - update all formatters
  - add `setPrecision()` to adjust float formatter

### [3.4.28](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.4.28/packages/bench) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://codeberg.org/thi.ng/umbrella/commit/f36aeb0))

### [3.4.9](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.4.9/packages/bench) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))

## [3.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.4.0/packages/bench) (2023-06-14)

#### 🚀 Features

- add Profiler.profile()/wrap(), minor fixes ([0f3b44b](https://codeberg.org/thi.ng/umbrella/commit/0f3b44b))
  - update session total to be sum of all profiled calls,
    rather than wallclock time
  - fix field order in Profiler.asCSV()

## [3.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.3.0/packages/bench) (2023-06-13)

#### 🚀 Features

- add profiler ([5fdd867](https://codeberg.org/thi.ng/umbrella/commit/5fdd867))

### [3.2.3](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.2.3/packages/bench) (2023-02-17)

#### ♻️ Refactoring

- update timeDiff() ([37054e0](https://codeberg.org/thi.ng/umbrella/commit/37054e0))
  - default 2nd arg to current timestamp

## [3.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/bench@3.2.0/packages/bench) (2023-02-05)

#### 🚀 Features

- add support for performance.now() ([f48cb35](https://codeberg.org/thi.ng/umbrella/commit/f48cb35))
  - update now() to add perf.now as primary fallback option
