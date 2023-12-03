# Change Log

- **Last updated**: 2023-12-03T12:13:31Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [8.8.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.8.9) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages T-Z) ([020ef6c](https://github.com/thi-ng/umbrella/commit/020ef6c))

### [8.8.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.8.7) (2023-10-30)

#### 🩹 Bug fixes

- fix flatten1() arg types, update docs ([b7ae8eb](https://github.com/thi-ng/umbrella/commit/b7ae8eb))

## [8.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.8.0) (2023-10-11)

#### 🚀 Features

- add repeatedly2d/3d() iterators ([5057939](https://github.com/thi-ng/umbrella/commit/5057939))
- add consume() helper fn ([e612846](https://github.com/thi-ng/umbrella/commit/e612846))

## [8.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.7.0) (2023-09-15)

#### 🚀 Features

- update rename()/renamer() ([221b13e](https://github.com/thi-ng/umbrella/commit/221b13e))
  - add support for retaining keys

## [8.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.6.0) (2023-08-22)

#### 🚀 Features

- add length() transducer ([47a95b7](https://github.com/thi-ng/umbrella/commit/47a95b7))

### [8.5.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.5.3) (2023-08-12)

#### ♻️ Refactoring

- update .probability() call sites in various pkgs ([c8c8141](https://github.com/thi-ng/umbrella/commit/c8c8141))

## [8.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.5.0) (2023-08-04)

#### 🚀 Features

- fix [#401](https://github.com/thi-ng/umbrella/issues/401), update multiplex(), step() ([834b076](https://github.com/thi-ng/umbrella/commit/834b076))
  - add optional support to override single-result unwrapping behavior
  - update docstrings/examples
  - add tests

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://github.com/thi-ng/umbrella/commit/b6db053))
- minor internal updates ([5ffdcbb](https://github.com/thi-ng/umbrella/commit/5ffdcbb))

## [8.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.4.0) (2023-03-19)

#### 🚀 Features

- add flatten1() transducer ([2ffd476](https://github.com/thi-ng/umbrella/commit/2ffd476))
  - syntax sugar for a common mapcat() usecase

## [8.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.3.0) (2022-03-11)

#### 🚀 Features

- add mapA() helper ([5cc5795](https://github.com/thi-ng/umbrella/commit/5cc5795))

## [8.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.2.0) (2021-12-14)

#### 🚀 Features

- update/fix/extend streamShuffle() ([dc26203](https://github.com/thi-ng/umbrella/commit/dc26203))
  - add StreamShuffleOpts, add IRandom opt
  - fix args for internal shuffle() calls
  - optimize number of shuffle calls
  - optimize final buffer drain

## [8.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.1.0) (2021-11-17)

#### 🚀 Features

- add rechunk() xform ([10d0e9f](https://github.com/thi-ng/umbrella/commit/10d0e9f))
  - update readme
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

### [8.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [8.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [8.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@8.0.0) (2021-10-12)

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
- restructure package ([4d643f5](https://github.com/thi-ng/umbrella/commit/4d643f5))
- BREAKING CHANGE: restructure/flatten pkg, remove sub folders
  - migrate all /func, /iter, /rfn, /xform files to main /src folder

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

### [7.9.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.9.2) (2021-09-03)

#### 🩹 Bug fixes

- fix [#310](https://github.com/thi-ng/umbrella/issues/310), update flatten/flattenWith ([bfbd726](https://github.com/thi-ng/umbrella/commit/bfbd726))
  - fix `flatten()`/`flattenWith()` return types
  - update generics to allow specifying explicit result type, but
    use new `DeepArrayValue<A>` mapped type as default
  - update `flattenWith()` predicate arg type to `any` since current
    restriction on top-level input type was (potentially) wrong for
    deeper levels. Also lift restriction and update pred's return type
    to `MaybeIterable<any>` (for same reason).

### [7.9.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.9.1) (2021-08-19)

#### 🩹 Bug fixes

- update normFrequenciesAuto() ([5b5200b](https://github.com/thi-ng/umbrella/commit/5b5200b))
  - actually use `key` fn arg (if given)

## [7.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.9.0) (2021-08-19)

#### 🚀 Features

- add normalized frequencies() reducers ([d09db8d](https://github.com/thi-ng/umbrella/commit/d09db8d))
  - add normCount()
  - add normFrequencies()
  - add normFrequenciesAuto()
  - update readme

## [7.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.8.0) (2021-08-04)

#### 🚀 Features

- update repeatedly(), iterate() ([b7d9ba4](https://github.com/thi-ng/umbrella/commit/b7d9ba4))
  - add iteration counter arg for repeatedly()
  - minor refactor iterate()
- add minMax() reducer ([5f8a722](https://github.com/thi-ng/umbrella/commit/5f8a722))

## [7.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.7.0) (2021-04-07)

#### 🚀 Features

- add partitionWhen() xform ([d2dd4d9](https://github.com/thi-ng/umbrella/commit/d2dd4d9))

### [7.6.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.6.10) (2021-04-03)

#### ♻️ Refactoring

- minor updates ([c582a1a](https://github.com/thi-ng/umbrella/commit/c582a1a))

### [7.6.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.6.2) (2021-03-03)

#### 🩹 Bug fixes

- add missing type anno (TS4.2) ([7ced9be](https://github.com/thi-ng/umbrella/commit/7ced9be))

## [7.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.6.0) (2021-02-20)

#### 🚀 Features

- add TweenOpts.easing, update tween() ([f3a50f4](https://github.com/thi-ng/umbrella/commit/f3a50f4))

#### ♻️ Refactoring

- use clamp0() ([47d5e54](https://github.com/thi-ng/umbrella/commit/47d5e54))

### [7.5.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.5.2) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports ([6407f7d](https://github.com/thi-ng/umbrella/commit/6407f7d))

## [7.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.5.0) (2020-11-24)

#### 🚀 Features

- add reduceRight/transduceRight() ([b71ff9c](https://github.com/thi-ng/umbrella/commit/b71ff9c))
  - update readme
- add minMag/maxMag() reducers ([f7496b3](https://github.com/thi-ng/umbrella/commit/f7496b3))

#### ♻️ Refactoring

- update destructuring ([d944b54](https://github.com/thi-ng/umbrella/commit/d944b54))
- dedupe transduce/transduceRight() internals ([2246ef4](https://github.com/thi-ng/umbrella/commit/2246ef4))

## [7.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.4.0) (2020-09-22)

#### 🚀 Features

- add mapcatIndexed() xform ([4f3d6e0](https://github.com/thi-ng/umbrella/commit/4f3d6e0))

### [7.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.3.1) (2020-09-13)

#### ♻️ Refactoring

- update imports ([e166cda](https://github.com/thi-ng/umbrella/commit/e166cda))

## [7.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.3.0) (2020-08-28)

#### 🚀 Features

- add normRange2 ([1125930](https://github.com/thi-ng/umbrella/commit/1125930))
- fix normRange2d, add normRange3d ([db75605](https://github.com/thi-ng/umbrella/commit/db75605))

#### 🩹 Bug fixes

- type ([dedce3f](https://github.com/thi-ng/umbrella/commit/dedce3f))

#### ♻️ Refactoring

- update/fix normRange2d/3d() ([d40c4a7](https://github.com/thi-ng/umbrella/commit/d40c4a7))

## [7.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.2.0) (2020-07-28)

#### 🚀 Features

- add autoObj() reducer ([26ad12a](https://github.com/thi-ng/umbrella/commit/26ad12a))

## [7.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.1.0) (2020-06-14)

#### 🚀 Features

- add keyPermutations, tests, update readme ([5110d50](https://github.com/thi-ng/umbrella/commit/5110d50))

# [7.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@7.0.0) (2020-06-01)

#### 🛑 Breaking changes

- update readme ([47b6cef](https://github.com/thi-ng/umbrella/commit/47b6cef))
- BREAKING CHANGE: `flatten` string handling now *always* atomic

#### 🩹 Bug fixes

- [#186](https://github.com/thi-ng/umbrella/issues/186), Fix crash when using empty string as source for several transducers. ([ef7a798](https://github.com/thi-ng/umbrella/commit/ef7a798))

#### ♻️ Refactoring

- update flatten & flattenWith ([35c2aaf](https://github.com/thi-ng/umbrella/commit/35c2aaf))

## [6.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@6.7.0) (2020-06-01)

#### 🚀 Features

- add IDeref support slidingWindow() ([13f4184](https://github.com/thi-ng/umbrella/commit/13f4184))
  (cherry picked from commit [c75175689544f172acde856b4261ca9dc128d1dd](https://github.com/thi-ng/umbrella/commit/c75175689544f172acde856b4261ca9dc128d1dd))
- add IDeref support slidingWindow() ([c751756](https://github.com/thi-ng/umbrella/commit/c751756))

## [6.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@6.6.0) (2020-05-29)

#### 🚀 Features

- add rangeNd(), add/update tests ([9239d6f](https://github.com/thi-ng/umbrella/commit/9239d6f))

#### ♻️ Refactoring

- update rangeNd() arg types ([d5aab14](https://github.com/thi-ng/umbrella/commit/d5aab14))

## [6.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@6.5.0) (2020-05-14)

#### 🚀 Features

- [#221](https://github.com/thi-ng/umbrella/issues/221), add partitionSync() key add/removal ops ([2ab4bf5](https://github.com/thi-ng/umbrella/commit/2ab4bf5))
  - add PartitionSync type
  - attach ops to dynamically manipulate & query input set
  - make input removal cleanup optional (enabled by default)
  - add/update tests

## [6.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@6.4.0) (2020-03-01)

#### 🚀 Features

- add partitionTime() transducer ([efafd0b](https://github.com/thi-ng/umbrella/commit/efafd0b))
- update mapKeys() key fns to accept 2nd arg ([749d2cd](https://github.com/thi-ng/umbrella/commit/749d2cd))
  - pass original input value as 2nd arg to each key transform fn
  - this allows creating new keys based on other values in the object

## [6.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@6.3.0) (2020-02-25)

#### 🚀 Features

- add peek() xform, update readme ([26aa228](https://github.com/thi-ng/umbrella/commit/26aa228))

#### ♻️ Refactoring

- update imports ([f081687](https://github.com/thi-ng/umbrella/commit/f081687))

## [6.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@6.2.0) (2020-01-24)

#### 🚀 Features

- add pushSort() reducer ([444d2ee](https://github.com/thi-ng/umbrella/commit/444d2ee))
- add sortedKeys() iterator ([fa9343c](https://github.com/thi-ng/umbrella/commit/fa9343c))
- add dup() & palindrome(), update readme ([546bf9f](https://github.com/thi-ng/umbrella/commit/546bf9f))
- add line(), curve() ([31bd5b9](https://github.com/thi-ng/umbrella/commit/31bd5b9))
- add opt limit for cycle() ([186daff](https://github.com/thi-ng/umbrella/commit/186daff))
- update curve(), line(), iterate() ([3581a9d](https://github.com/thi-ng/umbrella/commit/3581a9d))
  - curve(): use new/improved logic from [@thi.ng/dsp](https://github.com/thi-ng/umbrella/tree/main/packages/dsp)
  - iterate(): add opt step count
- add IXform interface & TxLike type alias, update related functions ([49c62b7](https://github.com/thi-ng/umbrella/commit/49c62b7))
  - update all fns expecting Transducer args
  - add internal ensureTransducer() helper

#### 🩹 Bug fixes

- use child reducer completion step in groupByMap/Obj() ([ff44fcb](https://github.com/thi-ng/umbrella/commit/ff44fcb))
- update keep() xform to accept nullable ([1bc561b](https://github.com/thi-ng/umbrella/commit/1bc561b))

#### ⏱ Performance improvements

- update string version of palindrome() ([315cbf8](https://github.com/thi-ng/umbrella/commit/315cbf8))
  - avoid char-wise iteration of original input

#### ♻️ Refactoring

- update ConvolutionOpts ([0748d97](https://github.com/thi-ng/umbrella/commit/0748d97))

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@6.1.0) (2019-11-30)

#### 🩹 Bug fixes

- add type hints ([651e281](https://github.com/thi-ng/umbrella/commit/651e281))

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@6.0.0) (2019-11-09)

#### 🛑 Breaking changes

- simplify args for extendSides, padSides, wrapSides ([a36651a](https://github.com/thi-ng/umbrella/commit/a36651a))
  - rename wrap() => wrapSides()
  - remove obsolete & deprecated wrapLeft/Right/Both
- BREAKING CHANGE: Rename wrap() => wrapSides(), update signature to be
  aligned w/ related iterators
- rename old `interpolate` => `tween` ([918721d](https://github.com/thi-ng/umbrella/commit/918721d))
- BREAKING CHANGE: rename `interpolate` iterator  => `tween`
- update tween() args ([5523582](https://github.com/thi-ng/umbrella/commit/5523582))
  - add TweenOpts
  - add/update docstrings
- BREAKING CHANGE: replace tween() args w/ `TweenOpts` config object

#### 🚀 Features

- add new iterators: extendSides/padSides/symmetric() ([47001fc](https://github.com/thi-ng/umbrella/commit/47001fc))
- add new transducers: interpolate, interpolateHermite/Linear ([c3fa9ab](https://github.com/thi-ng/umbrella/commit/c3fa9ab))

#### ♻️ Refactoring

- add type hints (TS 3.6.4) ([a1582c0](https://github.com/thi-ng/umbrella/commit/a1582c0))
- fix [#166](https://github.com/thi-ng/umbrella/issues/166), update wrapSides() bounds check ([963c73a](https://github.com/thi-ng/umbrella/commit/963c73a))

### [5.4.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@5.4.5) (2019-09-21)

#### 🚀 Features

- add back pressure support for partitionSync() ([6e14952](https://github.com/thi-ng/umbrella/commit/6e14952))

#### 🩹 Bug fixes

- fix mean() for reduce w/ init value ([d993bf2](https://github.com/thi-ng/umbrella/commit/d993bf2))

### [5.4.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@5.4.4) (2019-08-21)

#### ♻️ Refactoring

- extract common logic for add/mul/sub reducers ([7caa71a](https://github.com/thi-ng/umbrella/commit/7caa71a))
- update kernelLookup destructuring ([acaa38e](https://github.com/thi-ng/umbrella/commit/acaa38e))
- update/split reduce() ([820e7c7](https://github.com/thi-ng/umbrella/commit/820e7c7))
- extract internal helpers, update rfns & xforms ([7772f9b](https://github.com/thi-ng/umbrella/commit/7772f9b))
  Impacted reducers:
  - add/mul/sub
  - groupByMap/Obj
  Xforms:
  - movingMedian
  - partitionSort / streamSort
  - takeLast

## [5.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@5.4.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([2f8ec89](https://github.com/thi-ng/umbrella/commit/2f8ec89))

#### 🩹 Bug fixes

- fix cat/mapcat arg types ([0d9b7cb](https://github.com/thi-ng/umbrella/commit/0d9b7cb))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([c681aae](https://github.com/thi-ng/umbrella/commit/c681aae))

### [5.3.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@5.3.3) (2019-04-03)

#### 🩹 Bug fixes

- fix [#82](https://github.com/thi-ng/umbrella/issues/82), update partitionSync required key checks, add tests ([8b2f3fe](https://github.com/thi-ng/umbrella/commit/8b2f3fe))

## [5.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@5.3.0) (2019-03-21)

#### 🚀 Features

- add toggle() xform ([b5c744e](https://github.com/thi-ng/umbrella/commit/b5c744e))

#### 🩹 Bug fixes

- update mean() completion step to avoid div by zero ([f644ecd](https://github.com/thi-ng/umbrella/commit/f644ecd))

## [5.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@5.2.0) (2019-03-10)

#### 🚀 Features

- add / update convolution fns ([31e594b](https://github.com/thi-ng/umbrella/commit/31e594b))
  - add buildKernel1d, convolve1d

#### ♻️ Refactoring

- re-use type aliases from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([0d2fdff](https://github.com/thi-ng/umbrella/commit/0d2fdff))

### [5.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@5.1.2) (2019-03-03)

#### 🩹 Bug fixes

- update dedupe() w/ predicate arg ([c414423](https://github.com/thi-ng/umbrella/commit/c414423))
  - if pred is given, do not call pred for 1st value (always passes)

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@5.1.0) (2019-02-26)

#### 🚀 Features

- add converge() xform, add iter arg to iterate() ([8393a95](https://github.com/thi-ng/umbrella/commit/8393a95))

#### 🩹 Bug fixes

- update converge() & update readme ([9aca912](https://github.com/thi-ng/umbrella/commit/9aca912))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@5.0.0) (2019-02-15)

#### 🛑 Breaking changes

- remove obsolete fns, update to use [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/main/packages/arrays) ([83cb816](https://github.com/thi-ng/umbrella/commit/83cb816))
- BREAKING CHANGE: migrate various support fns to [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/main/packages/arrays)
  - remove/migrate functions:
    - binarySearch()
    - ensureArray() / ensureIterable()
    - fuzzyMatch()
    - peek()
    - shuffleN()
    - swizzler()
  - add support for IRandom in:
    - randomID()
    - choices()
    - weightedRandom()
    - sample()
  - update deps / readme
- remove obsolete randomID() & weightedRandom() ([4b0eec6](https://github.com/thi-ng/umbrella/commit/4b0eec6))
- BREAKING CHANGE: migrate randomID() & weightedRandom() to [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/main/packages/random)
  - update choices() iterator
- restructure, migrate / remove various functions ([05bf213](https://github.com/thi-ng/umbrella/commit/05bf213))
- BREAKING CHANGE: migrate / remove various functions to other packages
  - constantly(), delay(), identity() => [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/main/packages/compose)
  - randomID(), weightedRandom() => [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/main/packages/random)
  - remove re-exports:
    - even(), odd() (from [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/main/packages/checks))
    - juxt() (from [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/main/packages/compose))
  - remove obsolete hex() fn (use [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/main/packages/strings) fns instead)

#### ♻️ Refactoring

- update [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/main/packages/arrays) call sites ([f95ab38](https://github.com/thi-ng/umbrella/commit/f95ab38))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@4.0.0) (2019-02-05)

#### 🛑 Breaking changes

- migrate binary related ops to new package ([a7c1ef7](https://github.com/thi-ng/umbrella/commit/a7c1ef7))
  - update readme
- BREAKING CHANGE: migrate all binary data related ops to new package [@thi.ng/transducers-binary](https://github.com/thi-ng/umbrella/tree/main/packages/transducers-binary)
  Removed:
  - bits
  - base64Encode/Decode
  - hexDump
  - partitionBits
  - utf8Encode/Decode

#### 🩹 Bug fixes

- ensure all vals in hexDump iterator version ([ae83bb2](https://github.com/thi-ng/umbrella/commit/ae83bb2))

#### ♻️ Refactoring

- deprecate & rename tuples() => zip() ([d1151ce](https://github.com/thi-ng/umbrella/commit/d1151ce))
  - update refs / re-exports

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@3.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### 🩹 Bug fixes

- update juxt re-export ([a894a24](https://github.com/thi-ng/umbrella/commit/a894a24))

#### ♻️ Refactoring

- use arrow fns ([e9f0542](https://github.com/thi-ng/umbrella/commit/e9f0542))

### [2.3.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.3.2) (2019-01-02)

#### 🩹 Bug fixes

- add reduced() handling for cat() ([cd17586](https://github.com/thi-ng/umbrella/commit/cd17586))

### [2.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.3.1) (2018-12-29)

#### 🩹 Bug fixes

- interpolate() interval selection, add minPos/maxPos ([a90a712](https://github.com/thi-ng/umbrella/commit/a90a712))

## [2.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.3.0) (2018-12-28)

#### 🚀 Features

- add interpolate() iterator, update readme ([846ab5c](https://github.com/thi-ng/umbrella/commit/846ab5c))

### [2.2.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.2.7) (2018-12-17)

#### 🩹 Bug fixes

- add return type for range() ([0470505](https://github.com/thi-ng/umbrella/commit/0470505))

### [2.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.2.3) (2018-12-01)

#### ♻️ Refactoring

- implement range() as class w/ IReducible impl ([0e77d2c](https://github.com/thi-ng/umbrella/commit/0e77d2c))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.2.0) (2018-10-17)

#### 🚀 Features

- update wrap*() fns to accept iterables ([515e5ba](https://github.com/thi-ng/umbrella/commit/515e5ba))

#### 🩹 Bug fixes

- minor TS3.1 fixes ([1ef2361](https://github.com/thi-ng/umbrella/commit/1ef2361))

#### ♻️ Refactoring

- update Infinity consts in various packages ([296e1e0](https://github.com/thi-ng/umbrella/commit/296e1e0))
- add ensureArrayLike(), update permutations() ([f257330](https://github.com/thi-ng/umbrella/commit/f257330))

### [2.1.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.1.6) (2018-09-26)

#### 🩹 Bug fixes

- fix matchLast(), fix & update return match*() types ([823d828](https://github.com/thi-ng/umbrella/commit/823d828))
  - use iterator() instead of iterator1() for matchLast()
  - fix return type decls for both matchFirst() / matchLast()
  - update doc strings

### [2.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.1.2) (2018-09-22)

#### 🩹 Bug fixes

- add missing type annotation ([022101f](https://github.com/thi-ng/umbrella/commit/022101f))

### [2.1.2-alpha.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.1.2-alpha.1) (2018-09-17)

#### 🚀 Features

- add randomID() ([b488d2b](https://github.com/thi-ng/umbrella/commit/b488d2b))

#### 🩹 Bug fixes

- update arg types for choices() & weightedRandom() ([eb67426](https://github.com/thi-ng/umbrella/commit/eb67426))
- str() initial result handling ([f001314](https://github.com/thi-ng/umbrella/commit/f001314))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.1.0) (2018-09-08)

#### 🚀 Features

- add window() xform ([2f0f3d4](https://github.com/thi-ng/umbrella/commit/2f0f3d4))
- update partitionSync() xform & PartitionSyncOpts ([d8fdc01](https://github.com/thi-ng/umbrella/commit/d8fdc01))
  - add `mergeOnly` option to allow partially populated result tuples
- rename window() => slidingWindow(), update readme ([1f22867](https://github.com/thi-ng/umbrella/commit/1f22867))

### [2.0.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.0.3) (2018-09-03)

#### ♻️ Refactoring

- update normRange() ([4a16bd5](https://github.com/thi-ng/umbrella/commit/4a16bd5))
  - add opt flag to exclude last value

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@2.0.0) (2018-08-24)

#### 🛑 Breaking changes

- rename inspect() => trace() ([e713704](https://github.com/thi-ng/umbrella/commit/e713704))
- BREAKING CHANGE: rename inspect() => trace()
- update all xforms to also work as iterator ([bae8a1d](https://github.com/thi-ng/umbrella/commit/bae8a1d))
  - if input iterable is provided, return iterator version
  - add opt initial result arg for scan()
  - utf8Decode() w/ input returns string
  - update tests
- BREAKING CHANGE: replace some xform args with options objects, impacted are:
  - convolve2d()
  - filterFuzzy()
  - hexDump()
  - movingMedian()
  - partitionSort()
  - partitionSync()
  - streamSort()
  - wordWrap()
- add GroupByOpts interface, update groupBy* reducers ([2c3a114](https://github.com/thi-ng/umbrella/commit/2c3a114))
  - add support for direct reduction if optional iterable is provided
- BREAKING CHANGE: groupByMap() & groupByObj() args now given as
  options object

#### 🚀 Features

- add fill() & fillN() reducers ([0bd860e](https://github.com/thi-ng/umbrella/commit/0bd860e))
- update all reducers to accept opt iterables ([89b4ad5](https://github.com/thi-ng/umbrella/commit/89b4ad5))
  - add $$reduce helper
  - fix str() to use string concatenation (instead of Array.join())
  - add opt init vals for add() & mul()
  - add sub() & div() reducers
- update base64Encode() to return string if input given ([599f2b6](https://github.com/thi-ng/umbrella/commit/599f2b6))

#### 🩹 Bug fixes

- hex type decl ([723da5b](https://github.com/thi-ng/umbrella/commit/723da5b))
- iterator1() final reduced value handling ([d861bdd](https://github.com/thi-ng/umbrella/commit/d861bdd))
- copy&paste error (push) ([832e57f](https://github.com/thi-ng/umbrella/commit/832e57f))
- arg handling in rename() ([7a5be21](https://github.com/thi-ng/umbrella/commit/7a5be21))

#### ⏱ Performance improvements

- add iterator1(), update various xforms ([ab662d8](https://github.com/thi-ng/umbrella/commit/ab662d8))
  - iterator1() is speed optimized for 0-or-1 result xforms
    w/o completion step
  - update $iter to accept iterator impl
- add IReducible, update reduce() ([9d83255](https://github.com/thi-ng/umbrella/commit/9d83255))
  - add IReducible interface for custom/optimized iteration
    and source value provision for reduce()
  - add array-like check to reduce() and switch to version without
    forcing array iterator (`for..of..`)

#### ♻️ Refactoring

- add ReductionFn type alias, update Reducer ([45e4993](https://github.com/thi-ng/umbrella/commit/45e4993))
- add shared SortOpts, update xforms ([8a111ef](https://github.com/thi-ng/umbrella/commit/8a111ef))
  - replace opts for movingMedian(), partitionSort(), streamSort()
  - move convolution types to src/xform/convole.ts
  - move StructField to src/xform/struct.ts
- replace local types w/ external defs ([3a8bd08](https://github.com/thi-ng/umbrella/commit/3a8bd08))
  - re-use Fn & SEMAPHORE ([@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api))
  - replace comp() and juxt() ([@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/main/packages/compose))

## [1.16.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.16.0) (2018-08-08)

#### 🚀 Features

- add partitionBits() xform & tests ([a5e2c28](https://github.com/thi-ng/umbrella/commit/a5e2c28))

#### ♻️ Refactoring

- deprecate hex(), update hexDump() xform & deps ([b1ea9a5](https://github.com/thi-ng/umbrella/commit/b1ea9a5))

## [1.15.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.15.0) (2018-08-02)

#### 🚀 Features

- add peek() helper fn ([e50fd10](https://github.com/thi-ng/umbrella/commit/e50fd10))

## [1.14.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.14.0) (2018-07-19)

#### 🚀 Features

- add juxtR() for multiplexed reductions from same src ([9b07d12](https://github.com/thi-ng/umbrella/commit/9b07d12))
  - add tests & docs
- allow key arrays for rename(), simplify call sites ([092154c](https://github.com/thi-ng/umbrella/commit/092154c))
  - update multiplexObj() & struct() xforms
- add asIterable() helper ([ccc37c6](https://github.com/thi-ng/umbrella/commit/ccc37c6))

#### ⏱ Performance improvements

- update movingAverage() xform, add docs ([9874ace](https://github.com/thi-ng/umbrella/commit/9874ace))

## [1.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.13.0) (2018-07-13)

#### 🚀 Features

- add wordWrap() xform ([81223dc](https://github.com/thi-ng/umbrella/commit/81223dc))

### [1.12.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.12.2) (2018-07-09)

#### 🩹 Bug fixes

- revert mean() from regression introduced in [095e6ef](https://github.com/thi-ng/umbrella/commit/095e6ef) ([03543ee](https://github.com/thi-ng/umbrella/commit/03543ee))

### [1.12.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.12.1) (2018-07-09)

#### ♻️ Refactoring

- add reducer() helper, update existing reducers ([095e6ef](https://github.com/thi-ng/umbrella/commit/095e6ef))

## [1.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.12.0) (2018-07-03)

#### 🚀 Features

- add ensureArray(), refactor reverse() ([677c7cc](https://github.com/thi-ng/umbrella/commit/677c7cc))

## [1.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.11.0) (2018-06-19)

#### 🚀 Features

- add matchFirst()/matchLast() xforms, update readme ([bc261e5](https://github.com/thi-ng/umbrella/commit/bc261e5))

### [1.10.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.10.1) (2018-05-14)

#### ♻️ Refactoring

- replace wrapBoth/Left/Right w/ wrap() ([e238541](https://github.com/thi-ng/umbrella/commit/e238541))
  - deprecate existing wrap*() iters
  - update docs & readme

## [1.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.10.0) (2018-05-14)

#### 🚀 Features

- add wrap*() iterators ([306625d](https://github.com/thi-ng/umbrella/commit/306625d))
  - add wrapBoth()
  - add wrapLeft()
  - add wrapRight()
- add filterFuzzy() xform ([2bebba2](https://github.com/thi-ng/umbrella/commit/2bebba2))
  - add fuzzyMatch() predicate

## [1.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.9.0) (2018-05-10)

#### 🚀 Features

- add normRange() iterator ([55f29b8](https://github.com/thi-ng/umbrella/commit/55f29b8))

### [1.8.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.8.6) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

### [1.8.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.8.1) (2018-04-18)

#### 🩹 Bug fixes

- add generics for compR(), fix types in mapNth() ([3b7c9d9](https://github.com/thi-ng/umbrella/commit/3b7c9d9))

## [1.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.8.0) (2018-04-11)

#### 🚀 Features

- add run() for executing side effects only, update readme ([52c7508](https://github.com/thi-ng/umbrella/commit/52c7508))

### [1.7.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.7.1) (2018-03-21)

#### ♻️ Refactoring

- update error handling ([ca099e5](https://github.com/thi-ng/umbrella/commit/ca099e5))

## [1.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.7.0) (2018-03-19)

#### 🚀 Features

- add partitionSync() xform ([bebd118](https://github.com/thi-ng/umbrella/commit/bebd118))
- add mapVals() xform ([abc195a](https://github.com/thi-ng/umbrella/commit/abc195a))

#### ♻️ Refactoring

- update labeled(), mapIndexed(), partition() ([3bc8d54](https://github.com/thi-ng/umbrella/commit/3bc8d54))
  - labeled() - add support for label fn instead of just static label
  - mapIndexed() - add optional start index arg
  - partition() - minor update in completing reducer

## [1.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.6.0) (2018-03-03)

#### 🚀 Features

- add permutations()/permutationsN() generators ([91938ed](https://github.com/thi-ng/umbrella/commit/91938ed))

#### ♻️ Refactoring

- update permutations()/permutationsN(), add tests ([488462e](https://github.com/thi-ng/umbrella/commit/488462e))
- update swizzler() arg types ([2f5abce](https://github.com/thi-ng/umbrella/commit/2f5abce))
- extract compR() into its own file, update refs, update readme ([8c180bc](https://github.com/thi-ng/umbrella/commit/8c180bc))

### [1.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.5.1) (2018-03-02)

#### 🩹 Bug fixes

- flattenWith() ([3d8aa32](https://github.com/thi-ng/umbrella/commit/3d8aa32))

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.5.0) (2018-02-26)

#### 🚀 Features

- add keys()/vals() iterators, refactor pairs() ([9824844](https://github.com/thi-ng/umbrella/commit/9824844))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.4.0) (2018-02-23)

#### 🚀 Features

- add deepTransform & mapDeep xform ([f0fdfa1](https://github.com/thi-ng/umbrella/commit/f0fdfa1))

#### ♻️ Refactoring

- add TransformSubSpec, fix test, minor update docs ([2a11ff6](https://github.com/thi-ng/umbrella/commit/2a11ff6))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.3.0) (2018-02-19)

#### 🚀 Features

- add lookup1d/2d/3d helpers, update re-exports ([193058d](https://github.com/thi-ng/umbrella/commit/193058d))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.2.0) (2018-02-18)

#### 🚀 Features

- add range2d / range3d generators ([722042b](https://github.com/thi-ng/umbrella/commit/722042b))
- add movingMedian() xform ([d7b1d0d](https://github.com/thi-ng/umbrella/commit/d7b1d0d))
- add convolve2d xform & types ([ab8a855](https://github.com/thi-ng/umbrella/commit/ab8a855))

#### 🩹 Bug fixes

- update imports `step()` ([48f8bb8](https://github.com/thi-ng/umbrella/commit/48f8bb8))

#### ♻️ Refactoring

- add/update range2d/range3d arity handling ([63a4953](https://github.com/thi-ng/umbrella/commit/63a4953))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.1.0) (2018-02-08)

#### 🚀 Features

- add page() xform, update readme ([855d803](https://github.com/thi-ng/umbrella/commit/855d803))

#### ♻️ Refactoring

- re-use even/odd from [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/main/packages/checks) ([445c857](https://github.com/thi-ng/umbrella/commit/445c857))

### [1.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.0.6) (2018-02-01)

#### 🩹 Bug fixes

- update comp() for typescript 2.7.* ([febe39f](https://github.com/thi-ng/umbrella/commit/febe39f))

### [1.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.0.5) (2018-01-31)

#### ♻️ Refactoring

- use Predicate2 ([4753afb](https://github.com/thi-ng/umbrella/commit/4753afb))

### [1.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.0.2) (2018-01-29)

#### ⏱ Performance improvements

- avoid result object cloning in struct() xform ([d774e32](https://github.com/thi-ng/umbrella/commit/d774e32))
  - disable copying in mapKeys() step

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@1.0.0) (2018-01-28)

#### 🛑 Breaking changes

- update step() to support multiple results ([1f32fc0](https://github.com/thi-ng/umbrella/commit/1f32fc0))
  - respect reduced value termination
  - internal use of push() vs. last() to support multiple results per transduction step
  - add docs
- BREAKING CHANGE:
  now possibly returns array instead of single value if wrapped transducer produced multiple results
- rename join() => str() rfn ([e268e35](https://github.com/thi-ng/umbrella/commit/e268e35))
- BREAKING CHANGE:
  rename join() => str() reduer in prep for actual set join() op
- update throttle(), refactor take/dropNth ([e1a282c](https://github.com/thi-ng/umbrella/commit/e1a282c))
  - throttle() requires stateful predicate now
  - add throttleTime() as replacement for prev throttle() impl
  - refactor takeNth()/dropNth() to use throttle()
- BREAKING CHANGE: throttle() requires stateful predicate now

#### 🚀 Features

- add utf8Encode()/utf8Decode() xforms ([e50fa26](https://github.com/thi-ng/umbrella/commit/e50fa26))
- add multiplex() xform & docs ([beb2cee](https://github.com/thi-ng/umbrella/commit/beb2cee))
- update frequencies() & groupByMap() ([4b8d037](https://github.com/thi-ng/umbrella/commit/4b8d037))
  - add opt key fn for frequencies(), delegate to groupByMap()
  - use identity as default key fn
- update re-exports, minor update reductions() ([e555ff5](https://github.com/thi-ng/umbrella/commit/e555ff5))
- add every(), some() rfns ([63344e4](https://github.com/thi-ng/umbrella/commit/63344e4))
- add multiplexObj() ([931b67f](https://github.com/thi-ng/umbrella/commit/931b67f))
- add labeled() xform ([0b3c786](https://github.com/thi-ng/umbrella/commit/0b3c786))
- update re-exports, extract throttleTime() into own file ([45d6bc6](https://github.com/thi-ng/umbrella/commit/45d6bc6))
- add noop() xform, update readme ([7b21aa6](https://github.com/thi-ng/umbrella/commit/7b21aa6))

#### 🩹 Bug fixes

- add "complete" step handling in scan() ([8e5204d](https://github.com/thi-ng/umbrella/commit/8e5204d))
- scan() complete handling ([44db970](https://github.com/thi-ng/umbrella/commit/44db970))
  - pass final inner result to outer complete only if different

#### ♻️ Refactoring

- udate cat() to accept iterables, not just arrays ([58f1477](https://github.com/thi-ng/umbrella/commit/58f1477))

### [0.11.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@0.11.2) (2018-01-25)

#### 🩹 Bug fixes

- project links in readme files ([e290d75](https://github.com/thi-ng/umbrella/commit/e290d75))
- base64 imports ([75bb161](https://github.com/thi-ng/umbrella/commit/75bb161))
- include 1st val in benchmark() ([b3ce275](https://github.com/thi-ng/umbrella/commit/b3ce275))

#### ♻️ Refactoring

- simplify concat(), add docs ([0c116c1](https://github.com/thi-ng/umbrella/commit/0c116c1))
- update reverse(), add deps ([a2c3bc4](https://github.com/thi-ng/umbrella/commit/a2c3bc4))

### [0.11.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/transducers@0.11.1) (2018-01-24)

#### 🚀 Features

- initial re-import as monorepo, update readme files, cleanup imports ([04ff6e9](https://github.com/thi-ng/umbrella/commit/04ff6e9))
