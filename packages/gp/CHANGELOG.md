# Change Log

- **Last updated**: 2024-02-22T11:59:16Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.4.76](https://github.com/thi-ng/umbrella/tree/@thi.ng/gp@0.4.76) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [0.4.55](https://github.com/thi-ng/umbrella/tree/@thi.ng/gp@0.4.55) (2023-08-12)

#### ♻️ Refactoring

- update .probability() call sites in various pkgs ([c8c8141](https://github.com/thi-ng/umbrella/commit/c8c8141))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/gp@0.4.0) (2021-11-17)

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

### [0.3.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/gp@0.3.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [0.3.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/gp@0.3.5) (2021-10-27)

#### 🩹 Bug fixes

- limit AST.mutate() to max tree depth ([afcdda0](https://github.com/thi-ng/umbrella/commit/afcdda0))
  - always respect max tree depth to avoid overly complex trees
    due to repeated mutation
  - update docs

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/gp@0.3.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/gp@0.3.0) (2021-10-12)

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
- update imports (transducers) ([d2c6ead](https://github.com/thi-ng/umbrella/commit/d2c6ead))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/gp@0.2.0) (2020-12-22)

#### 🛑 Breaking changes

- fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([6fd4291](https://github.com/thi-ng/umbrella/commit/6fd4291))
- BREAKING CHANGE: replace GeneType w/ type alias

### [0.1.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/gp@0.1.9) (2020-04-05)

#### ♻️ Refactoring

- switch to non-const enums ([5bc8a4e](https://github.com/thi-ng/umbrella/commit/5bc8a4e))

### [0.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/gp@0.1.3) (2020-02-25)

#### ♻️ Refactoring

- update imports ([8d1698c](https://github.com/thi-ng/umbrella/commit/8d1698c))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/gp@0.1.0) (2019-11-30)

#### 🚀 Features

- import as new package ([dcfee15](https://github.com/thi-ng/umbrella/commit/dcfee15))
- add support for arbitrary op arities, simplify ([8e71a88](https://github.com/thi-ng/umbrella/commit/8e71a88))
  - update ASTOpts
- add MEP, refactor all as classes, add/update types, tests ([d9061b1](https://github.com/thi-ng/umbrella/commit/d9061b1))
- add opt min depth filter for MEP.decodeChromosome() ([921fcdd](https://github.com/thi-ng/umbrella/commit/921fcdd))
- update crossover/mutation for both AST/MEP, add tests ([9852631](https://github.com/thi-ng/umbrella/commit/9852631))
- update MEP.decodeChromosome, tests, add docs ([e339925](https://github.com/thi-ng/umbrella/commit/e339925))

#### 🩹 Bug fixes

- update ASTNode as recursive type (TS3.7) ([33fbd7f](https://github.com/thi-ng/umbrella/commit/33fbd7f))
