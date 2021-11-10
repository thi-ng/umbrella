# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@2.0.8...@thi.ng/dgraph@2.0.9) (2021-11-10)

**Note:** Version bump only for package @thi.ng/dgraph





## [2.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@2.0.7...@thi.ng/dgraph@2.0.8) (2021-11-03)

**Note:** Version bump only for package @thi.ng/dgraph





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.3.35...@thi.ng/dgraph@2.0.0) (2021-10-12)


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






#  [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.2.28...@thi.ng/dgraph@1.3.0) (2020-11-24)

###  Features

- **dgraph:** update defDGraph, DGraph ctor ([8aee78a](https://github.com/thi-ng/umbrella/commit/8aee78ab370cc21b250ec1db07153a1ed7305b59))

#  [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.1.25...@thi.ng/dgraph@1.2.0) (2020-04-03)

###  Features

- **dgraph:** add defDGraph(), update ctor to accept edge pairs ([b45a6da](https://github.com/thi-ng/umbrella/commit/b45a6da939348bd49134d499259889332d0e950f))

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@1.0.13...@thi.ng/dgraph@1.1.0) (2019-04-02)

###  Features

- **dgraph:** add addNode(), refactor to use ArraySet, add tests ([ab7650f](https://github.com/thi-ng/umbrella/commit/ab7650f))

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@0.2.35...@thi.ng/dgraph@1.0.0) (2019-01-21)

###  Build System

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

###  BREAKING CHANGES

- enabled multi-outputs (ES6 modules, CJS, UMD)
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols.

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@0.1.10...@thi.ng/dgraph@0.2.0) (2018-05-09)

###  Features

- **dgraph:** add leaves() & roots() iterators, update sort() ([68ca46d](https://github.com/thi-ng/umbrella/commit/68ca46d))

##  [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@0.1.0...@thi.ng/dgraph@0.1.1) (2018-04-10)

###  Bug Fixes

- **dgraph:** update corrupted deps ([675847b](https://github.com/thi-ng/umbrella/commit/675847b))

#  [0.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dgraph@0.0.3...@thi.ng/dgraph@0.1.0) (2018-04-10)

###  Features

- **dgraph:** re-import DGraph impl & tests, update readme ([e086be6](https://github.com/thi-ng/umbrella/commit/e086be6))
