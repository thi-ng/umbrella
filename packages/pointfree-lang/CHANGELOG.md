# Change Log

- **Last updated**: 2023-08-22T14:39:27Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@2.1.0) (2021-11-17)

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

### [2.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@2.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@2.0.0) (2021-10-12)

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

#### 🩹 Bug fixes

- update bash wrapper ([4170b4b](https://github.com/thi-ng/umbrella/commit/4170b4b))

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
- minor pkg restructure ([73ea3d1](https://github.com/thi-ng/umbrella/commit/73ea3d1))
- migrate CLI to TS ([9381d83](https://github.com/thi-ng/umbrella/commit/9381d83))

### [1.4.18](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.4.18) (2020-12-22)

#### ♻️ Refactoring

- fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([7ae9e27](https://github.com/thi-ng/umbrella/commit/7ae9e27))
  - replace NodeType enum w/ type alias
  - update grammar & compiler

### [1.4.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.4.17) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [1.4.14](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.4.14) (2020-09-22)

#### ♻️ Refactoring

- update visitWord(), extract pushLocals() ([13a68e7](https://github.com/thi-ng/umbrella/commit/13a68e7))

### [1.4.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.4.3) (2020-05-14)

#### ♻️ Refactoring

- minor updates to visitors ([c9f3f18](https://github.com/thi-ng/umbrella/commit/c9f3f18))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.4.0) (2020-04-27)

#### 🚀 Features

- update grammar (add line comments) ([a8cdbe8](https://github.com/thi-ng/umbrella/commit/a8cdbe8))
  - update readme
- add word metadata ([7343116](https://github.com/thi-ng/umbrella/commit/7343116))
  - store word name, source loc, stack comment & arities in
    `__meta` key of compiled functions

#### ♻️ Refactoring

- word metadata, tests & readme ([3aeb5d7](https://github.com/thi-ng/umbrella/commit/3aeb5d7))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.3.0) (2020-04-16)

#### 🚀 Features

- add `>word`, update pkg & readme ([4fe2f7f](https://github.com/thi-ng/umbrella/commit/4fe2f7f))

#### ♻️ Refactoring

- update renamed words ([0a9f5ec](https://github.com/thi-ng/umbrella/commit/0a9f5ec))

### [1.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.2.1) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([7a8a3b1](https://github.com/thi-ng/umbrella/commit/7a8a3b1))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.2.0) (2020-03-29)

#### 🚀 Features

- add initial CLI tooling, add new aliases, update deps ([90c9d96](https://github.com/thi-ng/umbrella/commit/90c9d96))
- add `try` alias, fix `include` cli word ([ab61e5b](https://github.com/thi-ng/umbrella/commit/ab61e5b))

### [1.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.1.10) (2020-02-25)

#### ♻️ Refactoring

- update imports ([fad6887](https://github.com/thi-ng/umbrella/commit/fad6887))

### [1.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.1.5) (2019-09-21)

#### 🩹 Bug fixes

- update imports ([8de1366](https://github.com/thi-ng/umbrella/commit/8de1366))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([1f9d155](https://github.com/thi-ng/umbrella/commit/1f9d155))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([50bf59a](https://github.com/thi-ng/umbrella/commit/50bf59a))

### [1.0.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.0.12) (2019-04-24)

#### ♻️ Refactoring

- replace DEBUG w/ LOGGER ([abec897](https://github.com/thi-ng/umbrella/commit/abec897))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### 🩹 Bug fixes

- update NodeType handling ([227be4b](https://github.com/thi-ng/umbrella/commit/227be4b))

### [0.2.26](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@0.2.26) (2018-12-15)

#### 🩹 Bug fixes

- update parser stubs (TS3.2.x) ([3b3e503](https://github.com/thi-ng/umbrella/commit/3b3e503))

### [0.2.22](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@0.2.22) (2018-09-24)

#### ⏱ Performance improvements

- `NodeType` => const enum ([a7b9a42](https://github.com/thi-ng/umbrella/commit/a7b9a42))
  - export `__NodeType` for reverse lookups

### [0.2.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@0.2.8) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@0.2.0) (2018-04-03)

#### 🚀 Features

- update grammar, aliases, ASTNode, NodeType ([ee684c7](https://github.com/thi-ng/umbrella/commit/ee684c7))
  - add VAR_DEREF_IMM node type (immediate/non-defered var deref)
  - add node source location info
  - add VarDerefImmediate and NonWordExpr grammar rules
  - add more aliases for built-ins
- overhaul visitor quote/array & map handling, grammar ([769e84d](https://github.com/thi-ng/umbrella/commit/769e84d))
  - revert / remove NodeType.VAR_DEREF_IMM
  - add resolveNode, resolveArray, resolveMap
  - update resolveVar to use hasOwnProperty() check
  - simplify VisitorState and handling
  - add source location handling (for improved error msg)
  - update aliases
- implement dynamic var scoping & local var grammar ([3310ec3](https://github.com/thi-ng/umbrella/commit/3310ec3))
  - add loadvar/storevar/beginvar/endvar word fns
  - add `^{ x y }` syntax to autobind word local vars
  - update var lookups/updates to use scope/binding stack (per var)
  - update visitWord() to inject local var handling (if needed)
  - update ensureEnv() to prepare var stacks
  - add finalizeEnv() to resolve final var results and remove var stacks
  - fix aliases
  - add docs

#### 🩹 Bug fixes

- update grammar (parse order), add tests ([5450e50](https://github.com/thi-ng/umbrella/commit/5450e50))

#### ♻️ Refactoring

- rename grammar rule / nodetype MAP=>OBJ, add docs ([1c899a1](https://github.com/thi-ng/umbrella/commit/1c899a1))
  - rename resolveMap => resolveObject
  - rename visitMap => visitObject

### [0.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@0.1.3) (2018-04-01)

#### 🩹 Bug fixes

- object literal grammar rule (allow initial WS) ([208b5c3](https://github.com/thi-ng/umbrella/commit/208b5c3))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@0.1.2) (2018-03-31)

#### 🩹 Bug fixes

- add ensureEnv, update re-exports, update readme ([659cce9](https://github.com/thi-ng/umbrella/commit/659cce9))
  - add ensureEnv to avoid errors if `__words` key is missing
  - minor formatting fix in grammar

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pointfree-lang@0.1.1) (2018-03-31)

#### 🚀 Features

- initial import [@thi.ng/pointfree-lang](https://github.com/thi-ng/umbrella/tree/main/packages/pointfree-lang) ([3dec35a](https://github.com/thi-ng/umbrella/commit/3dec35a))
