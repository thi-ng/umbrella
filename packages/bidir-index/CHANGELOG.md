# Change Log

- **Last updated**: 2026-02-07T14:15:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bidir-index@1.5.0) (2026-02-07)

#### 🚀 Features

- update getAll()/getAllIDs() ([1af2db7](https://github.com/thi-ng/umbrella/commit/1af2db7))
  - add option to encode/decode unknown values to null
  - update docstrings
- add `BidirIndex.renameKey()`, add tests ([d56a2b6](https://github.com/thi-ng/umbrella/commit/d56a2b6))

#### 🩹 Bug fixes

- correct return type `getAllUnique()`, add test ([e3687a2](https://github.com/thi-ng/umbrella/commit/e3687a2))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bidir-index@1.4.0) (2025-12-03)

#### 🚀 Features

- add IClear, ICopy, IEmpty support, update deps ([5288572](https://github.com/thi-ng/umbrella/commit/5288572))

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://github.com/thi-ng/umbrella/commit/5ceaf1a))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bidir-index@1.3.0) (2025-06-09)

#### 🚀 Features

- add `.addAllUnique()` & `.getAllUnique()` ([175e3dc](https://github.com/thi-ng/umbrella/commit/175e3dc))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bidir-index@1.2.0) (2025-04-30)

#### 🚀 Features

- restructure pkg, add `encodeObject()` / `decodeObject()` ([e812cac](https://github.com/thi-ng/umbrella/commit/e812cac))
  - split up source files
  - add new encoding/decoding fns
  - add tests
- add iterator versions of object encoders/decoders ([f647d5c](https://github.com/thi-ng/umbrella/commit/f647d5c))
  - add `encodeObjectIterator()`
  - add `decodeObjectIterator()`
  - add tests

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bidir-index@1.1.0) (2024-07-22)

#### 🚀 Features

- import as new package ([#486](https://github.com/thi-ng/umbrella/issues/486)) ([a047796](https://github.com/thi-ng/umbrella/commit/a047796))
  - extract `BidirIndex` from [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/main/packages/associative)
