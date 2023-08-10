# Change Log

- **Last updated**: 2023-08-10T12:16:43Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/oquery@2.1.0) (2021-11-17)

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

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/oquery@2.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/oquery@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/oquery@2.0.0) (2021-10-12)

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
- update defmulti impls ([8d3d49f](https://github.com/thi-ng/umbrella/commit/8d3d49f))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/oquery@0.3.0) (2021-03-22)

#### 🚀 Features

- fix [#264](https://github.com/thi-ng/umbrella/issues/264), add intersection queries ([f3ad108](https://github.com/thi-ng/umbrella/commit/f3ad108))
  - add `QueryOpts.intersect` to force intersection query
    (like `cwise` option, this is for O-terms only)
  - add `intersect()` helper predicate
  - update `coerce()`
  - update `objQuery()`/`arrayQuery()` term initialization
  - add/update `DEFAULT_OPTS`
  - update tests

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/oquery@0.2.0) (2020-12-07)

#### 🚀 Features

- add array support, add QueryOpts ([8498db0](https://github.com/thi-ng/umbrella/commit/8498db0))
  - add QueryFn interface to define overrides for fn
    returned by defQuery()
  - if query called w/ source array, use only P/O terms,
    no subjects (array indices), return array
  - add `full` and `inspect` QueryOpts to control result format and
    array value matching behavior
  - add/update tests
- add defKeyQuery(), refactor/fix types ([4c5ba42](https://github.com/thi-ng/umbrella/commit/4c5ba42))
  - add conditional types to fix return type inference (QueryFn/KeyQueryFn)
  - add defKeyQuery()
  - extract arrayQuery()/objQuery()
  - optimize arrayQuery() by pre-selecting query impl

#### ♻️ Refactoring

- update QueryOpts and defaults ([90f4ee7](https://github.com/thi-ng/umbrella/commit/90f4ee7))
  - rename full => partial (flip conditions)
  - rename inspect => cwise
  - update tests

### [0.1.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/oquery@0.1.12) (2020-09-22)

#### ♻️ Refactoring

- dedupe, simplify sub-query fns ([498e4e5](https://github.com/thi-ng/umbrella/commit/498e4e5))
- further sub-query extraction/re-use ([4fb9b4b](https://github.com/thi-ng/umbrella/commit/4fb9b4b))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/oquery@0.1.0) (2020-07-04)

#### 🚀 Features

- import as new pkg ([aaa3086](https://github.com/thi-ng/umbrella/commit/aaa3086))

#### ♻️ Refactoring

- minor refactoring ([03a1943](https://github.com/thi-ng/umbrella/commit/03a1943))
