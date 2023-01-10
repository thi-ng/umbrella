# Change Log

- **Last updated**: 2023-01-10T15:20:19Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@3.1.0) (2021-11-17)

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

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@3.0.0) (2021-10-12)

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
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

### [2.0.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@2.0.18) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports ([34bb05c](https://github.com/thi-ng/umbrella/commit/34bb05c))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@2.0.0) (2020-04-16)

#### 🛑 Breaking changes

- add new words, rename HOF words ([0d19c9a](https://github.com/thi-ng/umbrella/commit/0d19c9a))
- BREAKING CHANGE: rename HOF words
  - add `def` prefix for all HOF words ([#210](https://github.com/thi-ng/umbrella/issues/210))
    - word/U => defWord/U
    - tuple => defTuple
    - join => defJoin
    - op1/2/2v => defOp1/2/2v
    - cond => defCond
    - cases => defCases
    - loadkey => defLoadKey
    - storekey => defStoreKey
    - loop => defLoop
    - push => defPush
  - add new plain words: catr, join

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@1.3.0) (2020-03-29)

#### 🚀 Features

- add whenq(), ismatch() ([44ab1d7](https://github.com/thi-ng/umbrella/commit/44ab1d7))
- add tojson()/fromjson() conversion ops ([829f3ab](https://github.com/thi-ng/umbrella/commit/829f3ab))
- add $try word, update compile() to allow empty quotations ([41de106](https://github.com/thi-ng/umbrella/commit/41de106))

### [1.2.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@1.2.6) (2020-02-25)

#### ♻️ Refactoring

- update imports ([fad6887](https://github.com/thi-ng/umbrella/commit/fad6887))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@1.2.0) (2019-08-21)

#### 🚀 Features

- add new r-stack words, refactor ([dbad162](https://github.com/thi-ng/umbrella/commit/dbad162))
  - add rdup2, rdup3, rover

#### ♻️ Refactoring

- split into separate files ([86a27e5](https://github.com/thi-ng/umbrella/commit/86a27e5))
- update core stack fns (re-use) ([a7ebb2f](https://github.com/thi-ng/umbrella/commit/a7ebb2f))
- update op2v, extract loops ([6392657](https://github.com/thi-ng/umbrella/commit/6392657))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([1f9d155](https://github.com/thi-ng/umbrella/commit/1f9d155))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([50bf59a](https://github.com/thi-ng/umbrella/commit/50bf59a))

### [1.0.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@1.0.14) (2019-05-22)

#### 🩹 Bug fixes

- update safeMode handling ([d27bcba](https://github.com/thi-ng/umbrella/commit/d27bcba))
  - actually disable checks if safeMode(false) is called

### [1.0.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@1.0.7) (2019-03-10)

#### ♻️ Refactoring

- re-use type aliases from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([0d2fdff](https://github.com/thi-ng/umbrella/commit/0d2fdff))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

### [0.8.15](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.8.15) (2018-12-27)

#### ♻️ Refactoring

- re-use comp() from [@thi.ng/compose](https://github.com/thi-ng/umbrella/tree/main/packages/compose) ([3f9b244](https://github.com/thi-ng/umbrella/commit/3f9b244))

### [0.8.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.8.6) (2018-08-01)

#### ♻️ Refactoring

- TS3.0 PropertyKey handling ([bf2a307](https://github.com/thi-ng/umbrella/commit/bf2a307))

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.8.0) (2018-05-13)

#### 🚀 Features

- add execjs for host calls, update readme ([373701b](https://github.com/thi-ng/umbrella/commit/373701b))

### [0.7.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.7.9) (2018-05-10)

#### 🩹 Bug fixes

- minor update error handling ([5391d98](https://github.com/thi-ng/umbrella/commit/5391d98))

### [0.7.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.7.8) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.7.0) (2018-04-03)

#### 🚀 Features

- add copy() word ([68a8dba](https://github.com/thi-ng/umbrella/commit/68a8dba))
- add math ops, update load/loadkey, update tests ([2101e92](https://github.com/thi-ng/umbrella/commit/2101e92))
  - load/loadkey throws error if var doesn't exist

#### ♻️ Refactoring

- update/rename storeat => setat, update tests ([92d2d68](https://github.com/thi-ng/umbrella/commit/92d2d68))
  - change behavior to keep obj on stack

### [0.6.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.6.1) (2018-03-31)

#### 🩹 Bug fixes

- reexport ensureStack fns ([a0bf781](https://github.com/thi-ng/umbrella/commit/a0bf781))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.6.0) (2018-03-31)

#### 🚀 Features

- add caseq() ([5db90c5](https://github.com/thi-ng/umbrella/commit/5db90c5))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.5.0) (2018-03-29)

#### 🚀 Features

- add combinators, update controlflow words, remove execq ([3dc30a8](https://github.com/thi-ng/umbrella/commit/3dc30a8))
  - add condq(), loopq()
  - update dotimes() to use quotations from stack, no more HOF
  - add dip/2/3/4 combinators
  - add keep/2/3 combinators
  - add bi/2/3 combinators
  - add dup3
  - refactor exec to work w/ quotations, remove execq
  - add/update tests
- add more dataflow combinators, words & tests ([b096e43](https://github.com/thi-ng/umbrella/commit/b096e43))
  - add tri/2/3
  - add bis/2, tris/2
  - add bia/2, tria/2
  - add both, either
  - add oneover

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.4.0) (2018-03-29)

#### 🚀 Features

- add new words, constructs, aliases, fix re-exports ([943b4f9](https://github.com/thi-ng/umbrella/commit/943b4f9))
  - add dotimes() loop construct
  - add obj(), bindkeys() object words
  - add rinc/rdec() r-stack words
  - add sin/cos/atan2/rand/log math ops
  - add vec2/3/4 tuple aliases
  - add API types & comp() to re-exports

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.3.0) (2018-03-28)

#### 🚀 Features

- update word/wordU, add append(), tuple(), join() ([f3f0bec](https://github.com/thi-ng/umbrella/commit/f3f0bec))
- update all words to return stack ([79b4ce3](https://github.com/thi-ng/umbrella/commit/79b4ce3))
- major refactor & restructure ([a48361d](https://github.com/thi-ng/umbrella/commit/a48361d))
  - split out types into api.ts
  - add StackContext and update all word functions to accept and return this type
  - add comp() and update word/wordU() to precompile word
  - add list/array fns: op2l, ladd/lsub/lmul/ldiv, lsplit, foldl
- further restructure, perf, add tests ([3252554](https://github.com/thi-ng/umbrella/commit/3252554))
- add rstack, update StackContext ([1c4cd2f](https://github.com/thi-ng/umbrella/commit/1c4cd2f))
  - add 2nd stack (r-stack) to StackContext
  - add supporting rstack words (rdrop/2, mov/cprd, mov/cpdr)
  - add min/max
  - add pushl
  - add cat
  - add printds/rs
- add new words, rename words, remove mapnth, pushl2 ([0f0c382](https://github.com/thi-ng/umbrella/commit/0f0c382))
  - add mapl(), mapll() array transformers
  - refactor foldl() in terms of mapl()
  - add even/odd()
  - rename ladd etc. vadd...
  - revert op2v to produce new result arrays
  - add runE() syntax sugar
  - update tests
- major update readme, package ([e52b869](https://github.com/thi-ng/umbrella/commit/e52b869))

#### 🩹 Bug fixes

- wordU(), add tests ([1a01f9a](https://github.com/thi-ng/umbrella/commit/1a01f9a))
- add 0-arity comp() (identity fn) ([10d5a34](https://github.com/thi-ng/umbrella/commit/10d5a34))

#### ♻️ Refactoring

- rename core words & change case ([ba0bcc2](https://github.com/thi-ng/umbrella/commit/ba0bcc2))
  - runU => runu
  - map => maptos
  - mapN => mapnth
  - dropIf/dupIf => dropif/dupif
  - condM => cases
  - bitAnd/Or/Not => bitand/or/not
  - isPos/Neg/Null/Zero => ispos/neg/null/zero
  - execQ => execq
  - storeAt => storeat
  - pushEnv => pushenv
  - loadKey/storeKey => loadkey/storekey

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.2.1) (2018-03-23)

#### 🩹 Bug fixes

- fix readme/docs ([f211c39](https://github.com/thi-ng/umbrella/commit/f211c39))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree@0.2.0) (2018-03-23)

#### 🚀 Features

- initial import of refactored [@thi.ng/pointfree](https://github.com/thi-ng/umbrella/tree/main/packages/pointfree) package ([25bbf05](https://github.com/thi-ng/umbrella/commit/25bbf05))
- add dropIf, neg, nop, update cond,condM, add docs/readme ([58f5716](https://github.com/thi-ng/umbrella/commit/58f5716))
- add unwrap, quatations, math/bitops, array/obj access ([f75486d](https://github.com/thi-ng/umbrella/commit/f75486d))
  - add runU(), wordU() & unwrap()
  - add execQ() for running quotations
  - add more math ops
  - add at(), storeAt()
  - add mapN()
  - various small optimizations / refactorings
- support data vals in program, add collect(), update readme ([6cac0c7](https://github.com/thi-ng/umbrella/commit/6cac0c7))
  - any non-function values in program place themselves on stack
  - update StackProgram type alias
  - add collect() to create stack partitions
