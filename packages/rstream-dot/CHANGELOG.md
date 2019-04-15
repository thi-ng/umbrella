# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.23](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.22...@thi.ng/rstream-dot@1.0.23) (2019-04-15)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.0.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.21...@thi.ng/rstream-dot@1.0.22) (2019-04-11)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.0.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.20...@thi.ng/rstream-dot@1.0.21) (2019-04-11)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.0.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.19...@thi.ng/rstream-dot@1.0.20) (2019-04-09)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.0.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.18...@thi.ng/rstream-dot@1.0.19) (2019-04-06)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.17...@thi.ng/rstream-dot@1.0.18) (2019-04-03)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.16...@thi.ng/rstream-dot@1.0.17) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.15...@thi.ng/rstream-dot@1.0.16) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.14...@thi.ng/rstream-dot@1.0.15) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.0.13...@thi.ng/rstream-dot@1.0.14) (2019-03-28)

**Note:** Version bump only for package @thi.ng/rstream-dot







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
