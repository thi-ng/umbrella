# Change Log

- **Last updated**: 2024-02-19T16:07:07Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.3.76](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse@0.3.76) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse@0.3.0) (2021-11-17)

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

### [0.2.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse@0.2.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse@0.2.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse@0.2.0) (2021-10-12)

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
- update imports (transducers) ([86fdea7](https://github.com/thi-ng/umbrella/commit/86fdea7))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

### [0.1.72](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse@0.1.72) (2021-03-17)

#### ♻️ Refactoring

- dedupe OOB error handling ([b387d65](https://github.com/thi-ng/umbrella/commit/b387d65))
  - remove ASparseMatrix.ensureIndex()
  - replace w/ ensureIndex2() from [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/main/packages/errors)

### [0.1.56](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse@0.1.56) (2020-11-24)

#### ♻️ Refactoring

- update destructuring ([ccf4af6](https://github.com/thi-ng/umbrella/commit/ccf4af6))

### [0.1.54](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse@0.1.54) (2020-09-13)

#### ♻️ Refactoring

- update imports, use new Fn types ([b4a5341](https://github.com/thi-ng/umbrella/commit/b4a5341))

### [0.1.26](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse@0.1.26) (2020-02-25)

#### ♻️ Refactoring

- update imports ([e8f789a](https://github.com/thi-ng/umbrella/commit/e8f789a))

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse@0.1.1) (2019-02-18)

#### ♻️ Refactoring

- extract common CSC/CSR ops & update class impls ([844106b](https://github.com/thi-ng/umbrella/commit/844106b))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/sparse@0.1.0) (2019-02-17)

#### 🚀 Features

- add CSC, update all other matrix impls, remove adjacency ([cd773c9](https://github.com/thi-ng/umbrella/commit/cd773c9))

#### ♻️ Refactoring

- remove obsolete types ([18b466c](https://github.com/thi-ng/umbrella/commit/18b466c))
