# Change Log

- **Last updated**: 2025-07-20T14:56:01Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.3.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/ramp@3.3.12) (2024-12-13)

#### 🩹 Bug fixes

- fix [#494](https://github.com/thi-ng/umbrella/issues/494), update time index search ([39a504b](https://github.com/thi-ng/umbrella/commit/39a504b))
  - update `Ramp.timeIndex()`
  - add tests
  - thanks to @robertoranon for reporting

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ramp@3.3.0) (2024-09-05)

#### 🚀 Features

- add easing ramp implementations ([1e23b61](https://github.com/thi-ng/umbrella/commit/1e23b61))
  - add `easing()`
  - add `EASING_N` / `EASING_V`
  - update pkg exports

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ramp@3.2.0) (2024-08-28)

#### 🚀 Features

- add IRamp.removeStopAtIndex() ([05c965f](https://github.com/thi-ng/umbrella/commit/05c965f))

### [3.1.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/ramp@3.1.24) (2024-06-21)

#### ♻️ Refactoring

- dedupe samples() impls ([85515e1](https://github.com/thi-ng/umbrella/commit/85515e1))
  - extract common impl as internal helper
  - update Group.samples() & Ramp.samples()
- dedupe nested() min/max impls ([02e1479](https://github.com/thi-ng/umbrella/commit/02e1479))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ramp@3.1.0) (2024-02-19)

#### 🚀 Features

- add minimal API presets for vector interpolations ([6dcb4b6](https://github.com/thi-ng/umbrella/commit/6dcb4b6))
  - add VEC, VEC2/3/4 API presets
  - add VecAPI interface
  - update docs
  - update pkg exports

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ramp@3.0.0) (2024-02-12)

#### 🛑 Breaking changes

- add support for arbitrary value types ([08e12c3](https://github.com/thi-ng/umbrella/commit/08e12c3))
- BREAKING CHANGE: add support for arbitrary value types, package restructure
  - add unified Ramp class, remove obsolete ARamp, LinearRamp, HermiteRamp
  - add interpolation presets to be used with generic Ramp
    - LINEAR_N, LINEAR_V (numeric/vector valued)
    - HERMITE_N, HERMITE_V
  - update `linear()` & `hermite()` factory fns
  - update Ramp ctor to ensure min. 2 keyframes/stops are provided
  - add new types
  - update/extend readme
  - update pkg meta
- add nested type support, simplify RampImpl ([0daa663](https://github.com/thi-ng/umbrella/commit/0daa663))
- BREAKING CHANGE: rename interpolatedPoints() => samples()
  - add nested() RampImpl
  - update IRamp interface
  - simplify RampImpl interface

#### 🚀 Features

- add time domain fns, grouped ramps, update API ([62c01d1](https://github.com/thi-ng/umbrella/commit/62c01d1))
  - add time domain functions
  - add group() ramp for nested, independent ramps
  - add RampOpts
  - extract IReadonlyRamp, update IRamp
  - update/fix IRamp.addStopAt() to .setStopAt()

### [2.1.83](https://github.com/thi-ng/umbrella/tree/@thi.ng/ramp@2.1.83) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [2.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/ramp@2.1.10) (2022-05-02)

#### 🩹 Bug fixes

- fix sort to be stable when time indexes are equal ([053107b](https://github.com/thi-ng/umbrella/commit/053107b))
  Fixes Issue [#343](https://github.com/thi-ng/umbrella/issues/343)
