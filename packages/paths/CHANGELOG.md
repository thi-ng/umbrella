# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@3.0.4...@thi.ng/paths@3.0.5) (2020-03-06)

**Note:** Version bump only for package @thi.ng/paths





## [3.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@3.0.3...@thi.ng/paths@3.0.4) (2020-02-26)

**Note:** Version bump only for package @thi.ng/paths





## [3.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@3.0.2...@thi.ng/paths@3.0.3) (2020-02-26)

**Note:** Version bump only for package @thi.ng/paths





## [3.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@3.0.1...@thi.ng/paths@3.0.2) (2020-02-25)

**Note:** Version bump only for package @thi.ng/paths





# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@2.1.6...@thi.ng/paths@3.0.0) (2019-11-30)

### Bug Fixes

* **paths:** update fn signatures (remove obsolete) ([47dd001](https://github.com/thi-ng/umbrella/commit/47dd0016dfbc7a59046c396344c5217b8b7127e2))

### Code Refactoring

* **paths:** use `Path` from [@thi](https://github.com/thi).ng/api, remove local def ([a142655](https://github.com/thi-ng/umbrella/commit/a142655b8a9565f3644d50272f165c1e329c2404))

### Features

* **paths:** [#87](https://github.com/thi-ng/umbrella/issues/87), add typed versions of all fns, split into sep files ([319f4f8](https://github.com/thi-ng/umbrella/commit/319f4f84e5d1a9f09cc0d6af41244d4bdecd53a9))

### BREAKING CHANGES

* **paths:** re-use `Path` from @thi.ng/api, remove local def

# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@2.0.9...@thi.ng/paths@2.1.0) (2019-07-07)

### Features

* **paths:** enable TS strict compiler flags (refactor) ([55e93ee](https://github.com/thi-ng/umbrella/commit/55e93ee))

## [2.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@2.0.6...@thi.ng/paths@2.0.7) (2019-03-28)

### Bug Fixes

* **paths:** fix getIn for empty leaves, add tests ([49952fd](https://github.com/thi-ng/umbrella/commit/49952fd))

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@1.6.6...@thi.ng/paths@2.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

<a name="1.6.0"></a>
# [1.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@1.5.2...@thi.ng/paths@1.6.0) (2018-09-01)

### Features

* **paths:** add exists() path checker & tests ([f018353](https://github.com/thi-ng/umbrella/commit/f018353))

<a name="1.5.0"></a>
# [1.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@1.4.0...@thi.ng/paths@1.5.0) (2018-07-11)

### Features

* **paths:** add updater(), refactor updateIn(), update readme ([ad4caad](https://github.com/thi-ng/umbrella/commit/ad4caad))

<a name="1.4.0"></a>
# [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@1.3.10...@thi.ng/paths@1.4.0) (2018-07-04)

### Features

* **paths:** update setter() to support arrays, optimize (~2.5x faster) ([3d9d620](https://github.com/thi-ng/umbrella/commit/3d9d620))

<a name="1.3.0"></a>
# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@1.2.0...@thi.ng/paths@1.3.0) (2018-04-17)

### Features

* **paths:** add setInMany() and mutInMany(), add [@thi](https://github.com/thi).ng/api dependency ([8f3a3d1](https://github.com/thi-ng/umbrella/commit/8f3a3d1))

<a name="1.2.0"></a>
# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@1.1.6...@thi.ng/paths@1.2.0) (2018-04-16)

### Features

* **paths:** add mutator() & mutIn() ([4c1bd85](https://github.com/thi-ng/umbrella/commit/4c1bd85))

<a name="1.1.1"></a>
## [1.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/paths@1.1.0...@thi.ng/paths@1.1.1) (2018-03-18)

### Bug Fixes

* **paths:** fix setter fast paths ([eaeccf4](https://github.com/thi-ng/umbrella/commit/eaeccf4))

<a name="1.1.0"></a>
# 1.1.0 (2018-03-18)

### Bug Fixes

* **paths:** fix setIn fast paths for path length 3/4 ([92f0e27](https://github.com/thi-ng/umbrella/commit/92f0e27))

### Features

* **paths:** add/extract [@thi](https://github.com/thi).ng/paths from [@thi](https://github.com/thi).ng/atom ([f9f6eb1](https://github.com/thi-ng/umbrella/commit/f9f6eb1))

<a name="1.0.0"></a>
# 1.0.0 (2018-03-17)

### Documentation

* **paths:** add/extract @thi.ng/paths from @thi.ng/atom ([f9f6eb1](https://github.com/thi-ng/umbrella/commit/f9f6eb1))
