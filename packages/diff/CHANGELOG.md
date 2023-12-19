# Change Log

- **Last updated**: 2023-12-19T11:01:47Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@5.1.0) (2021-11-17)

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

### [5.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@5.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [5.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@5.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@5.0.0) (2021-10-12)

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

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@4.0.0) (2020-12-22)

#### 🛑 Breaking changes

- fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace DiffMode enum ([cc77c71](https://github.com/thi-ng/umbrella/commit/cc77c71))
- BREAKING CHANGE: replace DiffMode enum w/ type alias
  - rename DiffMode.ONLY_DISTANCE_LINEAR_ONLY_CHANGES => "minimal"
  - update diffObject() mode arg to only allow: "full" or "only-distance"

### [3.2.35](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@3.2.35) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [3.2.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@3.2.31) (2020-09-13)

#### ♻️ Refactoring

- update imports, use new Fn types in various pkgs ([ced1e5d](https://github.com/thi-ng/umbrella/commit/ced1e5d))
- update imports ([c1a8efa](https://github.com/thi-ng/umbrella/commit/c1a8efa))

### [3.2.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@3.2.20) (2020-05-05)

#### ⏱ Performance improvements

- diffArray() main loop, add clearCache() ([fa2f692](https://github.com/thi-ng/umbrella/commit/fa2f692))
  - remove obsolete secondary counters
  - avoid snake() return val
  - reset internal LUTs
  - add clearCache() to force GC

### [3.2.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@3.2.14) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([6abb323](https://github.com/thi-ng/umbrella/commit/6abb323))

### [3.2.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@3.2.9) (2020-02-25)

#### ♻️ Refactoring

- update imports ([3fabbbb](https://github.com/thi-ng/umbrella/commit/3fabbbb))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@3.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([5a7d90b](https://github.com/thi-ng/umbrella/commit/5a7d90b))

#### ♻️ Refactoring

- address TS strictNullChecks flag, add/update types ([0252a4b](https://github.com/thi-ng/umbrella/commit/0252a4b))
  - add EditLog type alias
  - update ArrayDiff, ObjectDiff interfaces
- allow args to be undefined/null ([f6ae89d](https://github.com/thi-ng/umbrella/commit/f6ae89d))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@3.1.0) (2019-04-11)

#### 🚀 Features

- add DiffMode.ONLY_DISTANCE_LINEAR_ONLY_CHANGES, add tests ([9a2087d](https://github.com/thi-ng/umbrella/commit/9a2087d))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@3.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@2.0.1) (2018-12-09)

#### ⏱ Performance improvements

- further array caching/reuse ([19b0a55](https://github.com/thi-ng/umbrella/commit/19b0a55))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@2.0.0) (2018-12-08)

#### 🛑 Breaking changes

- flatten linear edit logs, rewrite diffObject(), add DiffMode ([e8356cd](https://github.com/thi-ng/umbrella/commit/e8356cd))
- BREAKING CHANGES: `ArrayDiff.linear` & `ObjectDiff.edits` now flat arrays
  - this change drastically reduces the number of array allocations
  - each ArrayDiff.linear entry consists of 3 successive items
  - each ObjectDiff.edits entry constist of 2 successive items
  - add `DiffMode` enum to control level of detail & internal fast paths
  - update `ArrayDiff` & `ObjectDiff` types
  - remove obsolete `DiffLogEntry`
  - replace `diffObject` with 2.5x faster version
- flatten linear edit logs, update readme & arg order ([64feacf](https://github.com/thi-ng/umbrella/commit/64feacf))
- BREAKING CHANGE: `ArrayDiff.linear` & `ObjectDiff.edits` now flat arrays
  - see commit [e8356cd296c12462ad9b126f966b55545b6ef70d](https://github.com/thi-ng/umbrella/commit/e8356cd296c12462ad9b126f966b55545b6ef70d)
  - this change drastically reduces the number of array allocations
  - each ArrayDiff.linear entry consists of 3 successive items
  - each ObjectDiff.edits entry constist of 2 successive items
  - add `DiffMode` enum to control level of detail & internal fast paths
  - update `ArrayDiff` & `ObjectDiff` types
  - remove obsolete `DiffLogEntry`
  - replace `diffObject` with 2.5x faster version

#### 🚀 Features

- add fast paths for simple cases, add tests, refactor as arrow fns ([6c6da82](https://github.com/thi-ng/umbrella/commit/6c6da82))

#### ⏱ Performance improvements

- reduce amount of temp/internal array allocs (diffArray) ([d1ee6d9](https://github.com/thi-ng/umbrella/commit/d1ee6d9))
  - hdom-benchmark for 256 cells now @ 39.8fps (vs 32.5 previously)

### [1.0.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@1.0.12) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

### [1.0.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@1.0.10) (2018-04-30)

#### ⏱ Performance improvements

- add option to only build linear edit log ([431527a](https://github.com/thi-ng/umbrella/commit/431527a))
  - extract edit log stages into buildFullLog()/buildLinearLog()
  - buildLinearLog() approx 1.8x faster

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@1.0.0) (2018-02-27)

#### 🛑 Breaking changes

- update diffArray, generic types ([6e0dfa1](https://github.com/thi-ng/umbrella/commit/6e0dfa1))
  - avoid nested array in DiffLogEntry, now flat 3-tuple
  - add generics for ArrayDiff, DiffLogEntry, DiffKeyMap
  - remove DiffLogPair
  - minor optimization diffArray
- BREAKING CHANGE: update DiffLogEntry structure

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@0.1.1) (2018-02-02)

#### ⏱ Performance improvements

- add fail fasts ([448e839](https://github.com/thi-ng/umbrella/commit/448e839))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/diff@0.1.0) (2018-02-01)

#### 🚀 Features

- re-import diff package (MBP2010) ([4d0d437](https://github.com/thi-ng/umbrella/commit/4d0d437))
