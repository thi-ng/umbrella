# Change Log

- **Last updated**: 2023-08-10T12:16:43Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/simd@0.6.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

### [0.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/simd@0.5.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/simd@0.5.0) (2021-10-12)

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

- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update b64 WASM init ([75c83e5](https://github.com/thi-ng/umbrella/commit/75c83e5))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/simd@0.4.0) (2020-07-25)

#### 🛑 Breaking changes

- prepare re-publish 1.0.0 ([e528129](https://github.com/thi-ng/umbrella/commit/e528129))
- BREAKING CHANGE: add readme notes about opcode renumbering

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/simd@0.3.0) (2020-07-17)

#### 🚀 Features

- update & enable swizzle4_u32_aos() ([ae1ad77](https://github.com/thi-ng/umbrella/commit/ae1ad77))
  - fix swizzle impl (byte lane order)
  - add/update tests

#### ♻️ Refactoring

- update eps value in test harness ([93b427f](https://github.com/thi-ng/umbrella/commit/93b427f))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/simd@0.2.0) (2020-05-14)

#### 🚀 Features

- enable new ops supported in node 14/V8 8.3 ([5c46468](https://github.com/thi-ng/umbrella/commit/5c46468))
  - previously unsupported in V8 impl (f32x4.div & f32x4.sqrt ops):
    - div4_f32
    - divn4_f32
    - sqrt4_f32
    - invsqrt4_f32

### [0.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/simd@0.1.4) (2020-02-25)

#### ♻️ Refactoring

- update imports ([6aa73ca](https://github.com/thi-ng/umbrella/commit/6aa73ca))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/simd@0.1.0) (2019-11-09)

#### 🚀 Features

- add new package ([eedb895](https://github.com/thi-ng/umbrella/commit/eedb895))
- add new dot fns, tests, rename ([50bc9fc](https://github.com/thi-ng/umbrella/commit/50bc9fc))
- add matrix-vec mult fns, no async init, inline binary as b64 ([761dd98](https://github.com/thi-ng/umbrella/commit/761dd98))
- add new fns, switch to f32x4 namespaced ops, update readme ([4023a8f](https://github.com/thi-ng/umbrella/commit/4023a8f))
- add more vector fns ([4f4cea4](https://github.com/thi-ng/umbrella/commit/4f4cea4))
- add clampn4_f32, sum4_f32 ([0e0dfde](https://github.com/thi-ng/umbrella/commit/0e0dfde))
- add hadd* inline fns, update dot, normalize, mulv, sum ([a1011ea](https://github.com/thi-ng/umbrella/commit/a1011ea))
- add swizzle fns (disabled) ([a47ec4d](https://github.com/thi-ng/umbrella/commit/a47ec4d))
- add mix4_f32, mixn4_f32, mul_m22v2_aos, update test & readme ([d09f09e](https://github.com/thi-ng/umbrella/commit/d09f09e))
- add mag2/4, magsq2/4, move/extract inline fns, update tests, readme ([00ce05b](https://github.com/thi-ng/umbrella/commit/00ce05b))

#### 🩹 Bug fixes

- add missing wasm exports ([f998f88](https://github.com/thi-ng/umbrella/commit/f998f88))

#### ♻️ Refactoring

- extract SIMD API, update readme ([8b7287e](https://github.com/thi-ng/umbrella/commit/8b7287e))
- fix [#162](https://github.com/thi-ng/umbrella/issues/162), update normalize2_f32_aos() ([74dab9a](https://github.com/thi-ng/umbrella/commit/74dab9a))
  - extract inline $norm() helper
