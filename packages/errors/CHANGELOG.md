# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.3.1...@thi.ng/errors@1.3.2) (2021-07-01)

**Note:** Version bump only for package @thi.ng/errors





## [1.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.3.0...@thi.ng/errors@1.3.1) (2021-06-08)

**Note:** Version bump only for package @thi.ng/errors





# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.2.32...@thi.ng/errors@1.3.0) (2021-03-17)


### Features

* **errors:** add ensureIndex2(), update outOfBounds() arg type ([ab007d6](https://github.com/thi-ng/umbrella/commit/ab007d6b502c3d1650c7e9cf50da05f0ac042ef3))
* **errors:** add outOfBounds(), ensureIndex() ([fb5ca0a](https://github.com/thi-ng/umbrella/commit/fb5ca0a7f8a4a6648d3c8485a9108e9154ee4400))





# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.1.2...@thi.ng/errors@1.2.0) (2019-08-21)

### Features

* **errors:** add defError(), refactor all existing, update readme ([ded89c2](https://github.com/thi-ng/umbrella/commit/ded89c2))

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.0.6...@thi.ng/errors@1.1.0) (2019-07-07)

### Features

* **errors:** enable TS strict compiler flags (refactor) ([8460aea](https://github.com/thi-ng/umbrella/commit/8460aea))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@0.1.12...@thi.ng/errors@1.0.0) (2019-01-21)

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
# 0.1.0 (2018-05-10)

### Features

* **errors:** add new package [@thi](https://github.com/thi).ng/errors ([1e97856](https://github.com/thi-ng/umbrella/commit/1e97856))
