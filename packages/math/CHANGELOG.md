# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@5.0.0...@thi.ng/math@5.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/math





# [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@4.0.6...@thi.ng/math@5.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






##  [4.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@4.0.5...@thi.ng/math@4.0.6) (2021-09-03) 

###  Bug Fixes 

- **math:** removing deprecated eqDeltaFixed() ([1de245b](https://github.com/thi-ng/umbrella/commit/1de245bff0d2c1d9436e39240ecd648cef744488)) 

#  [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@3.4.0...@thi.ng/math@4.0.0) (2021-04-24) 

###  Features 

- **math:** add libc math fns ([28b41a8](https://github.com/thi-ng/umbrella/commit/28b41a824758b83cea09c29f48e6f14f56368c40)) 
- **math:** add/update modulo functions ([be7b02b](https://github.com/thi-ng/umbrella/commit/be7b02beaf4ab1ab1030597a5f4eb94d43e1469b)) 

###  BREAKING CHANGES 

- **math:** Introduction of standard libc math functions causes behavior change of existing `fmod()` function... 
    - rename `fmod()` => `mod()` to align w/ GLSL counterpart 
    - add new `fmod()` w/ standard libc behavior (same as JS % op) 
    - add `remainder()` w/ standard libc behavior 
    - update doc strings 

#  [3.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@3.3.0...@thi.ng/math@3.4.0) (2021-04-03) 

###  Bug Fixes 

- **math:** fix sigmoid01() signature ([378cb17](https://github.com/thi-ng/umbrella/commit/378cb17d4ad2ef2f301039e067af251c867d7da8)) 

###  Features 

- **math:** add lanczos(), fix/update/add sinc ([e661b7a](https://github.com/thi-ng/umbrella/commit/e661b7a8e8ce49e4d34ae572818d6b0e8e7a292d)) 

#  [3.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@3.2.5...@thi.ng/math@3.3.0) (2021-03-17) 

###  Features 

- **math:** add mixBicubic(), mixCubicHermiteFromPoints() ([30dda42](https://github.com/thi-ng/umbrella/commit/30dda424cc1a433a71dfa762f0b8c453114466a0)) 

###  Performance Improvements 

- **math:** replace mixBilinear() w/ inline impl ([bb16dc5](https://github.com/thi-ng/umbrella/commit/bb16dc591dd9455b8d0061a664375a9dc8c74a36)) 

#  [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@3.1.0...@thi.ng/math@3.2.0) (2021-02-20) 

###  Features 

- **math:** add clamp0() ([d18c869](https://github.com/thi-ng/umbrella/commit/d18c869b59499ee081bee7c75e6ed0ebd4720efb)) 

#  [3.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@3.0.1...@thi.ng/math@3.1.0) (2021-01-10) 

###  Features 

- **math:** add floorTo/ceilTo() ([595fe83](https://github.com/thi-ng/umbrella/commit/595fe83475f4a4080408033d3448fd4c36ef1652)) 

#  [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@2.2.2...@thi.ng/math@3.0.0) (2020-12-22) 

###  Bug Fixes 

- **math:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([8f00375](https://github.com/thi-ng/umbrella/commit/8f00375722ff3e207f1711229acff69c3bd1343f)) 

###  Code Refactoring 

- **math:** update/fix sigmoid() behavior ([07a278f](https://github.com/thi-ng/umbrella/commit/07a278fdd82004610aa9b7acb585c3c841af24ba)) 

###  Features 

- **math:** add gaussian() ([138befe](https://github.com/thi-ng/umbrella/commit/138befe1f2d14eb9a4fb3829179b8d03d49e6bbc)) 
- **math:** add more parametric T-norms ([38bd40e](https://github.com/thi-ng/umbrella/commit/38bd40e1595e318c6472a526e03c8c8a06ebf396)) 
- **math:** add various T-norm functions ([ab4a810](https://github.com/thi-ng/umbrella/commit/ab4a810981c08c54365d5ea3212cd465d2589cf0)) 

###  BREAKING CHANGES 

- **math:** replace Crossing enum w/ type alias 
- **math:** add new bias arg for sigmoid() to satisfy more use cases. Use sigmoid01() for old behavior. 
    - add/update docstrings 
    - add desmos links 

#  [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@2.1.1...@thi.ng/math@2.2.0) (2020-11-24) 

###  Features 

- **math:** add generalized schlick curve ([4b6eb84](https://github.com/thi-ng/umbrella/commit/4b6eb844f3588679ee78d0e7d60b52cfcec8eb87)) 

#  [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@2.0.4...@thi.ng/math@2.1.0) (2020-09-13) 

###  Features 

- **math:** add lens(), invCircular() interpolators ([56dce17](https://github.com/thi-ng/umbrella/commit/56dce1779ee314179771fa14f31d0f36e1ec6a12)) 

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.7.13...@thi.ng/math@2.0.0) (2020-07-17) 

###  Code Refactoring 

- **math:** swap `eqDelta()` impls, rename ([5404a56](https://github.com/thi-ng/umbrella/commit/5404a5699a44d7ef6c2ccb5804f2b099a4358eb1)) 

###  BREAKING CHANGES 

- **math:** Revert/rename `eqDeltaFixed()` => `eqDelta()`. Rename curr `eqDelta()` => `eqDeltaScaled()` 
    - this is essentially a revert to 5018009 
    - also keep, but deprecate `eqDeltaFixed()` (synonym for `eqDelta` now) 

#  [1.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.6.0...@thi.ng/math@1.7.0) (2020-02-25) 

###  Features 

- **math:** add minNonZero2/3() ([49c88d9](https://github.com/thi-ng/umbrella/commit/49c88d917ca7089841f5c26ca92293582d80f148)) 
- **math:** add safeDiv() (from [@nkint](https://github.com/nkint) PR [#206](https://github.com/thi-ng/umbrella/issues/206)) ([0567b93](https://github.com/thi-ng/umbrella/commit/0567b93b881467c634fc4723cad986432faecd83)) 

#  [1.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.5.1...@thi.ng/math@1.6.0) (2020-01-24) 

###  Features 

- **math:** add clamp05, update wrapOnce, wrap01, wrap11 ([19af252](https://github.com/thi-ng/umbrella/commit/19af2527a3c7afee4f829e36bf06acaeaf045be7)) 
- **math:** add expFactor(), update wrap/wrapOnce() ([bb07348](https://github.com/thi-ng/umbrella/commit/bb07348da2e252641c1bc4de1e577451ead3607b)) 

#  [1.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.4.2...@thi.ng/math@1.5.0) (2019-11-09) 

###  Features 

- **math:** add mixCubicHermite & tangent fns ([d6b4b37](https://github.com/thi-ng/umbrella/commit/d6b4b3710b80fa1366cb40c193ad745bc63d4253)) 

#  [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.3.0...@thi.ng/math@1.4.0) (2019-07-07) 

###  Features 

- **math:** add signed/unsigned int math ops ([518d79a](https://github.com/thi-ng/umbrella/commit/518d79a)) 

#  [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.2.3...@thi.ng/math@1.3.0) (2019-05-22) 

###  Features 

- **math:** add extrema & crossing fns and Crossing enum ([e102f39](https://github.com/thi-ng/umbrella/commit/e102f39)) 
- **math:** add sigmoid / sigmoid11 fns ([3f085a3](https://github.com/thi-ng/umbrella/commit/3f085a3)) 

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.1.1...@thi.ng/math@1.2.0) (2019-03-18) 

###  Features 

- **math:** add consts ([28e9898](https://github.com/thi-ng/umbrella/commit/28e9898)) 
- **math:** add cos/sin approximations, loc(), add docstrings ([78ed751](https://github.com/thi-ng/umbrella/commit/78ed751)) 
- **math:** more trigonometry ([b5e1c02](https://github.com/thi-ng/umbrella/commit/b5e1c02)) 

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@1.0.1...@thi.ng/math@1.1.0) (2019-02-05) 

###  Features 

- **math:** add minError() search ([cae8394](https://github.com/thi-ng/umbrella/commit/cae8394)) 
- **math:** add PHI const ([57d4488](https://github.com/thi-ng/umbrella/commit/57d4488)) 
- **math:** add simplifyRatio() ([31e369b](https://github.com/thi-ng/umbrella/commit/31e369b)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@0.2.2...@thi.ng/math@1.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  Features 

- **math:** add absInnerAngle() ([a78bd87](https://github.com/thi-ng/umbrella/commit/a78bd87)) 
- **math:** add constants ([8fa05c3](https://github.com/thi-ng/umbrella/commit/8fa05c3)) 
- **math:** add cossin(), add opt scale arg for sincos() ([0043fb5](https://github.com/thi-ng/umbrella/commit/0043fb5)) 
- **math:** update eqDelta w/ adaptive eps, rename old => eqDeltaFixed ([5018009](https://github.com/thi-ng/umbrella/commit/5018009)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

##  [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@0.2.0...@thi.ng/math@0.2.1) (2018-11-20) 

###  Bug Fixes 

- **math:** fix [#60](https://github.com/thi-ng/umbrella/issues/60), add range check for norm() ([143c47c](https://github.com/thi-ng/umbrella/commit/143c47c)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/math@0.1.0...@thi.ng/math@0.2.0) (2018-10-21) 

###  Features 

- **math:** add sincos() & roundEps() ([f891c41](https://github.com/thi-ng/umbrella/commit/f891c41)) 
- **math:** migrate mixCubic()/mixQuadratic() from geom package ([4a47daa](https://github.com/thi-ng/umbrella/commit/4a47daa)) 

#  0.1.0 (2018-10-17) 

###  Features 

- **math:** extract maths fns from [@thi](https://github.com/thi).ng/vectors as new package ([4af1fba](https://github.com/thi-ng/umbrella/commit/4af1fba))
