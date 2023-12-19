# Change Log

- **Last updated**: 2023-12-19T11:01:47Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.2.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@3.2.15) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@3.2.0) (2023-08-12)

#### 🚀 Features

- add optional buffer args for various methods ([def0db4](https://github.com/thi-ng/umbrella/commit/def0db4))
  - update IKSUID interface
  - update AKSUID to re-use internal byte buffer for string IDs,
    avoiding allocating new temp arrays
  - refactor .timeOnlyBinary() to avoid internal temp array
  - update tests (re-ordered random bytes, due to [770dbe5d8](https://github.com/thi-ng/umbrella/commit/770dbe5d8))

#### ⏱ Performance improvements

- update .parse() ([da6765d](https://github.com/thi-ng/umbrella/commit/da6765d))
  - avoid allocation

### [3.1.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@3.1.15) (2023-08-06)

#### 🩹 Bug fixes

- fix [#403](https://github.com/thi-ng/umbrella/issues/403), update KSUID32 epoch handling ([abbfc5a](https://github.com/thi-ng/umbrella/commit/abbfc5a))
  - update .ensureTime() to check against optional max value
  - fix int coercion in KSUID32.timeOnlyBinary()
  - update readme

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@3.1.0) (2023-02-10)

#### 🚀 Features

- add CLI wrapper ([36fdc08](https://github.com/thi-ng/umbrella/commit/36fdc08))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@3.0.0) (2023-01-17)

#### 🛑 Breaking changes

- update readme w/ v3.0.0 info ([f8d83c8](https://github.com/thi-ng/umbrella/commit/f8d83c8))
- BREAKING CHANGE: `epoch` config unified to use milliseconds
  - add new section to readme
  - see [3d73b1766](https://github.com/thi-ng/umbrella/commit/3d73b1766) for code details

#### 🚀 Features

- fix [#372](https://github.com/thi-ng/umbrella/issues/372), add fromEpoch() methods ([e416e91](https://github.com/thi-ng/umbrella/commit/e416e91))
  - add fromEpoch/fromEpochBinary() to IKSUID interface
  - add impls in AKSUID
  - add tests for all 3 classes

#### ♻️ Refactoring

- use milliseconds as unified epoch offsets ([3d73b17](https://github.com/thi-ng/umbrella/commit/3d73b17))
  - clarify KSUIDOpts.epoch docs
  - refactor KSUID32 to use milliseconds as `epoch` offset
  - update tests

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@2.1.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@2.0.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### 🩹 Bug fixes

- update ksuid benchmarks ([6b3dbab](https://github.com/thi-ng/umbrella/commit/6b3dbab))

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@0.4.0) (2021-08-07)

#### 🚀 Features

- add ULID impl, update IKSUID & tests ([566846b](https://github.com/thi-ng/umbrella/commit/566846b))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@0.3.0) (2021-08-07)

#### 🛑 Breaking changes

- extract IKSUID, update impls, docs ([1276c94](https://github.com/thi-ng/umbrella/commit/1276c94))
- BREAKING CHANGE: Rename KSUID => KSUID32 / defKSUID32()
  - update readme
  - update tests
  - update pkg meta

#### 🚀 Features

- pkg restructure, add 64bit version ([9c40b20](https://github.com/thi-ng/umbrella/commit/9c40b20))
  - move KSUIDOpts to api.ts
  - extract abstact AKSUID base class
  - add KSUID64 & defKSUID64()
  - update pkg meta

#### ♻️ Refactoring

- better re-use, add docs/tests ([023b630](https://github.com/thi-ng/umbrella/commit/023b630))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@0.2.0) (2021-03-28)

#### 🚀 Features

- add .parse() & .timeOnly() ([80a0f70](https://github.com/thi-ng/umbrella/commit/80a0f70))
  - refactor next() to re-use format()

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/ksuid@0.1.0) (2021-01-13)

#### 🚀 Features

- import as new pkg ([67a2e61](https://github.com/thi-ng/umbrella/commit/67a2e61))

#### ⏱ Performance improvements

- add benchmarks ([aace41c](https://github.com/thi-ng/umbrella/commit/aace41c))
