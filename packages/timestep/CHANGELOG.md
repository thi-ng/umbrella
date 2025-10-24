# Change Log

- **Last updated**: 2025-10-24T14:17:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.5.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/timestep@0.5.30) (2024-02-27)

#### 🩹 Bug fixes

- fix imports ([0e927ad](https://github.com/thi-ng/umbrella/commit/0e927ad))

### [0.5.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/timestep@0.5.3) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://github.com/thi-ng/umbrella/commit/020ef6c))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/timestep@0.5.0) (2023-10-27)

#### 🚀 Features

- update VectorState, add VecAPI support ([f0aeb7e](https://github.com/thi-ng/umbrella/commit/f0aeb7e))
  - update VectorState ctor & defVector() args

### [0.4.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/timestep@0.4.2) (2023-08-04)

#### ♻️ Refactoring

- update INotify impl & event types ([02d83e8](https://github.com/thi-ng/umbrella/commit/02d83e8))
  - rename EVENT_INTEGRATE => EVENT_SUBFRAME
- update INotify impls ([cbdc527](https://github.com/thi-ng/umbrella/commit/cbdc527))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/timestep@0.4.0) (2023-06-19)

#### 🚀 Features

- update Numeric/VectorState, add 2/3/4d versions ([65ace1e](https://github.com/thi-ng/umbrella/commit/65ace1e))
  - remove abstract AState class
  - update NumericState
  - add new VectorState impl
  - add defVector2/3/4()

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/timestep@0.3.0) (2023-05-05)

#### 🚀 Features

- add AState.reset() & impls ([a2c4946](https://github.com/thi-ng/umbrella/commit/a2c4946))

#### ♻️ Refactoring

- rename IUpdatable => ITimeStep ([2cc3951](https://github.com/thi-ng/umbrella/commit/2cc3951))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/timestep@0.2.0) (2023-04-28)

#### 🚀 Features

- add INotify support, add fixed time field ([b68c0c6](https://github.com/thi-ng/umbrella/commit/b68c0c6))
- add integrateAll/interpolateAll() helpers ([71087cf](https://github.com/thi-ng/umbrella/commit/71087cf))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/timestep@0.1.1) (2023-04-25)

#### ♻️ Refactoring

- update AState, expose prev & curr ([8d5356b](https://github.com/thi-ng/umbrella/commit/8d5356b))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/timestep@0.1.0) (2023-04-19)

#### 🚀 Features

- import as new package ([1398282](https://github.com/thi-ng/umbrella/commit/1398282))
- add start time and time scale opts ([1cdc3d3](https://github.com/thi-ng/umbrella/commit/1cdc3d3))
- update IUpdatable/AState to receive context arg ([1249283](https://github.com/thi-ng/umbrella/commit/1249283))
