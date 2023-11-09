# Change Log

- **Last updated**: 2023-11-09T10:02:12Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.1.80](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-csp@3.1.80) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-csp@3.1.0) (2021-11-17)

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

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-csp@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-csp@3.0.0) (2021-10-12)

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
- update imports in various pkgs (rstream) ([342cf54](https://github.com/thi-ng/umbrella/commit/342cf54))
- minor pkg restructure ([103f1ba](https://github.com/thi-ng/umbrella/commit/103f1ba))

### [2.0.45](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-csp@2.0.45) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports ([615761b](https://github.com/thi-ng/umbrella/commit/615761b))

### [2.0.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-csp@2.0.3) (2020-02-25)

#### ♻️ Refactoring

- update imports ([4001d12](https://github.com/thi-ng/umbrella/commit/4001d12))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-csp@2.0.0) (2019-11-30)

#### 🛑 Breaking changes

- use options object arg ([b39f4d0](https://github.com/thi-ng/umbrella/commit/b39f4d0))
- BREAKING CHANGE: use options object arg for fromChannel()

### [1.0.31](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-csp@1.0.31) (2019-08-21)

#### ♻️ Refactoring

- update to new rstream api ([9d05f4e](https://github.com/thi-ng/umbrella/commit/9d05f4e))

### [1.0.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-csp@1.0.24) (2019-04-24)

#### ♻️ Refactoring

- replace DEBUG w/ LOGGER impl ([8a87bd0](https://github.com/thi-ng/umbrella/commit/8a87bd0))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-csp@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))
- BREAKING CHANGE: enable multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols

#### ♻️ Refactoring

- use arrow fns ([762db4e](https://github.com/thi-ng/umbrella/commit/762db4e))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-csp@0.1.0) (2018-01-28)

#### 🚀 Features

- add new package, remove CSP dep from rstream ([e37f6a1](https://github.com/thi-ng/umbrella/commit/e37f6a1))
