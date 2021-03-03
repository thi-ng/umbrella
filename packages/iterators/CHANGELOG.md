# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.1.54](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@5.1.53...@thi.ng/iterators@5.1.54) (2021-03-03)

**Note:** Version bump only for package @thi.ng/iterators





## [5.1.53](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@5.1.52...@thi.ng/iterators@5.1.53) (2021-03-03)

**Note:** Version bump only for package @thi.ng/iterators





## [5.1.52](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@5.1.51...@thi.ng/iterators@5.1.52) (2021-03-03)

**Note:** Version bump only for package @thi.ng/iterators





## [5.1.51](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@5.1.50...@thi.ng/iterators@5.1.51) (2021-02-24)

**Note:** Version bump only for package @thi.ng/iterators





## [5.1.50](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@5.1.49...@thi.ng/iterators@5.1.50) (2021-02-20)

**Note:** Version bump only for package @thi.ng/iterators





# [5.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@5.0.19...@thi.ng/iterators@5.1.0) (2019-07-07)

### Bug Fixes

* **iterators:** update concat/mapcat, fnil args ([c51ff98](https://github.com/thi-ng/umbrella/commit/c51ff98))

### Features

* **iterators:** enable TS strict compiler flags (refactor) ([24fd9e7](https://github.com/thi-ng/umbrella/commit/24fd9e7))
* **iterators:** TS strictNullChecks ([9f9be1d](https://github.com/thi-ng/umbrella/commit/9f9be1d))

# [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@4.2.4...@thi.ng/iterators@5.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# [4.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@4.1.40...@thi.ng/iterators@4.2.0) (2018-12-20)

### Features

* **iterators:** add `children` arg for walk()/walkIterator() ([61b7b11](https://github.com/thi-ng/umbrella/commit/61b7b11))

<a name="4.1.0"></a>
# [4.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@4.0.7...@thi.ng/iterators@4.1.0) (2018-03-21)

### Features

* **iterators:** update error handling, add [@thi](https://github.com/thi).ng/api dep ([9316a6c](https://github.com/thi-ng/umbrella/commit/9316a6c))

<a name="4.0.0"></a>
# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/iterators@3.2.4...@thi.ng/iterators@4.0.0) (2018-01-29)

### Code Refactoring

* **iterators:** remove default exports ([651d07c](https://github.com/thi-ng/umbrella/commit/651d07c))

### BREAKING CHANGES

* **iterators:** switch back to named function exports for project consistency
and following lead from tslint (https://palantir.github.io/tslint/rules/no-default-export/)

## 3.1.0 (2017-12-12)

- Add `groupBy()`
- Add optional key fn for `frequencies()`
- Update package structure (build commands & target dirs)

## 3.0.1 (2017-07-30)

- Update readme

## 3.0.0 (2017-07-30)

- Package name change `thing-iterators` => `@thi.ng/iterators`
- Add `fork()`
- Breaking change `cached()` API (now same as `fork()`)

## 2.0.0 (2017-07-07)

- All functions are defined as sub-modules and exposed as default exports. This is an additional feature. The full library can still be imported as before.
- Function sub-modules use *Kebab case* whereas function names are in *Camel case*.
