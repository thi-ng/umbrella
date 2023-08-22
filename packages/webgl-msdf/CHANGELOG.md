# Change Log

- **Last updated**: 2023-08-22T14:39:27Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-msdf@2.1.0) (2021-11-17)

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

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-msdf@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-msdf@2.0.0) (2021-10-12)

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
- update imports ([ab75a9f](https://github.com/thi-ng/umbrella/commit/ab75a9f))
- update imports ([c29d6b4](https://github.com/thi-ng/umbrella/commit/c29d6b4))

### [0.1.73](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-msdf@0.1.73) (2021-02-20)

#### ♻️ Refactoring

- update attrib type handling ([41f59be](https://github.com/thi-ng/umbrella/commit/41f59be))
  - update attribpool buffer specs
  - minor optimizations during geometry generation

### [0.1.65](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-msdf@0.1.65) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [0.1.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-msdf@0.1.13) (2020-02-25)

#### ♻️ Refactoring

- update imports ([b6144b0](https://github.com/thi-ng/umbrella/commit/b6144b0))

### [0.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-msdf@0.1.10) (2019-11-30)

#### 🩹 Bug fixes

- update mempool size in text() ([9f96b2e](https://github.com/thi-ng/umbrella/commit/9f96b2e))
  - take into account new overhead from recent MemPool updates

### [0.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-msdf@0.1.9) (2019-11-09)

#### ♻️ Refactoring

- update imports ([e3e9d5a](https://github.com/thi-ng/umbrella/commit/e3e9d5a))

### [0.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-msdf@0.1.3) (2019-07-31)

#### ♻️ Refactoring

- blend mode import, minor shader updates ([a4088ed](https://github.com/thi-ng/umbrella/commit/a4088ed))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/webgl-msdf@0.1.0) (2019-07-07)

#### 🚀 Features

- initial import MSDF font rendering pkg ([22bcc24](https://github.com/thi-ng/umbrella/commit/22bcc24))
- add more TextOpts, update TextAlign fns ([4602883](https://github.com/thi-ng/umbrella/commit/4602883))
  - add dirX, dirY opts to control text directions
  - add horizontal letter spacing opt
- initial integration of shader-ast ([73faffd](https://github.com/thi-ng/umbrella/commit/73faffd))
  - replace GLSL enums with shader-ast types
  - add shaderSourceFromAST()
  - update shader presets
  - update old code gens (to be replaced soon)

#### 🩹 Bug fixes

- update textWidth & align fns ([dd6f752](https://github.com/thi-ng/umbrella/commit/dd6f752))
- update shader (remove prefixes) ([33731e9](https://github.com/thi-ng/umbrella/commit/33731e9))
- update madd call sites ([#95](https://github.com/thi-ng/umbrella/issues/95)) ([5c6fa50](https://github.com/thi-ng/umbrella/commit/5c6fa50))

#### ♻️ Refactoring

- rename msdfShader() ([90676b5](https://github.com/thi-ng/umbrella/commit/90676b5))
- update shader to use AST ([af6d39f](https://github.com/thi-ng/umbrella/commit/af6d39f))
