# Change Log

- **Last updated**: 2021-11-21T17:09:28Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.7.0) (2021-11-17)

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

### [0.6.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.6.10) (2021-11-04)

#### ♻️ Refactoring

- apply [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/main/packages/pixel) changes ([96b50be](https://github.com/thi-ng/umbrella/commit/96b50be))

### [0.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.6.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.6.0) (2021-10-12)

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

- add float precision option ([a9abcfe](https://github.com/thi-ng/umbrella/commit/a9abcfe))

#### ♻️ Refactoring

- update imports ([402d5d3](https://github.com/thi-ng/umbrella/commit/402d5d3))
- update imports ([70476b4](https://github.com/thi-ng/umbrella/commit/70476b4))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports ([69414ec](https://github.com/thi-ng/umbrella/commit/69414ec))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [0.5.45](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.5.45) (2021-08-17)

#### 🩹 Bug fixes

- fix matrix indexing ([094ab36](https://github.com/thi-ng/umbrella/commit/094ab36))
  - add mat2/3/4 impls for new `idxm` AST node type

### [0.5.36](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.5.36) (2021-04-24)

#### ♻️ Refactoring

- update modulo handling ([63eb749](https://github.com/thi-ng/umbrella/commit/63eb749))
  - reflecting changes in [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/main/packages/math)

### [0.5.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.5.12) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in remaining pkgs ([b22aa30](https://github.com/thi-ng/umbrella/commit/b22aa30))
- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [0.5.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.5.6) (2020-09-13)

#### ♻️ Refactoring

- update imports ([643376a](https://github.com/thi-ng/umbrella/commit/643376a))

### [0.5.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.5.5) (2020-08-28)

#### ♻️ Refactoring

- minor updates (vec coercions) ([a220e3c](https://github.com/thi-ng/umbrella/commit/a220e3c))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.5.0) (2020-08-10)

#### 🚀 Features

- add vec coercions & bvec ops ([3f111c9](https://github.com/thi-ng/umbrella/commit/3f111c9))

### [0.4.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.4.5) (2020-02-25)

#### ♻️ Refactoring

- update imports ([5570d18](https://github.com/thi-ng/umbrella/commit/5570d18))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.4.0) (2019-09-21)

#### 🚀 Features

- add div-by-zero guards ([233528d](https://github.com/thi-ng/umbrella/commit/233528d))
- replace JS runtime fns, add doc strings ([0798a35](https://github.com/thi-ng/umbrella/commit/0798a35))
  - add renderPixels()
  - add renderToBuffer()
  - add canvasRenderer()

#### 🩹 Bug fixes

- fix divisions ([bc81ff8](https://github.com/thi-ng/umbrella/commit/bc81ff8))

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.3.1) (2019-08-21)

#### ♻️ Refactoring

- split env.ts into separate files ([caa6301](https://github.com/thi-ng/umbrella/commit/caa6301))
- move env to own file, update/simplify targetJS() ([f5ebec8](https://github.com/thi-ng/umbrella/commit/f5ebec8))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.3.0) (2019-08-17)

#### 🚀 Features

- add support for 2-arg atan(), move types to api.ts ([a760085](https://github.com/thi-ng/umbrella/commit/a760085))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.2.0) (2019-07-12)

#### 🚀 Features

- add uvec/bvec support, add bool => float casting ([90bb850](https://github.com/thi-ng/umbrella/commit/90bb850))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.1.1) (2019-07-08)

#### ♻️ Refactoring

- update function arg lists ([#98](https://github.com/thi-ng/umbrella/issues/98)) ([7d5fdce](https://github.com/thi-ng/umbrella/commit/7d5fdce))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-js@0.1.0) (2019-07-07)

#### 🚀 Features

- add uvec ops, update imports ([5dcd39f](https://github.com/thi-ng/umbrella/commit/5dcd39f))
- add missing texture lookup stubs ([f0370b0](https://github.com/thi-ng/umbrella/commit/f0370b0))
- add array init, more builtin stubs, minor refactor ([fb5141e](https://github.com/thi-ng/umbrella/commit/fb5141e))
- add % operator support ([c1b25c6](https://github.com/thi-ng/umbrella/commit/c1b25c6))
- add post-inc/dec support, update op1 handler ([8073edd](https://github.com/thi-ng/umbrella/commit/8073edd))
- int/uint/ivec support, while loop, fix bool ([003069e](https://github.com/thi-ng/umbrella/commit/003069e))
- extract JS codegen & runtime as own pkg ([8177469](https://github.com/thi-ng/umbrella/commit/8177469))

#### 🩹 Bug fixes

- add missing faceForward, reflect, refract builtins ([c63058e](https://github.com/thi-ng/umbrella/commit/c63058e))
- add/fix vec4 ops ([7f7f1f6](https://github.com/thi-ng/umbrella/commit/7f7f1f6))
- op2 type hint interpretation ([fdaac1f](https://github.com/thi-ng/umbrella/commit/fdaac1f))
- avoid extraneous semicolons ([2b56c91](https://github.com/thi-ng/umbrella/commit/2b56c91))
- op2 int handling, update vectors/matrices imports, update pkg ([dc54ec2](https://github.com/thi-ng/umbrella/commit/dc54ec2))

#### ♻️ Refactoring

- update break/continue/discard handling ([ec2fd9f](https://github.com/thi-ng/umbrella/commit/ec2fd9f))
