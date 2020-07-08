# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.37](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.36...@thi.ng/rstream-query@1.1.37) (2020-07-08)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.1.36](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.35...@thi.ng/rstream-query@1.1.36) (2020-07-08)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.1.35](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.34...@thi.ng/rstream-query@1.1.35) (2020-07-04)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.1.34](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.33...@thi.ng/rstream-query@1.1.34) (2020-07-02)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.1.33](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.32...@thi.ng/rstream-query@1.1.33) (2020-06-20)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.1.32](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.31...@thi.ng/rstream-query@1.1.32) (2020-06-14)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.1.31](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.30...@thi.ng/rstream-query@1.1.31) (2020-06-01)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.1.30](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.29...@thi.ng/rstream-query@1.1.30) (2020-06-01)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.1.29](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.28...@thi.ng/rstream-query@1.1.29) (2020-05-29)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.1.6...@thi.ng/rstream-query@1.1.7) (2019-11-30)

### Bug Fixes

* **rstream-query:** fix [#91](https://github.com/thi-ng/umbrella/issues/91), add CloseMode.NEVER configs to main indices ([b3315ab](https://github.com/thi-ng/umbrella/commit/b3315ab39c53b6d6cad065062c4114a6159b9a8e))
* **rstream-query:** update TripleStore to reflect rstream changes ([1936cd3](https://github.com/thi-ng/umbrella/commit/1936cd3b24dee7a97bfa8f5863dc933ca3267ad9))

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.26...@thi.ng/rstream-query@1.1.0) (2019-07-07)

### Bug Fixes

* **rstream-query:** disambiguate return generics for addPatternQuery() ([7ffe25d](https://github.com/thi-ng/umbrella/commit/7ffe25d))

### Features

* **rstream-query:** enable TS strict compiler flags (refactor) ([6d35b86](https://github.com/thi-ng/umbrella/commit/6d35b86))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@0.3.63...@thi.ng/rstream-query@1.0.0) (2019-01-21)

### Build System

* update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))

### BREAKING CHANGES

* enable multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols

<a name="0.3.0"></a>
# [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@0.2.2...@thi.ng/rstream-query@0.3.0) (2018-04-27)

### Features

* **rstream-query:** add obj->triple converter, update readme & example ([6f95bcb](https://github.com/thi-ng/umbrella/commit/6f95bcb))

<a name="0.2.1"></a>
## [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@0.2.0...@thi.ng/rstream-query@0.2.1) (2018-04-26)

### Performance Improvements

* **rstream-query:** optimize pattern queries, fix bindVars() ([75f2af2](https://github.com/thi-ng/umbrella/commit/75f2af2))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@0.1.2...@thi.ng/rstream-query@0.2.0) (2018-04-26)

### Features

* **rstream-query:** add addQueryJoin(), add type aliases, update tests ([c5f36a2](https://github.com/thi-ng/umbrella/commit/c5f36a2))
* **rstream-query:** add path query, multi-joins, pattern query reuse ([679c4e0](https://github.com/thi-ng/umbrella/commit/679c4e0))
* **rstream-query:** add query spec types, addQueryFromSpec(), dedupe xforms ([d093a5c](https://github.com/thi-ng/umbrella/commit/d093a5c))
* **rstream-query:** add removeTriple(), simplify wildcard subqueries ([443ff8f](https://github.com/thi-ng/umbrella/commit/443ff8f))
* **rstream-query:** rename TripleStore methods, use Set-like API ([9b5c58a](https://github.com/thi-ng/umbrella/commit/9b5c58a))

<a name="0.1.2"></a>
## [0.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@0.1.1...@thi.ng/rstream-query@0.1.2) (2018-04-25)

<a name="0.1.0"></a>
# 0.1.0 (2018-04-24)

### Features

* **rstream-query:** add IToDot impl for graphviz conversion/viz ([a68eca0](https://github.com/thi-ng/umbrella/commit/a68eca0))
* **rstream-query:** add param queries w/ variables, update addPatternQuery ([d9b845e](https://github.com/thi-ng/umbrella/commit/d9b845e))
* **rstream-query:** initial import ([ef3903e](https://github.com/thi-ng/umbrella/commit/ef3903e))
* **rstream-query:** update index & sub-query caching/reuse ([66ec92f](https://github.com/thi-ng/umbrella/commit/66ec92f))
