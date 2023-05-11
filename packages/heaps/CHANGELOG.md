# Change Log

- **Last updated**: 2023-05-11T12:16:33Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@2.1.0) (2021-11-17)

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

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@2.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@2.0.0) (2021-10-12)

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

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@1.3.0) (2021-08-17)

#### 🚀 Features

- update all Heap impls, opts, add factories ([fbfb7bb](https://github.com/thi-ng/umbrella/commit/fbfb7bb))
  - add HeapOpts.equiv predicate
  - add [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/main/packages/equiv) dependency
  - add Heap.remove(), .find(), .findWith()
  - add defHeap/defDHeap/defPairingHeap() factory fns
- add PriorityQueue impl ([c33027b](https://github.com/thi-ng/umbrella/commit/c33027b))
- add/update find()/has() impls ([5ca6538](https://github.com/thi-ng/umbrella/commit/5ca6538))

### [1.2.38](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@1.2.38) (2021-03-17)

#### 🩹 Bug fixes

- update return types ([#283](https://github.com/thi-ng/umbrella/issues/283)) ([f7eabec](https://github.com/thi-ng/umbrella/commit/f7eabec))
  - add explicit return types for Heap.peek()/pop()/pushPop()

### [1.2.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@1.2.31) (2021-01-21)

#### 🩹 Bug fixes

- update pushPop() comparison ([f530236](https://github.com/thi-ng/umbrella/commit/f530236))

### [1.2.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@1.2.28) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [1.2.26](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@1.2.26) (2020-11-24)

#### ♻️ Refactoring

- update destructuring ([43e7ab7](https://github.com/thi-ng/umbrella/commit/43e7ab7))

### [1.2.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@1.2.24) (2020-09-13)

#### ♻️ Refactoring

- update imports ([1d7ae16](https://github.com/thi-ng/umbrella/commit/1d7ae16))

### [1.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@1.2.2) (2020-02-25)

#### ♻️ Refactoring

- update imports ([a79cdcd](https://github.com/thi-ng/umbrella/commit/a79cdcd))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@1.2.0) (2020-01-24)

#### 🚀 Features

- add PairingHeap ([748da44](https://github.com/thi-ng/umbrella/commit/748da44))

#### ⏱ Performance improvements

- add benchmarks ([2208353](https://github.com/thi-ng/umbrella/commit/2208353))

#### ♻️ Refactoring

- add Iterable, IClear decls ([dbf488b](https://github.com/thi-ng/umbrella/commit/dbf488b))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([86b9c9e](https://github.com/thi-ng/umbrella/commit/86b9c9e))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([6f37226](https://github.com/thi-ng/umbrella/commit/6f37226))
- address TS strictNullChecks flag ([11b11c9](https://github.com/thi-ng/umbrella/commit/11b11c9))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@0.3.0) (2018-10-21)

#### 🚀 Features

- add pushPopAll() ([1063fea](https://github.com/thi-ng/umbrella/commit/1063fea))

#### ♻️ Refactoring

- public fields ([f7bbfde](https://github.com/thi-ng/umbrella/commit/f7bbfde))

### [0.2.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@0.2.7) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@0.2.0) (2018-04-22)

#### 🚀 Features

- add min/max(), update heapify() and percolate methods ([c4bbee0](https://github.com/thi-ng/umbrella/commit/c4bbee0))
- iterator now returns min() seq ([fccb3af](https://github.com/thi-ng/umbrella/commit/fccb3af))

#### 🩹 Bug fixes

- add DHeap ICopy/IEmpty impls, fix return types ([5894572](https://github.com/thi-ng/umbrella/commit/5894572))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/heaps@0.1.0) (2018-04-22)

#### 🚀 Features

- import [@thi.ng/heaps](https://github.com/thi-ng/umbrella/tree/main/packages/heaps) package ([0ea0847](https://github.com/thi-ng/umbrella/commit/0ea0847))

#### ♻️ Refactoring

- major update / simplify, fix DHeap, add accessors ([ab4abf5](https://github.com/thi-ng/umbrella/commit/ab4abf5))
