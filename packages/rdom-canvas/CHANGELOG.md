# Change Log

- **Last updated**: 2022-10-03T16:07:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@0.4.0) (2021-11-17)

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

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@0.3.0) (2021-10-25)

#### 🚀 Features

- add lifecycle events, canvas opts ([a579904](https://github.com/thi-ng/umbrella/commit/a579904))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@0.2.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@0.2.0) (2021-10-12)

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

- update imports (transducers) ([2fd7619](https://github.com/thi-ng/umbrella/commit/2fd7619))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [0.1.43](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@0.1.43) (2021-04-03)

#### ♻️ Refactoring

- minor updates ([b44b5e8](https://github.com/thi-ng/umbrella/commit/b44b5e8))

### [0.1.36](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@0.1.36) (2021-03-12)

#### ♻️ Refactoring

- minor update arg type (generics) ([a7748b3](https://github.com/thi-ng/umbrella/commit/a7748b3))
- update to use ISubscription only ([145cfe8](https://github.com/thi-ng/umbrella/commit/145cfe8))

### [0.1.21](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@0.1.21) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([2037326](https://github.com/thi-ng/umbrella/commit/2037326))

### [0.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@0.1.9) (2020-07-28)

#### 🩹 Bug fixes

- static canvas size handling ([1a03c70](https://github.com/thi-ng/umbrella/commit/1a03c70))
  - use `reactive()` instead of `trigger()`

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rdom-canvas@0.1.0) (2020-07-02)

#### 🚀 Features

- import as new pkg ([369d4de](https://github.com/thi-ng/umbrella/commit/369d4de))
