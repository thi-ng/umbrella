# Change Log

- **Last updated**: 2023-12-03T12:13:31Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.1.39](https://github.com/thi-ng/umbrella/tree/@thi.ng/rle-pack@3.1.39) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rle-pack@3.1.0) (2021-11-17)

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

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rle-pack@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rle-pack@3.0.0) (2021-10-12)

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
- update various benchmarks ([53e8a6a](https://github.com/thi-ng/umbrella/commit/53e8a6a))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rle-pack@2.1.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([17c426b](https://github.com/thi-ng/umbrella/commit/17c426b))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([dd8806f](https://github.com/thi-ng/umbrella/commit/dd8806f))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rle-pack@2.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- use arrow fns ([6eba241](https://github.com/thi-ng/umbrella/commit/6eba241))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rle-pack@1.0.0) (2018-08-24)

#### 🛑 Breaking changes

- update data format, custom repeat sizes, rename fns ([694a253](https://github.com/thi-ng/umbrella/commit/694a253))
  - add support for custom run-length group thresholds
  - rename => encode() / decode()
  - decode() returns Uint8/16/32Array based on given word size
  - add encode() error handling (arg checks)
  - update tests & readme
  - add diagram
- BREAKING CHANGE: new API and encoding format, see readme
  for details

#### 🚀 Features

- add support for custom input word sizes ([fd8e761](https://github.com/thi-ng/umbrella/commit/fd8e761))
- further update data format (non-repeats) ([4041521](https://github.com/thi-ng/umbrella/commit/4041521))
  - successive non-repeat values are now chunked and waste less bits
  - fix wordSize header field (write size-1)
  - update tests

#### 🩹 Bug fixes

- fix initial repeat counts in encodeBytes(), update readme ([8565edb](https://github.com/thi-ng/umbrella/commit/8565edb))

### [0.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rle-pack@0.2.2) (2018-01-24)

#### 🚀 Features

- initial re-import as monorepo, update readme files, cleanup imports ([04ff6e9](https://github.com/thi-ng/umbrella/commit/04ff6e9))
