# Change Log

- **Last updated**: 2026-03-19T12:29:04Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.2.4](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers-stats@2.2.4) (2024-12-24)

#### ♻️ Refactoring

- replace [@thi.ng/dcons](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/dcons) dependency ([e9940ed](https://codeberg.org/thi.ng/umbrella/commit/e9940ed))
  - switch to use more lightweight & GC-friendly ringbuffer impl from [@thi.ng/buffers](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/buffers)
  - update the following transducers:
    - `momentum()`
    - `roc()`
    - `sma()`
  - add tests

## [2.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers-stats@2.2.0) (2024-11-03)

#### 🚀 Features

- add moving min/max, update donchian ([188d11a](https://codeberg.org/thi.ng/umbrella/commit/188d11a))
  - add movingMaximum() transducer
  - add movingMinimum() transducer
  - refactor donchian()
  - add internal Deque helper class
  - add tests

### [2.1.113](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers-stats@2.1.113) (2024-04-08)

#### ♻️ Refactoring

- update reducer handling due to updates in [@thi.ng/transducers](https://codeberg.org/thi.ng/umbrella/src/branch/main/packages/transducers) pkg ([25ef274](https://codeberg.org/thi.ng/umbrella/commit/25ef274))

### [2.1.76](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/transducers-stats@2.1.76) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))
