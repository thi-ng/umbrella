# Change Log

- **Last updated**: 2026-04-02T10:52:05Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/binary@3.6.0/packages/binary) (2025-12-25)

#### 🚀 Features

- add IDataView I64/U64 support, add/update tests ([63b90f7](https://codeberg.org/thi.ng/umbrella/commit/63b90f7))

## [3.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/binary@3.5.0/packages/binary) (2025-12-11)

#### 🚀 Features

- add `DATAVIEW` and `IDataView` ([a54ca91](https://codeberg.org/thi.ng/umbrella/commit/a54ca91))

#### ♻️ Refactoring

- internal update float<>int conversions, migrate `IS_LE` flag ([21646af](https://codeberg.org/thi.ng/umbrella/commit/21646af))
  - update to re-use LE/BE buffers
  - migrate `IS_LE` to endianess.ts

#### 🧪 Tests

- add dataview tests, fix buffers ([bf71b68](https://codeberg.org/thi.ng/umbrella/commit/bf71b68))

### [3.4.26](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/binary@3.4.26/packages/binary) (2024-06-21)

#### ♻️ Refactoring

- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [3.4.12](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/binary@3.4.12/packages/binary) (2024-02-19)

#### 🩹 Bug fixes

- update zero check in floatToSortableInt() (fix [#450](https://codeberg.org/thi.ng/umbrella/issues/450)) ([c2dc294](https://codeberg.org/thi.ng/umbrella/commit/c2dc294))

## [3.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/binary@3.4.0/packages/binary) (2023-12-11)

#### 🚀 Features

- add signed/unsigned int conversions ([9f23ae6](https://codeberg.org/thi.ng/umbrella/commit/9f23ae6))

#### 🩹 Bug fixes

- update precision for float/uint conversions (both ways) ([5289c40](https://codeberg.org/thi.ng/umbrella/commit/5289c40))
  - add tests

### [3.3.36](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/binary@3.3.36/packages/binary) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))

### [3.3.27](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/binary@3.3.27/packages/binary) (2023-07-14)

#### ♻️ Refactoring

- update little endian check (`IS_LE` const) ([ee47a7f](https://codeberg.org/thi.ng/umbrella/commit/ee47a7f))
