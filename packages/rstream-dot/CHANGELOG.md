# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.38](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.37...@thi.ng/rstream-dot@1.1.38) (2020-07-17)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.37](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.36...@thi.ng/rstream-dot@1.1.37) (2020-07-08)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.36](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.35...@thi.ng/rstream-dot@1.1.36) (2020-07-08)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.35](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.34...@thi.ng/rstream-dot@1.1.35) (2020-07-04)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.34](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.33...@thi.ng/rstream-dot@1.1.34) (2020-07-02)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.33](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.32...@thi.ng/rstream-dot@1.1.33) (2020-06-20)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.32](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.31...@thi.ng/rstream-dot@1.1.32) (2020-06-14)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.31](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.30...@thi.ng/rstream-dot@1.1.31) (2020-06-01)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.30](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.29...@thi.ng/rstream-dot@1.1.30) (2020-06-01)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.29](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.28...@thi.ng/rstream-dot@1.1.29) (2020-05-29)

**Note:** Version bump only for package @thi.ng/rstream-dot





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.26...@thi.ng/rstream-dot@1.1.0) (2019-07-07)

### Features

* **rstream-dot:** enable TS strict compiler flags (refactor) ([acfe75e](https://github.com/thi-ng/umbrella/commit/acfe75e))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@0.2.64...@thi.ng/rstream-dot@1.0.0) (2019-01-21)

### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))

### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@0.1.2...@thi.ng/rstream-dot@0.2.0) (2018-04-26)

### Features

* **rstream-dot:** add option to include stream values in diag ([d057d95](https://github.com/thi-ng/umbrella/commit/d057d95))

<a name="0.1.0"></a>
# 0.1.0 (2018-04-24)

### Features

* **rstream-dot:** add xform edge labels, extract types to api.ts ([7ffaa61](https://github.com/thi-ng/umbrella/commit/7ffaa61))
* **rstream-dot:** initial import [@thi](https://github.com/thi).ng/rstream-dot package ([e72478a](https://github.com/thi-ng/umbrella/commit/e72478a))
* **rstream-dot:** support multiple roots in walk() ([704025a](https://github.com/thi-ng/umbrella/commit/704025a))
