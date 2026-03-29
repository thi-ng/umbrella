# Change Log

- **Last updated**: 2026-03-07T10:29:02Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.2.53](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.2.53) (2024-06-21)

#### ♻️ Refactoring

- dedupe fromEpochBinary() ([5cd474c](https://codeberg.org/thi.ng/umbrella/commit/5cd474c))

### [3.2.15](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.2.15) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

## [3.2.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.2.0) (2023-08-12)

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

### [3.1.15](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.1.15) (2023-08-06)

#### 🩹 Bug fixes

- fix [#403](https://github.com/thi-ng/umbrella/issues/403), update KSUID32 epoch handling ([abbfc5a](https://codeberg.org/thi.ng/umbrella/commit/abbfc5a))
  - update .ensureTime() to check against optional max value
  - fix int coercion in KSUID32.timeOnlyBinary()
  - update readme

## [3.1.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.1.0) (2023-02-10)

#### 🚀 Features

- add CLI wrapper ([36fdc08](https://codeberg.org/thi.ng/umbrella/commit/36fdc08))

# [3.0.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/ksuid@3.0.0) (2023-01-17)

#### 🛑 Breaking changes

- update readme w/ v3.0.0 info ([f8d83c8](https://codeberg.org/thi.ng/umbrella/commit/f8d83c8))
- BREAKING CHANGE: `epoch` config unified to use milliseconds
  - add new section to readme
  - see [3d73b1766](https://codeberg.org/thi.ng/umbrella/commit/3d73b1766) for code details

#### 🚀 Features

- fix [#372](https://github.com/thi-ng/umbrella/issues/372), add fromEpoch() methods ([e416e91](https://codeberg.org/thi.ng/umbrella/commit/e416e91))
  - add fromEpoch/fromEpochBinary() to IKSUID interface
  - add impls in AKSUID
  - add tests for all 3 classes

#### ♻️ Refactoring

- use milliseconds as unified epoch offsets ([3d73b17](https://codeberg.org/thi.ng/umbrella/commit/3d73b17))
  - clarify KSUIDOpts.epoch docs
  - refactor KSUID32 to use milliseconds as `epoch` offset
  - update tests
