# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.3.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@2.3.4...@thi.ng/random@2.3.5) (2021-03-03)

**Note:** Version bump only for package @thi.ng/random





## [2.3.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@2.3.3...@thi.ng/random@2.3.4) (2021-03-03)

**Note:** Version bump only for package @thi.ng/random





## [2.3.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@2.3.2...@thi.ng/random@2.3.3) (2021-03-03)

**Note:** Version bump only for package @thi.ng/random





## [2.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@2.3.1...@thi.ng/random@2.3.2) (2021-03-03)

**Note:** Version bump only for package @thi.ng/random





## [2.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@2.3.0...@thi.ng/random@2.3.1) (2021-02-24)


### Bug Fixes

* **random:** update weightedRandom() ([b1cf4d8](https://github.com/thi-ng/umbrella/commit/b1cf4d8feccac4b3468a2fb0fdee268306406d78))





# [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@2.2.0...@thi.ng/random@2.3.0) (2021-02-20)


### Features

* **random:** add coin()/fairCoin() ([ed66a64](https://github.com/thi-ng/umbrella/commit/ed66a64a7e5efb63b4bbab89bba5100d1aa7ec49))





# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@2.1.5...@thi.ng/random@2.2.0) (2021-01-13)


### Bug Fixes

* **random:** add opt start index arg for uuid() ([268ec3f](https://github.com/thi-ng/umbrella/commit/268ec3f47470184068fd66b5cc147d8c2e0e0ccb))


### Features

* **random:** add CRYPTO IRandom impl ([94e69c1](https://github.com/thi-ng/umbrella/commit/94e69c1021ec67c63be78e0467bfc82be6cabc00))
* **random:** add opt start/end for randomBytes() ([4d095da](https://github.com/thi-ng/umbrella/commit/4d095da557b1f3ee9ce46778aeba25f0c6aa94f9))


### Performance Improvements

* **random:** minor update weightedRandom() ([258fd7b](https://github.com/thi-ng/umbrella/commit/258fd7b25930c41025b7337b44c36e1f00924b47))





## [2.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@2.1.0...@thi.ng/random@2.1.1) (2020-11-26)


### Bug Fixes

* **random:** add missing subdir to pkg "files" ([916dbe7](https://github.com/thi-ng/umbrella/commit/916dbe7eb12815215b3905ea6ad924b7d397264c))





# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@2.0.2...@thi.ng/random@2.1.0) (2020-11-24)


### Features

* **random:** add distribution HOFs, move gaussian() ([9328821](https://github.com/thi-ng/umbrella/commit/9328821b20e9534c4c66c353d36dfd7dbb5edda6))
* **random:** add randomBytesFrom(), update UUID fns ([b31c872](https://github.com/thi-ng/umbrella/commit/b31c872cb67708510d68d6b2e2260cba843ee86d))





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/random@1.4.17...@thi.ng/random@2.0.0) (2020-08-28)


### Bug Fixes

* **random:** off-by-one error in SYSTEM.int() ([ca0492d](https://github.com/thi-ng/umbrella/commit/ca0492d2f5f867c8945c279f60cf908037df1385))


### Features

* **random:** add INorm, extract gaussianCLT() ([c687598](https://github.com/thi-ng/umbrella/commit/c687598f87283a77c109d6b378b1907349eab760))


### BREAKING CHANGES

* **random:** remove gaussian() from IRandom,
extract as standalone gaussianCLT()

- update gaussianCLT() default args to be more meaningful





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
