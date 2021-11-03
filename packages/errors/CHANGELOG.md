# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@2.0.3...@thi.ng/errors@2.0.4) (2021-10-25)


### Bug Fixes

* [#324](https://github.com/thi-ng/umbrella/issues/324) update snowpack issue workaround ([6dfbf71](https://github.com/thi-ng/umbrella/commit/6dfbf7120faaea7ef6af4f755e1a609cb49d902a)), closes [snowpackjs/snowpack#3621](https://github.com/snowpackjs/snowpack/issues/3621)





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.3.4...@thi.ng/errors@2.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **errors:** add snowpack env var support for assert ([52822b1](https://github.com/thi-ng/umbrella/commit/52822b18160949a0a1eefa82e5e667cd0811cd89))
* **errors:** migrate assert() from thi.ng/api ([7030a6a](https://github.com/thi-ng/umbrella/commit/7030a6aecd50367cbc08bccb13e05b3af41f4eca))


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






#  [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.2.32...@thi.ng/errors@1.3.0) (2021-03-17)

###  Features

- **errors:** add ensureIndex2(), update outOfBounds() arg type ([ab007d6](https://github.com/thi-ng/umbrella/commit/ab007d6b502c3d1650c7e9cf50da05f0ac042ef3))
- **errors:** add outOfBounds(), ensureIndex() ([fb5ca0a](https://github.com/thi-ng/umbrella/commit/fb5ca0a7f8a4a6648d3c8485a9108e9154ee4400))

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.1.2...@thi.ng/errors@1.2.0) (2019-08-21)

###  Features

- **errors:** add defError(), refactor all existing, update readme ([ded89c2](https://github.com/thi-ng/umbrella/commit/ded89c2))

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@1.0.6...@thi.ng/errors@1.1.0) (2019-07-07)

###  Features

- **errors:** enable TS strict compiler flags (refactor) ([8460aea](https://github.com/thi-ng/umbrella/commit/8460aea))

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/errors@0.1.12...@thi.ng/errors@1.0.0) (2019-01-21)

###  Build System

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

###  BREAKING CHANGES

- enabled multi-outputs (ES6 modules, CJS, UMD)
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols.

#  0.1.0 (2018-05-10)

###  Features

- **errors:** add new package [@thi](https://github.com/thi).ng/errors ([1e97856](https://github.com/thi-ng/umbrella/commit/1e97856))
