# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.8.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.8.4...@thi.ng/vectors@4.8.5) (2021-01-10)

**Note:** Version bump only for package @thi.ng/vectors





## [4.8.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.8.3...@thi.ng/vectors@4.8.4) (2021-01-02)

**Note:** Version bump only for package @thi.ng/vectors





## [4.8.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.8.2...@thi.ng/vectors@4.8.3) (2020-12-22)

**Note:** Version bump only for package @thi.ng/vectors





# [4.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.7.0...@thi.ng/vectors@4.8.0) (2020-11-24)


### Features

* **vectors:** add roundN(), update round() ([36f07e6](https://github.com/thi-ng/umbrella/commit/36f07e62de03afe376ddc48497dfe463e3b10eb4))
* **vectors:** add signedVolume() ([907438e](https://github.com/thi-ng/umbrella/commit/907438e2b94b475018468128e7d4987dcbf44eb7))





# [4.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.6.6...@thi.ng/vectors@4.7.0) (2020-10-03)


### Features

* **vectors, geom:** point on ray at distance ([0b04b80](https://github.com/thi-ng/umbrella/commit/0b04b80f1eaa700e262f99d4726651c90d4fed2b))





# [4.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.5.6...@thi.ng/vectors@4.6.0) (2020-08-10)


### Features

* **vectors:** add not() bvec op ([a820b8f](https://github.com/thi-ng/umbrella/commit/a820b8fec8f69c82910f61bfeb3c013ceed19b8c))
* **vectors:** add/update vec coercions & types ([073389e](https://github.com/thi-ng/umbrella/commit/073389e33bbead294d690c60d150a7fd0589f822))





# [4.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.4.4...@thi.ng/vectors@4.5.0) (2020-06-20)


### Features

* **vectors:** add cornerBisector2() ([aff9bfa](https://github.com/thi-ng/umbrella/commit/aff9bfab86fdc5ca0b2ee88be68692988493ee57))





# [4.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.3.4...@thi.ng/vectors@4.4.0) (2020-05-14)


### Features

* **vectors:** add mapVectors() ([61ddde7](https://github.com/thi-ng/umbrella/commit/61ddde78c23ded396ed70fd473a92b2495e74b83))





## [4.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.3.0...@thi.ng/vectors@4.3.1) (2020-04-23)


### Bug Fixes

* **vectors:** add missing equals2/3/4 exports ([041f590](https://github.com/thi-ng/umbrella/commit/041f590f6c1c29efd01fccc26cbbb2c0992e1147))





# [4.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.2.6...@thi.ng/vectors@4.3.0) (2020-04-23)


### Features

* **vectors:** add equals/2/3/4() ([34cad0e](https://github.com/thi-ng/umbrella/commit/34cad0eee8cd6d555ddc8ed718858b6885519f85))





# [4.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.1.2...@thi.ng/vectors@4.2.0) (2020-03-01)


### Features

* **vectors:** add safeDiv() ([8e9a688](https://github.com/thi-ng/umbrella/commit/8e9a688e44ed1ed63619ff52b514dd4b373fd743))





# [4.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.0.3...@thi.ng/vectors@4.1.0) (2020-02-25)


### Bug Fixes

* **vectors:** add missing types & annotations (TS3.8) ([8680e37](https://github.com/thi-ng/umbrella/commit/8680e37c39156ff8a772b51f2466a661853b7bd6))


### Features

* **vectors:** add cornerBisector() ([b2d923e](https://github.com/thi-ng/umbrella/commit/b2d923ecf0b41ce6b8a3e1261957825d6dc1ec93))
* **vectors:** add ivec/uvec/bvec conversions ([1147acb](https://github.com/thi-ng/umbrella/commit/1147acbf5d0aca20bb243cb1381b788633545f06))





# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@3.3.1...@thi.ng/vectors@4.0.0) (2019-11-09)

### Bug Fixes

* **vectors:** fix normalizeS2/3/4 ([f048393](https://github.com/thi-ng/umbrella/commit/f04839355c90e991b0a8970af469119283454637))
* **vectors:** fix out args in mixCubic/mixQuadratic ([d02dae6](https://github.com/thi-ng/umbrella/commit/d02dae6b4bad2d026dec96c865292778e2c50ba2))
* **vectors:** update random2/3/4 to return new vec if none given ([a0be4d4](https://github.com/thi-ng/umbrella/commit/a0be4d4a288c61e7860990bb3c5b6992af30552c))

### Code Refactoring

* **vectors:** rename strided-scalar op suffixes (SN => NS) ([66258d8](https://github.com/thi-ng/umbrella/commit/66258d8b096de2a49d2f801a5329a07e7ef97c56))

### Features

* **vectors:** add fill(), add MultiVecOp.impl(), update vop() ([21ff930](https://github.com/thi-ng/umbrella/commit/21ff930e3c902051ed937e9294d71dd25688d729))
* **vectors:** add mixCubicHermite versions & tangent fns ([b382d25](https://github.com/thi-ng/umbrella/commit/b382d25e65d6371e6b76219fd2909ac991933db4))
* **vectors:** add more strided vec ops, refactor templates ([ca91fa9](https://github.com/thi-ng/umbrella/commit/ca91fa92c5720f361291c0672a9af4f79b3eafa6))
* **vectors:** add new intoBuffer(), move fns for wrapped versions ([53581f1](https://github.com/thi-ng/umbrella/commit/53581f16effb42a1b3cc9aac8bd438880aaf7c97))
* **vectors:** add strided random ops, types, defHofOpS() codegen ([1e46f5a](https://github.com/thi-ng/umbrella/commit/1e46f5aa6ad6d64bef5afdd7baf2d218e4547d1d))
* **vectors:** add strided rotate ops ([4f2b5a7](https://github.com/thi-ng/umbrella/commit/4f2b5a72948774966c5580bdf33f75b913b9f460))
* **vectors:** update readme ([f16bb45](https://github.com/thi-ng/umbrella/commit/f16bb4567eb293e56eabd6c1fb6969e1217598e0))

### Performance Improvements

* **vectors:** minor optimization for 0-index Vec2/3/4 accessors ([a7c561d](https://github.com/thi-ng/umbrella/commit/a7c561df31d7466676a48880f1ae1083d8938397))

### BREAKING CHANGES

* **vectors:** setSN2/3/4 => setSN2/3/4

# [3.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@3.2.0...@thi.ng/vectors@3.3.0) (2019-08-21)

### Features

* **vectors:** add isNaN(), isInf() vec ops, update readme ([ed60d09](https://github.com/thi-ng/umbrella/commit/ed60d09))

# [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@3.1.1...@thi.ng/vectors@3.2.0) (2019-08-17)

### Features

* **vectors:** add atan_2/22/23/24, update readme ([e9b156b](https://github.com/thi-ng/umbrella/commit/e9b156b))

# [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@3.0.3...@thi.ng/vectors@3.1.0) (2019-07-31)

### Features

* **vectors:** add new bvec ops & types, update readme ([931ee43](https://github.com/thi-ng/umbrella/commit/931ee43))

## [3.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@3.0.0...@thi.ng/vectors@3.0.1) (2019-07-08)

### Bug Fixes

* **vectors:** reflect output handling ([8ec12a4](https://github.com/thi-ng/umbrella/commit/8ec12a4))

# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@2.5.6...@thi.ng/vectors@3.0.0) (2019-07-07)

### Bug Fixes

* **vectors:** update arg types ([6d213bd](https://github.com/thi-ng/umbrella/commit/6d213bd))

### Code Refactoring

* **vectors:** fix [#95](https://github.com/thi-ng/umbrella/issues/95), update madd/maddN arg order, bug fixes ([020b4c8](https://github.com/thi-ng/umbrella/commit/020b4c8))

### Features

* **vectors:** add atan, exp_2, log_2, setVN, setVV, minor type fixes ([8683c19](https://github.com/thi-ng/umbrella/commit/8683c19))
* **vectors:** add bitwise int vec ops (signed/unsigned versions) ([a364f1f](https://github.com/thi-ng/umbrella/commit/a364f1f))
* **vectors:** add bvec types, componentwise logic & comparison ops ([7b9f03d](https://github.com/thi-ng/umbrella/commit/7b9f03d))
* **vectors:** add degrees(), radians(), add fitXX type hints ([b313a56](https://github.com/thi-ng/umbrella/commit/b313a56))
* **vectors:** add fmod/fmodN fns (GLSL style mod op) ([928b95b](https://github.com/thi-ng/umbrella/commit/928b95b))
* **vectors:** add integer math ops (signed/unsigned) ([c8a997f](https://github.com/thi-ng/umbrella/commit/c8a997f))
* **vectors:** add swizzle setters ([114003c](https://github.com/thi-ng/umbrella/commit/114003c))
* **vectors:** add vecOf() ctor fn ([25feeee](https://github.com/thi-ng/umbrella/commit/25feeee))
* **vectors:** enable TS strict compiler flags (refactor) ([94715ff](https://github.com/thi-ng/umbrella/commit/94715ff))

### BREAKING CHANGES

* **vectors:** update madd/maddN arg order, rename functions

- madd & maddN args now OpenCL/CUDA compatible, i.e.
  - madd(a,b,c) => a * b + c
  - maddN(a,n,b) => a * n + b
- rename perpendicularLeft/Right => perpendicularCCW/CW
- rename normalLeft/Right => normalCCW/CW
- fix output vec handling in addW fns

# [2.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@2.4.4...@thi.ng/vectors@2.5.0) (2019-03-28)

### Features

* **vectors:** add hash() op and IHash impls for Vec2/3/4 ([577d8cf](https://github.com/thi-ng/umbrella/commit/577d8cf))
* **vectors:** add Vec2/3/4Like type aliases, update ReadonlyVec ([3d5cd61](https://github.com/thi-ng/umbrella/commit/3d5cd61))

# [2.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@2.3.2...@thi.ng/vectors@2.4.0) (2019-03-03)

### Features

* **vectors:** add headingSegment*() fns, update readme ([6ab6858](https://github.com/thi-ng/umbrella/commit/6ab6858))

# [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@2.2.1...@thi.ng/vectors@2.3.0) (2019-02-15)

### Features

* **vectors:** add fit, fit01, fit11 fns ([161d19d](https://github.com/thi-ng/umbrella/commit/161d19d))

# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@2.1.1...@thi.ng/vectors@2.2.0) (2019-02-05)

### Features

* **vectors:** add corner2, clockwise2, signedAreaC2, isInArray fns ([2440ffd](https://github.com/thi-ng/umbrella/commit/2440ffd))
* **vectors:** add VecPair type alias, add copyVectors() ([58e0a05](https://github.com/thi-ng/umbrella/commit/58e0a05))

# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@2.0.0...@thi.ng/vectors@2.1.0) (2019-01-21)

### Features

* **vectors:** migrate direction(), normalLeft/Right2() from geom pkg ([07d5f8f](https://github.com/thi-ng/umbrella/commit/07d5f8f))

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@1.4.12...@thi.ng/vectors@2.0.0) (2019-01-21)

### Bug Fixes

* **vectors:** fix NaNs in Mat23.scaleWithCenter ([92bce73](https://github.com/thi-ng/umbrella/commit/92bce73))

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@1.3.0...@thi.ng/vectors@1.4.0) (2018-10-17)

### Features

* **vectors:** add axis consts, add/update ops ([473ec80](https://github.com/thi-ng/umbrella/commit/473ec80))
* **vectors:** add collate & eqDelta fns, update ctors ([221fb7f](https://github.com/thi-ng/umbrella/commit/221fb7f))
* **vectors:** add comparators & ICompare impls for vec2/3/4 ([6a0f8aa](https://github.com/thi-ng/umbrella/commit/6a0f8aa))
* **vectors:** add IMinMax interface ([34312d8](https://github.com/thi-ng/umbrella/commit/34312d8))
* **vectors:** add operation specific interfaces, rename Vec3.toPolar() ([5c44ad9](https://github.com/thi-ng/umbrella/commit/5c44ad9))
* **vectors:** replace math.ts w/ imports from [@thi](https://github.com/thi).ng/maths package ([0967929](https://github.com/thi-ng/umbrella/commit/0967929))

<a name="1.3.0"></a>
# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@1.2.2...@thi.ng/vectors@1.3.0) (2018-09-28)

### Features

* **vectors:** add vector ops codegen, update basic vec2/3/4 ops ([#51](https://github.com/thi-ng/umbrella/issues/51)) ([b5ed254](https://github.com/thi-ng/umbrella/commit/b5ed254))

<a name="1.1.0"></a>
# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@1.0.0...@thi.ng/vectors@1.1.0) (2018-09-10)

### Bug Fixes

* **vectors:** GVec.copy() / get() ([ae261ab](https://github.com/thi-ng/umbrella/commit/ae261ab))
* **vectors:** Mat23/33/44 toString() impls ([07d1ccf](https://github.com/thi-ng/umbrella/commit/07d1ccf))

### Features

* **vectors:** add matrix index & property accessors ([3dd0072](https://github.com/thi-ng/umbrella/commit/3dd0072))

<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@0.6.0...@thi.ng/vectors@1.0.0) (2018-09-05)

### Features

* **vectors:** add immutable vec2/3/4 ops ([a3c0407](https://github.com/thi-ng/umbrella/commit/a3c0407))
* **vectors:** add/update transformVectors*(), update types ([2eec700](https://github.com/thi-ng/umbrella/commit/2eec700))

### BREAKING CHANGES

* **vectors:** update transformVectors1/2() arg order

<a name="0.6.0"></a>
# [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@0.5.3...@thi.ng/vectors@0.6.0) (2018-09-03)

### Bug Fixes

* **vectors:** add missing arg types ([c0fbb4e](https://github.com/thi-ng/umbrella/commit/c0fbb4e))
* **vectors:** add opt normalize for angleBetween2/3 ([25ea00c](https://github.com/thi-ng/umbrella/commit/25ea00c))
* **vectors:** update GVec method args (readonly) ([ad13151](https://github.com/thi-ng/umbrella/commit/ad13151))

### Features

* **vectors:** add mixBilinear1/2/3/4 ([f0ccd0c](https://github.com/thi-ng/umbrella/commit/f0ccd0c))
* **vectors:** add new vector ops, update readme ([9510f01](https://github.com/thi-ng/umbrella/commit/9510f01))
* **vectors:** add Vec*.intoBuffer() impls ([16aa0c4](https://github.com/thi-ng/umbrella/commit/16aa0c4))

<a name="0.5.2"></a>
## [0.5.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@0.5.1...@thi.ng/vectors@0.5.2) (2018-09-01)

### Bug Fixes

* **vectors:** add missing deps ([d2b4faf](https://github.com/thi-ng/umbrella/commit/d2b4faf))

<a name="0.5.0"></a>
# [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@0.4.0...@thi.ng/vectors@0.5.0) (2018-08-30)

### Features

* **vectors:** consolidate vector consts, add toJSON() impls ([bdb5d37](https://github.com/thi-ng/umbrella/commit/bdb5d37))
* **vectors:** update types, update GVec, add maths fns, swap impls ([d5cec94](https://github.com/thi-ng/umbrella/commit/d5cec94))

<a name="0.4.0"></a>
# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@0.3.0...@thi.ng/vectors@0.4.0) (2018-08-28)

### Features

* **vectors:** add more vec2/3 ops ([cd834f8](https://github.com/thi-ng/umbrella/commit/cd834f8))

<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@0.2.1...@thi.ng/vectors@0.3.0) (2018-08-27)

### Features

* **vectors:** add mix1(), minor cleanups ([cfb2b74](https://github.com/thi-ng/umbrella/commit/cfb2b74))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@0.1.3...@thi.ng/vectors@0.2.0) (2018-08-02)

### Features

* **vectors:** add gvec size checks, add IEquiv & Iterable impls ([2a13f28](https://github.com/thi-ng/umbrella/commit/2a13f28))
* **vectors:** add toCylindrical3() / fromCylindrical3() ([74f939c](https://github.com/thi-ng/umbrella/commit/74f939c))
* **vectors:** make Vec2/3/4 array-like, add IEquiv impls, add tests ([3039a35](https://github.com/thi-ng/umbrella/commit/3039a35))

<a name="0.1.2"></a>
## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@0.1.1...@thi.ng/vectors@0.1.2) (2018-07-30)

### Bug Fixes

* **vectors:** get*() return types, refactor using set*() ([3534274](https://github.com/thi-ng/umbrella/commit/3534274))

<a name="0.1.1"></a>
## [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@0.1.0...@thi.ng/vectors@0.1.1) (2018-07-29)

### Bug Fixes

* **vectors:** naming convention, add function overview tables ([3de5cea](https://github.com/thi-ng/umbrella/commit/3de5cea))

<a name="0.1.0"></a>
# 0.1.0 (2018-07-29)

### Bug Fixes

* **vectors:** copy/paste mistakes, add tests ([2a5a744](https://github.com/thi-ng/umbrella/commit/2a5a744))

### Features

* **vectors:** add generic vec fns & class wrapper ([e3c6167](https://github.com/thi-ng/umbrella/commit/e3c6167))
* **vectors:** add minor/majorAxis(), minor/major2/3 ([35af6a5](https://github.com/thi-ng/umbrella/commit/35af6a5))
* **vectors:** add swizzle fns, update/unify fn naming ([5bba592](https://github.com/thi-ng/umbrella/commit/5bba592))
* **vectors:** add vec4 ops & class wrapper ([b59fadf](https://github.com/thi-ng/umbrella/commit/b59fadf))
* **vectors:** re-add matrix class wrappers, update vec classes ([1ec75e6](https://github.com/thi-ng/umbrella/commit/1ec75e6))
* **vectors:** re-import updated mat23/33/44 functions ([4fdda6a](https://github.com/thi-ng/umbrella/commit/4fdda6a))
* **vectors:** re-import updated mat44, add orthoNormal3 ([21b04f0](https://github.com/thi-ng/umbrella/commit/21b04f0))
* **vectors:** re-import vector types from old thi.ng/geom TS version ([d154153](https://github.com/thi-ng/umbrella/commit/d154153))
* **vectors:** update get & copy fns to retain buffer types ([54b3db2](https://github.com/thi-ng/umbrella/commit/54b3db2))
