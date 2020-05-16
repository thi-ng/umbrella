# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.27](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.26...@thi.ng/rstream-dot@1.1.27) (2020-05-16)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.26](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.25...@thi.ng/rstream-dot@1.1.26) (2020-05-16)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.25](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.24...@thi.ng/rstream-dot@1.1.25) (2020-05-15)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.24](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.23...@thi.ng/rstream-dot@1.1.24) (2020-05-14)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.23](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.22...@thi.ng/rstream-dot@1.1.23) (2020-05-03)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.21...@thi.ng/rstream-dot@1.1.22) (2020-04-28)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.20...@thi.ng/rstream-dot@1.1.21) (2020-04-27)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.19...@thi.ng/rstream-dot@1.1.20) (2020-04-20)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.18...@thi.ng/rstream-dot@1.1.19) (2020-04-11)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.17...@thi.ng/rstream-dot@1.1.18) (2020-04-06)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.16...@thi.ng/rstream-dot@1.1.17) (2020-04-05)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.15...@thi.ng/rstream-dot@1.1.16) (2020-04-01)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.1.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.14...@thi.ng/rstream-dot@1.1.15) (2020-03-28)

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
