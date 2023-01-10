# Change Log

- **Last updated**: 2023-01-10T15:20:19Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@2.1.7) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@2.1.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@2.0.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update imports (transducers) ([7fc60cd](https://github.com/thi-ng/umbrella/commit/7fc60cd))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports in various pkgs (rstream) ([342cf54](https://github.com/thi-ng/umbrella/commit/342cf54))
- migrate logger to own file ([6f0c8c3](https://github.com/thi-ng/umbrella/commit/6f0c8c3))

### [1.1.66](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@1.1.66) (2021-03-12)

#### ♻️ Refactoring

- update types to use ISubscription ([f299612](https://github.com/thi-ng/umbrella/commit/f299612))
- update types/generics ([b38c561](https://github.com/thi-ng/umbrella/commit/b38c561))

### [1.1.52](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@1.1.52) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports ([ba70998](https://github.com/thi-ng/umbrella/commit/ba70998))

### [1.1.46](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@1.1.46) (2020-09-13)

#### ♻️ Refactoring

- update imports ([a35efa8](https://github.com/thi-ng/umbrella/commit/a35efa8))

### [1.1.42](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@1.1.42) (2020-07-28)

#### ♻️ Refactoring

- update sync() callsites ([0fc16c4](https://github.com/thi-ng/umbrella/commit/0fc16c4))

### [1.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@1.1.10) (2020-02-25)

#### ♻️ Refactoring

- update imports ([6bf5df5](https://github.com/thi-ng/umbrella/commit/6bf5df5))

### [1.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@1.1.7) (2019-11-30)

#### 🩹 Bug fixes

- update TripleStore to reflect rstream changes ([1936cd3](https://github.com/thi-ng/umbrella/commit/1936cd3))

### [1.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@1.1.4) (2019-08-21)

#### 🩹 Bug fixes

- fix [#91](https://github.com/thi-ng/umbrella/issues/91), add CloseMode.NEVER configs to main indices ([b3315ab](https://github.com/thi-ng/umbrella/commit/b3315ab))

#### ♻️ Refactoring

- simplify .findTriple(), move xforms, update deps ([c6a40df](https://github.com/thi-ng/umbrella/commit/c6a40df))
- update addQueryFromSpec, nextID ([4a140e8](https://github.com/thi-ng/umbrella/commit/4a140e8))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([6d35b86](https://github.com/thi-ng/umbrella/commit/6d35b86))

#### 🩹 Bug fixes

- disambiguate return generics for addPatternQuery() ([7ffe25d](https://github.com/thi-ng/umbrella/commit/7ffe25d))

#### ♻️ Refactoring

- TS strictNullChecks ([0c05d6c](https://github.com/thi-ng/umbrella/commit/0c05d6c))

### [1.0.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@1.0.24) (2019-04-24)

#### ♻️ Refactoring

- replace DEBUG w/ LOGGER impl, add setLogger() ([77fcc9b](https://github.com/thi-ng/umbrella/commit/77fcc9b))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))
- BREAKING CHANGE: enable multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols

#### ♻️ Refactoring

- use rstream nextID() util (fix regression) ([a42b2e1](https://github.com/thi-ng/umbrella/commit/a42b2e1))

### [0.3.35](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@0.3.35) (2018-08-24)

#### ♻️ Refactoring

- simplify transducer uses ([eb1714f](https://github.com/thi-ng/umbrella/commit/eb1714f))

### [0.3.32](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@0.3.32) (2018-08-03)

#### ♻️ Refactoring

- remove obsolete `reset` in addJoin() ([361f8b4](https://github.com/thi-ng/umbrella/commit/361f8b4))

### [0.3.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@0.3.30) (2018-08-01)

#### ♻️ Refactoring

- cleanup imports ([4db3fa8](https://github.com/thi-ng/umbrella/commit/4db3fa8))

### [0.3.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@0.3.3) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@0.3.0) (2018-04-27)

#### 🚀 Features

- add obj->triple converter, update readme & example ([6f95bcb](https://github.com/thi-ng/umbrella/commit/6f95bcb))

### [0.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@0.2.2) (2018-04-26)

#### ♻️ Refactoring

- simplify case selection in addPatternQuery() ([d36a5ea](https://github.com/thi-ng/umbrella/commit/d36a5ea))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@0.2.1) (2018-04-26)

#### ⏱ Performance improvements

- optimize pattern queries, fix bindVars() ([75f2af2](https://github.com/thi-ng/umbrella/commit/75f2af2))
  - using only single intersection if 2 null terms in pattern query
  - update bindVars() to create shallow copy (else dedupe fails)

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@0.2.0) (2018-04-26)

#### 🚀 Features

- add addQueryJoin(), add type aliases, update tests ([c5f36a2](https://github.com/thi-ng/umbrella/commit/c5f36a2))
- add removeTriple(), simplify wildcard subqueries ([443ff8f](https://github.com/thi-ng/umbrella/commit/443ff8f))
  - add freeID list to reduce store fragmentation
  - remove obsolete allSelections cache
  - fix addQueryJoin() xform to also return empty result sets
- rename TripleStore methods, use Set-like API ([9b5c58a](https://github.com/thi-ng/umbrella/commit/9b5c58a))
  - rename addTriple() => add()
  - rename addTriples() => into()
  - rename removeTriple() => delete()
  - add get()
  - refactor has()
- add path query, multi-joins, pattern query reuse ([679c4e0](https://github.com/thi-ng/umbrella/commit/679c4e0))
  - add addPathQuery()
  - add addMultiJoin()
  - rename addQueryJoin() => addJoin()
  - update query ID arg order
  - add type aliases
  - add pattern query cache
  - add patternVars() helper
- add query spec types, addQueryFromSpec(), dedupe xforms ([d093a5c](https://github.com/thi-ng/umbrella/commit/d093a5c))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-query@0.1.0) (2018-04-24)

#### 🚀 Features

- initial import ([ef3903e](https://github.com/thi-ng/umbrella/commit/ef3903e))
- update index & sub-query caching/reuse ([66ec92f](https://github.com/thi-ng/umbrella/commit/66ec92f))
- add IToDot impl for graphviz conversion/viz ([a68eca0](https://github.com/thi-ng/umbrella/commit/a68eca0))
- add param queries w/ variables, update addPatternQuery ([d9b845e](https://github.com/thi-ng/umbrella/commit/d9b845e))
  - add FactGraph.addParamQuery()
  - add FactGraph.has()
  - add qvarResolver()

#### ♻️ Refactoring

- simplify query handling, optimize addFact() ([a4aa4cb](https://github.com/thi-ng/umbrella/commit/a4aa4cb))
- simplify addQuery() ([16fabb8](https://github.com/thi-ng/umbrella/commit/16fabb8))
- rename types, update readme ([b121c47](https://github.com/thi-ng/umbrella/commit/b121c47))
  - rename Fact => Triple, FactIds => TripleIds
  - rename FactGraph => TripleStore
  - add TripleStore.addTriples()
  - update TripleStore ctor
