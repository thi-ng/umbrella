# Change Log

- **Last updated**: 2024-03-01T15:22:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [6.1.49](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@6.1.49) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@6.1.0) (2021-11-17)

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

### [6.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@6.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@6.0.0) (2021-10-12)

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
- update various benchmarks ([53e8a6a](https://github.com/thi-ng/umbrella/commit/53e8a6a))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@5.0.0) (2021-02-20)

#### 🛑 Breaking changes

- update mallocAs/callocAs() handling ([159042a](https://github.com/thi-ng/umbrella/commit/159042a))
- BREAKING CHANGE: block type use string consts
  - part of unified umbrella-wide changes to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) Type alias
    (see [a333d4182](https://github.com/thi-ng/umbrella/commit/a333d4182))
  - no code changes, just arg type update
  - update tests

### [4.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@4.2.3) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports ([91817aa](https://github.com/thi-ng/umbrella/commit/91817aa))

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@4.2.0) (2020-10-19)

#### 🚀 Features

- add NativePool & tests ([8b2b4f6](https://github.com/thi-ng/umbrella/commit/8b2b4f6))

#### ♻️ Refactoring

- extract IMemPoolAs interface ([69e018c](https://github.com/thi-ng/umbrella/commit/69e018c))
- rename IMemPoolAs => IMemPoolArray ([2647274](https://github.com/thi-ng/umbrella/commit/2647274))

### [4.1.26](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@4.1.26) (2020-09-22)

#### ♻️ Refactoring

- update realloc(), add 0-checks ([cc13a8f](https://github.com/thi-ng/umbrella/commit/cc13a8f))
  - extract private reallocBlock() method
  - add checks to blockDataAddress/blockSelfAddress()
- update malloc() ([6fd0c1f](https://github.com/thi-ng/umbrella/commit/6fd0c1f))
  - extract private mallocTop()

### [4.1.25](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@4.1.25) (2020-09-13)

#### ♻️ Refactoring

- update imports ([74aa25a](https://github.com/thi-ng/umbrella/commit/74aa25a))

### [4.1.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@4.1.24) (2020-08-28)

#### ♻️ Refactoring

- update delete op (TS4.0) ([609d2da](https://github.com/thi-ng/umbrella/commit/609d2da))

### [4.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@4.1.4) (2020-02-25)

#### ♻️ Refactoring

- update imports ([97ede12](https://github.com/thi-ng/umbrella/commit/97ede12))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@4.1.0) (2019-11-09)

#### 🚀 Features

- add more buffered state, align opt, refactor, update tests ([1ff9487](https://github.com/thi-ng/umbrella/commit/1ff9487))
  - add MemPoolOpts doc strings
  - add block alignment config
  - add separate view for pool state only
  - store compact/split config in buffer as well, add accessors
  - update/simplify MemBlockWrapper
  - extract toXXXAddress() as standalone fns
  - update tests to use computed addresses
- fix block alignment/layout, update calloc/realloc ([a40c265](https://github.com/thi-ng/umbrella/commit/a40c265))
  - align initial `top` to first aligned address minus SIZEOF_MEM_BLOCK
  - fix new `top` calculation in malloc()
  - fix new `size` calculation in realloc()
  - update calloc() to only fill actual requested num bytes
  - add optional `fill` arg for calloc/callocAs()
  - use better/specific return types for mallocAs/callocAs(), reallocArray()
  - update/simplify blockDataAddress/blockSelfAddress() logic
  - add unlinkBlock() helper
  - add/update tests

#### 🩹 Bug fixes

- update freeAll(), add test, doc strings, minor cleanup ([830b267](https://github.com/thi-ng/umbrella/commit/830b267))
- fix realloc(), various refactorings, add tests ([fa3e1bc](https://github.com/thi-ng/umbrella/commit/fa3e1bc))
  - fix realloc() to pass original size arg to malloc (not padded size)
  - fix realloc() block migration to copy only data region
  - re-order STATE_FREE/USED
  - extract initialTop() calculation
  - add initBlock() / setBlockSize() return values, update call sites
  - minor update compact() to re-use computed value
  - rename various args/vars to be more consistent
  - add docstrings

#### ♻️ Refactoring

- migrate & re-use types from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([12898f0](https://github.com/thi-ng/umbrella/commit/12898f0))
- replace MemBlockWrapper w/ implict list, remove wrap() ([973c779](https://github.com/thi-ng/umbrella/commit/973c779))
- minor refactoring, add tests, update benchmark ([8642648](https://github.com/thi-ng/umbrella/commit/8642648))
  - re-use block size lookups in malloc()/realloc()
- fix [#163](https://github.com/thi-ng/umbrella/issues/163), extract splitBlock() method ([6737c64](https://github.com/thi-ng/umbrella/commit/6737c64))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@4.0.0) (2019-07-07)

#### 🛑 Breaking changes

- address TS strictNullChecks flag ([e4781e3](https://github.com/thi-ng/umbrella/commit/e4781e3))
  - set default pool size in ctor (0x1000)
- BREAKING CHANGE: update IMemPool return types
  - callocAs, mallocAs, reallocAs() now return `undefined` instead of
    `null` if operation failed

#### 🚀 Features

- export typed array ctors, update wrap() ([3413ad7](https://github.com/thi-ng/umbrella/commit/3413ad7))
  (cherry picked from commit [8fcf05c789bbc7524c340f13bbf369be77d2ed51](https://github.com/thi-ng/umbrella/commit/8fcf05c789bbc7524c340f13bbf369be77d2ed51))
- export typed array ctors, update wrap() ([8fcf05c](https://github.com/thi-ng/umbrella/commit/8fcf05c))
- enable TS strict compiler flags (refactor) ([e23e555](https://github.com/thi-ng/umbrella/commit/e23e555))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@3.0.0) (2019-05-22)

#### 🛑 Breaking changes

- remove Type enum, SIZEOF ([b26df6d](https://github.com/thi-ng/umbrella/commit/b26df6d))
  - update references & tests
- BREAKING CHANGE: remove Type enum, SIZEOF, migrated to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api)

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@2.0.0) (2019-02-05)

#### 🛑 Breaking changes

- update MemPoolOpts & MemPool ctor args ([6d15686](https://github.com/thi-ng/umbrella/commit/6d15686))
- BREAKING CHANGE: update MemPoolOpts & MemPool ctor args

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- update imports ([f3a5e0f](https://github.com/thi-ng/umbrella/commit/f3a5e0f))
- add/extract types to api.ts ([c8d8a37](https://github.com/thi-ng/umbrella/commit/c8d8a37))
  (cherry picked from commit [e3727ce937824b1ed889fac6d66e488d4684a53e](https://github.com/thi-ng/umbrella/commit/e3727ce937824b1ed889fac6d66e488d4684a53e))
- update imports ([1cfefda](https://github.com/thi-ng/umbrella/commit/1cfefda))
  (cherry picked from commit [f3a5e0ffbd03390d93b6db9bea68e4947cfff7f3](https://github.com/thi-ng/umbrella/commit/f3a5e0ffbd03390d93b6db9bea68e4947cfff7f3))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@0.2.0) (2018-10-27)

#### 🚀 Features

- add MemPoolOpts, fix top block alloc, update tests, readme ([c5b0f2f](https://github.com/thi-ng/umbrella/commit/c5b0f2f))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/malloc@0.1.0) (2018-10-21)

#### 🚀 Features

- initial import [@thi.ng/malloc](https://github.com/thi-ng/umbrella/tree/main/packages/malloc) package ([2cf20c9](https://github.com/thi-ng/umbrella/commit/2cf20c9))
- re-add block compaction & splitting, update readme ([89f2bc2](https://github.com/thi-ng/umbrella/commit/89f2bc2))
- add freeAll(), release(), tests & benchmarks, update docs ([4b72cda](https://github.com/thi-ng/umbrella/commit/4b72cda))

#### 🩹 Bug fixes

- add size check, update readme ([787102a](https://github.com/thi-ng/umbrella/commit/787102a))
