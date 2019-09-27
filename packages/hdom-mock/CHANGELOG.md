# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.5...@thi.ng/hdom-mock@1.1.6) (2019-09-23)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.4...@thi.ng/hdom-mock@1.1.5) (2019-09-21)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.3...@thi.ng/hdom-mock@1.1.4) (2019-08-21)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.2...@thi.ng/hdom-mock@1.1.3) (2019-08-16)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.1...@thi.ng/hdom-mock@1.1.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.1.0...@thi.ng/hdom-mock@1.1.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/hdom-mock





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.16...@thi.ng/hdom-mock@1.1.0) (2019-07-07)


### Features

* **hdom-mock:** enable TS strict compiler flags (refactor) ([787e2d4](https://github.com/thi-ng/umbrella/commit/787e2d4))





## [1.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.15...@thi.ng/hdom-mock@1.0.16) (2019-05-22)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.14...@thi.ng/hdom-mock@1.0.15) (2019-04-26)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.13...@thi.ng/hdom-mock@1.0.14) (2019-04-24)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.0.13](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.12...@thi.ng/hdom-mock@1.0.13) (2019-04-17)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.11...@thi.ng/hdom-mock@1.0.12) (2019-04-11)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.10...@thi.ng/hdom-mock@1.0.11) (2019-04-05)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.9...@thi.ng/hdom-mock@1.0.10) (2019-04-02)

**Note:** Version bump only for package @thi.ng/hdom-mock





## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@1.0.8...@thi.ng/hdom-mock@1.0.9) (2019-03-28)

**Note:** Version bump only for package @thi.ng/hdom-mock







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/hdom-mock@0.1.5...@thi.ng/hdom-mock@1.0.0) (2019-01-21)


### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))


### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols


# 0.1.0 (2018-12-13)


### Features

* **hdom-mock:** add hdom-mock package and implementation, add initial tests ([5609d24](https://github.com/thi-ng/umbrella/commit/5609d24))
