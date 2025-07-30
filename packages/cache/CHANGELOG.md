# Change Log

- **Last updated**: 2025-07-30T22:32:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.3.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.3.12) (2024-10-31)

#### ♻️ Refactoring

- add MapLike interface to loosen Map impls ([603c76c](https://github.com/thi-ng/umbrella/commit/603c76c))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.3.0) (2024-07-28)

#### 🚀 Features

- add `TLRUCacheOpts.autoExtend` option ([9fbda4c](https://github.com/thi-ng/umbrella/commit/9fbda4c))
  - add support to auto-extend TTL of cached values upon cache hit
  - add tests
  - add/update docs
  - update readme

### [2.2.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.2.11) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([a3833d0](https://github.com/thi-ng/umbrella/commit/a3833d0))

### [2.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.2.1) (2024-03-11)

#### 🩹 Bug fixes

- fix regression, all ctor args optional again ([54e6b37](https://github.com/thi-ng/umbrella/commit/54e6b37))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.2.0) (2024-03-11)

#### 🚀 Features

- add value update callback, update TLRUCache ([d2fed06](https://github.com/thi-ng/umbrella/commit/d2fed06))
  - add CacheOpts.update
  - update doSetEntry() in all impls
  - refactor TLRUCache.getSet() as async fn
  - update TLRUCache.prune() to return eviction count
  - various other refactoring
  - add tests
  - add docs

### [2.1.106](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.1.106) (2024-03-11)

#### 🩹 Bug fixes

- fix ICache.get() return type, add docs ([d9f98f7](https://github.com/thi-ng/umbrella/commit/d9f98f7))

### [2.1.89](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.1.89) (2024-01-26)

#### 🩹 Bug fixes

- attempt to add element bigger than "maxsize" blocks addition of any new elements to the cache ([3c855ef](https://github.com/thi-ng/umbrella/commit/3c855ef))

### [2.1.76](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.1.76) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [2.1.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.1.12) (2022-07-19)

#### ♻️ Refactoring

- update deprecated DCons call sites ([2bbacf7](https://github.com/thi-ng/umbrella/commit/2bbacf7))

### [2.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.1.5) (2022-03-11)

#### ♻️ Refactoring

- update ConsCell refs/imports ([a883993](https://github.com/thi-ng/umbrella/commit/a883993))
