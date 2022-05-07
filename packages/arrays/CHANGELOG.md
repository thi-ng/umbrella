# Change Log

- **Last updated**: 2022-05-07T11:33:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.2.0) (2022-03-11)

#### 🚀 Features

- add argSort() ([4b65c36](https://github.com/thi-ng/umbrella/commit/4b65c36))

### [2.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.1.3) (2021-12-13)

#### 🩹 Bug fixes

- off-by-one error in shuffleRange() ([f832d2f](https://github.com/thi-ng/umbrella/commit/f832d2f))
  - existing shuffle would keep some indices untouched, resulting in
    still perceivable ordering
  - update tests

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.1.0) (2021-11-17)

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

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@2.0.0) (2021-10-12)

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

#### ♻️ Refactoring

- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports ([ad3c3af](https://github.com/thi-ng/umbrella/commit/ad3c3af))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

## [0.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@0.10.0) (2021-01-21)

#### 🚀 Features

- add insert/insertUnsafe() ([2a78598](https://github.com/thi-ng/umbrella/commit/2a78598))

#### 🩹 Bug fixes

- fixed-length binarySearch2/4/8/16/32 ([39e5c37](https://github.com/thi-ng/umbrella/commit/39e5c37))
  - add binarySearch2()
  - fix results for not-found values, make compatible w/ binarySearch()

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@0.9.0) (2021-01-02)

#### 🚀 Features

- update sortByCachedKey(), add tests ([64e8f6e](https://github.com/thi-ng/umbrella/commit/64e8f6e))
  - add support for pre-cached key array instead of key fn
- add into(), sortByCachedKey() ([b94f64c](https://github.com/thi-ng/umbrella/commit/b94f64c))
- add bisect(), bisectWith() ([17d06a4](https://github.com/thi-ng/umbrella/commit/17d06a4))

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@0.8.0) (2020-09-13)

#### 🚀 Features

- add first() ([3f5f722](https://github.com/thi-ng/umbrella/commit/3f5f722))

#### ♻️ Refactoring

- update imports, use new Fn types ([1e3b6ac](https://github.com/thi-ng/umbrella/commit/1e3b6ac))
- update imports, use new function aliases ([136482e](https://github.com/thi-ng/umbrella/commit/136482e))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@0.7.0) (2020-08-28)

#### 🚀 Features

- add non-recursive binary search fns ([29a4ee4](https://github.com/thi-ng/umbrella/commit/29a4ee4))
  - add fixed size binarySearch4/8/16/32()

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@0.6.0) (2020-03-28)

#### 🚀 Features

- add fillRange() & levenshtein() ([2f98225](https://github.com/thi-ng/umbrella/commit/2f98225))

### [0.5.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@0.5.2) (2020-02-25)

#### ♻️ Refactoring

- update imports ([35765a8](https://github.com/thi-ng/umbrella/commit/35765a8))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@0.5.0) (2020-01-24)

#### 🚀 Features

- add binary search predicates, tests, update readme ([b8f421e](https://github.com/thi-ng/umbrella/commit/b8f421e))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@0.4.0) (2019-11-30)

#### 🚀 Features

- add arraySeq(), arrayIterator() & tests ([d94df57](https://github.com/thi-ng/umbrella/commit/d94df57))
- add binarySearchNumeric() ([7b38202](https://github.com/thi-ng/umbrella/commit/7b38202))

#### ♻️ Refactoring

- remove arraySeq() (migrated to [@thi.ng/seq](https://github.com/thi-ng/umbrella/tree/main/packages/seq)) ([779c433](https://github.com/thi-ng/umbrella/commit/779c433))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@0.3.0) (2019-11-09)

#### 🚀 Features

- add isSorted() ([65b29f4](https://github.com/thi-ng/umbrella/commit/65b29f4))
- add types, quickSort(), swap(), multiSwap(), update readme ([b834722](https://github.com/thi-ng/umbrella/commit/b834722))
- add shuffleRange(), refactor shuffle(), add tests ([1924a05](https://github.com/thi-ng/umbrella/commit/1924a05))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@0.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([8724f9e](https://github.com/thi-ng/umbrella/commit/8724f9e))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/arrays@0.1.0) (2019-02-15)

#### 🚀 Features

- add find/findIndex() ([0007152](https://github.com/thi-ng/umbrella/commit/0007152))
- extract as new package ([361ba37](https://github.com/thi-ng/umbrella/commit/361ba37))

#### ♻️ Refactoring

- update arg order, fix shuffle() ([b01abaa](https://github.com/thi-ng/umbrella/commit/b01abaa))
