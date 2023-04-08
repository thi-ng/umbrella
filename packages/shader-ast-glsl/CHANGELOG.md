# Change Log

- **Last updated**: 2023-04-08T11:09:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.4.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-glsl@0.4.6) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-glsl@0.4.0) (2021-11-17)

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

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-glsl@0.3.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-glsl@0.3.0) (2021-10-12)

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

#### 🚀 Features

- add float precision option ([208f083](https://github.com/thi-ng/umbrella/commit/208f083))

#### 🩹 Bug fixes

- fix [#319](https://github.com/thi-ng/umbrella/issues/319), update uint handling ([d8d1b96](https://github.com/thi-ng/umbrella/commit/d8d1b96))
  - add 'u' prefix for uint literals
  - add/update tests

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports ([4541c9f](https://github.com/thi-ng/umbrella/commit/4541c9f))
- minor update [#319](https://github.com/thi-ng/umbrella/issues/319) ([7e6f84e](https://github.com/thi-ng/umbrella/commit/7e6f84e))

### [0.2.44](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-glsl@0.2.44) (2021-08-17)

#### ♻️ Refactoring

- update impl for new `idxm` node type ([75439ca](https://github.com/thi-ng/umbrella/commit/75439ca))
  - in GLSL this is same result as normal `idx` node

### [0.2.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-glsl@0.2.9) (2020-09-13)

#### ♻️ Refactoring

- update imports ([643376a](https://github.com/thi-ng/umbrella/commit/643376a))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-glsl@0.2.0) (2020-07-28)

#### 🚀 Features

- add interpolation qualifier support ([bb1c566](https://github.com/thi-ng/umbrella/commit/bb1c566))
  - update `$decl()` to emit new qualifier if present

### [0.1.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-glsl@0.1.19) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([b73c43d](https://github.com/thi-ng/umbrella/commit/b73c43d))

### [0.1.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-glsl@0.1.12) (2020-02-25)

#### ♻️ Refactoring

- update imports ([4fbb2b7](https://github.com/thi-ng/umbrella/commit/4fbb2b7))

### [0.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-glsl@0.1.6) (2019-08-21)

#### ♻️ Refactoring

- split into separate files ([0d6758f](https://github.com/thi-ng/umbrella/commit/0d6758f))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-glsl@0.1.0) (2019-07-07)

#### 🚀 Features

- extract GLSL codegen as separate pkg ([a1db3fc](https://github.com/thi-ng/umbrella/commit/a1db3fc))
- add while loop, ivec support, fix bool ([882c560](https://github.com/thi-ng/umbrella/commit/882c560))
- add global input/output var support, update GLSLOpts, add tests ([27003c9](https://github.com/thi-ng/umbrella/commit/27003c9))
- add post-inc/dec support ([a554192](https://github.com/thi-ng/umbrella/commit/a554192))
- add/update opts, update `scope` code gen, refactor `lit` ([d1ddaf2](https://github.com/thi-ng/umbrella/commit/d1ddaf2))
- add array init code gen ([afaee5f](https://github.com/thi-ng/umbrella/commit/afaee5f))

#### 🩹 Bug fixes

- avoid extraneous semicolons ([f2ba0d6](https://github.com/thi-ng/umbrella/commit/f2ba0d6))

#### ♻️ Refactoring

- update break/continue/discard handling ([0b86e89](https://github.com/thi-ng/umbrella/commit/0b86e89))
