# Change Log

- **Last updated**: 2024-02-06T23:18:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [5.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.9.0) (2024-02-06)

#### 🚀 Features

- add easing functions ([e4966fd](https://github.com/thi-ng/umbrella/commit/e4966fd))
  - add easing functions, ported from [@thi.ng/shader-ast-std](https://github.com/thi-ng/umbrella/tree/main/packages/shader-ast-std) pkg

## [5.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.8.0) (2024-01-26)

#### 🚀 Features

- add signedPow(), add docs ([5207ba3](https://github.com/thi-ng/umbrella/commit/5207ba3))

### [5.7.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.7.2) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [5.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.7.0) (2023-10-27)

#### 🚀 Features

- add foldback01() ([1272647](https://github.com/thi-ng/umbrella/commit/1272647))

## [5.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.6.0) (2023-08-24)

#### 🚀 Features

- add minMax() ([76ca59d](https://github.com/thi-ng/umbrella/commit/76ca59d))

## [5.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.5.0) (2023-07-14)

#### 🚀 Features

- add smoothStep01/smootherStep01() ([152f93c](https://github.com/thi-ng/umbrella/commit/152f93c))

### [5.4.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.4.4) (2023-03-02)

#### ♻️ Refactoring

- update sincos/cossin return types ([ae5cd82](https://github.com/thi-ng/umbrella/commit/ae5cd82))

## [5.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.4.0) (2023-01-10)

#### 🚀 Features

- add factorial. permutation/combination fns ([965af0d](https://github.com/thi-ng/umbrella/commit/965af0d))

## [5.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.3.0) (2022-03-11)

#### 🚀 Features

- add ldiv() ([35d1e97](https://github.com/thi-ng/umbrella/commit/35d1e97))

## [5.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.2.0) (2021-12-13)

#### 🚀 Features

- add prime number fns ([f301256](https://github.com/thi-ng/umbrella/commit/f301256))
  - add nearestPrime()
  - add primesUntil()
  - add tests
  - update pkg

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.1.0) (2021-11-17)

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

### [5.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@5.0.0) (2021-10-12)

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
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))

### [4.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@4.0.6) (2021-09-03)

#### 🩹 Bug fixes

- removing deprecated eqDeltaFixed() ([1de245b](https://github.com/thi-ng/umbrella/commit/1de245b))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@4.0.0) (2021-04-24)

#### 🛑 Breaking changes

- add/update modulo functions ([be7b02b](https://github.com/thi-ng/umbrella/commit/be7b02b))
- BREAKING CHANGE: Introduction of standard libc math functions causes
  behavior change of existing `fmod()` function...
  - rename `fmod()` => `mod()` to align w/ GLSL counterpart
  - add new `fmod()` w/ standard libc behavior (same as JS % op)
  - add `remainder()` w/ standard libc behavior
  - update doc strings

#### 🚀 Features

- add libc math fns ([28b41a8](https://github.com/thi-ng/umbrella/commit/28b41a8))
  - add copysign()
  - add exp2()
  - add fdim()
  - add fma()
  - add frexp()
  - add ldexp()

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@3.4.0) (2021-04-03)

#### 🚀 Features

- add lanczos(), fix/update/add sinc ([e661b7a](https://github.com/thi-ng/umbrella/commit/e661b7a))
  - replace broken sinc() fn w/ non-normalized real sinc
  - add sincNormalized()
  - add lanczos()

#### 🩹 Bug fixes

- fix sigmoid01() signature ([378cb17](https://github.com/thi-ng/umbrella/commit/378cb17))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@3.3.0) (2021-03-17)

#### 🚀 Features

- add mixBicubic(), mixCubicHermiteFromPoints() ([30dda42](https://github.com/thi-ng/umbrella/commit/30dda42))

#### ⏱ Performance improvements

- replace mixBilinear() w/ inline impl ([bb16dc5](https://github.com/thi-ng/umbrella/commit/bb16dc5))
  - new impl ~1.7x faster

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@3.2.0) (2021-02-20)

#### 🚀 Features

- add clamp0() ([d18c869](https://github.com/thi-ng/umbrella/commit/d18c869))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@3.1.0) (2021-01-10)

#### 🚀 Features

- add floorTo/ceilTo() ([595fe83](https://github.com/thi-ng/umbrella/commit/595fe83))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@3.0.0) (2020-12-22)

#### 🛑 Breaking changes

- update/fix sigmoid() behavior ([07a278f](https://github.com/thi-ng/umbrella/commit/07a278f))
- BREAKING CHANGE: add new bias arg for sigmoid() to satisfy more use cases.
  Use sigmoid01() for old behavior.
  - add/update docstrings
  - add desmos links
- fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([8f00375](https://github.com/thi-ng/umbrella/commit/8f00375))
  - update comparison order in classifyCrossing()
- BREAKING CHANGE: replace Crossing enum w/ type alias

#### 🚀 Features

- add various T-norm functions ([ab4a810](https://github.com/thi-ng/umbrella/commit/ab4a810))
- add gaussian() ([138befe](https://github.com/thi-ng/umbrella/commit/138befe))
- add more parametric T-norms ([38bd40e](https://github.com/thi-ng/umbrella/commit/38bd40e))

### [2.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@2.2.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@2.2.0) (2020-11-24)

#### 🚀 Features

- add generalized schlick curve ([4b6eb84](https://github.com/thi-ng/umbrella/commit/4b6eb84))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@2.1.0) (2020-09-13)

#### 🚀 Features

- add lens(), invCircular() interpolators ([56dce17](https://github.com/thi-ng/umbrella/commit/56dce17))

#### ♻️ Refactoring

- use new function aliases, update deps ([dd0337f](https://github.com/thi-ng/umbrella/commit/dd0337f))
- update deps, imports, use new Fn types ([a40840d](https://github.com/thi-ng/umbrella/commit/a40840d))

### [1.7.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@1.7.5) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([783e5e3](https://github.com/thi-ng/umbrella/commit/783e5e3))

## [1.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@1.7.0) (2020-02-25)

#### 🚀 Features

- add safeDiv() (from @nkint PR [#206](https://github.com/thi-ng/umbrella/issues/206)) ([0567b93](https://github.com/thi-ng/umbrella/commit/0567b93))
- add minNonZero2/3() ([49c88d9](https://github.com/thi-ng/umbrella/commit/49c88d9))

## [1.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@1.6.0) (2020-01-24)

#### 🚀 Features

- add expFactor(), update wrap/wrapOnce() ([bb07348](https://github.com/thi-ng/umbrella/commit/bb07348))
  - rename wrap => wrapOnce()
  - add new wrap() which wraps any value, regardless of
  dist to interval border
  - update docs
- add clamp05, update wrapOnce, wrap01, wrap11 ([19af252](https://github.com/thi-ng/umbrella/commit/19af252))
  - add clamp05()
  - wrap fns now consistently use *closed* intervals

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@1.5.0) (2019-11-09)

#### 🚀 Features

- add mixCubicHermite & tangent fns ([d6b4b37](https://github.com/thi-ng/umbrella/commit/d6b4b37))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@1.4.0) (2019-07-07)

#### 🚀 Features

- add signed/unsigned int math ops ([518d79a](https://github.com/thi-ng/umbrella/commit/518d79a))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@1.3.0) (2019-05-22)

#### 🚀 Features

- add extrema & crossing fns and Crossing enum ([e102f39](https://github.com/thi-ng/umbrella/commit/e102f39))
- add sigmoid / sigmoid11 fns ([3f085a3](https://github.com/thi-ng/umbrella/commit/3f085a3))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@1.2.0) (2019-03-18)

#### 🚀 Features

- more trigonometry ([b5e1c02](https://github.com/thi-ng/umbrella/commit/b5e1c02))
- add consts ([28e9898](https://github.com/thi-ng/umbrella/commit/28e9898))
- add cos/sin approximations, loc(), add docstrings ([78ed751](https://github.com/thi-ng/umbrella/commit/78ed751))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@1.1.0) (2019-02-05)

#### 🚀 Features

- add PHI const ([57d4488](https://github.com/thi-ng/umbrella/commit/57d4488))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### 🚀 Features

- update eqDelta w/ adaptive eps, rename old => eqDeltaFixed ([5018009](https://github.com/thi-ng/umbrella/commit/5018009))
- add absInnerAngle() ([a78bd87](https://github.com/thi-ng/umbrella/commit/a78bd87))

#### ♻️ Refactoring

- use arrow fns ([560207a](https://github.com/thi-ng/umbrella/commit/560207a))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@0.2.1) (2018-11-20)

#### 🩹 Bug fixes

- fix [#60](https://github.com/thi-ng/umbrella/issues/60), add range check for norm() ([143c47c](https://github.com/thi-ng/umbrella/commit/143c47c))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@0.2.0) (2018-10-21)

#### 🚀 Features

- add sincos() & roundEps() ([f891c41](https://github.com/thi-ng/umbrella/commit/f891c41))
- migrate mixCubic()/mixQuadratic() from geom package ([4a47daa](https://github.com/thi-ng/umbrella/commit/4a47daa))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/math@0.1.0) (2018-10-17)

#### 🚀 Features

- extract maths fns from [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/main/packages/vectors) as new package ([4af1fba](https://github.com/thi-ng/umbrella/commit/4af1fba))
