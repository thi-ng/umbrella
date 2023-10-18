# Change Log

- **Last updated**: 2023-10-18T18:06:31Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [7.7.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.7.19) (2023-10-18)

#### ♻️ Refactoring

- update distJaccard(), add docs ([a5a6256](https://github.com/thi-ng/umbrella/commit/a5a6256))

### [7.7.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.7.16) (2023-10-05)

#### 🩹 Bug fixes

- update minor()/major() ([88b3008](https://github.com/thi-ng/umbrella/commit/88b3008))
  - update iteration order of default impls of both fns

### [7.7.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.7.7) (2023-08-14)

#### 🩹 Bug fixes

- fix `FromBVecOpV` result arg type ([2ca2856](https://github.com/thi-ng/umbrella/commit/2ca2856))

## [7.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.7.0) (2023-06-16)

#### 🚀 Features

- add limit2/3/4() ([46bbf23](https://github.com/thi-ng/umbrella/commit/46bbf23))

#### ⏱ Performance improvements

- avoid/delay sqrt in limit() ([c677a54](https://github.com/thi-ng/umbrella/commit/c677a54))

### [7.6.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.6.12) (2023-04-19)

#### 🩹 Bug fixes

- update addmNS/submNS() signatures ([00470d1](https://github.com/thi-ng/umbrella/commit/00470d1))

## [7.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.6.0) (2023-02-05)

#### 🚀 Features

- add hash2/3 fns ([30383fe](https://github.com/thi-ng/umbrella/commit/30383fe))

### [7.5.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.5.24) (2022-11-23)

#### 🩹 Bug fixes

- update randNormDistrib() args/types ([7b419c0](https://github.com/thi-ng/umbrella/commit/7b419c0))
  - add VecOpFNO/VecOpNFO fn type aliases
  - update all randNormDistrib() versions
    - swap 2nd & 3rd args and make both optional

### [7.5.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.5.11) (2022-08-06)

#### ⏱ Performance improvements

- add normalize2/3/4 fixed versions ([acd4a14](https://github.com/thi-ng/umbrella/commit/acd4a14))
- add direction2/3, update callsites ([f3dcda8](https://github.com/thi-ng/umbrella/commit/f3dcda8))

### [7.5.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.5.2) (2022-05-03)

#### 🩹 Bug fixes

- fix clamp01/11 signatures ([10bc32e](https://github.com/thi-ng/umbrella/commit/10bc32e))

### [7.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.5.1) (2022-04-07)

#### ⏱ Performance improvements

- update cartesian2 impl ([03722d9](https://github.com/thi-ng/umbrella/commit/03722d9))
  - avoid extraneous multiplies

## [7.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.5.0) (2022-03-11)

#### 🚀 Features

- add select() fn ([b7f9df1](https://github.com/thi-ng/umbrella/commit/b7f9df1))

#### 🩹 Bug fixes

- centered handling in standardize() ([8a5a81f](https://github.com/thi-ng/umbrella/commit/8a5a81f))

## [7.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.4.0) (2021-11-22)

#### 🚀 Features

- add sdError() ([461213e](https://github.com/thi-ng/umbrella/commit/461213e))

#### 🩹 Bug fixes

- off-by-one error in variance(), add checks, tests ([3573fa5](https://github.com/thi-ng/umbrella/commit/3573fa5))
  - fix divisor in variance() (N vs N-1)
  - update sd() (use N-1 as divisor)
  - add empty checks for vmean/vmedian()
  - add tests

## [7.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.3.0) (2021-11-22)

#### 🚀 Features

- update variance(), sd(), standardize() ([b42e315](https://github.com/thi-ng/umbrella/commit/b42e315))
  - add support for pre-centered inputs to avoid extraneous computation
  - add vector length check to avoid NaN for 1D vectors

## [7.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.2.0) (2021-11-17)

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

### [7.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.1.1) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

## [7.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.1.0) (2021-11-04)

#### 🚀 Features

- add randomDistrib/randNormDistrib() ([e21b17d](https://github.com/thi-ng/umbrella/commit/e21b17d))
  - add support for custom random distributions
  - add impls for strided & unstrided vectors
  - use gaussian as default distrib
  - add new VecOpFN types
  - update readme

#### 🩹 Bug fixes

- update defHofOp() ([effa433](https://github.com/thi-ng/umbrella/commit/effa433))
  - register fixed size versions as impls for generic fn version

### [7.0.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.0.7) (2021-11-03)

#### 🩹 Bug fixes

- arg types `limit()`, add docs ([d9e8404](https://github.com/thi-ng/umbrella/commit/d9e8404))

### [7.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [7.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@7.0.0) (2021-10-12)

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
- internal restructure (codegen) ([e7e7b2e](https://github.com/thi-ng/umbrella/commit/e7e7b2e))
- update imports ([b2f0a9f](https://github.com/thi-ng/umbrella/commit/b2f0a9f))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- splitup mapVectors() ([d63c359](https://github.com/thi-ng/umbrella/commit/d63c359))
- rename internals ([51b3687](https://github.com/thi-ng/umbrella/commit/51b3687))

## [6.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@6.2.0) (2021-09-03)

#### 🚀 Features

- add statistics related vector ops ([d6507ad](https://github.com/thi-ng/umbrella/commit/d6507ad))
  - add vmean(), vmedian()
  - add center(), standardize(), sd(), variance()
- add formatter support ([2bbb54e](https://github.com/thi-ng/umbrella/commit/2bbb54e))
  - add ToStringOpts, defFormat(), FORMATTER
  - update AVec and GVec impls
- add generic strided dot product ([9c34793](https://github.com/thi-ng/umbrella/commit/9c34793))
  - add `dotS()` for arbitrary sized strided vectors
- add covariance(), correlation() fns ([b8d661d](https://github.com/thi-ng/umbrella/commit/b8d661d))
- add new module re-exports ([92e7f73](https://github.com/thi-ng/umbrella/commit/92e7f73))
- add strided versions of various ops ([cbd9576](https://github.com/thi-ng/umbrella/commit/cbd9576))
  - add/update codegen for strided vector ops:
    - add assembleS(), compileS()
    - update defOpS() / defHopOpS()
  - add new supporting fn types for strided ops
  - add magS()
  - add normalizeS()
  - add randomS(), randNormS(), randMinMaxS()
  - add arbitrary size impls to various other strided vector ops
- add new distance metrics ([24aa2f4](https://github.com/thi-ng/umbrella/commit/24aa2f4))
  - add distBrayCurtis()
  - add distCanberra()
  - add distHamming()
  - add distJaccard()
  - add distMinkowski()
  - add distSorensenDice()

#### 🩹 Bug fixes

- add correct type for setNS() ([3817d65](https://github.com/thi-ng/umbrella/commit/3817d65))

#### ⏱ Performance improvements

- update standardize() ([e87b979](https://github.com/thi-ng/umbrella/commit/e87b979))
  - avoid final multiply if mag=0

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@6.1.0) (2021-08-17)

#### 🚀 Features

- add tensor product ([1fcc3ea](https://github.com/thi-ng/umbrella/commit/1fcc3ea))
- add mean, minBounds, maxBounds ([640877f](https://github.com/thi-ng/umbrella/commit/640877f))
  - add ensureInputs() assertion helper

### [6.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@6.0.1) (2021-06-08)

#### 🩹 Bug fixes

- re-add missing randNorm2/3/4 fns ([0f0e270](https://github.com/thi-ng/umbrella/commit/0f0e270))
  - refactor existing randNorm() for better re-use

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@6.0.0) (2021-04-24)

#### 🛑 Breaking changes

- add/update modulo functions ([81d2e63](https://github.com/thi-ng/umbrella/commit/81d2e63))
- BREAKING CHANGE: Introduction of standard libc math functions in [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/main/packages/math)
  causes behavior change/flip of existing `fmod()` & `mod()` functions...
  - swap `fmod()` <> `mod()` to align w/ their GLSL & libc counterparts
  - same goes for `fmodN()` <> `modN()`
  - add `remainder()`/ `remainderN()` w/ standard libc behavior
  - update doc strings

## [5.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@5.3.0) (2021-04-19)

#### 🚀 Features

- add componentwise median() ([39b5c55](https://github.com/thi-ng/umbrella/commit/39b5c55))
- replace distHaversine() ([9d9d4e8](https://github.com/thi-ng/umbrella/commit/9d9d4e8))
  - add distHaversineLatLon() & distHaversineLonLat() versions
  - deprecate distHaversine()
  - update readme

### [5.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@5.2.1) (2021-04-03)

#### ♻️ Refactoring

- minor updates ([87eac78](https://github.com/thi-ng/umbrella/commit/87eac78))

## [5.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@5.2.0) (2021-03-30)

#### 🚀 Features

- add distHaversine() ([4dcc9cf](https://github.com/thi-ng/umbrella/commit/4dcc9cf))

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@5.1.0) (2021-03-03)

#### 🚀 Features

- add softMax() & oneHot() ([4f242c8](https://github.com/thi-ng/umbrella/commit/4f242c8))

#### 🩹 Bug fixes

- update GVec internals (TS4.2) ([e6b7b74](https://github.com/thi-ng/umbrella/commit/e6b7b74))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@5.0.0) (2021-02-20)

#### 🛑 Breaking changes

- update mem mapped type handling ([4a6e9b1](https://github.com/thi-ng/umbrella/commit/4a6e9b1))
- BREAKING CHANGE: buffer mapping fns use new type string consts
  - part of umbrella-wide changes to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) Type aliases (see [a333d4182](https://github.com/thi-ng/umbrella/commit/a333d4182))

#### 🚀 Features

- add weightedDistance HOF ([8500a79](https://github.com/thi-ng/umbrella/commit/8500a79))
  - add DistanceFn type

#### ♻️ Refactoring

- refine vec2/3/4 buffer types ([0e4edb7](https://github.com/thi-ng/umbrella/commit/0e4edb7))
  - use the more precise & correct NumericArray instead of Vec
  - also update StridedVec & VectorConstructor

## [4.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.9.0) (2021-01-21)

#### 🚀 Features

- add dist2/3 ([eb334fa](https://github.com/thi-ng/umbrella/commit/eb334fa))

#### 🩹 Bug fixes

- add explicit return types (zeroes/ones()) ([fc2f662](https://github.com/thi-ng/umbrella/commit/fc2f662))

### [4.8.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.8.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports ([0d23e3c](https://github.com/thi-ng/umbrella/commit/0d23e3c))

## [4.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.8.0) (2020-11-24)

#### 🚀 Features

- add roundN(), update round() ([36f07e6](https://github.com/thi-ng/umbrella/commit/36f07e6))
  - round() was errorneously defined what should have been roundN()
  - therefore rename round() => roundN()
  - add new vector version round()
- add signedVolume() ([907438e](https://github.com/thi-ng/umbrella/commit/907438e))

## [4.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.7.0) (2020-10-03)

#### ♻️ Refactoring

- renaming and minor fixes at point-on-ray ([36467e4](https://github.com/thi-ng/umbrella/commit/36467e4))
- cleanup, update docs/readme ([142515f](https://github.com/thi-ng/umbrella/commit/142515f))

### [4.6.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.6.6) (2020-09-22)

#### ♻️ Refactoring

- update/dedupe heading fns ([b341e1c](https://github.com/thi-ng/umbrella/commit/b341e1c))

### [4.6.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.6.5) (2020-09-13)

#### ♻️ Refactoring

- update imports, use new Fn types ([8b1e8da](https://github.com/thi-ng/umbrella/commit/8b1e8da))
- update imports ([d9699be](https://github.com/thi-ng/umbrella/commit/d9699be))

## [4.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.6.0) (2020-08-10)

#### 🚀 Features

- add/update vec coercions & types ([073389e](https://github.com/thi-ng/umbrella/commit/073389e))
- add not() bvec op ([a820b8f](https://github.com/thi-ng/umbrella/commit/a820b8f))

## [4.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.5.0) (2020-06-20)

#### 🚀 Features

- add cornerBisector2() ([aff9bfa](https://github.com/thi-ng/umbrella/commit/aff9bfa))

## [4.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.4.0) (2020-05-14)

#### 🚀 Features

- add mapVectors() ([61ddde7](https://github.com/thi-ng/umbrella/commit/61ddde7))

### [4.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.3.1) (2020-04-23)

#### 🩹 Bug fixes

- add missing equals2/3/4 exports ([041f590](https://github.com/thi-ng/umbrella/commit/041f590))

## [4.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.3.0) (2020-04-23)

#### 🚀 Features

- add equals/2/3/4() ([34cad0e](https://github.com/thi-ng/umbrella/commit/34cad0e))

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.2.0) (2020-03-01)

#### 🚀 Features

- add safeDiv() ([8e9a688](https://github.com/thi-ng/umbrella/commit/8e9a688))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.1.0) (2020-02-25)

#### 🚀 Features

- add ivec/uvec/bvec conversions ([1147acb](https://github.com/thi-ng/umbrella/commit/1147acb))
- add cornerBisector() ([b2d923e](https://github.com/thi-ng/umbrella/commit/b2d923e))

#### 🩹 Bug fixes

- add missing types & annotations (TS3.8) ([8680e37](https://github.com/thi-ng/umbrella/commit/8680e37))

### [4.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.0.2) (2020-01-24)

#### ♻️ Refactoring

- simplify MultiVecOpXX types ([5520968](https://github.com/thi-ng/umbrella/commit/5520968))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@4.0.0) (2019-11-09)

#### 🛑 Breaking changes

- rename strided-scalar op suffixes (SN => NS) ([66258d8](https://github.com/thi-ng/umbrella/commit/66258d8))
  - more consistent use of `S` suffix
- BREAKING CHANGE: setSN2/3/4 => setSN2/3/4

#### 🚀 Features

- add fill(), add MultiVecOp.impl(), update vop() ([21ff930](https://github.com/thi-ng/umbrella/commit/21ff930))
- add new intoBuffer(), move fns for wrapped versions ([53581f1](https://github.com/thi-ng/umbrella/commit/53581f1))
- add more strided vec ops, refactor templates ([ca91fa9](https://github.com/thi-ng/umbrella/commit/ca91fa9))
- add strided random ops, types, defHofOpS() codegen ([1e46f5a](https://github.com/thi-ng/umbrella/commit/1e46f5a))
- add strided rotate ops ([4f2b5a7](https://github.com/thi-ng/umbrella/commit/4f2b5a7))
- update readme ([f16bb45](https://github.com/thi-ng/umbrella/commit/f16bb45))
- add mixCubicHermite versions & tangent fns ([b382d25](https://github.com/thi-ng/umbrella/commit/b382d25))

#### 🩹 Bug fixes

- fix normalizeS2/3/4 ([f048393](https://github.com/thi-ng/umbrella/commit/f048393))
- update random2/3/4 to return new vec if none given ([a0be4d4](https://github.com/thi-ng/umbrella/commit/a0be4d4))
- fix out args in mixCubic/mixQuadratic ([d02dae6](https://github.com/thi-ng/umbrella/commit/d02dae6))

#### ⏱ Performance improvements

- minor optimization for 0-index Vec2/3/4 accessors ([a7c561d](https://github.com/thi-ng/umbrella/commit/a7c561d))

#### ♻️ Refactoring

- rename internal strided buffer fns for wrapped vecs ([c473592](https://github.com/thi-ng/umbrella/commit/c473592))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@3.3.0) (2019-08-21)

#### 🚀 Features

- add isNaN(), isInf() vec ops, update readme ([ed60d09](https://github.com/thi-ng/umbrella/commit/ed60d09))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@3.2.0) (2019-08-17)

#### 🚀 Features

- add atan_2/22/23/24, update readme ([e9b156b](https://github.com/thi-ng/umbrella/commit/e9b156b))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@3.1.0) (2019-07-31)

#### 🚀 Features

- add new bvec ops & types, update readme ([931ee43](https://github.com/thi-ng/umbrella/commit/931ee43))
  - add `every` / `some` unary ops
  - add `logicAndN` / `logicOrN`

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@3.0.1) (2019-07-08)

#### 🩹 Bug fixes

- reflect output handling ([8ec12a4](https://github.com/thi-ng/umbrella/commit/8ec12a4))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@3.0.0) (2019-07-07)

#### 🛑 Breaking changes

- fix [#95](https://github.com/thi-ng/umbrella/issues/95), update madd/maddN arg order, bug fixes ([020b4c8](https://github.com/thi-ng/umbrella/commit/020b4c8))
- BREAKING CHANGE: update madd/maddN arg order, rename functions
  - madd & maddN args now OpenCL/CUDA compatible, i.e.
    - madd(a,b,c) => a * b + c
    - maddN(a,n,b) => a * n + b
  - rename perpendicularLeft/Right => perpendicularCCW/CW
  - rename normalLeft/Right => normalCCW/CW
  - fix output vec handling in addW fns

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([94715ff](https://github.com/thi-ng/umbrella/commit/94715ff))
  - disable `noImplicitThis` flag
- add atan, exp_2, log_2, setVN, setVV, minor type fixes ([8683c19](https://github.com/thi-ng/umbrella/commit/8683c19))
  - fix arg types setC, step, smoothStep
- add swizzle setters ([114003c](https://github.com/thi-ng/umbrella/commit/114003c))
- add vecOf() ctor fn ([25feeee](https://github.com/thi-ng/umbrella/commit/25feeee))
- add degrees(), radians(), add fitXX type hints ([b313a56](https://github.com/thi-ng/umbrella/commit/b313a56))
- add fmod/fmodN fns (GLSL style mod op) ([928b95b](https://github.com/thi-ng/umbrella/commit/928b95b))
- add bitwise int vec ops (signed/unsigned versions) ([a364f1f](https://github.com/thi-ng/umbrella/commit/a364f1f))
- add integer math ops (signed/unsigned) ([c8a997f](https://github.com/thi-ng/umbrella/commit/c8a997f))
- add bvec types, componentwise logic & comparison ops ([7b9f03d](https://github.com/thi-ng/umbrella/commit/7b9f03d))
  - rename bitwise ops, add `bit` prefix, i.e. `bitAnd` etc.

#### 🩹 Bug fixes

- update arg types ([6d213bd](https://github.com/thi-ng/umbrella/commit/6d213bd))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([d46986a](https://github.com/thi-ng/umbrella/commit/d46986a))
- replace/remove HOF* template fns ([8e1891a](https://github.com/thi-ng/umbrella/commit/8e1891a))
- add explicit types to workaround typedoc bug ([12c002f](https://github.com/thi-ng/umbrella/commit/12c002f))

## [2.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@2.5.0) (2019-03-28)

#### 🚀 Features

- add Vec2/3/4Like type aliases, update ReadonlyVec ([3d5cd61](https://github.com/thi-ng/umbrella/commit/3d5cd61))
- add hash() op and IHash impls for Vec2/3/4 ([577d8cf](https://github.com/thi-ng/umbrella/commit/577d8cf))
  - add [@thi.ng/binary](https://github.com/thi-ng/umbrella/tree/main/packages/binary) dep
  - update readme

### [2.4.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@2.4.1) (2019-03-10)

#### ♻️ Refactoring

- re-use Fn type aliases ([c9a2456](https://github.com/thi-ng/umbrella/commit/c9a2456))

## [2.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@2.4.0) (2019-03-03)

#### 🚀 Features

- add headingSegment*() fns, update readme ([6ab6858](https://github.com/thi-ng/umbrella/commit/6ab6858))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@2.3.0) (2019-02-15)

#### 🚀 Features

- add fit, fit01, fit11 fns ([161d19d](https://github.com/thi-ng/umbrella/commit/161d19d))

#### ♻️ Refactoring

- improve tpl reuse ([74d77f3](https://github.com/thi-ng/umbrella/commit/74d77f3))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@2.2.0) (2019-02-05)

#### ♻️ Refactoring

- update imports (zip) ([9d8dd32](https://github.com/thi-ng/umbrella/commit/9d8dd32))

### [2.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@2.1.1) (2019-01-31)

#### 🚀 Features

- add VecPair type alias, add copyVectors() ([58e0a05](https://github.com/thi-ng/umbrella/commit/58e0a05))
- add corner2, clockwise2, signedAreaC2, isInArray fns ([2440ffd](https://github.com/thi-ng/umbrella/commit/2440ffd))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@2.1.0) (2019-01-21)

#### 🚀 Features

- migrate direction(), normalLeft/Right2() from geom pkg ([07d5f8f](https://github.com/thi-ng/umbrella/commit/07d5f8f))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@2.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### 🚀 Features

- add addm/addmN, subm/submN ([61e4063](https://github.com/thi-ng/umbrella/commit/61e4063))
- update/split angleBetween for 2d/3d ([e81d8c3](https://github.com/thi-ng/umbrella/commit/e81d8c3))
- add randMinMax ([5f87300](https://github.com/thi-ng/umbrella/commit/5f87300))
- add default output handling for set/setC/setS fns ([311b007](https://github.com/thi-ng/umbrella/commit/311b007))

#### 🩹 Bug fixes

- fix NaNs in Mat23.scaleWithCenter ([92bce73](https://github.com/thi-ng/umbrella/commit/92bce73))
  lack of 0 mat index caused incorrect indexing into point
- minor update opt arg in VecOp* ([446a183](https://github.com/thi-ng/umbrella/commit/446a183))

#### ⏱ Performance improvements

- update copy() ([1843702](https://github.com/thi-ng/umbrella/commit/1843702))

#### ♻️ Refactoring

- update imports ([048bdb1](https://github.com/thi-ng/umbrella/commit/048bdb1))
- update angleBetween*() fns, add absInner opt arg ([b9cea8c](https://github.com/thi-ng/umbrella/commit/b9cea8c))

### [1.4.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@1.4.12) (2019-01-02)

#### 🩹 Bug fixes

- disable default prefix for random*() fns ([2e6d196](https://github.com/thi-ng/umbrella/commit/2e6d196))

### [1.4.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@1.4.9) (2018-12-27)

#### 🚀 Features

- add setC() ([eb5f639](https://github.com/thi-ng/umbrella/commit/eb5f639))
- update gvec, add generic setS() ([0c0fce6](https://github.com/thi-ng/umbrella/commit/0c0fce6))
  - add gvec copyView()
  - gvec copy() returns new gvec()
  - memoize ownKeys()
  - intern strings

#### 🩹 Bug fixes

- update field names in declareIndex() ([aa5ad97](https://github.com/thi-ng/umbrella/commit/aa5ad97))

#### ♻️ Refactoring

- update declareIndices, extract single declareIndex fn ([c2556c2](https://github.com/thi-ng/umbrella/commit/c2556c2))
- update IVector (rename fields), add ICopyView ([6e6a33c](https://github.com/thi-ng/umbrella/commit/6e6a33c))
- update gvec, Vec2/3/4, extract iterator impl ([7a735f2](https://github.com/thi-ng/umbrella/commit/7a735f2))

### [1.4.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@1.4.4) (2018-12-01)

#### 🚀 Features

- add faceForward, invSqrt & dotValues* fns ([e19f622](https://github.com/thi-ng/umbrella/commit/e19f622))
- add/update ops, add docstrings ([97ac629](https://github.com/thi-ng/umbrella/commit/97ac629))
  - add fromHomogeneous3/4()
  - add swap*()
  - update order & re-export orthoNormal3()
  - update arg order step() / smoothStep()
  - update `out` handling in:
    - normalize()
    - perpendicular*()
    - cartesian() / polar()
  - simplify cartesian2()
  - add docs
- add sum() ([28fd0f1](https://github.com/thi-ng/umbrella/commit/28fd0f1))
- update `out` default behavior & codegens, bugfixes ([a373e55](https://github.com/thi-ng/umbrella/commit/a373e55))
  - where possible inject behavior to use 2nd arg as default `out`, iff given
    `out=null`
  - update def*() codegens
  - fix normalize() / limit()
- add project(), signedArea2(), update orthoNormal3() ([28f04ac](https://github.com/thi-ng/umbrella/commit/28f04ac))
- add Vec2/3/4.iterator() ([c3d1914](https://github.com/thi-ng/umbrella/commit/c3d1914))
- add mapBuffer*() fns ([1fe9650](https://github.com/thi-ng/umbrella/commit/1fe9650))
- add proxied gvec(), update mapBuffer*() docs ([63458c2](https://github.com/thi-ng/umbrella/commit/63458c2))
- add IVector interface impls for gvec() ([6cb3b92](https://github.com/thi-ng/umbrella/commit/6cb3b92))
- add addWeighted, eqDeltaArray, mixCubic, mixQuadratic ([87510f7](https://github.com/thi-ng/umbrella/commit/87510f7))
- add 2d/3d constants, update Vec2/3 ([68806d9](https://github.com/thi-ng/umbrella/commit/68806d9))

#### ♻️ Refactoring

- update codegens ([b697fd5](https://github.com/thi-ng/umbrella/commit/b697fd5))
- add StridedVec, update IVector, AVec ([25b9789](https://github.com/thi-ng/umbrella/commit/25b9789))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@1.4.0) (2018-10-17)

#### 🛑 Breaking changes

- replace math.ts w/ imports from [@thi.ng/maths](https://github.com/thi-ng/umbrella/tree/main/packages/maths) package ([0967929](https://github.com/thi-ng/umbrella/commit/0967929))
- BREAKING CHANGES: re-use [@thi.ng/maths](https://github.com/thi-ng/umbrella/tree/main/packages/maths) functionality instead of internal
  maths functions.

#### 🚀 Features

- add operation specific interfaces, rename Vec3.toPolar() ([5c44ad9](https://github.com/thi-ng/umbrella/commit/5c44ad9))
  - update class wrappers w/ interface decls
  - rename toSpherical3() => toPolar3()
  - rename Vec3.toSpherical() => Vec3.toPolar()
  - add msub/msubN for all vec types
- add IMinMax interface ([34312d8](https://github.com/thi-ng/umbrella/commit/34312d8))
- add comparators & ICompare impls for vec2/3/4 ([6a0f8aa](https://github.com/thi-ng/umbrella/commit/6a0f8aa))
- add axis consts, add/update ops ([473ec80](https://github.com/thi-ng/umbrella/commit/473ec80))
  - add angleRatio2/3(), update angleBetween2/3()
  - add static X_AXIS, Y_AXIS, etc. consts
  - add static madd/maddN(), msub/msubN() methods
  - add static swizzle() methods
  - update GVec/Vec2/3/4.mixN() to use n=0.5 as default
- add collate & eqDelta fns, update ctors ([221fb7f](https://github.com/thi-ng/umbrella/commit/221fb7f))
  - update mapBuffer()/intoBuffer() args
  - add collate2/3/4()
  - add asVec2/3/4()
  - add eqDelta2/3/4buf() & eqDelta2/3/4array()
  - update Vec2/3/4 & Mat23/33 ctors

#### ♻️ Refactoring

- replace static Vec2/3/4 methods w/ IVector impls ([b2f9af9](https://github.com/thi-ng/umbrella/commit/b2f9af9))
- update Infinity consts in various packages ([296e1e0](https://github.com/thi-ng/umbrella/commit/296e1e0))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@1.3.0) (2018-09-28)

#### 🚀 Features

- add vector ops codegen, update basic vec2/3/4 ops ([#51](https://github.com/thi-ng/umbrella/issues/51)) ([b5ed254](https://github.com/thi-ng/umbrella/commit/b5ed254))

#### ♻️ Refactoring

- use codegen for unary vec2/3/4 ops ([9bee7f8](https://github.com/thi-ng/umbrella/commit/9bee7f8))
- rewrite codegen, add more types & gen ops ([#51](https://github.com/thi-ng/umbrella/issues/51)) ([719b27a](https://github.com/thi-ng/umbrella/commit/719b27a))
  - replace existing generated vec2/3/4 ops w/ defcommon()
- generate more ops, move declareIndices() ([#51](https://github.com/thi-ng/umbrella/issues/51)) ([247dec0](https://github.com/thi-ng/umbrella/commit/247dec0))
  - redefine set(), setN(), pow(), min(), max() as part of defcommon()
  - remove obsolete op22/32/42()
  - move declareIndices() to codegen.ts
  - fix QUARTER_PI (typo)
  - remove codegen from main re-exports

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@1.1.0) (2018-09-10)

#### 🚀 Features

- add matrix index & property accessors ([3dd0072](https://github.com/thi-ng/umbrella/commit/3dd0072))
  - refactor declareIndices() to take prop names
  - add shared $iter helper fn
  - update Mat23/33/44 & Vec2/3/4, GVec

#### 🩹 Bug fixes

- Mat23/33/44 toString() impls ([07d1ccf](https://github.com/thi-ng/umbrella/commit/07d1ccf))
- GVec.copy() / get() ([ae261ab](https://github.com/thi-ng/umbrella/commit/ae261ab))

#### ♻️ Refactoring

- Vec3/4 toString() impls ([f4cc0dd](https://github.com/thi-ng/umbrella/commit/f4cc0dd))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@1.0.0) (2018-09-05)

#### 🛑 Breaking changes

- add/update transformVectors*(), update types ([2eec700](https://github.com/thi-ng/umbrella/commit/2eec700))
  - add transformVectors1o()
  - add transformVectors2o()
  - add VecOp2o type, update existing VecOp types
  - update x/y/z/w() plain accessor fns
- BREAKING CHANGE: update transformVectors1/2() arg order

#### 🚀 Features

- add immutable vec2/3/4 ops ([a3c0407](https://github.com/thi-ng/umbrella/commit/a3c0407))
  - also provide wrapped versions as static methods

#### ♻️ Refactoring

- rename immutable vec ops, update readme table ([2d5d0c8](https://github.com/thi-ng/umbrella/commit/2d5d0c8))
  - rename `*new` suffix => `*o` (i.e. w/ output)

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.6.0) (2018-09-03)

#### 🚀 Features

- add Vec*.intoBuffer() impls ([16aa0c4](https://github.com/thi-ng/umbrella/commit/16aa0c4))
  - add missing GVec.mapBuffer()
- add mixBilinear1/2/3/4 ([f0ccd0c](https://github.com/thi-ng/umbrella/commit/f0ccd0c))
- add new vector ops, update readme ([9510f01](https://github.com/thi-ng/umbrella/commit/9510f01))
  - add msub2/3/4 & msubN2/3/4
  - add refract2/3/4
  - add perpendicularLeft2 / perpendicularRight2

#### 🩹 Bug fixes

- add missing arg types ([c0fbb4e](https://github.com/thi-ng/umbrella/commit/c0fbb4e))
- add opt normalize for angleBetween2/3 ([25ea00c](https://github.com/thi-ng/umbrella/commit/25ea00c))
- update GVec method args (readonly) ([ad13151](https://github.com/thi-ng/umbrella/commit/ad13151))

#### ♻️ Refactoring

- update matrix factories ([7001b7a](https://github.com/thi-ng/umbrella/commit/7001b7a))
  - add identity() factories
  - make concat() immutable
  - update toString() (fixed prec)

### [0.5.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.5.3) (2018-09-01)

#### ♻️ Refactoring

- update Vec2/3/4 index signatures ([1795f18](https://github.com/thi-ng/umbrella/commit/1795f18))
  - changed to satisfy ArrayLike interface

### [0.5.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.5.2) (2018-09-01)

#### 🩹 Bug fixes

- add missing deps ([d2b4faf](https://github.com/thi-ng/umbrella/commit/d2b4faf))

### [0.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.5.1) (2018-08-31)

#### ♻️ Refactoring

- update mulV*() arg order ([0a80601](https://github.com/thi-ng/umbrella/commit/0a80601))
  - align mulV*() arg order w/ rest of fns, i.e. value to be mutated comes
    first, in this case: vec, mat (before: mat, vec)
- update matrices & types ([b8d944e](https://github.com/thi-ng/umbrella/commit/b8d944e))
  - update ReadonlyVec/Mat type aliases & uses
  - add Mat44 factories (perspective, frustum, ortho, lookAt)

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.5.0) (2018-08-30)

#### 🚀 Features

- consolidate vector consts, add toJSON() impls ([bdb5d37](https://github.com/thi-ng/umbrella/commit/bdb5d37))
  - only use ZERO4, ONE4, MIN4, MAX4 for vec2/3/4
  - add toJSON() impls for all vector & matrix classes
- update types, update GVec, add maths fns, swap impls ([d5cec94](https://github.com/thi-ng/umbrella/commit/d5cec94))
  - rename VecOp* types and add generics, add readonly versions
  - add GVec.getAt() / setAt() element accessors
  - add Vec2/3/4.swap() & fract() impls
  - add & rename various math fns (add "1" suffix)

#### ♻️ Refactoring

- simplify prop accessors (DRY) ([b82a22f](https://github.com/thi-ng/umbrella/commit/b82a22f))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.4.0) (2018-08-28)

#### 🚀 Features

- add more vec2/3 ops ([cd834f8](https://github.com/thi-ng/umbrella/commit/cd834f8))
  - vec2: angleBetween2, bisect2, rotateAroundPoint2
  - vec3: angleBetween3, rotateAroundAxis3

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.3.0) (2018-08-27)

#### 🚀 Features

- add mix1(), minor cleanups ([cfb2b74](https://github.com/thi-ng/umbrella/commit/cfb2b74))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.2.1) (2018-08-24)

#### ♻️ Refactoring

- make Vec & Mat type aliases of NumericArray ([fb3c04d](https://github.com/thi-ng/umbrella/commit/fb3c04d))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.2.0) (2018-08-02)

#### 🚀 Features

- add gvec size checks, add IEquiv & Iterable impls ([2a13f28](https://github.com/thi-ng/umbrella/commit/2a13f28))
- make Vec2/3/4 array-like, add IEquiv impls, add tests ([3039a35](https://github.com/thi-ng/umbrella/commit/3039a35))
  - add array index getters/setters
  - add .length getter (also for GVec)
- add toCylindrical3() / fromCylindrical3() ([74f939c](https://github.com/thi-ng/umbrella/commit/74f939c))

#### ♻️ Refactoring

- update cylindrical coord conversion, add Vec3 methods ([befc778](https://github.com/thi-ng/umbrella/commit/befc778))

### [0.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.1.3) (2018-08-01)

#### ♻️ Refactoring

- add IVec to all vector class wrappers ([68f59f2](https://github.com/thi-ng/umbrella/commit/68f59f2))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.1.2) (2018-07-30)

#### 🩹 Bug fixes

- get*() return types, refactor using set*() ([3534274](https://github.com/thi-ng/umbrella/commit/3534274))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.1.1) (2018-07-29)

#### 🩹 Bug fixes

- naming convention, add function overview tables ([3de5cea](https://github.com/thi-ng/umbrella/commit/3de5cea))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/vectors@0.1.0) (2018-07-29)

#### 🚀 Features

- add minor/majorAxis(), minor/major2/3 ([35af6a5](https://github.com/thi-ng/umbrella/commit/35af6a5))
  - add minXid / maxXid maths helpers
- add vec4 ops & class wrapper ([b59fadf](https://github.com/thi-ng/umbrella/commit/b59fadf))
- re-import updated mat23/33/44 functions ([4fdda6a](https://github.com/thi-ng/umbrella/commit/4fdda6a))
- re-import updated mat44, add orthoNormal3 ([21b04f0](https://github.com/thi-ng/umbrella/commit/21b04f0))
- re-add matrix class wrappers, update vec classes ([1ec75e6](https://github.com/thi-ng/umbrella/commit/1ec75e6))
- add generic vec fns & class wrapper ([e3c6167](https://github.com/thi-ng/umbrella/commit/e3c6167))
- add swizzle fns, update/unify fn naming ([5bba592](https://github.com/thi-ng/umbrella/commit/5bba592))
- update get & copy fns to retain buffer types ([54b3db2](https://github.com/thi-ng/umbrella/commit/54b3db2))

#### 🩹 Bug fixes

- copy/paste mistakes, add tests ([2a5a744](https://github.com/thi-ng/umbrella/commit/2a5a744))

#### ♻️ Refactoring

- add op22/32, simplify various vec2/3 ops ([e289db2](https://github.com/thi-ng/umbrella/commit/e289db2))
- various small fixes/additions (matrices) ([1f0551d](https://github.com/thi-ng/umbrella/commit/1f0551d))
- add gvec default length args ([f99cf3d](https://github.com/thi-ng/umbrella/commit/f99cf3d))
- update eqDelta impls, rename array transformers ([d2bdf79](https://github.com/thi-ng/umbrella/commit/d2bdf79))
