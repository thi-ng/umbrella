# Change Log

- **Last updated**: 2023-09-06T13:36:28Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [4.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.4.0) (2023-08-24)

#### 🚀 Features

- update modOsc() fmod arg type ([06b0e38](https://github.com/thi-ng/umbrella/commit/06b0e38))
  - allow numbers as constant freq offset

### [4.3.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.3.17) (2023-08-04)

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://github.com/thi-ng/umbrella/commit/b6db053))

## [4.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.3.0) (2023-01-10)

#### 🚀 Features

- add FilterFeedbackDelay ([d69b3bc](https://github.com/thi-ng/umbrella/commit/d69b3bc))

### [4.2.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.2.17) (2022-10-17)

#### 🩹 Bug fixes

- add missing opt args for modOsc() ([e67c110](https://github.com/thi-ng/umbrella/commit/e67c110))

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.2.0) (2022-04-07)

#### 🚀 Features

- add opt Osc() ctor phase arg, fix [#340](https://github.com/thi-ng/umbrella/issues/340) ([f798c9d](https://github.com/thi-ng/umbrella/commit/f798c9d))
  - update osc() factory fn
  - update Osc.setFreq() signatures
  - add tests
  - add/update docs

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.1.0) (2021-11-17)

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

### [4.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [4.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.0.0) (2021-10-12)

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
- restructure/flatten /src folder, add ops ([c001e6f](https://github.com/thi-ng/umbrella/commit/c001e6f))
- BREAKING CHANGE: restructure pkg, add/rename ops
  - dissolve all subfolders
  - add bounce()
  - rename `compP()` => `serial()`
  - add docs

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([02f1cf7](https://github.com/thi-ng/umbrella/commit/02f1cf7))
- update imports (transducers) ([6e7bf71](https://github.com/thi-ng/umbrella/commit/6e7bf71))
- dedupe IGen.take() impls ([55ba0f9](https://github.com/thi-ng/umbrella/commit/55ba0f9))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@3.0.0) (2020-12-22)

#### 🛑 Breaking changes

- add/update various FFT & spectrum fns (fix [#258](https://github.com/thi-ng/umbrella/issues/258)) ([e351acb](https://github.com/thi-ng/umbrella/commit/e351acb))
- BREAKING CHANGE: new args for normalizeFFT(),denormalizeFFT(), spectrumPow()
  - add support for windowing adjustments in above functions
  - add thresholdFFT()
  - add copyComplex()
  - update various real/complex checks using isComplex()
  - update docs, add references
- fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enums w/ type aliases ([b9cfacb](https://github.com/thi-ng/umbrella/commit/b9cfacb))
- BREAKING CHANGE: replace filter type enums w/ type aliases
  - FilterType
  - BiquadType
  - SVFType
  - OnepoleType

#### 🚀 Features

- add power & integral fns ([88edaac](https://github.com/thi-ng/umbrella/commit/88edaac))
  - add power functions:
    - powerSumSquared()
    - powerMeanSquared()
    - powerTimeIntegral()
  - add integralF/T()
  - add isComplex() check
- add cos() stateless oscillator ([276c6b7](https://github.com/thi-ng/umbrella/commit/276c6b7))
- add applyWindow(), windowBartlett() ([d51a17c](https://github.com/thi-ng/umbrella/commit/d51a17c))
- add/update power & integral fns ([f455fad](https://github.com/thi-ng/umbrella/commit/f455fad))
- add windowWelch(), add docs ([84cd476](https://github.com/thi-ng/umbrella/commit/84cd476))

#### ♻️ Refactoring

- update spectrumPow() arg order ([be1b615](https://github.com/thi-ng/umbrella/commit/be1b615))
  - swap `window` & `n` args, since `window` more likely to be provided

### [2.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@2.1.5) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports in remaining pkgs ([b22aa30](https://github.com/thi-ng/umbrella/commit/b22aa30))

### [2.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@2.1.1) (2020-09-13)

#### ♻️ Refactoring

- update deps, imports, use new Fn types ([683b4e9](https://github.com/thi-ng/umbrella/commit/683b4e9))
- update imports ([28bfb3c](https://github.com/thi-ng/umbrella/commit/28bfb3c))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@2.1.0) (2020-08-28)

#### 🚀 Features

- add iterable() wrapper ([94fb8ed](https://github.com/thi-ng/umbrella/commit/94fb8ed))

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@2.0.8) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([8350c0e](https://github.com/thi-ng/umbrella/commit/8350c0e))

### [2.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@2.0.2) (2020-02-25)

#### ♻️ Refactoring

- update imports, internal restruct ([7872146](https://github.com/thi-ng/umbrella/commit/7872146))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@2.0.0) (2020-01-24)

#### 🛑 Breaking changes

- remove obsolete classes ([aa24c1e](https://github.com/thi-ng/umbrella/commit/aa24c1e))
- BREAKING CHANGE: remove obsolete Oscillator/AMFMOscillator
  (superceded by osc()/modOsc())

#### 🚀 Features

- add fft, spectrum and window fns, add tests ([f918af4](https://github.com/thi-ng/umbrella/commit/f918af4))
- add/update FFT fns, test, update docs ([1ac9508](https://github.com/thi-ng/umbrella/commit/1ac9508))
- add LFO sin/cos iterator/osc, minor refactor window fns ([dc89204](https://github.com/thi-ng/umbrella/commit/dc89204))
- add DelayLine ([bd25cd7](https://github.com/thi-ng/umbrella/commit/bd25cd7))
- update DelayLine ctor, freqBin, update pkg ([228a81e](https://github.com/thi-ng/umbrella/commit/228a81e))
- import gen & proc nodes, general pkg restructure ([a85c3cf](https://github.com/thi-ng/umbrella/commit/a85c3cf))
- add filters, refactor, update pkg/docs/readme ([7758609](https://github.com/thi-ng/umbrella/commit/7758609))
  - add AllPass1/2 filters
  - add abstract ATwoPole class
  - fix OnePole HPF impl
  - update protected field names
- add/update filters, filter resp, delay ([2854b09](https://github.com/thi-ng/umbrella/commit/2854b09))
  - add/optimize Biquad & SVF impls
  - add DCBlocker
  - add FeedbackDelay
  - add filter response types & utils
  - add/rename conversion fns
- add new operators ([68a88e4](https://github.com/thi-ng/umbrella/commit/68a88e4))
  Generators:
    - ADSR
    - SinCos (replaces old lfo())
    - PinkNoise
    - WhiteNoise
  Processors:
    - Foldback
    - Mix
    - WaveShaper
  Oscillators:
    - Discrete Summation (DSF, stateless)
- update all gens/procs, housekeeping, docs ([e483245](https://github.com/thi-ng/umbrella/commit/e483245))
  - add param accessors for all ops
  - add IReset & impls for most gens/procs
  - add Delay.multiTap()
  - replace exp() w/ curve(), add curvature ctrl
  - remove lfo(), wrapAround, ATwoPole/AllPass2
- add/rename oscillators ([8a826bf](https://github.com/thi-ng/umbrella/commit/8a826bf))
  - add HOF versions for:
    - dsfHOF
    - mixOscHOF
    - rectHOF
  - rename comb => parabolic
- add missing factory fns, update docstrings ([3ede5af](https://github.com/thi-ng/umbrella/commit/3ede5af))
- add gen/proc composition ops, restructure ([8be2a5f](https://github.com/thi-ng/umbrella/commit/8be2a5f))
  - move all composition ops to own subdir
  - add `compP`, `multiplex`, `pipe` IProc composition
  - add `IXform` impl for `AProc` to allow for direct use as transducer
  - add/update `IReset` impls (re-use type from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api))
- add sweep(), move curve(), minor refactor ([0b24d80](https://github.com/thi-ng/umbrella/commit/0b24d80))
- update gens to support clamping ([fe8f6f3](https://github.com/thi-ng/umbrella/commit/fe8f6f3))
  - add opt clamping for add, mul, madd
  - update curve, line and sweep
- update ADSR, add ADSROpts, auto-release ([16f41ec](https://github.com/thi-ng/umbrella/commit/16f41ec))

#### ♻️ Refactoring

- various minor additions, updates, renames, docs ([e5e1a22](https://github.com/thi-ng/umbrella/commit/e5e1a22))
- update/rename DelayLine => Delay ([ec0e521](https://github.com/thi-ng/umbrella/commit/ec0e521))
  - update Delay to impl `IProc` interface
  - add `IClear` impls for all current IProc impls
- rename compG => mapG ([95244dd](https://github.com/thi-ng/umbrella/commit/95244dd))
- restructure oscillators, fft, window, update gen-diagrams ([9efd69f](https://github.com/thi-ng/umbrella/commit/9efd69f))

### [1.0.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@1.0.10) (2019-04-26)

#### 🩹 Bug fixes

- fix tri() oscillator for negative phases ([c67c733](https://github.com/thi-ng/umbrella/commit/c67c733))

### [1.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@1.0.4) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@0.1.0) (2018-10-17)

#### 🚀 Features

- add oscillators as [@thi.ng/dsp](https://github.com/thi-ng/umbrella/tree/main/packages/dsp) package (from synstack / VEX) ([889730f](https://github.com/thi-ng/umbrella/commit/889730f))
