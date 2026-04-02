# Change Log

- **Last updated**: 2026-04-02T10:52:05Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [9.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@9.4.0/packages/rstream) (2026-03-18)

#### 🚀 Features

- add `isSubscriber()`, `isSubscriptionLike()` helper predicates ([ea28608](https://codeberg.org/thi.ng/umbrella/commit/ea28608))

### [9.3.13](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@9.3.13/packages/rstream) (2026-02-07)

#### ♻️ Refactoring

- replace deprecated `unsupported()` call sites in all pkgs ([3abbddf](https://codeberg.org/thi.ng/umbrella/commit/3abbddf))

### [9.3.8](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@9.3.8/packages/rstream) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

## [9.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@9.3.0/packages/rstream) (2025-10-24)

#### 🚀 Features

- make `fromObject()`/`StreamObj` streams typesafe ([23181df](https://codeberg.org/thi.ng/umbrella/commit/23181df))

### [9.2.33](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@9.2.33/packages/rstream) (2025-07-20)

#### 🩹 Bug fixes

- fix [#531](https://codeberg.org/thi.ng/umbrella/issues/531), update resolve() done() handling ([2dec309](https://codeberg.org/thi.ng/umbrella/commit/2dec309))
  - update done() handling to also dispatch if parent already unsubbed
  - fix code example in docs

### [9.2.4](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@9.2.4/packages/rstream) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://codeberg.org/thi.ng/umbrella/commit/c5a0a13))

## [9.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@9.2.0/packages/rstream) (2024-12-05)

#### 🚀 Features

- add fromTuple(), update StreamObj impl ([ef691cc](https://codeberg.org/thi.ng/umbrella/commit/ef691cc))
  - update docs
  - add tests

## [9.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@9.1.0/packages/rstream) (2024-12-04)

#### 🚀 Features

- update fromObject(), re-implement as full subscription ([6903507](https://codeberg.org/thi.ng/umbrella/commit/6903507))

# [9.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@9.0.0/packages/rstream) (2024-08-20)

#### 🛑 Breaking changes

- replace `CloseMode` enum w/ string union type ([33b1d16](https://codeberg.org/thi.ng/umbrella/commit/33b1d16))
- BREAKING CHANGE: replace `CloseMode` enum w/ string union type
  - this simplifies all usage sites, now only using (and removing obsolete enum import):
    - `CloseMode.FIRST` => `"first"`
    - `CloseMode.LAST` => `"last"`
    - `CloseMode.NEVER` => `"never"`
  - update docs & all sites

## [8.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.5.0/packages/rstream) (2024-05-08)

#### 🚀 Features

- add rdom-klist example project, update readmes ([cd458ac](https://codeberg.org/thi.ng/umbrella/commit/cd458ac))
- add rdom-klist example project, update readmes ([531437f](https://codeberg.org/thi.ng/umbrella/commit/531437f))

### [8.4.1](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.4.1/packages/rstream) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([86be8b7](https://codeberg.org/thi.ng/umbrella/commit/86be8b7))

## [8.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.4.0/packages/rstream) (2024-04-11)

#### 🚀 Features

- add fromAsync() / asAsync() converters & tests ([df57056](https://codeberg.org/thi.ng/umbrella/commit/df57056))

### [8.3.20](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.3.20/packages/rstream) (2024-04-08)

#### ♻️ Refactoring

- update reducer handling due to updates in [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/transducers) pkg ([e0e5654](https://codeberg.org/thi.ng/umbrella/commit/e0e5654))

### [8.3.6](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.3.6/packages/rstream) (2024-02-22)

#### ♻️ Refactoring

- update all `node:*` imports ([c71a526](https://codeberg.org/thi.ng/umbrella/commit/c71a526))

### [8.3.3](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.3.3/packages/rstream) (2024-02-16)

#### ♻️ Refactoring

- update LOGGER handling ([e3e18ab](https://codeberg.org/thi.ng/umbrella/commit/e3e18ab))

## [8.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.3.0/packages/rstream) (2024-02-06)

#### 🚀 Features

- update fromRAF() & opts ([27f4cde](https://codeberg.org/thi.ng/umbrella/commit/27f4cde))
  - update timestamp handling/opts

### [8.2.13](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.2.13/packages/rstream) (2023-12-09)

#### 🧪 Tests

- update test config ([3ccd8e3](https://codeberg.org/thi.ng/umbrella/commit/3ccd8e3))

### [8.2.8](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.2.8/packages/rstream) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [8.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.2.0/packages/rstream) (2023-10-18)

#### 🚀 Features

- add EventOpts, update fromEvent()/fromDOMEvent() ([49e5143](https://codeberg.org/thi.ng/umbrella/commit/49e5143))

## [8.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.1.0/packages/rstream) (2023-08-22)

#### 🚀 Features

- add toggle(), update readme ([1d6d661](https://codeberg.org/thi.ng/umbrella/commit/1d6d661))

# [8.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@8.0.0/packages/rstream) (2023-04-08)

#### 🛑 Breaking changes

- simplify/unify sidechain API ([5e90431](https://codeberg.org/thi.ng/umbrella/commit/5e90431))
- BREAKING CHANGE: simplify/unify sidechain subscription API
  - update sidechainPartition/Toggle/Trigger() to take src sub as 1st arg
    - old: `src.subscribe(sidechainXXX(side))`...
    - new: `sidechainXXX(src, side)`
  - update docs
  - update tests

#### 🚀 Features

- add syncRAF() ([3c17520](https://codeberg.org/thi.ng/umbrella/commit/3c17520))
  - add SyncRAF class and syncRAF() factory
  - deprecate sidechainPartitionRAF()
  - add tests
- add sidechainTrigger() ([3d2b56d](https://codeberg.org/thi.ng/umbrella/commit/3d2b56d))
- add timestamp support for fromRAF() ([a2b8629](https://codeberg.org/thi.ng/umbrella/commit/a2b8629))
  - add FromRAFOpts
  - update docs

#### 🩹 Bug fixes

- fix opts handling in syncRAF() & fromView() ([baa8878](https://codeberg.org/thi.ng/umbrella/commit/baa8878))

#### ♻️ Refactoring

- update KeyStreams type ([1dd60e9](https://codeberg.org/thi.ng/umbrella/commit/1dd60e9))
  - switch value types Subscription => ISubscription
- minor update sidechainPartition/Toggle() ([c3ffd38](https://codeberg.org/thi.ng/umbrella/commit/c3ffd38))

### [7.2.46](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/rstream@7.2.46/packages/rstream) (2023-03-27)

#### ♻️ Refactoring

- update imports (TS5.0) ([562e1af](https://codeberg.org/thi.ng/umbrella/commit/562e1af))

#### 🧪 Tests

- update all tests (mainly imports) ([63a85f9](https://codeberg.org/thi.ng/umbrella/commit/63a85f9))
