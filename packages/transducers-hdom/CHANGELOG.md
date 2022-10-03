# Change Log

- **Last updated**: 2022-10-03T16:07:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@3.1.0) (2021-11-17)

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

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@3.0.0) (2021-10-12)

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

- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))
- update imports ([924aa26](https://github.com/thi-ng/umbrella/commit/924aa26))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [2.0.74](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@2.0.74) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@2.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))
- BREAKING CHANGE: enable multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols
- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- use arrow fns ([ce4b528](https://github.com/thi-ng/umbrella/commit/ce4b528))

### [1.2.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@1.2.6) (2018-12-13)

#### 🩹 Bug fixes

- integrate recent hdom updates ([6db3170](https://github.com/thi-ng/umbrella/commit/6db3170))

### [1.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@1.2.1) (2018-11-07)

#### ♻️ Refactoring

- update auto-deref ctx behavior ([52a47f0](https://github.com/thi-ng/umbrella/commit/52a47f0))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@1.2.0) (2018-11-06)

#### 🚀 Features

- add support for dynamic user context vals ([e91dbbc](https://github.com/thi-ng/umbrella/commit/e91dbbc))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@1.1.0) (2018-09-22)

#### 🩹 Bug fixes

- add missing type annotation ([78b1f4a](https://github.com/thi-ng/umbrella/commit/78b1f4a))

### [1.1.0-alpha](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@1.1.0-alpha) (2018-09-16)

#### 🩹 Bug fixes

- update to work w/ new [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/main/packages/hdom) v5 API ([832e419](https://github.com/thi-ng/umbrella/commit/832e419))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@1.0.0) (2018-08-31)

#### 🛑 Breaking changes

- add DOM hydration support, rename ([#39](https://github.com/thi-ng/umbrella/issues/39)) ([0f39694](https://github.com/thi-ng/umbrella/commit/0f39694))
  - replace args with HDOMOpts
  - add support for `hydrate`
  - reflect same logic as w/ hdom `start()` re: null values
- BREAKING CHANGE: rename transducer: `updateUI` => `updateDOM`, new API

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@0.1.1) (2018-08-02)

#### 🩹 Bug fixes

- support hdom user context ([949a5d4](https://github.com/thi-ng/umbrella/commit/949a5d4))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers-hdom@0.1.0) (2018-08-02)

#### 🚀 Features

- add new package [@thi.ng/transducers-hdom](https://github.com/thi-ng/umbrella/tree/main/packages/transducers-hdom) ([7efce7a](https://github.com/thi-ng/umbrella/commit/7efce7a))
