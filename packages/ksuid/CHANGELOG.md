# Change Log

- **Last updated**: 2026-04-02T10:52:06Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.2.115](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.2.115/packages/ksuid) (2026-04-02)

#### ♻️ Refactoring

- update byte array related method signatures ([e63351d](https://codeberg.org/thi.ng/umbrella/commit/e63351d))
  - use `Uint8Array<ArrayBuffer>` because `window.crypto.getRandomValues()` only supports this flavor

### [3.2.53](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.2.53/packages/ksuid) (2024-06-21)

#### ♻️ Refactoring

- dedupe fromEpochBinary() ([5cd474c](https://codeberg.org/thi.ng/umbrella/commit/5cd474c))

### [3.2.15](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.2.15/packages/ksuid) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [3.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.2.0/packages/ksuid) (2023-08-12)

#### 🚀 Features

- add optional buffer args for various methods ([def0db4](https://codeberg.org/thi.ng/umbrella/commit/def0db4))
  - update IKSUID interface
  - update AKSUID to re-use internal byte buffer for string IDs,
    avoiding allocating new temp arrays
  - refactor .timeOnlyBinary() to avoid internal temp array
  - update tests (re-ordered random bytes, due to [770dbe5d8](https://codeberg.org/thi.ng/umbrella/commit/770dbe5d8))

#### ⏱ Performance improvements

- update .parse() ([da6765d](https://codeberg.org/thi.ng/umbrella/commit/da6765d))
  - avoid allocation

### [3.1.15](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.1.15/packages/ksuid) (2023-08-06)

#### 🩹 Bug fixes

- fix [#403](https://codeberg.org/thi.ng/umbrella/issues/403), update KSUID32 epoch handling ([abbfc5a](https://codeberg.org/thi.ng/umbrella/commit/abbfc5a))
  - update .ensureTime() to check against optional max value
  - fix int coercion in KSUID32.timeOnlyBinary()
  - update readme

#### 🧪 Tests

- add epoch bounds tests ([#403](https://codeberg.org/thi.ng/umbrella/issues/403)) ([052bcc7](https://codeberg.org/thi.ng/umbrella/commit/052bcc7))

### [3.1.8](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.1.8/packages/ksuid) (2023-03-27)

#### 🧪 Tests

- update all tests (mainly imports) ([63a85f9](https://codeberg.org/thi.ng/umbrella/commit/63a85f9))

## [3.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.1.0/packages/ksuid) (2023-02-10)

#### 🚀 Features

- add CLI wrapper ([36fdc08](https://codeberg.org/thi.ng/umbrella/commit/36fdc08))

# [3.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.0.0/packages/ksuid) (2023-01-17)

#### 🛑 Breaking changes

- update readme w/ v3.0.0 info ([f8d83c8](https://codeberg.org/thi.ng/umbrella/commit/f8d83c8))
- BREAKING CHANGE: `epoch` config unified to use milliseconds
  - add new section to readme
  - see [3d73b1766](https://codeberg.org/thi.ng/umbrella/commit/3d73b1766) for code details

#### 🚀 Features

- fix [#372](https://codeberg.org/thi.ng/umbrella/issues/372), add fromEpoch() methods ([e416e91](https://codeberg.org/thi.ng/umbrella/commit/e416e91))
  - add fromEpoch/fromEpochBinary() to IKSUID interface
  - add impls in AKSUID
  - add tests for all 3 classes

#### ♻️ Refactoring

- use milliseconds as unified epoch offsets ([3d73b17](https://codeberg.org/thi.ng/umbrella/commit/3d73b17))
  - clarify KSUIDOpts.epoch docs
  - refactor KSUID32 to use milliseconds as `epoch` offset
  - update tests
