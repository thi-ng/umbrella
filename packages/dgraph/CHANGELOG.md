# Change Log

- **Last updated**: 2023-12-03T12:13:31Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.76](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@2.1.76) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@2.0.0) (2021-10-12)

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
- update imports ([659d32a](https://github.com/thi-ng/umbrella/commit/659d32a))
- update imports (transducers) ([441d708](https://github.com/thi-ng/umbrella/commit/441d708))

### [1.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@1.3.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@1.3.0) (2020-11-24)

#### 🚀 Features

- update defDGraph, DGraph ctor ([8aee78a](https://github.com/thi-ng/umbrella/commit/8aee78a))
  - provided edge pairs can now also be `[node, null]` to only register
    a node without any dependencies

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@1.2.0) (2020-04-03)

#### 🚀 Features

- add defDGraph(), update ctor to accept edge pairs ([b45a6da](https://github.com/thi-ng/umbrella/commit/b45a6da))

### [1.1.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@1.1.20) (2020-02-25)

#### ♻️ Refactoring

- update imports ([2641a40](https://github.com/thi-ng/umbrella/commit/2641a40))

### [1.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@1.1.10) (2019-07-07)

#### ♻️ Refactoring

- TS strictNullChecks ([950cb6d](https://github.com/thi-ng/umbrella/commit/950cb6d))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@1.1.0) (2019-04-02)

#### 🚀 Features

- add addNode(), refactor to use ArraySet, add tests ([ab7650f](https://github.com/thi-ng/umbrella/commit/ab7650f))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

### [0.2.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@0.2.12) (2018-08-24)

#### ♻️ Refactoring

- update/replace deps (iterators => transducers) ([d635226](https://github.com/thi-ng/umbrella/commit/d635226))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@0.2.1) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@0.2.0) (2018-05-09)

#### 🚀 Features

- add leaves() & roots() iterators, update sort() ([68ca46d](https://github.com/thi-ng/umbrella/commit/68ca46d))

### [0.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@0.1.3) (2018-04-13)

#### ♻️ Refactoring

- regression update due to [@thi.ng/associative](https://github.com/thi-ng/umbrella/tree/main/packages/associative) changes ([d798cee](https://github.com/thi-ng/umbrella/commit/d798cee))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@0.1.2) (2018-04-13)

#### ♻️ Refactoring

- update ArrayMap/Set refs ([2636143](https://github.com/thi-ng/umbrella/commit/2636143))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@0.1.1) (2018-04-10)

#### 🩹 Bug fixes

- update corrupted deps ([675847b](https://github.com/thi-ng/umbrella/commit/675847b))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dgraph@0.1.0) (2018-04-10)

#### 🚀 Features

- re-import DGraph impl & tests, update readme ([e086be6](https://github.com/thi-ng/umbrella/commit/e086be6))
