# Change Log

- **Last updated**: 2023-04-08T11:09:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@3.0.0) (2023-04-08)

#### 🛑 Breaking changes

- add serialize() ([f3bb5ab](https://github.com/thi-ng/umbrella/commit/f3bb5ab))
- BREAKING CHANGE: rename walk() => traverse()
  - add serialize() function
  - rename WalkState => TraversalState
  - update default rank direction from TB => LR

#### 🩹 Bug fixes

- update descendants collection ([fdd1ad2](https://github.com/thi-ng/umbrella/commit/fdd1ad2))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@2.0.0) (2021-10-12)

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
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports (transducers) ([7fc60cd](https://github.com/thi-ng/umbrella/commit/7fc60cd))
- update imports in various pkgs (rstream) ([342cf54](https://github.com/thi-ng/umbrella/commit/342cf54))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@1.2.0) (2021-02-22)

#### 🚀 Features

- update opts, deps & value handling ([be0b146](https://github.com/thi-ng/umbrella/commit/be0b146))
  - truncate node values if > 64 chars
  - make color opts partial
  - update default opts (top-bottom ranks, sans-serif font)
  - various internal refactorings
  - update deps

### [1.1.52](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@1.1.52) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [1.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@1.1.10) (2020-02-25)

#### ♻️ Refactoring

- update imports ([c900e63](https://github.com/thi-ng/umbrella/commit/c900e63))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([acfe75e](https://github.com/thi-ng/umbrella/commit/acfe75e))

#### ♻️ Refactoring

- TS strictNullChecks ([efca49c](https://github.com/thi-ng/umbrella/commit/efca49c))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))
- BREAKING CHANGE: enable multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols

### [0.2.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@0.2.31) (2018-08-01)

#### ♻️ Refactoring

- cleanup imports ([c169017](https://github.com/thi-ng/umbrella/commit/c169017))

### [0.2.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@0.2.4) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@0.2.0) (2018-04-26)

#### 🚀 Features

- add option to include stream values in diag ([d057d95](https://github.com/thi-ng/umbrella/commit/d057d95))
  - add DotOpts.values option
  - update walk() to accept optional DotOpts arg
  - update dotNode()

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-dot@0.1.0) (2018-04-24)

#### 🚀 Features

- initial import [@thi.ng/rstream-dot](https://github.com/thi-ng/umbrella/tree/main/packages/rstream-dot) package ([e72478a](https://github.com/thi-ng/umbrella/commit/e72478a))
- support multiple roots in walk() ([704025a](https://github.com/thi-ng/umbrella/commit/704025a))
- add xform edge labels, extract types to api.ts ([7ffaa61](https://github.com/thi-ng/umbrella/commit/7ffaa61))
