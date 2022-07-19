# Change Log

- **Last updated**: 2022-07-19T15:36:12Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-carbon-icons@3.1.0) (2021-11-17)

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

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-carbon-icons@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-carbon-icons@3.0.0) (2021-10-12)

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

- minor pkg restructure ([755b0b3](https://github.com/thi-ng/umbrella/commit/755b0b3))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [2.0.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-carbon-icons@2.0.11) (2021-02-20)

#### ⏱ Performance improvements

- extract SVG root into shared fn ([760ea9f](https://github.com/thi-ng/umbrella/commit/760ea9f))
  - update withSize() to accept new/more args

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-carbon-icons@2.0.1) (2020-08-20)

#### ♻️ Refactoring

- add links, update types ([875c445](https://github.com/thi-ng/umbrella/commit/875c445))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-carbon-icons@2.0.0) (2020-08-19)

#### 🛑 Breaking changes

- add/update all icons ([22cfefc](https://github.com/thi-ng/umbrella/commit/22cfefc))
- BREAKING CHANGE: update all icons to latest carbon version
  - some icons have been removed/replaced or renamed
  - full set now counting ~1100 icons
  - add new conversion script
  - update readme

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-carbon-icons@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/hiccup-carbon-icons@0.1.0) (2018-12-14)

#### 🚀 Features

- add new package ([6b04e16](https://github.com/thi-ng/umbrella/commit/6b04e16))
