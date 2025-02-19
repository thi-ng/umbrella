# Change Log

- **Last updated**: 2025-02-19T20:59:58Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [5.1.50](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@5.1.50) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [5.1.32](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@5.1.32) (2024-08-20)

#### ♻️ Refactoring

- update internal close mode handling (33b1d16f34) ([700e566](https://github.com/thi-ng/umbrella/commit/700e566))

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@5.1.0) (2024-02-28)

#### 🚀 Features

- update formatString() ([1ad60cc](https://github.com/thi-ng/umbrella/commit/1ad60cc))
  - add support for msg post-processing in formatString()
  - add/update docstrings

### [5.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@5.0.1) (2024-02-16)

#### 🩹 Bug fixes

- fix Logger.logEntry() & .childLogger() impls ([3484617](https://github.com/thi-ng/umbrella/commit/3484617))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@5.0.0) (2024-02-16)

#### 🛑 Breaking changes

- update Logger impl, remove obsolete types ([36c8649](https://github.com/thi-ng/umbrella/commit/36c8649))
- BREAKING CHANGE: update Logger, remove obsolete types
  - Logger now a subclass of `ALogger` & implementing `ISubscriber` interface
    - instead of extending rstream `StreamMerge`, now exposes a `Stream` via `.stream`
    - adding child loggers now handled via `ILogger.childLogger()` or `ILogger.addChild()`
  - update tests

### [4.1.84](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@4.1.84) (2023-11-24)

#### 🩹 Bug fixes

- update Logger w/ API change ([21fb1e6](https://github.com/thi-ng/umbrella/commit/21fb1e6))

### [4.1.81](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@4.1.81) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [4.1.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@4.1.16) (2022-08-04)

#### ♻️ Refactoring

- deprecate LogEntry ([ef46381](https://github.com/thi-ng/umbrella/commit/ef46381))
  - use migrated type from [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/main/packages/logger) pkg
