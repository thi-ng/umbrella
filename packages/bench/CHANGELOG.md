# Change Log

- **Last updated**: 2025-07-10T14:20:23Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.6.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.6.8) (2024-12-27)

#### ♻️ Refactoring

- migrate timestamp fns to [@thi.ng/timestamp](https://github.com/thi-ng/umbrella/tree/main/packages/timestamp) ([f178b1a](https://github.com/thi-ng/umbrella/commit/f178b1a))
  - update deps
  - update exports
  - update readme

## [3.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.6.0) (2024-08-10)

#### 🚀 Features

- add poisson-image example ([87ec9e7](https://github.com/thi-ng/umbrella/commit/87ec9e7))
  - update readmes
  - cc @nkint :)

### [3.5.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.5.7) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [3.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.5.1) (2024-03-27)

#### 🩹 Bug fixes

- fix optional arg type for timeDiff() ([29825ac](https://github.com/thi-ng/umbrella/commit/29825ac))

## [3.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.5.0) (2024-03-13)

#### 🚀 Features

- add frequency stat (i.e. ops/sec) ([0e6576a](https://github.com/thi-ng/umbrella/commit/0e6576a))
  - add `BenchmarkOpts.extSize`
  - update `benchmark()`
  - update all formatters
  - add `setPrecision()` to adjust float formatter

### [3.4.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.4.28) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

### [3.4.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.4.9) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.4.0) (2023-06-14)

#### 🚀 Features

- add Profiler.profile()/wrap(), minor fixes ([0f3b44b](https://github.com/thi-ng/umbrella/commit/0f3b44b))
  - update session total to be sum of all profiled calls,
    rather than wallclock time
  - fix field order in Profiler.asCSV()

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.3.0) (2023-06-13)

#### 🚀 Features

- add profiler ([5fdd867](https://github.com/thi-ng/umbrella/commit/5fdd867))

### [3.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.2.3) (2023-02-17)

#### ♻️ Refactoring

- update timeDiff() ([37054e0](https://github.com/thi-ng/umbrella/commit/37054e0))
  - default 2nd arg to current timestamp

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.2.0) (2023-02-05)

#### 🚀 Features

- add support for performance.now() ([f48cb35](https://github.com/thi-ng/umbrella/commit/f48cb35))
  - update now() to add perf.now as primary fallback option
