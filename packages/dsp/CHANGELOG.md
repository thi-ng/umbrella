# Change Log

- **Last updated**: 2026-04-18T11:32:54Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [4.7.102](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/dsp@4.7.102/packages/dsp) (2026-02-07)

#### ♻️ Refactoring

- replace deprecated `unsupported()` call sites in all pkgs ([3abbddf](https://codeberg.org/thi.ng/umbrella/commit/3abbddf))

### [4.7.34](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/dsp@4.7.34/packages/dsp) (2024-06-21)

#### ♻️ Refactoring

- rename various rest args to be more semantically meaningful ([8088a56](https://codeberg.org/thi.ng/umbrella/commit/8088a56))
- enforce uniform naming convention of internal functions ([56992b2](https://codeberg.org/thi.ng/umbrella/commit/56992b2))

### [4.7.30](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/dsp@4.7.30/packages/dsp) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([86be0c3](https://codeberg.org/thi.ng/umbrella/commit/86be0c3))

## [4.7.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/dsp@4.7.0/packages/dsp) (2023-12-28)

#### 🚀 Features

- add squareSin() oscillator ([f7f1b1a](https://codeberg.org/thi.ng/umbrella/commit/f7f1b1a))

### [4.6.11](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/dsp@4.6.11/packages/dsp) (2023-11-09)

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [4.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/dsp@4.6.0/packages/dsp) (2023-09-28)

#### 🚀 Features

- add IXform impl for AProc2 ([5aa6c9b](https://codeberg.org/thi.ng/umbrella/commit/5aa6c9b))
- add ICopy impls for various IGen's ([7894cd4](https://codeberg.org/thi.ng/umbrella/commit/7894cd4))
- add merge(), mix(), pan() ([314e9b2](https://codeberg.org/thi.ng/umbrella/commit/314e9b2))
- add refG()/refP() wrappers ([99f4535](https://codeberg.org/thi.ng/umbrella/commit/99f4535))

#### 🩹 Bug fixes

- enforce integer delay time ([5c21b00](https://codeberg.org/thi.ng/umbrella/commit/5c21b00))
- return delayed value in Delay.next() ([f2b08db](https://codeberg.org/thi.ng/umbrella/commit/f2b08db))

#### ♻️ Refactoring

- simplify pipe() to reuse serial() ([90910bc](https://codeberg.org/thi.ng/umbrella/commit/90910bc))

#### 🧪 Tests

- add delay tests ([2db3d2d](https://codeberg.org/thi.ng/umbrella/commit/2db3d2d))

## [4.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/dsp@4.5.0/packages/dsp) (2023-09-15)

#### 🚀 Features

- update saw/squareAdditive() ([d11488c](https://codeberg.org/thi.ng/umbrella/commit/d11488c))
  - add opt arg to disable Gibbs-effect handling

## [4.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/dsp@4.4.0/packages/dsp) (2023-08-24)

#### 🚀 Features

- update modOsc() fmod arg type ([06b0e38](https://codeberg.org/thi.ng/umbrella/commit/06b0e38))
  - allow numbers as constant freq offset

### [4.3.17](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/dsp@4.3.17/packages/dsp) (2023-08-04)

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://codeberg.org/thi.ng/umbrella/commit/b6db053))

## [4.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/dsp@4.3.0/packages/dsp) (2023-01-10)

#### 🚀 Features

- add FilterFeedbackDelay ([d69b3bc](https://codeberg.org/thi.ng/umbrella/commit/d69b3bc))
