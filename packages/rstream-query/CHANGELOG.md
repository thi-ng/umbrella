# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.7...@thi.ng/rstream-query@1.0.8) (2019-03-03)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.6...@thi.ng/rstream-query@1.0.7) (2019-03-01)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.5...@thi.ng/rstream-query@1.0.6) (2019-02-26)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.4...@thi.ng/rstream-query@1.0.5) (2019-02-15)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.3...@thi.ng/rstream-query@1.0.4) (2019-02-10)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.2...@thi.ng/rstream-query@1.0.3) (2019-02-05)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.1...@thi.ng/rstream-query@1.0.2) (2019-01-31)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.0...@thi.ng/rstream-query@1.0.1) (2019-01-21)

**Note:** Version bump only for package @thi.ng/rstream-query





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
