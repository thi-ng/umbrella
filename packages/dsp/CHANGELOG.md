# Change Log

- **Last updated**: 2025-10-24T14:08:37Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.7.34](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.7.34) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://github.com/thi-ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))

### [4.7.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.7.30) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([86be0c3](https://github.com/thi-ng/umbrella/commit/86be0c3))

## [4.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.7.0) (2023-12-28)

#### 🚀 Features

- add squareSin() oscillator ([f7f1b1a](https://github.com/thi-ng/umbrella/commit/f7f1b1a))

## [4.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.6.0) (2023-09-28)

#### 🚀 Features

- add IXform impl for AProc2 ([5aa6c9b](https://github.com/thi-ng/umbrella/commit/5aa6c9b))
- add ICopy impls for various IGen's ([7894cd4](https://github.com/thi-ng/umbrella/commit/7894cd4))
- add merge(), mix(), pan() ([314e9b2](https://github.com/thi-ng/umbrella/commit/314e9b2))
- add refG()/refP() wrappers ([99f4535](https://github.com/thi-ng/umbrella/commit/99f4535))

#### 🩹 Bug fixes

- enforce integer delay time ([5c21b00](https://github.com/thi-ng/umbrella/commit/5c21b00))
- return delayed value in Delay.next() ([f2b08db](https://github.com/thi-ng/umbrella/commit/f2b08db))

#### ♻️ Refactoring

- simplify pipe() to reuse serial() ([90910bc](https://github.com/thi-ng/umbrella/commit/90910bc))

## [4.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dsp@4.5.0) (2023-09-15)

#### 🚀 Features

- update saw/squareAdditive() ([d11488c](https://github.com/thi-ng/umbrella/commit/d11488c))
  - add opt arg to disable Gibbs-effect handling

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
