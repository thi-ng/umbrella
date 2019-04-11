# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.22](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.21...@thi.ng/rstream-query@1.0.22) (2019-04-11)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.20...@thi.ng/rstream-query@1.0.21) (2019-04-11)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.19...@thi.ng/rstream-query@1.0.20) (2019-04-09)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.18...@thi.ng/rstream-query@1.0.19) (2019-04-06)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.17...@thi.ng/rstream-query@1.0.18) (2019-04-03)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.17](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.16...@thi.ng/rstream-query@1.0.17) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.16](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.15...@thi.ng/rstream-query@1.0.16) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.15](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.14...@thi.ng/rstream-query@1.0.15) (2019-04-02)

**Note:** Version bump only for package @thi.ng/rstream-query





## [1.0.14](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-query@1.0.13...@thi.ng/rstream-query@1.0.14) (2019-03-28)

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
