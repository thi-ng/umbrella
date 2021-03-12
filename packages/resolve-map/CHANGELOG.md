# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.2.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@4.2.17...@thi.ng/resolve-map@4.2.18) (2021-03-12)

**Note:** Version bump only for package @thi.ng/resolve-map





# [4.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@4.1.31...@thi.ng/resolve-map@4.2.0) (2020-07-18)


### Features

* **resolve-map:** add support for custom lookup prefix ([bf89503](https://github.com/thi-ng/umbrella/commit/bf89503424887018d120d3960d9d86a992c31c91))





## [4.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@4.1.1...@thi.ng/resolve-map@4.1.2) (2019-07-08)

### Bug Fixes

* **resolve-map:** fix [#97](https://github.com/thi-ng/umbrella/issues/97), update to consider trailing comma & whitespace ([de9532b](https://github.com/thi-ng/umbrella/commit/de9532b))

## [4.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@4.1.0...@thi.ng/resolve-map@4.1.1) (2019-07-08)

### Bug Fixes

* **resolve-map:** fix [#97](https://github.com/thi-ng/umbrella/issues/97), update fn arg destructuring ([e68dc19](https://github.com/thi-ng/umbrella/commit/e68dc19))

# [4.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@4.0.12...@thi.ng/resolve-map@4.1.0) (2019-07-07)

### Features

* **resolve-map:** enable TS strict compiler flags (refactor) ([7e7ff2a](https://github.com/thi-ng/umbrella/commit/7e7ff2a))

# [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@3.0.16...@thi.ng/resolve-map@4.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

<a name="3.0.10"></a>
## [3.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@3.0.9...@thi.ng/resolve-map@3.0.10) (2018-09-01)

### Bug Fixes

* **resolve-map:** deep resolve of yet unknown path values ([a710453](https://github.com/thi-ng/umbrella/commit/a710453))

<a name="3.0.5"></a>
## [3.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@3.0.4...@thi.ng/resolve-map@3.0.5) (2018-07-15)

### Bug Fixes

* **resolve-map:** add support for alt ES6 destructure form `{a: b}` ([2482945](https://github.com/thi-ng/umbrella/commit/2482945))

<a name="3.0.0"></a>
# [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@2.0.6...@thi.ng/resolve-map@3.0.0) (2018-06-07)

### Features

* **resolve-map:** add cycle detection, fix edge cases ([e61c3b5](https://github.com/thi-ng/umbrella/commit/e61c3b5))
* **resolve-map:** add ES6 destructuring shorthands for function vals ([57f1ed5](https://github.com/thi-ng/umbrella/commit/57f1ed5))

### BREAKING CHANGES

* **resolve-map:** `resolveMap()` renamed to `resolve()`, update docs

<a name="2.0.6"></a>
## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@2.0.5...@thi.ng/resolve-map@2.0.6) (2018-06-06)

### Bug Fixes

* **resolve-map:** add private _resolveDeep ([558f4f8](https://github.com/thi-ng/umbrella/commit/558f4f8))
* **resolve-map:** also use _resolvePath for plain lookups, optimize ([48c796f](https://github.com/thi-ng/umbrella/commit/48c796f))

<a name="2.0.0"></a>
# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@1.0.5...@thi.ng/resolve-map@2.0.0) (2018-05-09)

### Code Refactoring

* **resolve-map:** fix [#21](https://github.com/thi-ng/umbrella/issues/21) ([5d2a3fe](https://github.com/thi-ng/umbrella/commit/5d2a3fe))

### BREAKING CHANGES

* **resolve-map:** update lookup path prefix & separators

- lookup paths now are prefixed with `@` instead of `->`
- all path segments must be separated by `/`
- update readme & tests

<a name="1.0.0"></a>
# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.2.0...@thi.ng/resolve-map@1.0.0) (2018-04-16)

### Features

* **resolve-map:** support relative parent refs, update tests/readme ([a379d12](https://github.com/thi-ng/umbrella/commit/a379d12))

### BREAKING CHANGES

* **resolve-map:** lookup paths passed to the provided `resolve()` fn
inside function values are now relative by default (previously only
absolute paths were allowed)

- remove `resolveArray()` from module exports
(use `resolveMap()` instead)
- add absPath() to compute absolute path
- add support for "../" ancestor access

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.1.7...@thi.ng/resolve-map@0.2.0) (2018-04-16)

### Features

* **resolve-map:** resolve each ref only once, re-use resolved results ([6992e82](https://github.com/thi-ng/umbrella/commit/6992e82))
