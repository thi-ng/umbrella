# Change Log

- **Last updated**: 2022-11-30T22:27:37Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@2.1.0) (2021-11-17)

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

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@2.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@2.0.0) (2021-10-12)

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
- update imports ([7e1855c](https://github.com/thi-ng/umbrella/commit/7e1855c))

### [1.4.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@1.4.17) (2020-09-13)

#### ♻️ Refactoring

- update imports, use new Fn types in various pkgs ([ced1e5d](https://github.com/thi-ng/umbrella/commit/ced1e5d))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@1.4.0) (2020-03-28)

#### 🚀 Features

- add promisify() ([dfcf4ab](https://github.com/thi-ng/umbrella/commit/dfcf4ab))

### [1.3.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@1.3.9) (2020-02-25)

#### ♻️ Refactoring

- update imports ([252cbab](https://github.com/thi-ng/umbrella/commit/252cbab))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@1.3.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([8ea894a](https://github.com/thi-ng/umbrella/commit/8ea894a))
- address TS strictNullChecks, make Delay.value protected ([1540f37](https://github.com/thi-ng/umbrella/commit/1540f37))
  - users now MUST use .deref() to obtain result
- add ifDef() ([64aba00](https://github.com/thi-ng/umbrella/commit/64aba00))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@1.2.0) (2019-03-10)

#### 🚀 Features

- add complement() ([5a5a2d1](https://github.com/thi-ng/umbrella/commit/5a5a2d1))
- add trampoline() ([9e4c171](https://github.com/thi-ng/umbrella/commit/9e4c171))

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))
- update partial() type args, update readme ([81886fe](https://github.com/thi-ng/umbrella/commit/81886fe))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@1.1.0) (2019-02-15)

#### 🚀 Features

- add new functions ([dd13fa9](https://github.com/thi-ng/umbrella/commit/dd13fa9))
  - add constantly()
  - add delay()
  - add delayed()
  - add identity()

#### 🩹 Bug fixes

- add varargs override for jux(),  add tests ([e9d57fc](https://github.com/thi-ng/umbrella/commit/e9d57fc))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- use arrow fns ([35377bd](https://github.com/thi-ng/umbrella/commit/35377bd))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@0.3.0) (2018-12-27)

#### 🚀 Features

- add threadFirst/Last, rename compI => compL ([0061b21](https://github.com/thi-ng/umbrella/commit/0061b21))

#### 🩹 Bug fixes

- fix comp() for arities >10 ([1ebfea9](https://github.com/thi-ng/umbrella/commit/1ebfea9))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@0.2.0) (2018-10-17)

#### 🚀 Features

- add partial(), update readme ([6851f2c](https://github.com/thi-ng/umbrella/commit/6851f2c))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/compose@0.1.0) (2018-08-24)

#### 🚀 Features

- extract comp() & juxt() to new [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/main/packages/compose) package ([ca0a04e](https://github.com/thi-ng/umbrella/commit/ca0a04e))
  - add compI() using reverse arg order of comp()
