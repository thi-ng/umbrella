# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.3.2...@thi.ng/random@1.4.0) (2020-03-01)


### Bug Fixes

* **random:** use correct 160bit default seed for XorWow ([38d511b](https://github.com/thi-ng/umbrella/commit/38d511bc2e2c0bf00101e0b9db50cdb371445425))


### Features

* **random:** add Xoshiro128, refactor default seeds ([b535628](https://github.com/thi-ng/umbrella/commit/b535628c879b133d121307695a2a138dac70f008))





# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.2.0...@thi.ng/random@1.3.0) (2020-02-25)


### Features

* **random:** add uuidv4Bytes() ([e9ea10f](https://github.com/thi-ng/umbrella/commit/e9ea10f5e6b2415863e1a552207758aa3a47c9cf))





# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.15...@thi.ng/random@1.2.0) (2020-01-26)

### Features

* **random:** add randomBytes() wrapper ([c536bcd](https://github.com/thi-ng/umbrella/commit/c536bcd83c766414e349f6b82494ace9888ac2ba))

## [1.1.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.1.14...@thi.ng/random@1.1.15) (2020-01-24)

### Performance Improvements

* **random:** minor update ARandom.norm() ([babbbaa](https://github.com/thi-ng/umbrella/commit/babbbaa12b5be09415f420e7559fa5c8bb76f802))

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.0.2...@thi.ng/random@1.1.0) (2019-02-15)

### Bug Fixes

* **random:** add opt scale arg to IRandom.float() ([5a7e448](https://github.com/thi-ng/umbrella/commit/5a7e448))

### Features

* **random:** add randomID() & weightedRandom() ([f719724](https://github.com/thi-ng/umbrella/commit/f719724))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@0.1.1...@thi.ng/random@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# 0.1.0 (2018-11-24)

### Features

* **random:** re-import, extend & refactor random package (MBP2010) ([4aea85d](https://github.com/thi-ng/umbrella/commit/4aea85d))
