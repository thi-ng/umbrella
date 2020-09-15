# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@2.0.14...@thi.ng/binary@2.0.15) (2020-09-13)

**Note:** Version bump only for package @thi.ng/binary





## [2.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@2.0.13...@thi.ng/binary@2.0.14) (2020-08-28)

**Note:** Version bump only for package @thi.ng/binary





## [2.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@2.0.12...@thi.ng/binary@2.0.13) (2020-08-17)

**Note:** Version bump only for package @thi.ng/binary





## [2.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@2.0.11...@thi.ng/binary@2.0.12) (2020-08-16)

**Note:** Version bump only for package @thi.ng/binary





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.3.2...@thi.ng/binary@2.0.0) (2020-03-06)


### Features

* **binary:** make binary logic ops unmasked, rename masked versions ([c07cf04](https://github.com/thi-ng/umbrella/commit/c07cf040f831b7393d889f6e97dbae001769d0c2))


### BREAKING CHANGES

* **binary:** make binary logic ops unmasked, rename masked versions

- existing names used for unmasked versions (returning signed ints)
- masked versions of bitOr/bitAnd/bitXor etc. now suffixed with `M`, e.g. `bitAndM()`





# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.2.1...@thi.ng/binary@1.3.0) (2020-02-25)


### Features

* **binary:** add byte conversions ([564310b](https://github.com/thi-ng/umbrella/commit/564310b45db9f6cfe8788af14e47c7346ef6a576))
* **binary:** add endianess detection, 64bit float/int/uint conv ([856e035](https://github.com/thi-ng/umbrella/commit/856e035d68d727c717ce1cbb021e171fca81e3a8))
* **binary:** add float & 64bit byte conversions ([9882196](https://github.com/thi-ng/umbrella/commit/9882196a887c842efda2c835d3b86f491893c6f9))
* **binary:** add float/int conversions ([2e02d34](https://github.com/thi-ng/umbrella/commit/2e02d345a970eeb783109c6b92b32fda6b322235))
* **binary:** add lane16/setLane16, flip8/16, mux ([1aa0a5e](https://github.com/thi-ng/umbrella/commit/1aa0a5e665ab067840ade8abdab73bfd2d0e9325))





# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.1.1...@thi.ng/binary@1.2.0) (2019-11-30)

### Features

* **binary:** add bitSize() ([f085bfb](https://github.com/thi-ng/umbrella/commit/f085bfbaf1e6cb77c9a8eec8d488d716165b93dc))

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@1.0.8...@thi.ng/binary@1.1.0) (2019-07-31)

### Features

* **binary:** add setLane8/4/2 fns ([7e24f5e](https://github.com/thi-ng/umbrella/commit/7e24f5e))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/binary@0.1.2...@thi.ng/binary@1.0.0) (2019-01-21)

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

* **binary:** add [@thi](https://github.com/thi).ng/binary package ([458d4a0](https://github.com/thi-ng/umbrella/commit/458d4a0))
