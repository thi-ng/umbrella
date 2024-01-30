# Change Log

- **Last updated**: 2024-01-30T21:37:19Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/file-io@1.2.0) (2024-01-26)

#### 🚀 Features

- add fileWatcher() ([71c1d8f](https://github.com/thi-ng/umbrella/commit/71c1d8f))

#### ♻️ Refactoring

- migrate internal predicates ([52c985a](https://github.com/thi-ng/umbrella/commit/52c985a))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/file-io@1.1.0) (2023-12-18)

#### 🚀 Features

- add generics for readJSON() ([34bdfc8](https://github.com/thi-ng/umbrella/commit/34bdfc8))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/file-io@1.0.0) (2023-11-09)

#### 🛑 Breaking changes

- update matching logic for files()/dirs() ([8f275b5](https://github.com/thi-ng/umbrella/commit/8f275b5))
- BREAKING CHANGE: files()/dirs() matchers use full relative sub-path
  - add support for arbitrary predicate fns as matcher

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/file-io@0.5.0) (2023-02-05)

#### 🚀 Features

- add fileChunks() ([bcff691](https://github.com/thi-ng/umbrella/commit/bcff691))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/file-io@0.4.0) (2023-01-10)

#### 🚀 Features

- add readText() encoding opts ([22366c0](https://github.com/thi-ng/umbrella/commit/22366c0))
- add readBinary(), update pkg exports ([2c647ed](https://github.com/thi-ng/umbrella/commit/2c647ed))

### [0.3.25](https://github.com/thi-ng/umbrella/tree/@thi.ng/file-io@0.3.25) (2022-12-29)

#### ♻️ Refactoring

- update "no-browser" pkg handling ([0e84f1b](https://github.com/thi-ng/umbrella/commit/0e84f1b))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/file-io@0.3.0) (2022-05-20)

#### 🚀 Features

- add more fns (hashing, masking etc.) ([95b9e2b](https://github.com/thi-ng/umbrella/commit/95b9e2b))
  - add fileHash(), stringHash()
  - add maskHomeDir()
  - add fileExt(), isDirectory()

#### 🩹 Bug fixes

- fix ensureDir() for local file paths ([4ae95c2](https://github.com/thi-ng/umbrella/commit/4ae95c2))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/file-io@0.2.0) (2022-05-19)

#### 🚀 Features

- add dirs() iterator, add writeFile(), dry-run handling ([0279db8](https://github.com/thi-ng/umbrella/commit/0279db8))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/file-io@0.1.0) (2022-05-18)

#### 🚀 Features

- import as new pkg ([ca71f31](https://github.com/thi-ng/umbrella/commit/ca71f31))
