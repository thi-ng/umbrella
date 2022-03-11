# Change Log

- **Last updated**: 2022-03-11T12:13:49Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-shadertoy@0.4.0) (2021-11-17)

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

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-shadertoy@0.3.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-shadertoy@0.3.0) (2021-10-12)

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

- add support for DefShaderOpts ([d35cabc](https://github.com/thi-ng/umbrella/commit/d35cabc))

#### ♻️ Refactoring

- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [0.2.52](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-shadertoy@0.2.52) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [0.2.35](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-shadertoy@0.2.35) (2020-07-28)

#### ♻️ Refactoring

- update defQuadModel() callsite ([edf8329](https://github.com/thi-ng/umbrella/commit/edf8329))

### [0.2.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-shadertoy@0.2.5) (2020-03-28)

#### ♻️ Refactoring

- update to new webgl API ([40dd67b](https://github.com/thi-ng/umbrella/commit/40dd67b))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-shadertoy@0.2.0) (2020-02-25)

#### 🚀 Features

- fix [#199](https://github.com/thi-ng/umbrella/issues/199), add generics ([e392774](https://github.com/thi-ng/umbrella/commit/e392774))
  - add generics to allow typed custom uniforms
  - update MainImageFn, ShaderToyOpts, ShaderToy interfaces

#### ♻️ Refactoring

- update imports ([3f067f9](https://github.com/thi-ng/umbrella/commit/3f067f9))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-shadertoy@0.1.0) (2019-09-21)

#### 🚀 Features

- add optional per-pass ModelSpec & vert shader support ([a45725a](https://github.com/thi-ng/umbrella/commit/a45725a))
- fix & update drawPass viewport, add update() method ([5d2c17e](https://github.com/thi-ng/umbrella/commit/5d2c17e))
- update multipass uniform handling ([2071133](https://github.com/thi-ng/umbrella/commit/2071133))

#### 🩹 Bug fixes

- update texture/sampler & FBO handling ([25845e5](https://github.com/thi-ng/umbrella/commit/25845e5))
