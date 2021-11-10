# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [5.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@5.0.7...@thi.ng/resolve-map@5.0.8) (2021-11-10)

**Note:** Version bump only for package @thi.ng/resolve-map





## [5.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@5.0.6...@thi.ng/resolve-map@5.0.7) (2021-11-03)

**Note:** Version bump only for package @thi.ng/resolve-map





# [5.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@4.2.27...@thi.ng/resolve-map@5.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






#  [4.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@4.1.31...@thi.ng/resolve-map@4.2.0) (2020-07-18)

###  Features

- **resolve-map:** add support for custom lookup prefix ([bf89503](https://github.com/thi-ng/umbrella/commit/bf89503424887018d120d3960d9d86a992c31c91))

##  [4.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@4.1.1...@thi.ng/resolve-map@4.1.2) (2019-07-08)

###  Bug Fixes

- **resolve-map:** fix [#97](https://github.com/thi-ng/umbrella/issues/97), update to consider trailing comma & whitespace ([de9532b](https://github.com/thi-ng/umbrella/commit/de9532b))

##  [4.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@4.1.0...@thi.ng/resolve-map@4.1.1) (2019-07-08)

###  Bug Fixes

- **resolve-map:** fix [#97](https://github.com/thi-ng/umbrella/issues/97), update fn arg destructuring ([e68dc19](https://github.com/thi-ng/umbrella/commit/e68dc19))

#  [4.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@4.0.12...@thi.ng/resolve-map@4.1.0) (2019-07-07)

###  Features

- **resolve-map:** enable TS strict compiler flags (refactor) ([7e7ff2a](https://github.com/thi-ng/umbrella/commit/7e7ff2a))

#  [4.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@3.0.16...@thi.ng/resolve-map@4.0.0) (2019-01-21)

###  Build System

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

###  BREAKING CHANGES

- enabled multi-outputs (ES6 modules, CJS, UMD)
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols.

##  [3.0.10](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@3.0.9...@thi.ng/resolve-map@3.0.10) (2018-09-01)

###  Bug Fixes

- **resolve-map:** deep resolve of yet unknown path values ([a710453](https://github.com/thi-ng/umbrella/commit/a710453))

##  [3.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@3.0.4...@thi.ng/resolve-map@3.0.5) (2018-07-15)

###  Bug Fixes

- **resolve-map:** add support for alt ES6 destructure form `{a: b}` ([2482945](https://github.com/thi-ng/umbrella/commit/2482945))

#  [3.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@2.0.6...@thi.ng/resolve-map@3.0.0) (2018-06-07)

###  Features

- **resolve-map:** add cycle detection, fix edge cases ([e61c3b5](https://github.com/thi-ng/umbrella/commit/e61c3b5))
- **resolve-map:** add ES6 destructuring shorthands for function vals ([57f1ed5](https://github.com/thi-ng/umbrella/commit/57f1ed5))

###  BREAKING CHANGES

- **resolve-map:** `resolveMap()` renamed to `resolve()`, update docs

##  [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@2.0.5...@thi.ng/resolve-map@2.0.6) (2018-06-06)

###  Bug Fixes

- **resolve-map:** add private _resolveDeep ([558f4f8](https://github.com/thi-ng/umbrella/commit/558f4f8))
- **resolve-map:** also use_resolvePath for plain lookups, optimize ([48c796f](https://github.com/thi-ng/umbrella/commit/48c796f))

#  [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@1.0.5...@thi.ng/resolve-map@2.0.0) (2018-05-09)

###  Code Refactoring

- **resolve-map:** fix [#21](https://github.com/thi-ng/umbrella/issues/21) ([5d2a3fe](https://github.com/thi-ng/umbrella/commit/5d2a3fe))

###  BREAKING CHANGES

- **resolve-map:** update lookup path prefix & separators
    - lookup paths now are prefixed with `@` instead of `->`
    - all path segments must be separated by `/`
    - update readme & tests

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.2.0...@thi.ng/resolve-map@1.0.0) (2018-04-16)

###  Features

- **resolve-map:** support relative parent refs, update tests/readme ([a379d12](https://github.com/thi-ng/umbrella/commit/a379d12))

###  BREAKING CHANGES

- **resolve-map:** lookup paths passed to the provided `resolve()` fn inside function values are now relative by default (previously only absolute paths were allowed)
    - remove `resolveArray()` from module exports (use `resolveMap()` instead)
    - add absPath() to compute absolute path
    - add support for "../" ancestor access

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/resolve-map@0.1.7...@thi.ng/resolve-map@0.2.0) (2018-04-16)

###  Features

- **resolve-map:** resolve each ref only once, re-use resolved results ([6992e82](https://github.com/thi-ng/umbrella/commit/6992e82))
