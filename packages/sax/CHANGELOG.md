# Change Log

- **Last updated**: 2021-11-17T23:56:32Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@2.1.0) (2021-11-17)

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

### [2.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@2.0.4) (2021-10-25)

#### ♻️ Refactoring

- update entity handling ([5e03ce6](https://github.com/thi-ng/umbrella/commit/5e03ce6))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@2.0.0) (2021-10-12)

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

- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports (transducers) ([4bad707](https://github.com/thi-ng/umbrella/commit/4bad707))
- update imports ([138571a](https://github.com/thi-ng/umbrella/commit/138571a))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [1.1.42](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@1.1.42) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [1.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@1.1.4) (2019-08-21)

#### ♻️ Refactoring

- simplify ELEM_START handler (re-use) ([41d9142](https://github.com/thi-ng/umbrella/commit/41d9142))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([eb30aaf](https://github.com/thi-ng/umbrella/commit/eb30aaf))

#### ♻️ Refactoring

- TS strictNullChecks ([e997742](https://github.com/thi-ng/umbrella/commit/e997742))

### [1.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@1.0.9) (2019-03-10)

#### ♻️ Refactoring

- re-use type aliases from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([0d2fdff](https://github.com/thi-ng/umbrella/commit/0d2fdff))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@0.5.0) (2018-09-25)

#### 🚀 Features

- add opt support for boolean attribs, add tests ([5119b67](https://github.com/thi-ng/umbrella/commit/5119b67))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@0.4.0) (2018-09-24)

#### 🚀 Features

- update parse() to return iterator if input given (optional) ([665564c](https://github.com/thi-ng/umbrella/commit/665564c))
  - now same behavior as most other transducers
  - `State` => const enum
  - update readme

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@0.3.0) (2018-06-20)

#### 🚀 Features

- add children & trim opts, add CDATA support ([882f394](https://github.com/thi-ng/umbrella/commit/882f394))
  - add docs
  - update readme
  - add/update examples

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@0.2.0) (2018-06-19)

#### 🚀 Features

- add support for escape seqs, minor optimizations ([e824b6b](https://github.com/thi-ng/umbrella/commit/e824b6b))

#### ♻️ Refactoring

- wrap FSM handler results as arrays, update ELEM_SINGLE ([343e07f](https://github.com/thi-ng/umbrella/commit/343e07f))
  - ELEM_SINGLE handler now emits both ELEM_START & ELEM_END events

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@0.1.1) (2018-06-18)

#### 🩹 Bug fixes

- correct docs in readme ([0e4662d](https://github.com/thi-ng/umbrella/commit/0e4662d))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sax@0.1.0) (2018-06-18)

#### 🚀 Features

- add entity support, update result format, update states ([0f2fcdf](https://github.com/thi-ng/umbrella/commit/0f2fcdf))
  - add ParseOpts, ParseElement, ParseEvent, Type
  - add XML entity replacement (optional)
  - update error handling (add `error()` helper)
  - update PROC_DECL state to support arbitrary instruction tags
  -
- update error handling, add parse() wrapper, add FSMOpts ([64f2378](https://github.com/thi-ng/umbrella/commit/64f2378))
  - `unexpected()` does NOT throw error anymore,
    but triggers new ERROR FSM state
  - add input `pos` counter to ParserState, use for error messages
  - add `parse()` transducer wrapper
  - update `fsm()` transducer to accept new `FSMOpts`
- add support for proc & doctype elements, update `end` results ([a4766a5](https://github.com/thi-ng/umbrella/commit/a4766a5))
  - `end` results now include element body as well
- emit child elements with `end` results, support comments ([3dea954](https://github.com/thi-ng/umbrella/commit/3dea954))
- initial import ([dce189f](https://github.com/thi-ng/umbrella/commit/dce189f))

#### ♻️ Refactoring

- remove extracted FSM transducer &  types, update readme ([56deb45](https://github.com/thi-ng/umbrella/commit/56deb45))
- extract parser sub-states ([74f7d02](https://github.com/thi-ng/umbrella/commit/74f7d02))
