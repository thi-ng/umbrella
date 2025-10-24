# Change Log

- **Last updated**: 2025-10-24T14:08:37Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

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
