# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.86](https://github.com/thi-ng/umbrella/compare/@thi.ng/cache@1.0.85...@thi.ng/cache@1.0.86) (2021-07-27)

**Note:** Version bump only for package @thi.ng/cache





## [1.0.85](https://github.com/thi-ng/umbrella/compare/@thi.ng/cache@1.0.84...@thi.ng/cache@1.0.85) (2021-07-01)

**Note:** Version bump only for package @thi.ng/cache





## [1.0.84](https://github.com/thi-ng/umbrella/compare/@thi.ng/cache@1.0.83...@thi.ng/cache@1.0.84) (2021-06-08)

**Note:** Version bump only for package @thi.ng/cache





# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/cache@0.2.40...@thi.ng/cache@1.0.0) (2019-01-21)

### Bug Fixes

* **cache:** TLRU: expected behavior on getSet() ([c3762e9](https://github.com/thi-ng/umbrella/commit/c3762e9))

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/cache@0.1.0...@thi.ng/cache@0.2.0) (2018-04-22)

### Bug Fixes

* **cache:** TLRUCache.get(), add tests, update package ([aa78d77](https://github.com/thi-ng/umbrella/commit/aa78d77))

### Features

* **cache:** add TLRUCache.prune(), fix ensureSize() ([9d53ae3](https://github.com/thi-ng/umbrella/commit/9d53ae3))

<a name="0.1.0"></a>
# 0.1.0 (2018-04-22)

### Bug Fixes

* **cache:** don't insert new val if > maxsize ([3947419](https://github.com/thi-ng/umbrella/commit/3947419))
* **cache:** recompute size in LRUCache.delete(), extract removeEntry() ([c4a9c07](https://github.com/thi-ng/umbrella/commit/c4a9c07))

### Features

* **cache:** add MRUCache, update package & readme ([26c4cfd](https://github.com/thi-ng/umbrella/commit/26c4cfd))
* **cache:** add TLRUCache ([574b5d9](https://github.com/thi-ng/umbrella/commit/574b5d9))
* **cache:** initial import [@thi](https://github.com/thi).ng/cache package ([7bbbfa8](https://github.com/thi-ng/umbrella/commit/7bbbfa8))
