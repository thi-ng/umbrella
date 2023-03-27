# Change Log

- **Last updated**: 2023-03-27T19:05:49Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.1.12) (2022-07-19)

#### ♻️ Refactoring

- update deprecated DCons call sites ([2bbacf7](https://github.com/thi-ng/umbrella/commit/2bbacf7))

### [2.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.1.5) (2022-03-11)

#### ♻️ Refactoring

- update ConsCell refs/imports ([a883993](https://github.com/thi-ng/umbrella/commit/a883993))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@2.0.0) (2021-10-12)

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

- minor updates (TS4.4) ([7e91cc2](https://github.com/thi-ng/umbrella/commit/7e91cc2))
  - redeclare, not override inherited class properties

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([d02461f](https://github.com/thi-ng/umbrella/commit/d02461f))
- update imports (transducers) ([09fb93e](https://github.com/thi-ng/umbrella/commit/09fb93e))

### [1.0.63](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@1.0.63) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([78d3dee](https://github.com/thi-ng/umbrella/commit/78d3dee))

### [1.0.58](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@1.0.58) (2020-09-13)

#### ♻️ Refactoring

- update imports ([7deb862](https://github.com/thi-ng/umbrella/commit/7deb862))

### [1.0.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@1.0.30) (2020-02-25)

#### ♻️ Refactoring

- update imports ([0653e1b](https://github.com/thi-ng/umbrella/commit/0653e1b))

### [1.0.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@1.0.24) (2019-08-21)

#### ♻️ Refactoring

- update set(), extract doSetEntry() ([db880fd](https://github.com/thi-ng/umbrella/commit/db880fd))

### [1.0.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@1.0.20) (2019-07-07)

#### ♻️ Refactoring

- address TS strictNullChecks flag ([d53056b](https://github.com/thi-ng/umbrella/commit/d53056b))

### [1.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@1.0.9) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### 🩹 Bug fixes

- TLRU: expected behavior on getSet() ([c3762e9](https://github.com/thi-ng/umbrella/commit/c3762e9))

### [0.2.29](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@0.2.29) (2018-10-17)

#### ♻️ Refactoring

- update Infinity consts in various packages ([296e1e0](https://github.com/thi-ng/umbrella/commit/296e1e0))

### [0.2.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@0.2.18) (2018-08-27)

#### ♻️ Refactoring

- update iterator methods ([866f3cd](https://github.com/thi-ng/umbrella/commit/866f3cd))

### [0.2.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@0.2.16) (2018-08-24)

#### ♻️ Refactoring

- update/replace deps (iterators => transducers) ([065d78b](https://github.com/thi-ng/umbrella/commit/065d78b))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@0.2.0) (2018-04-22)

#### 🚀 Features

- add TLRUCache.prune(), fix ensureSize() ([9d53ae3](https://github.com/thi-ng/umbrella/commit/9d53ae3))

#### 🩹 Bug fixes

- TLRUCache.get(), add tests, update package ([aa78d77](https://github.com/thi-ng/umbrella/commit/aa78d77))
  - get() now correctly shifts element to back (LRU)

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/cache@0.1.0) (2018-04-22)

#### 🚀 Features

- initial import [@thi.ng/cache](https://github.com/thi-ng/umbrella/tree/main/packages/cache) package ([7bbbfa8](https://github.com/thi-ng/umbrella/commit/7bbbfa8))
- add MRUCache, update package & readme ([26c4cfd](https://github.com/thi-ng/umbrella/commit/26c4cfd))
- add TLRUCache ([574b5d9](https://github.com/thi-ng/umbrella/commit/574b5d9))

#### 🩹 Bug fixes

- don't insert new val if > maxsize ([3947419](https://github.com/thi-ng/umbrella/commit/3947419))
- recompute size in LRUCache.delete(), extract removeEntry() ([c4a9c07](https://github.com/thi-ng/umbrella/commit/c4a9c07))

#### ♻️ Refactoring

- update/extend ICache & LRUCache, update readme ([d37a91e](https://github.com/thi-ng/umbrella/commit/d37a91e))
- make LRU ops O(1), update/remove (some) interfaces ([00ca831](https://github.com/thi-ng/umbrella/commit/00ca831))
  - use Map to index dcons cells
  - update CachOpts (add map ctor option)
  - remove LRUEntry
  - update LRU entries iterator
