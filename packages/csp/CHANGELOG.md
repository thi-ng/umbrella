# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@1.1.74...@thi.ng/csp@2.0.0) (2021-10-12)


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






#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@1.0.19...@thi.ng/csp@1.1.0) (2019-07-07)

###  Bug Fixes

- **csp:** TS strictNullChecks, update various return types ([da909ac](https://github.com/thi-ng/umbrella/commit/da909ac))

###  Features

- **csp:** enable TS strict compiler flags (refactor) ([3d7fba2](https://github.com/thi-ng/umbrella/commit/3d7fba2))
- **csp:** update Mult.tap() to use set semantics ([c9bc953](https://github.com/thi-ng/umbrella/commit/c9bc953))

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@0.3.79...@thi.ng/csp@1.0.0) (2019-01-21)

###  Bug Fixes

- **csp:** disable __State reverse enum lookup ([3b8576f](https://github.com/thi-ng/umbrella/commit/3b8576f))

###  Build System

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

###  BREAKING CHANGES

- enabled multi-outputs (ES6 modules, CJS, UMD)
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols.

##  [0.3.64](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@0.3.63...@thi.ng/csp@0.3.64) (2018-09-24)

###  Performance Improvements

- **csp:** `State` => const enum ([c3e8d68](https://github.com/thi-ng/umbrella/commit/c3e8d68))

##  [0.3.11](https://github.com/thi-ng/umbrella/compare/@thi.ng/csp@0.3.10...@thi.ng/csp@0.3.11) (2018-02-08)

###  Bug Fixes

- **csp:** fix [#5](https://github.com/thi-ng/umbrella/issues/5), example in readme ([a10a487](https://github.com/thi-ng/umbrella/commit/a10a487))
- **csp:** fix [#5](https://github.com/thi-ng/umbrella/issues/5), more example fixes (rfn calls) ([080c2ee](https://github.com/thi-ng/umbrella/commit/080c2ee))
