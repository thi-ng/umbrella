# Change Log

- **Last updated**: 2025-01-29T16:25:48Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [9.2.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@9.2.4) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

## [9.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@9.2.0) (2024-12-05)

#### 🚀 Features

- add fromTuple(), update StreamObj impl ([ef691cc](https://github.com/thi-ng/umbrella/commit/ef691cc))
  - update docs
  - add tests

## [9.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@9.1.0) (2024-12-04)

#### 🚀 Features

- update fromObject(), re-implement as full subscription ([6903507](https://github.com/thi-ng/umbrella/commit/6903507))

# [9.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@9.0.0) (2024-08-20)

#### 🛑 Breaking changes

- replace `CloseMode` enum w/ string union type ([33b1d16](https://github.com/thi-ng/umbrella/commit/33b1d16))
- BREAKING CHANGE: replace `CloseMode` enum w/ string union type
  - this simplifies all usage sites, now only using (and removing obsolete enum import):
    - `CloseMode.FIRST` => `"first"`
    - `CloseMode.LAST` => `"last"`
    - `CloseMode.NEVER` => `"never"`
  - update docs & all sites

## [8.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@8.5.0) (2024-05-08)

#### 🚀 Features

- add rdom-klist example project, update readmes ([cd458ac](https://github.com/thi-ng/umbrella/commit/cd458ac))
- add rdom-klist example project, update readmes ([531437f](https://github.com/thi-ng/umbrella/commit/531437f))

### [8.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@8.4.1) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([86be8b7](https://github.com/thi-ng/umbrella/commit/86be8b7))

## [8.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@8.4.0) (2024-04-11)

#### 🚀 Features

- add fromAsync() / asAsync() converters & tests ([df57056](https://github.com/thi-ng/umbrella/commit/df57056))

### [8.3.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@8.3.20) (2024-04-08)

#### ♻️ Refactoring

- update reducer handling due to updates in [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/main/packages/transducers) pkg ([e0e5654](https://github.com/thi-ng/umbrella/commit/e0e5654))

### [8.3.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@8.3.6) (2024-02-22)

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://github.com/thi-ng/umbrella/commit/c71a526))

### [8.3.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@8.3.3) (2024-02-16)

#### ♻️ Refactoring

- update LOGGER handling ([e3e18ab](https://github.com/thi-ng/umbrella/commit/e3e18ab))

## [8.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@8.3.0) (2024-02-06)

#### 🚀 Features

- update fromRAF() & opts ([27f4cde](https://github.com/thi-ng/umbrella/commit/27f4cde))
  - update timestamp handling/opts

### [8.2.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@8.2.8) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [8.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@8.2.0) (2023-10-18)

#### 🚀 Features

- add EventOpts, update fromEvent()/fromDOMEvent() ([49e5143](https://github.com/thi-ng/umbrella/commit/49e5143))

## [8.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@8.1.0) (2023-08-22)

#### 🚀 Features

- add toggle(), update readme ([1d6d661](https://github.com/thi-ng/umbrella/commit/1d6d661))

# [8.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@8.0.0) (2023-04-08)

#### 🛑 Breaking changes

- simplify/unify sidechain API ([5e90431](https://github.com/thi-ng/umbrella/commit/5e90431))
- BREAKING CHANGE: simplify/unify sidechain subscription API
  - update sidechainPartition/Toggle/Trigger() to take src sub as 1st arg
    - old: `src.subscribe(sidechainXXX(side))`...
    - new: `sidechainXXX(src, side)`
  - update docs
  - update tests

#### 🚀 Features

- add syncRAF() ([3c17520](https://github.com/thi-ng/umbrella/commit/3c17520))
  - add SyncRAF class and syncRAF() factory
  - deprecate sidechainPartitionRAF()
  - add tests
- add sidechainTrigger() ([3d2b56d](https://github.com/thi-ng/umbrella/commit/3d2b56d))
- add timestamp support for fromRAF() ([a2b8629](https://github.com/thi-ng/umbrella/commit/a2b8629))
  - add FromRAFOpts
  - update docs

#### 🩹 Bug fixes

- fix opts handling in syncRAF() & fromView() ([baa8878](https://github.com/thi-ng/umbrella/commit/baa8878))

#### ♻️ Refactoring

- update KeyStreams type ([1dd60e9](https://github.com/thi-ng/umbrella/commit/1dd60e9))
  - switch value types Subscription => ISubscription
- minor update sidechainPartition/Toggle() ([c3ffd38](https://github.com/thi-ng/umbrella/commit/c3ffd38))

### [7.2.46](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@7.2.46) (2023-03-27)

#### ♻️ Refactoring

- update imports (TS5.0) ([562e1af](https://github.com/thi-ng/umbrella/commit/562e1af))

### [7.2.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@7.2.31) (2022-12-16)

#### 🩹 Bug fixes

- (TS4.9 regression) update defWorker(), add explicit typehint ([bce5df7](https://github.com/thi-ng/umbrella/commit/bce5df7))

### [7.2.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream@7.2.7) (2022-06-09)

#### ♻️ Refactoring

- various (minor) TS4.7 related updates/fixes ([9d9ecae](https://github.com/thi-ng/umbrella/commit/9d9ecae))
