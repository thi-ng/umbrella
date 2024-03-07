# Change Log

- **Last updated**: 2024-03-07T20:40:47Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [0.4.82](https://github.com/thi-ng/umbrella/tree/@thi.ng/soa@0.4.82) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [0.4.58](https://github.com/thi-ng/umbrella/tree/@thi.ng/soa@0.4.58) (2023-08-04)

#### ♻️ Refactoring

- update `identity` usage in various pkgs ([b6db053](https://github.com/thi-ng/umbrella/commit/b6db053))
- minor type updates ([5a5a813](https://github.com/thi-ng/umbrella/commit/5a5a813))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/soa@0.4.0) (2021-11-17)

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

### [0.3.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/soa@0.3.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/soa@0.3.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/soa@0.3.0) (2021-10-12)

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
- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))

### [0.2.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/soa@0.2.7) (2021-03-17)

#### ♻️ Refactoring

- dedupe OOB error handling ([1988ccd](https://github.com/thi-ng/umbrella/commit/1988ccd))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/soa@0.2.0) (2021-02-20)

#### 🛑 Breaking changes

- update attrib type handling ([274dadf](https://github.com/thi-ng/umbrella/commit/274dadf))
- BREAKING CHANGE: attrib buffer data type use string consts
  - part of unified umbrella-wide changes to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) Type alias
    (see [a333d4182](https://github.com/thi-ng/umbrella/commit/a333d4182))

### [0.1.36](https://github.com/thi-ng/umbrella/tree/@thi.ng/soa@0.1.36) (2020-09-13)

#### ♻️ Refactoring

- update imports ([8c888c0](https://github.com/thi-ng/umbrella/commit/8c888c0))

### [0.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/soa@0.1.4) (2020-02-25)

#### ♻️ Refactoring

- update imports ([863e4f6](https://github.com/thi-ng/umbrella/commit/863e4f6))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/soa@0.1.0) (2019-11-09)

#### 🚀 Features

- add new pkg [@thi.ng/soa](https://github.com/thi-ng/umbrella/tree/main/packages/soa) ([5f8ffa1](https://github.com/thi-ng/umbrella/commit/5f8ffa1))
- add/update types, update aos(), add SOA.setValues(), tests ([b8e0780](https://github.com/thi-ng/umbrella/commit/b8e0780))
- update SOAAttribSpec.buf to use ArrayBuffer w/ opt offset ([2759570](https://github.com/thi-ng/umbrella/commit/2759570))
  - update aos() buffer handling
  - update SOA.initSpecs()
  - update tests

#### 🩹 Bug fixes

- remove obsolete imports ([2309ccd](https://github.com/thi-ng/umbrella/commit/2309ccd))

#### ⏱ Performance improvements

- update attribValues() impl ([786a02f](https://github.com/thi-ng/umbrella/commit/786a02f))

#### ♻️ Refactoring

- update attribValues(), add indexUnsafe() ([21c1ef6](https://github.com/thi-ng/umbrella/commit/21c1ef6))
- rename SOA.initSpecs() => addSpecs(), make public ([470714d](https://github.com/thi-ng/umbrella/commit/470714d))
