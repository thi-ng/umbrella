# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.7.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.7.7...@thi.ng/checks@2.7.8) (2020-09-13)

**Note:** Version bump only for package @thi.ng/checks





## [2.7.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.7.6...@thi.ng/checks@2.7.7) (2020-08-28)

**Note:** Version bump only for package @thi.ng/checks





## [2.7.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.7.5...@thi.ng/checks@2.7.6) (2020-08-17)

**Note:** Version bump only for package @thi.ng/checks





## [2.7.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.7.4...@thi.ng/checks@2.7.5) (2020-08-16)

**Note:** Version bump only for package @thi.ng/checks





## [2.7.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.7.2...@thi.ng/checks@2.7.3) (2020-07-02)


### Bug Fixes

* **checks:** update isPlainObject() type assertion ([e5ceb7d](https://github.com/thi-ng/umbrella/commit/e5ceb7d3e1ef5be7a4e83319ab1c36bbc3e1b1a8))





# [2.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.6.5...@thi.ng/checks@2.7.0) (2020-05-14)


### Features

* **checks:** add isAsyncIterable() ([59ac3a9](https://github.com/thi-ng/umbrella/commit/59ac3a9ea2588bf8afc0a8e9bfed72ffb875c47d))





# [2.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.5.4...@thi.ng/checks@2.6.0) (2020-03-28)


### Bug Fixes

* **checks:** typo ([4e4a6e1](https://github.com/thi-ng/umbrella/commit/4e4a6e1062075705d96883f860f23b545fd9ebdf))


### Features

* **checks:** add better type assertion for isTypedArray() ([548ba52](https://github.com/thi-ng/umbrella/commit/548ba5205033bcc4a917fa56ede65ba3df4b3eef))
* **checks:** add new string validators ([9d9e8a8](https://github.com/thi-ng/umbrella/commit/9d9e8a8bcb73efb728faf4a216a9dfcac31a0639))





# [2.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.4.2...@thi.ng/checks@2.5.0) (2020-01-24)

### Features

* **checks:** add hasBigInt() ([aa4faed](https://github.com/thi-ng/umbrella/commit/aa4faed08362caa591f64d1ffce75e8d9e213dd9))

# [2.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.3.0...@thi.ng/checks@2.4.0) (2019-09-21)

### Features

* **checks:** add generics to existsAndNotNull() ([bced8b9](https://github.com/thi-ng/umbrella/commit/bced8b9))

# [2.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.2.2...@thi.ng/checks@2.3.0) (2019-08-16)

### Bug Fixes

* **checks:** better hex string, export, isNil doc ([19b1981](https://github.com/thi-ng/umbrella/commit/19b1981))
* **checks:** fix vscode autoimport ([8ac6408](https://github.com/thi-ng/umbrella/commit/8ac6408))
* **checks:** test, better naming ([90dce20](https://github.com/thi-ng/umbrella/commit/90dce20))

### Features

* **checks:** isNil and isHexColorString ([ebaa15e](https://github.com/thi-ng/umbrella/commit/ebaa15e))

# [2.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.1.6...@thi.ng/checks@2.2.0) (2019-07-07)

### Bug Fixes

* **checks:** isMobile for Chrome iOS ([8216d48](https://github.com/thi-ng/umbrella/commit/8216d48))

### Features

* **checks:** enable TS strict compiler flags (refactor) ([90515e7](https://github.com/thi-ng/umbrella/commit/90515e7))

## [2.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.1.1...@thi.ng/checks@2.1.2) (2019-03-12)

### Bug Fixes

* **checks:** fix [#77](https://github.com/thi-ng/umbrella/issues/77), update & minor optimization isPlainObject() ([47ac88a](https://github.com/thi-ng/umbrella/commit/47ac88a))

# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@2.0.2...@thi.ng/checks@2.1.0) (2019-02-10)

### Features

* **checks:** add isPrimitive() ([190701e](https://github.com/thi-ng/umbrella/commit/190701e))

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@1.5.14...@thi.ng/checks@2.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

<a name="1.5.4"></a>
## [1.5.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@1.5.3...@thi.ng/checks@1.5.4) (2018-06-18)

### Bug Fixes

* **checks:** isOdd() for negative values ([3589e15](https://github.com/thi-ng/umbrella/commit/3589e15))

<a name="1.5.1"></a>
## [1.5.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@1.5.0...@thi.ng/checks@1.5.1) (2018-04-29)

### Bug Fixes

* **checks:** exclude functions in isArrayLike() ([ac60404](https://github.com/thi-ng/umbrella/commit/ac60404))
* **checks:** return type isMap() ([76920f7](https://github.com/thi-ng/umbrella/commit/76920f7))

<a name="1.5.0"></a>
# [1.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@1.4.0...@thi.ng/checks@1.5.0) (2018-04-26)

### Features

* **checks:** add date, map, nan, set checks ([a865f62](https://github.com/thi-ng/umbrella/commit/a865f62))

<a name="1.4.0"></a>
# [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@1.3.2...@thi.ng/checks@1.4.0) (2018-04-08)

### Features

* **checks:** add hasPerformance() check (performance.now) ([40d706b](https://github.com/thi-ng/umbrella/commit/40d706b))

<a name="1.3.2"></a>
## [1.3.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@1.3.1...@thi.ng/checks@1.3.2) (2018-04-04)

### Bug Fixes

* **checks:** add prototype check for isPlainObject(), add tests ([bffc443](https://github.com/thi-ng/umbrella/commit/bffc443))

<a name="1.3.0"></a>
# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@1.2.1...@thi.ng/checks@1.3.0) (2018-03-08)

### Features

* **checks:** add isPromise() & isPromiseLike() ([9900e99](https://github.com/thi-ng/umbrella/commit/9900e99))

<a name="1.2.0"></a>
# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/checks@1.1.6...@thi.ng/checks@1.2.0) (2018-02-08)

### Features

* **checks:** add new predicates, refactor existing ([68f8fc2](https://github.com/thi-ng/umbrella/commit/68f8fc2))
