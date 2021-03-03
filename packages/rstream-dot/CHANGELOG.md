# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.2.1...@thi.ng/rstream-dot@1.2.2) (2021-03-03)

**Note:** Version bump only for package @thi.ng/rstream-dot





## [1.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.2.0...@thi.ng/rstream-dot@1.2.1) (2021-02-24)

**Note:** Version bump only for package @thi.ng/rstream-dot





# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.59...@thi.ng/rstream-dot@1.2.0) (2021-02-22)


### Features

* **rstream-dot:** update opts, deps & value handling ([be0b146](https://github.com/thi-ng/umbrella/commit/be0b146b2daeeff560f704bc5771ce5390e2ecf3))





## [1.1.59](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-dot@1.1.58...@thi.ng/rstream-dot@1.1.59) (2021-02-20)

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
