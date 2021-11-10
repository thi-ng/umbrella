# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@2.0.8...@thi.ng/rstream-query@2.0.9) (2021-11-10)

**Note:** Version bump only for package @thi.ng/rstream-query





## [2.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@2.0.7...@thi.ng/rstream-query@2.0.8) (2021-11-03)

**Note:** Version bump only for package @thi.ng/rstream-query





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.89...@thi.ng/rstream-query@2.0.0) (2021-10-12)


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






##  [1.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.6...@thi.ng/rstream-query@1.1.7) (2019-11-30)

###  Bug Fixes

- **rstream-query:** fix [#91](https://github.com/thi-ng/umbrella/issues/91), add CloseMode.NEVER configs to main indices ([b3315ab](https://github.com/thi-ng/umbrella/commit/b3315ab39c53b6d6cad065062c4114a6159b9a8e))
- **rstream-query:** update TripleStore to reflect rstream changes ([1936cd3](https://github.com/thi-ng/umbrella/commit/1936cd3b24dee7a97bfa8f5863dc933ca3267ad9))

#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.26...@thi.ng/rstream-query@1.1.0) (2019-07-07)

###  Bug Fixes

- **rstream-query:** disambiguate return generics for addPatternQuery() ([7ffe25d](https://github.com/thi-ng/umbrella/commit/7ffe25d))

###  Features

- **rstream-query:** enable TS strict compiler flags (refactor) ([6d35b86](https://github.com/thi-ng/umbrella/commit/6d35b86))

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@0.3.63...@thi.ng/rstream-query@1.0.0) (2019-01-21)

###  Build System

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))

###  BREAKING CHANGES

- enable multi-outputs (ES6 modules, CJS, UMD)
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@0.2.2...@thi.ng/rstream-query@0.3.0) (2018-04-27)

###  Features

- **rstream-query:** add obj->triple converter, update readme & example ([6f95bcb](https://github.com/thi-ng/umbrella/commit/6f95bcb))

##  [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@0.2.0...@thi.ng/rstream-query@0.2.1) (2018-04-26)

###  Performance Improvements

- **rstream-query:** optimize pattern queries, fix bindVars() ([75f2af2](https://github.com/thi-ng/umbrella/commit/75f2af2))

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@0.1.2...@thi.ng/rstream-query@0.2.0) (2018-04-26)

###  Features

- **rstream-query:** add addQueryJoin(), add type aliases, update tests ([c5f36a2](https://github.com/thi-ng/umbrella/commit/c5f36a2))
- **rstream-query:** add path query, multi-joins, pattern query reuse ([679c4e0](https://github.com/thi-ng/umbrella/commit/679c4e0))
- **rstream-query:** add query spec types, addQueryFromSpec(), dedupe xforms ([d093a5c](https://github.com/thi-ng/umbrella/commit/d093a5c))
- **rstream-query:** add removeTriple(), simplify wildcard subqueries ([443ff8f](https://github.com/thi-ng/umbrella/commit/443ff8f))
- **rstream-query:** rename TripleStore methods, use Set-like API ([9b5c58a](https://github.com/thi-ng/umbrella/commit/9b5c58a))

##  [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@0.1.1...@thi.ng/rstream-query@0.1.2) (2018-04-25)

#  0.1.0 (2018-04-24)

###  Features

- **rstream-query:** add IToDot impl for graphviz conversion/viz ([a68eca0](https://github.com/thi-ng/umbrella/commit/a68eca0))
- **rstream-query:** add param queries w/ variables, update addPatternQuery ([d9b845e](https://github.com/thi-ng/umbrella/commit/d9b845e))
- **rstream-query:** initial import ([ef3903e](https://github.com/thi-ng/umbrella/commit/ef3903e))
- **rstream-query:** update index & sub-query caching/reuse ([66ec92f](https://github.com/thi-ng/umbrella/commit/66ec92f))
