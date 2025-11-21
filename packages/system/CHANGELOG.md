# Change Log

- **Last updated**: 2025-11-21T15:55:41Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.1.47](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@3.1.47) (2025-02-21)

#### ♻️ Refactoring

- switch use of `Promise` to `MaybePromise` ([59b3ae1](https://github.com/thi-ng/umbrella/commit/59b3ae1))
  - update `ILifeCycle` and `ComponentFactory` to not require async
  - update tests

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@3.1.0) (2024-03-09)

#### 🚀 Features

- add start/stop logging ([97af706](https://github.com/thi-ng/umbrella/commit/97af706))

### [3.0.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@3.0.3) (2024-02-16)

#### ♻️ Refactoring

- update LOGGER handling ([a11f2a8](https://github.com/thi-ng/umbrella/commit/a11f2a8))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@3.0.0) (2024-02-01)

#### 🛑 Breaking changes

- Async component factories ([998409d](https://github.com/thi-ng/umbrella/commit/998409d))
- BREAKING CHANGE: Component factory functions are async now
  - add async System.init()
  - update System ctor
  - add/update docs
  - update tests

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.3.0) (2024-01-31)

#### 🚀 Features

- update ILifecycle, add system arg ([89d341a](https://github.com/thi-ng/umbrella/commit/89d341a))
  - add/update tests

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.2.0) (2024-01-30)

#### 🚀 Features

- update start/stop logic ([71f2dc5](https://github.com/thi-ng/umbrella/commit/71f2dc5))
  - update System.start() to stop already started components if current
  component startup failed
  - update System.stop() to only return true if _all_ components did shutdown
  - update docs
  - add tests

### [2.1.80](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.1.80) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [2.1.34](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.1.34) (2022-12-06)

#### ♻️ Refactoring

- extract SystemSpec interface ([7c12bd4](https://github.com/thi-ng/umbrella/commit/7c12bd4))

### [2.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/system@2.1.9) (2022-06-09)

#### ♻️ Refactoring

- various (minor) TS4.7 related updates/fixes ([9d9ecae](https://github.com/thi-ng/umbrella/commit/9d9ecae))
