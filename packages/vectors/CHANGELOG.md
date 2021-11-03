# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [7.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@6.2.0...@thi.ng/vectors@7.0.0) (2021-10-12)


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






#  [6.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@6.1.2...@thi.ng/vectors@6.2.0) (2021-09-03)

###  Bug Fixes

- **vectors:** add correct type for setNS() ([3817d65](https://github.com/thi-ng/umbrella/commit/3817d6562fc9ab749f1dde25d57e8108c91ebefc))

###  Features

- **vectors:** add covariance(), correlation() fns ([b8d661d](https://github.com/thi-ng/umbrella/commit/b8d661dadebb725868fe48650e6461567706e47b))
- **vectors:** add formatter support ([2bbb54e](https://github.com/thi-ng/umbrella/commit/2bbb54ee322bd3b22f73e36d430c4477fd2a25cd))
- **vectors:** add generic strided dot product ([9c34793](https://github.com/thi-ng/umbrella/commit/9c34793950e9cb831dee46d5dbbc19b0dfb982df))
- **vectors:** add new distance metrics ([24aa2f4](https://github.com/thi-ng/umbrella/commit/24aa2f43060ad2030797c6de031437a65ab783da))
- **vectors:** add new module re-exports ([92e7f73](https://github.com/thi-ng/umbrella/commit/92e7f730741b09018dae92e4428fe635b02125ab))
- **vectors:** add statistics related vector ops ([d6507ad](https://github.com/thi-ng/umbrella/commit/d6507ad8a3821fd2839a6c0d34d7d254d81790de))
- **vectors:** add strided versions of various ops ([cbd9576](https://github.com/thi-ng/umbrella/commit/cbd95760715d8fbd1d2b974f87c0cf80db08bbb5))

###  Performance Improvements

- **vectors:** update standardize() ([e87b979](https://github.com/thi-ng/umbrella/commit/e87b979d54026f3a104762fac30105e51f93eef5))

#  [6.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@6.0.7...@thi.ng/vectors@6.1.0) (2021-08-17)

###  Features

- **vectors:** add mean, minBounds, maxBounds ([640877f](https://github.com/thi-ng/umbrella/commit/640877f39b1b9487aa5692d1a2931ad85a516b26))
- **vectors:** add tensor product ([1fcc3ea](https://github.com/thi-ng/umbrella/commit/1fcc3ea3e8e3802c6b8c21c9d8148543c3917c63))

##  [6.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@6.0.0...@thi.ng/vectors@6.0.1) (2021-06-08)

###  Bug Fixes

- **vectors:** re-add missing randNorm2/3/4 fns ([0f0e270](https://github.com/thi-ng/umbrella/commit/0f0e270c6f552d66605396e66a967180cc42fdbb))

#  [6.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@5.3.0...@thi.ng/vectors@6.0.0) (2021-04-24)

###  Features

- **vectors:** add/update modulo functions ([81d2e63](https://github.com/thi-ng/umbrella/commit/81d2e63f12f87893b9e53d070260bb6c9b9f0dcd))

###  BREAKING CHANGES

- **vectors:** Introduction of standard libc math functions in thi.ng/math causes behavior change/flip of existing `fmod()` & `mod()` functions...
    - swap `fmod()` <> `mod()` to align w/ their GLSL & libc counterparts
    - same goes for `fmodN()` <> `modN()`
    - add `remainder()`/ `remainderN()` w/ standard libc behavior
    - update doc strings

#  [5.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@5.2.2...@thi.ng/vectors@5.3.0) (2021-04-19)

###  Features

- **vectors:** add componentwise median() ([39b5c55](https://github.com/thi-ng/umbrella/commit/39b5c5537f23bf9d9e59da725c89a22714cc0091))
- **vectors:** replace distHaversine() ([9d9d4e8](https://github.com/thi-ng/umbrella/commit/9d9d4e8f1697ba96755e5fc2fe0cf898ff12b105))

#  [5.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@5.1.7...@thi.ng/vectors@5.2.0) (2021-03-30)

###  Features

- **vectors:** add distHaversine() ([4dcc9cf](https://github.com/thi-ng/umbrella/commit/4dcc9cf8205a4e97c2abf14c6d6cb40949532c94))

#  [5.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@5.0.1...@thi.ng/vectors@5.1.0) (2021-03-03)

###  Bug Fixes

- **vectors:** update GVec internals (TS4.2) ([e6b7b74](https://github.com/thi-ng/umbrella/commit/e6b7b74bc7f43efed67ccba6de62f09e35c18e0e))

###  Features

- **vectors:** add softMax() & oneHot() ([4f242c8](https://github.com/thi-ng/umbrella/commit/4f242c81c12e669bad85df6cf4f9588394121a0d))

#  [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.9.1...@thi.ng/vectors@5.0.0) (2021-02-20)

###  Code Refactoring

- **vectors:** update mem mapped type handling ([4a6e9b1](https://github.com/thi-ng/umbrella/commit/4a6e9b16a1c871d305d99eeb53e9efeab4b78209))

###  Features

- **vectors:** add weightedDistance HOF ([8500a79](https://github.com/thi-ng/umbrella/commit/8500a7938467339810362cc0d91555778218231d))

###  BREAKING CHANGES

- **vectors:** buffer mapping fns use new type string consts
    - part of umbrella-wide changes to thi.ng/api Type aliases (see a333d4182)

#  [4.9.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.8.6...@thi.ng/vectors@4.9.0) (2021-01-21)

###  Bug Fixes

- **vectors:** add explicit return types (zeroes/ones()) ([fc2f662](https://github.com/thi-ng/umbrella/commit/fc2f6623033b5caf1d8a25bf174d51a8db8b1a91))

###  Features

- **vectors:** add dist2/3 ([eb334fa](https://github.com/thi-ng/umbrella/commit/eb334fa764dc3d7093b1c64afb1fbdb1b1053831))

#  [4.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.7.0...@thi.ng/vectors@4.8.0) (2020-11-24)

###  Features

- **vectors:** add roundN(), update round() ([36f07e6](https://github.com/thi-ng/umbrella/commit/36f07e62de03afe376ddc48497dfe463e3b10eb4))
- **vectors:** add signedVolume() ([907438e](https://github.com/thi-ng/umbrella/commit/907438e2b94b475018468128e7d4987dcbf44eb7))

#  [4.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.6.6...@thi.ng/vectors@4.7.0) (2020-10-03)

###  Features

- **vectors, geom:** point on ray at distance ([0b04b80](https://github.com/thi-ng/umbrella/commit/0b04b80f1eaa700e262f99d4726651c90d4fed2b))

#  [4.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.5.6...@thi.ng/vectors@4.6.0) (2020-08-10)

###  Features

- **vectors:** add not() bvec op ([a820b8f](https://github.com/thi-ng/umbrella/commit/a820b8fec8f69c82910f61bfeb3c013ceed19b8c))
- **vectors:** add/update vec coercions & types ([073389e](https://github.com/thi-ng/umbrella/commit/073389e33bbead294d690c60d150a7fd0589f822))

#  [4.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.4.4...@thi.ng/vectors@4.5.0) (2020-06-20)

###  Features

- **vectors:** add cornerBisector2() ([aff9bfa](https://github.com/thi-ng/umbrella/commit/aff9bfab86fdc5ca0b2ee88be68692988493ee57))

#  [4.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.3.4...@thi.ng/vectors@4.4.0) (2020-05-14)

###  Features

- **vectors:** add mapVectors() ([61ddde7](https://github.com/thi-ng/umbrella/commit/61ddde78c23ded396ed70fd473a92b2495e74b83))

##  [4.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.3.0...@thi.ng/vectors@4.3.1) (2020-04-23)

###  Bug Fixes

- **vectors:** add missing equals2/3/4 exports ([041f590](https://github.com/thi-ng/umbrella/commit/041f590f6c1c29efd01fccc26cbbb2c0992e1147))

#  [4.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.2.6...@thi.ng/vectors@4.3.0) (2020-04-23)

###  Features

- **vectors:** add equals/2/3/4() ([34cad0e](https://github.com/thi-ng/umbrella/commit/34cad0eee8cd6d555ddc8ed718858b6885519f85))

#  [4.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.1.2...@thi.ng/vectors@4.2.0) (2020-03-01)

###  Features

- **vectors:** add safeDiv() ([8e9a688](https://github.com/thi-ng/umbrella/commit/8e9a688e44ed1ed63619ff52b514dd4b373fd743))

#  [4.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@4.0.3...@thi.ng/vectors@4.1.0) (2020-02-25)

###  Bug Fixes

- **vectors:** add missing types & annotations (TS3.8) ([8680e37](https://github.com/thi-ng/umbrella/commit/8680e37c39156ff8a772b51f2466a661853b7bd6))

###  Features

- **vectors:** add cornerBisector() ([b2d923e](https://github.com/thi-ng/umbrella/commit/b2d923ecf0b41ce6b8a3e1261957825d6dc1ec93))
- **vectors:** add ivec/uvec/bvec conversions ([1147acb](https://github.com/thi-ng/umbrella/commit/1147acbf5d0aca20bb243cb1381b788633545f06))

#  [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@3.3.1...@thi.ng/vectors@4.0.0) (2019-11-09)

###  Bug Fixes

- **vectors:** fix normalizeS2/3/4 ([f048393](https://github.com/thi-ng/umbrella/commit/f04839355c90e991b0a8970af469119283454637))
- **vectors:** fix out args in mixCubic/mixQuadratic ([d02dae6](https://github.com/thi-ng/umbrella/commit/d02dae6b4bad2d026dec96c865292778e2c50ba2))
- **vectors:** update random2/3/4 to return new vec if none given ([a0be4d4](https://github.com/thi-ng/umbrella/commit/a0be4d4a288c61e7860990bb3c5b6992af30552c))

###  Code Refactoring

- **vectors:** rename strided-scalar op suffixes (SN => NS) ([66258d8](https://github.com/thi-ng/umbrella/commit/66258d8b096de2a49d2f801a5329a07e7ef97c56))

###  Features

- **vectors:** add fill(), add MultiVecOp.impl(), update vop() ([21ff930](https://github.com/thi-ng/umbrella/commit/21ff930e3c902051ed937e9294d71dd25688d729))
- **vectors:** add mixCubicHermite versions & tangent fns ([b382d25](https://github.com/thi-ng/umbrella/commit/b382d25e65d6371e6b76219fd2909ac991933db4))
- **vectors:** add more strided vec ops, refactor templates ([ca91fa9](https://github.com/thi-ng/umbrella/commit/ca91fa92c5720f361291c0672a9af4f79b3eafa6))
- **vectors:** add new intoBuffer(), move fns for wrapped versions ([53581f1](https://github.com/thi-ng/umbrella/commit/53581f16effb42a1b3cc9aac8bd438880aaf7c97))
- **vectors:** add strided random ops, types, defHofOpS() codegen ([1e46f5a](https://github.com/thi-ng/umbrella/commit/1e46f5aa6ad6d64bef5afdd7baf2d218e4547d1d))
- **vectors:** add strided rotate ops ([4f2b5a7](https://github.com/thi-ng/umbrella/commit/4f2b5a72948774966c5580bdf33f75b913b9f460))
- **vectors:** update readme ([f16bb45](https://github.com/thi-ng/umbrella/commit/f16bb4567eb293e56eabd6c1fb6969e1217598e0))

###  Performance Improvements

- **vectors:** minor optimization for 0-index Vec2/3/4 accessors ([a7c561d](https://github.com/thi-ng/umbrella/commit/a7c561df31d7466676a48880f1ae1083d8938397))

###  BREAKING CHANGES

- **vectors:** setSN2/3/4 => setSN2/3/4

#  [3.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@3.2.0...@thi.ng/vectors@3.3.0) (2019-08-21)

###  Features

- **vectors:** add isNaN(), isInf() vec ops, update readme ([ed60d09](https://github.com/thi-ng/umbrella/commit/ed60d09))

#  [3.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/vectors@3.1.1...@thi.ng/vectors@3.2.0) (2019-08-17)

###  Features
