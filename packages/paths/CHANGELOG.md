# Change Log

- **Last updated**: 2022-04-07T14:17:30Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@5.1.0) (2021-11-17)

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

### [5.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@5.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [5.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@5.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@5.0.0) (2021-10-12)

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
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@4.2.0) (2021-02-20)

#### 🚀 Features

- use updated/more safe isProtoPath() ([456fac1](https://github.com/thi-ng/umbrella/commit/456fac1))
  - replace existing isProtoPath() w/ extended version
    from [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/main/packages/checks) pkg
  - update docs for disallowProtoPath()

### [4.1.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@4.1.11) (2020-12-22)

#### ♻️ Refactoring

- update toPath() (TS4.1.3) ([605e15c](https://github.com/thi-ng/umbrella/commit/605e15c))

### [4.1.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@4.1.8) (2020-11-24)

#### ♻️ Refactoring

- update toPath() return type (TS4.1) ([eb40216](https://github.com/thi-ng/umbrella/commit/eb40216))

### [4.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@4.1.6) (2020-09-13)

#### ♻️ Refactoring

- update imports ([7a844ff](https://github.com/thi-ng/umbrella/commit/7a844ff))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@4.1.0) (2020-07-08)

#### 🚀 Features

- add isProtoPath/disallowProtoPath() helpers ([2e6a80f](https://github.com/thi-ng/umbrella/commit/2e6a80f))
  - update readme

### [4.0.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@4.0.7) (2020-05-16)

#### 🩹 Bug fixes

- arg type for 2-arity getIn() ([56d5cd0](https://github.com/thi-ng/umbrella/commit/56d5cd0))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@4.0.0) (2020-03-28)

#### 🛑 Breaking changes

- update path value inference ([ab4440e](https://github.com/thi-ng/umbrella/commit/ab4440e))
  - use OptPathVal for return type of read ops
  - use PathVal for value arg in update ops
- BREAKING CHANGE: update generics for `UpdateFn`
  - UpdateFn now takes input & output type generics

#### 🚀 Features

- add/update unsafe type infer, update doc strings ([5cc5b46](https://github.com/thi-ng/umbrella/commit/5cc5b46))
- major API update ([b51efc6](https://github.com/thi-ng/umbrella/commit/b51efc6))
  BREAKING CHANGES: Major API updates, new semantics, renamed operators
  - major simplification func sigs (using new `Path1-8` types)
  - add/rename `getter()` => `defGetter()`/`defGetterUnsafe()`
  - add/rename `setter()` => `defSetter()`/`defSetterUnsafe()`
  - add/rename `updater()` => `defUpdater()`/`defUpdaterUnsafe()`
  - add/rename `mutator()` => `defMutator()`/`defMutatorUnsafe()`
  - rename all unchecked ops to `xxxUnsafe()`
  - type checked ops are using no suffixes
  - add overrides for mut/setInManyUnsafe()
  - update doc strings
  - update tests
- update typed path sigs ([0b6c155](https://github.com/thi-ng/umbrella/commit/0b6c155))
  - add readonly modifier to allow const path tuples in accessors
    e.g. `<const>["a", "b"]`

### [3.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@3.0.2) (2020-02-25)

#### ♻️ Refactoring

- update imports ([78b8eff](https://github.com/thi-ng/umbrella/commit/78b8eff))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@3.0.0) (2019-11-30)

#### 🛑 Breaking changes

- use `Path` from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api), remove local def ([a142655](https://github.com/thi-ng/umbrella/commit/a142655))
- BREAKING CHANGE: re-use `Path` from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api), remove local def

#### 🚀 Features

- [#87](https://github.com/thi-ng/umbrella/issues/87), add typed versions of all fns, split into sep files ([319f4f8](https://github.com/thi-ng/umbrella/commit/319f4f8))

#### 🩹 Bug fixes

- update fn signatures (remove obsolete) ([47dd001](https://github.com/thi-ng/umbrella/commit/47dd001))

#### ♻️ Refactoring

- update fn order, update docs ([207a4f8](https://github.com/thi-ng/umbrella/commit/207a4f8))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@2.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([55e93ee](https://github.com/thi-ng/umbrella/commit/55e93ee))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([cbfcee4](https://github.com/thi-ng/umbrella/commit/cbfcee4))

### [2.0.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@2.0.7) (2019-03-28)

#### 🩹 Bug fixes

- fix getIn for empty leaves, add tests ([49952fd](https://github.com/thi-ng/umbrella/commit/49952fd))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@2.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- update all as arrow fns ([fc22a27](https://github.com/thi-ng/umbrella/commit/fc22a27))

## [1.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@1.6.0) (2018-09-01)

#### 🚀 Features

- add exists() path checker & tests ([f018353](https://github.com/thi-ng/umbrella/commit/f018353))

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@1.5.0) (2018-07-11)

#### 🚀 Features

- add updater(), refactor updateIn(), update readme ([ad4caad](https://github.com/thi-ng/umbrella/commit/ad4caad))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@1.4.0) (2018-07-04)

#### 🚀 Features

- update setter() to support arrays, optimize (~2.5x faster) ([3d9d620](https://github.com/thi-ng/umbrella/commit/3d9d620))

### [1.3.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@1.3.5) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@1.3.0) (2018-04-17)

#### 🚀 Features

- add setInMany() and mutInMany(), add [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) dependency ([8f3a3d1](https://github.com/thi-ng/umbrella/commit/8f3a3d1))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@1.2.0) (2018-04-16)

#### 🚀 Features

- add mutator() & mutIn() ([4c1bd85](https://github.com/thi-ng/umbrella/commit/4c1bd85))

### [1.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@1.1.1) (2018-03-18)

#### 🩹 Bug fixes

- fix setter fast paths ([eaeccf4](https://github.com/thi-ng/umbrella/commit/eaeccf4))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/paths@1.1.0) (2018-03-18)

#### 🩹 Bug fixes

- fix setIn fast paths for path length 3/4 ([92f0e27](https://github.com/thi-ng/umbrella/commit/92f0e27))
