# Change Log

- **Last updated**: 2022-08-06T15:22:27Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.1.0) (2021-11-17)

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

### [3.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.0.8) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@3.0.0) (2021-10-12)

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

#### 🚀 Features

- add timeDiff, Timestamp type ([c612de0](https://github.com/thi-ng/umbrella/commit/c612de0))

#### ♻️ Refactoring

- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@2.1.0) (2021-03-12)

#### 🚀 Features

- add suite & formatters, update benchmark() ([5ea02bd](https://github.com/thi-ng/umbrella/commit/5ea02bd))
  - add `suite()` benchmark runner
  - update `BenchmarkOpts` & `benchmark()`
    - add `size` option to configure calls per iteration
    - add `format` option to configure formatter
  - add `BenchmarkFormatter` interface
  - add `FORMAT_DEFAULT`, `FORMAT_CSV` & `FORMAT_MD` formatters

### [2.0.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@2.0.24) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([e6c8d98](https://github.com/thi-ng/umbrella/commit/e6c8d98))

### [2.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@2.0.6) (2020-04-03)

#### 🩹 Bug fixes

- update timedResult() to always downscale to ms ([fb2c632](https://github.com/thi-ng/umbrella/commit/fb2c632))
- fallback handlingin now() ([6494851](https://github.com/thi-ng/umbrella/commit/6494851))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@2.0.1) (2020-02-25)

#### ♻️ Refactoring

- update imports ([cfdcd3a](https://github.com/thi-ng/umbrella/commit/cfdcd3a))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@2.0.0) (2020-01-24)

#### 🛑 Breaking changes

- add types, benchmark(), bigint timestamps, restructure ([e0af94c](https://github.com/thi-ng/umbrella/commit/e0af94c))
  - split module into separate files
  - add BenchmarkOpts / BenchmarkResult types
  - add benchmark()
  - add now() timestamp fn (uses nanosec timer on Node)
- BREAKING CHANGE: Though no public API change, this library internally
  uses ES BigInt timestamps now (in Node via `process.hrtime.bigint()`).

#### 🩹 Bug fixes

- update now() to only OPTIONALLY use bigint timestamps ([7ac391b](https://github.com/thi-ng/umbrella/commit/7ac391b))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@0.3.0) (2018-10-21)

#### 🚀 Features

- add timedResult() / benchResult() ([0cf708f](https://github.com/thi-ng/umbrella/commit/0cf708f))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@0.2.0) (2018-08-28)

#### 🚀 Features

- add opt prefix arg, update docs ([4a37367](https://github.com/thi-ng/umbrella/commit/4a37367))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/bench@0.1.0) (2018-05-10)

#### 🚀 Features

- add new package [@thi.ng/bench](https://github.com/thi-ng/umbrella/tree/main/packages/bench) ([9466d4b](https://github.com/thi-ng/umbrella/commit/9466d4b))
