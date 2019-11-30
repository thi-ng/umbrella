# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.1.6...@thi.ng/dot@1.1.7) (2019-11-30)

**Note:** Version bump only for package @thi.ng/dot





## [1.1.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.1.5...@thi.ng/dot@1.1.6) (2019-11-09)

**Note:** Version bump only for package @thi.ng/dot





## [1.1.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.1.4...@thi.ng/dot@1.1.5) (2019-09-21)

**Note:** Version bump only for package @thi.ng/dot





## [1.1.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.1.3...@thi.ng/dot@1.1.4) (2019-08-21)

**Note:** Version bump only for package @thi.ng/dot





## [1.1.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.1.2...@thi.ng/dot@1.1.3) (2019-08-16)

**Note:** Version bump only for package @thi.ng/dot





## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.1.1...@thi.ng/dot@1.1.2) (2019-07-31)

**Note:** Version bump only for package @thi.ng/dot





## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.1.0...@thi.ng/dot@1.1.1) (2019-07-12)

**Note:** Version bump only for package @thi.ng/dot





# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.0.12...@thi.ng/dot@1.1.0) (2019-07-07)


### Features

* **dot:** enable TS strict compiler flags (refactor) ([29e0cb4](https://github.com/thi-ng/umbrella/commit/29e0cb4))





## [1.0.12](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.0.11...@thi.ng/dot@1.0.12) (2019-05-22)

**Note:** Version bump only for package @thi.ng/dot





## [1.0.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.0.10...@thi.ng/dot@1.0.11) (2019-04-26)

**Note:** Version bump only for package @thi.ng/dot





## [1.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.0.9...@thi.ng/dot@1.0.10) (2019-04-24)

**Note:** Version bump only for package @thi.ng/dot





## [1.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.0.8...@thi.ng/dot@1.0.9) (2019-04-02)

**Note:** Version bump only for package @thi.ng/dot





## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@1.0.7...@thi.ng/dot@1.0.8) (2019-03-28)

**Note:** Version bump only for package @thi.ng/dot







# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dot@0.1.18...@thi.ng/dot@1.0.0) (2019-01-21)


### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))


### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.


<a name="0.1.0"></a>
# 0.1.0 (2018-05-09)


### Features

* **dot:** initial import [@thi](https://github.com/thi).ng/dot ([500dfa3](https://github.com/thi-ng/umbrella/commit/500dfa3))
