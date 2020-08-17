# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.28](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@2.0.27...@thi.ng/dsp@2.0.28) (2020-08-17)

**Note:** Version bump only for package @thi.ng/dsp





## [2.0.27](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@2.0.26...@thi.ng/dsp@2.0.27) (2020-08-16)

**Note:** Version bump only for package @thi.ng/dsp





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.18...@thi.ng/dsp@2.0.0) (2020-01-24)

### Code Refactoring

* **dsp:** remove obsolete classes ([aa24c1e](https://github.com/thi-ng/umbrella/commit/aa24c1e4d9272f6ed468c011c00ab7c1b3e6c4f7))

### Features

* **dsp:** add DelayLine ([bd25cd7](https://github.com/thi-ng/umbrella/commit/bd25cd7482d40ad21b713c6c6f7086458b5adbd0))
* **dsp:** add fft, spectrum and window fns, add tests ([f918af4](https://github.com/thi-ng/umbrella/commit/f918af4e4169f75a0168098083e6b7fab4eba551))
* **dsp:** add filters, refactor, update pkg/docs/readme ([7758609](https://github.com/thi-ng/umbrella/commit/775860996c09ea540d397702040ab4d53a338830))
* **dsp:** add gen/proc composition ops, restructure ([8be2a5f](https://github.com/thi-ng/umbrella/commit/8be2a5f9fee18e2fdf7aefb48455b38511de5569))
* **dsp:** add LFO sin/cos iterator/osc, minor refactor window fns ([dc89204](https://github.com/thi-ng/umbrella/commit/dc892043bb94b759ec04547b9194d8cfdbd9aa2f))
* **dsp:** add missing factory fns, update docstrings ([3ede5af](https://github.com/thi-ng/umbrella/commit/3ede5af1c85564a4aa974f3a77c18a12f3bb6073))
* **dsp:** add new operators ([68a88e4](https://github.com/thi-ng/umbrella/commit/68a88e4774979ef1a81149dd233324cdbc8b3787))
* **dsp:** add sweep(), move curve(), minor refactor ([0b24d80](https://github.com/thi-ng/umbrella/commit/0b24d8035d8da716f14644c76b7768ba75b84189))
* **dsp:** add/rename oscillators ([8a826bf](https://github.com/thi-ng/umbrella/commit/8a826bf0f0ead26e7da52ef79c911290942c80fb))
* **dsp:** add/update FFT fns, test, update docs ([1ac9508](https://github.com/thi-ng/umbrella/commit/1ac95080da1da7d07212dcc65a1d97917c644d7f))
* **dsp:** add/update filters, filter resp, delay ([2854b09](https://github.com/thi-ng/umbrella/commit/2854b096fdbe05f05b542c87a80bf08bb2b14ffe))
* **dsp:** import gen & proc nodes, general pkg restructure ([a85c3cf](https://github.com/thi-ng/umbrella/commit/a85c3cf3c80c3714637fc4f3410742a88356f78f))
* **dsp:** update ADSR, add ADSROpts, auto-release ([16f41ec](https://github.com/thi-ng/umbrella/commit/16f41ec4a60ea80ee9e544641f034491b7814754))
* **dsp:** update all gens/procs, housekeeping, docs ([e483245](https://github.com/thi-ng/umbrella/commit/e483245d48b8ae0c74d93d1f2f2270a2379c642b))
* **dsp:** update DelayLine ctor, freqBin, update pkg ([228a81e](https://github.com/thi-ng/umbrella/commit/228a81e951203e4e215de825d2474ec302290727))
* **dsp:** update gens to support clamping ([fe8f6f3](https://github.com/thi-ng/umbrella/commit/fe8f6f347b9a9a618cfd30b95739f9400cc197d6))

### BREAKING CHANGES

* **dsp:** remove obsolete Oscillator/AMFMOscillator
(superceded by osc()/modOsc())

## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@1.0.9...@thi.ng/dsp@1.0.10) (2019-04-26)

### Bug Fixes

* **dsp:** fix tri() oscillator for negative phases ([c67c733](https://github.com/thi-ng/umbrella/commit/c67c733))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dsp@0.1.3...@thi.ng/dsp@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# 0.1.0 (2018-10-17)

### Features

* **dsp:** add oscillators as [@thi](https://github.com/thi).ng/dsp package (from synstack / VEX) ([889730f](https://github.com/thi-ng/umbrella/commit/889730f))
