# Change Log

- **Last updated**: 2024-02-19T16:07:07Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.5.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.5.5) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.5.0) (2023-09-15)

#### 🚀 Features

- add support for line comments, fix tokenize ([d3e708e](https://github.com/thi-ng/umbrella/commit/d3e708e))
  - update SyntaxOpts
  - fix/update tokenize() to emit

### [0.4.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.4.5) (2022-04-07)

#### ♻️ Refactoring

- replace deprecated .substr() w/ .substring() ([0710509](https://github.com/thi-ng/umbrella/commit/0710509))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.4.0) (2021-11-17)

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

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.3.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.3.0) (2021-10-12)

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
- update defmulti impls ([53e41e3](https://github.com/thi-ng/umbrella/commit/53e41e3))

### [0.2.35](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.2.35) (2021-03-03)

#### 🩹 Bug fixes

- add missing type anno (TS4.2) ([89827bb](https://github.com/thi-ng/umbrella/commit/89827bb))

### [0.2.30](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.2.30) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [0.2.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.2.5) (2020-02-25)

#### ♻️ Refactoring

- update imports, internal restruct ([6dbea7d](https://github.com/thi-ng/umbrella/commit/6dbea7d))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.2.0) (2019-09-23)

#### 🚀 Features

- add Token w/ location info, update tokenize() & parse() ([3917775](https://github.com/thi-ng/umbrella/commit/3917775))
  - update ParseError w/ location info
  - remove [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/main/packages/errors) dep
  - update readme
  - update tests

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sexpr@0.1.0) (2019-09-21)

#### 🚀 Features

- import as new package ([f526b7c](https://github.com/thi-ng/umbrella/commit/f526b7c))
- add ParseError ([7998afe](https://github.com/thi-ng/umbrella/commit/7998afe))
- update SyntaxOpts, runtime, update scope parsing, types ([7c840e1](https://github.com/thi-ng/umbrella/commit/7c840e1))
  - update SyntaxOpts scope delimiter spec
  - update parse() to check for matching scope types
  - update error messages
  - rename node types
  - add/update docs
  - add tests
