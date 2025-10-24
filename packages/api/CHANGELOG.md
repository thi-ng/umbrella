# Change Log

- **Last updated**: 2025-10-24T14:17:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [8.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.12.0) (2025-08-04)

#### 🚀 Features

- add optional generics for typedarray types (TS5.9 induced) ([2af1b1e](https://github.com/thi-ng/umbrella/commit/2af1b1e))

### [8.11.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.11.3) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

## [8.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.11.0) (2024-04-20)

#### 🚀 Features

- add Maybe type alias, refactor related ([0777d33](https://github.com/thi-ng/umbrella/commit/0777d33))

## [8.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.10.0) (2024-04-08)

#### 🚀 Features

- add async types ([35ad820](https://github.com/thi-ng/umbrella/commit/35ad820))
- add async function types ([afb4200](https://github.com/thi-ng/umbrella/commit/afb4200))
- add Values<T> ([8a799ea](https://github.com/thi-ng/umbrella/commit/8a799ea))

## [8.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.9.0) (2023-08-04)

#### 🚀 Features

- add generics for Event & INotify ([7702882](https://github.com/thi-ng/umbrella/commit/7702882))
- add basic utility functions: identity, always, never ([4801e2d](https://github.com/thi-ng/umbrella/commit/4801e2d))
- add generics for INotify, Event, Listener types ([dd0a6ed](https://github.com/thi-ng/umbrella/commit/dd0a6ed))
- add IIDGen interface ([26cf9d1](https://github.com/thi-ng/umbrella/commit/26cf9d1))

## [8.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.8.0) (2023-04-19)

#### 🚀 Features

- add typedArrayOfVec() ([39307bf](https://github.com/thi-ng/umbrella/commit/39307bf))

## [8.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.7.0) (2023-02-05)

#### 🚀 Features

- add narrow/widenType() fns ([5ce9938](https://github.com/thi-ng/umbrella/commit/5ce9938))

## [8.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.6.0) (2022-12-16)

#### 🚀 Features

- add SomeRequired type alias ([ff28e71](https://github.com/thi-ng/umbrella/commit/ff28e71))

## [8.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.5.0) (2022-11-28)

#### 🚀 Features

- add boolean result for INotifiy.notify(), update mixin ([f4cb33a](https://github.com/thi-ng/umbrella/commit/f4cb33a))

### [8.4.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.4.5) (2022-11-01)

#### 🩹 Bug fixes

- off-by-one error for BIT_SHIFTS LUT (f64) ([dae2279](https://github.com/thi-ng/umbrella/commit/dae2279))

## [8.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/api@8.4.0) (2022-08-15)

#### 🚀 Features

- add i64/u64 support for typed arrays ([0bb5277](https://github.com/thi-ng/umbrella/commit/0bb5277))
  - add various 64bit bigint related types & lookups
  - add BIT_SHIFTS LUT
  - update sizeOf()
  - update typedArray()
