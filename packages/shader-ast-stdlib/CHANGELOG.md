# Change Log

- **Last updated**: 2023-10-23T07:37:37Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.14.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.14.0) (2023-07-14)

#### 🚀 Features

- add smootherStep() ([859fa5d](https://github.com/thi-ng/umbrella/commit/859fa5d))

### [0.13.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.13.15) (2023-05-11)

#### ♻️ Refactoring

- re-use interned type constants ([f6fcbc5](https://github.com/thi-ng/umbrella/commit/f6fcbc5))

### [0.13.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.13.14) (2023-05-05)

#### 🩹 Bug fixes

- fix [#399](https://github.com/thi-ng/umbrella/issues/399) update HOF function naming ([f4b62d7](https://github.com/thi-ng/umbrella/commit/f4b62d7))
  - ensure generated HOFs are using unique names to allow multiple instances

## [0.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.13.0) (2023-01-10)

#### 🚀 Features

- add pre/postmultiplyAlpha() fns ([367ebbd](https://github.com/thi-ng/umbrella/commit/367ebbd))

#### 🩹 Bug fixes

- fix porterDuff() ops ([f5bbcc8](https://github.com/thi-ng/umbrella/commit/f5bbcc8))

## [0.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.12.0) (2022-05-07)

#### 🚀 Features

- add 2D SDF arc/bezier fns ([07bd445](https://github.com/thi-ng/umbrella/commit/07bd445))
- add more 2D SDF prims ([2672e75](https://github.com/thi-ng/umbrella/commit/2672e75))

#### ♻️ Refactoring

- update cross2() as non-inline fn ([59d631a](https://github.com/thi-ng/umbrella/commit/59d631a))

## [0.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.11.0) (2021-11-17)

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

### [0.10.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.10.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.10.0) (2021-10-12)

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
- update imports ([b22054e](https://github.com/thi-ng/umbrella/commit/b22054e))

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.9.0) (2021-08-17)

#### 🚀 Features

- add level correction fns ([54963e7](https://github.com/thi-ng/umbrella/commit/54963e7))

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.8.0) (2021-08-13)

#### 🚀 Features

- add SDF polyhedra fns ([2100e50](https://github.com/thi-ng/umbrella/commit/2100e50))
- add oscillator fns ([f14e8cb](https://github.com/thi-ng/umbrella/commit/f14e8cb))
- add SDF domain ops ([c41b288](https://github.com/thi-ng/umbrella/commit/c41b288))
  - add sdfMirror2()
  - add sdfRepeatPolar()
- add variadic SDF ops ([8d6390c](https://github.com/thi-ng/umbrella/commit/8d6390c))

#### ♻️ Refactoring

- update vec const handling ([3b31e72](https://github.com/thi-ng/umbrella/commit/3b31e72))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.7.0) (2021-08-09)

#### 🚀 Features

- add sdfUnion2(), add missing exports ([9d52838](https://github.com/thi-ng/umbrella/commit/9d52838))
- variadic sdf isec/sub/union ([fbff935](https://github.com/thi-ng/umbrella/commit/fbff935))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.6.0) (2021-04-24)

#### 🚀 Features

- add decodeRGBE() ([f98c6a2](https://github.com/thi-ng/umbrella/commit/f98c6a2))

### [0.5.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.5.6) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [0.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.5.1) (2020-09-13)

#### ♻️ Refactoring

- update imports ([643376a](https://github.com/thi-ng/umbrella/commit/643376a))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.5.0) (2020-08-28)

#### 🚀 Features

- add fit()/fitClamped() ([64ba64c](https://github.com/thi-ng/umbrella/commit/64ba64c))
- add mixCubic()/mixQuadratic() ([4dfc020](https://github.com/thi-ng/umbrella/commit/4dfc020))
- add ACES film tonemapping ([8a0b1a3](https://github.com/thi-ng/umbrella/commit/8a0b1a3))
  - update module re-exports

#### ♻️ Refactoring

- update various sym() decls ([a5901ab](https://github.com/thi-ng/umbrella/commit/a5901ab))
  - remove obsolete type arg
- update/dedupe various fns/overrides ([8e5635b](https://github.com/thi-ng/umbrella/commit/8e5635b))

### [0.4.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.4.5) (2020-08-16)

#### ⏱ Performance improvements

- update blur9/13() ([de632c6](https://github.com/thi-ng/umbrella/commit/de632c6))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.4.0) (2020-08-08)

#### 🚀 Features

- add borderMask() ([bea00bf](https://github.com/thi-ng/umbrella/commit/bea00bf))

#### ♻️ Refactoring

- minor update additive() ([ae593e4](https://github.com/thi-ng/umbrella/commit/ae593e4))

### [0.3.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.3.5) (2020-02-25)

#### ♻️ Refactoring

- update imports ([863909a](https://github.com/thi-ng/umbrella/commit/863909a))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.3.0) (2019-09-21)

#### 🚀 Features

- add snoise3 & curlNoise3 ([a7dc75d](https://github.com/thi-ng/umbrella/commit/a7dc75d))
- add rotationAroundAxis3/4, matrix conversions ([8a473c1](https://github.com/thi-ng/umbrella/commit/8a473c1))
- add fragUV() ([b85dc8b](https://github.com/thi-ng/umbrella/commit/b85dc8b))

#### 🩹 Bug fixes

- fix imports ([16823b2](https://github.com/thi-ng/umbrella/commit/16823b2))
- fix imports ([188309a](https://github.com/thi-ng/umbrella/commit/188309a))

#### ♻️ Refactoring

- update snoise3 ([fddfa85](https://github.com/thi-ng/umbrella/commit/fddfa85))
- more snoise3 refactoring ([977f0db](https://github.com/thi-ng/umbrella/commit/977f0db))

### [0.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.2.3) (2019-08-21)

#### ♻️ Refactoring

- update & fix porterDuff() HOF ([5f83ce1](https://github.com/thi-ng/umbrella/commit/5f83ce1))
- update clamp01/clamp11() ([bd59ff5](https://github.com/thi-ng/umbrella/commit/bd59ff5))
- update permute fns (re-use) ([c5a36a1](https://github.com/thi-ng/umbrella/commit/c5a36a1))
- update readIndex*() ([e6775f7](https://github.com/thi-ng/umbrella/commit/e6775f7))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.2.0) (2019-07-31)

#### 🚀 Features

- add guassian blur fns ([759ace7](https://github.com/thi-ng/umbrella/commit/759ace7))
- add porter-duff operators ([285197d](https://github.com/thi-ng/umbrella/commit/285197d))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.1.1) (2019-07-08)

#### 🩹 Bug fixes

- update incomplete cartesian3, refactor cartesian2 ([3299d59](https://github.com/thi-ng/umbrella/commit/3299d59))

#### ♻️ Refactoring

- update function arg lists ([#98](https://github.com/thi-ng/umbrella/issues/98)) ([7d5fdce](https://github.com/thi-ng/umbrella/commit/7d5fdce))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/shader-ast-stdlib@0.1.0) (2019-07-07)

#### 🚀 Features

- extract stdlib as separate pkg ([86461ed](https://github.com/thi-ng/umbrella/commit/86461ed))
- add new fns, various refactoring, add docs ([b215055](https://github.com/thi-ng/umbrella/commit/b215055))
  - add clamp11(), orthogonal(), rayPointAt()
  - split lambert() / halfLambert()
  - switch to more inline fns
- add 2d worley noise & permutations ([a645c71](https://github.com/thi-ng/umbrella/commit/a645c71))
- add voronoise2() & hash3() ([4bafe19](https://github.com/thi-ng/umbrella/commit/4bafe19))
- add snoise2, distance fns ([0849f8b](https://github.com/thi-ng/umbrella/commit/0849f8b))
- add additive() HOF ([43b2223](https://github.com/thi-ng/umbrella/commit/43b2223))
- add readIndex fns, hash2, minor refactorings ([34b20f0](https://github.com/thi-ng/umbrella/commit/34b20f0))
- add indexTo*() and readIndex*() fns ([a804c28](https://github.com/thi-ng/umbrella/commit/a804c28))
- add more hash fns, update voronoise2 ([65b2a15](https://github.com/thi-ng/umbrella/commit/65b2a15))
- add more functions ([4b6e4fe](https://github.com/thi-ng/umbrella/commit/4b6e4fe))
  - toLinear() / toSRGB()
  - luminanceRGB()
  - cartesian2/3() / polar2/3()
  - perpendicularCW/CCW()
  - sincos() / cossin()
  - rotation matrix factories for mat2/3/4

#### 🩹 Bug fixes

- update additive() fn arg type ([5d66ff2](https://github.com/thi-ng/umbrella/commit/5d66ff2))
- fix imports ([4d9e126](https://github.com/thi-ng/umbrella/commit/4d9e126))
- fix rotationX4/Y4 return types ([c858dce](https://github.com/thi-ng/umbrella/commit/c858dce))

#### ♻️ Refactoring

- update raymarchScene/AO loops ([8a4bd89](https://github.com/thi-ng/umbrella/commit/8a4bd89))
  - use post-increment for counter to be compatible w/ WebGL1
- reorg src folder ([ebaa1c2](https://github.com/thi-ng/umbrella/commit/ebaa1c2))
