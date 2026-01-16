# Change Log

- **Last updated**: 2026-01-16T11:40:13Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@2.4.0) (2025-04-01)

#### 🚀 Features

- add `BitField.firstZero()` & `.firstOne()` ([0e8e8bf](https://github.com/thi-ng/umbrella/commit/0e8e8bf))
- add `BitField.fill()` ([9b11a25](https://github.com/thi-ng/umbrella/commit/9b11a25))
  - add tests

#### 🩹 Bug fixes

- update `firstZero()`/`firstOne()`, add tests ([c553021](https://github.com/thi-ng/umbrella/commit/c553021))
  - add special handling/masking of start byte

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bitfield@2.3.0) (2023-10-18)

#### 🚀 Features

- add BitField.similarity() ([58428c0](https://github.com/thi-ng/umbrella/commit/58428c0))

#### ⏱ Performance improvements

- optimize BitField.positions() ([17058b7](https://github.com/thi-ng/umbrella/commit/17058b7))
- update BitField ctor, BitMatrix.row() ([e1c2f73](https://github.com/thi-ng/umbrella/commit/e1c2f73))
  - add opt BitField ctor arg for pre-existing backing buffer
  - update BitMatrix.row() to add `viewOnly` arg allowing to re-use storage
