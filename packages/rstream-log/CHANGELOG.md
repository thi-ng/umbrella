# Change Log

- **Last updated**: 2024-03-01T15:22:50Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@5.1.0) (2024-02-28)

#### 🚀 Features

- update formatString() ([1ad60cc](https://github.com/thi-ng/umbrella/commit/1ad60cc))
  - add support for msg post-processing in formatString()
  - add/update docstrings

### [5.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@5.0.1) (2024-02-16)

#### 🩹 Bug fixes

- fix Logger.logEntry() & .childLogger() impls ([3484617](https://github.com/thi-ng/umbrella/commit/3484617))

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@5.0.0) (2024-02-16)

#### 🛑 Breaking changes

- update Logger impl, remove obsolete types ([36c8649](https://github.com/thi-ng/umbrella/commit/36c8649))
- BREAKING CHANGE: update Logger, remove obsolete types
  - Logger now a subclass of `ALogger` & implementing `ISubscriber` interface
    - instead of extending rstream `StreamMerge`, now exposes a `Stream` via `.stream`
    - adding child loggers now handled via `ILogger.childLogger()` or `ILogger.addChild()`
  - update tests

### [4.1.84](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@4.1.84) (2023-11-24)

#### 🩹 Bug fixes

- update Logger w/ API change ([21fb1e6](https://github.com/thi-ng/umbrella/commit/21fb1e6))

### [4.1.81](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@4.1.81) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [4.1.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@4.1.16) (2022-08-04)

#### ♻️ Refactoring

- deprecate LogEntry ([ef46381](https://github.com/thi-ng/umbrella/commit/ef46381))
  - use migrated type from [@thi.ng/logger](https://github.com/thi-ng/umbrella/tree/main/packages/logger) pkg

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@4.1.0) (2021-11-17)

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

### [4.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@4.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@4.0.0) (2021-10-12)

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
- update imports (transducers) ([7fc60cd](https://github.com/thi-ng/umbrella/commit/7fc60cd))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports in various pkgs (rstream) ([342cf54](https://github.com/thi-ng/umbrella/commit/342cf54))
- minor pkg restructure ([761de32](https://github.com/thi-ng/umbrella/commit/761de32))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@3.2.0) (2021-01-13)

#### 🚀 Features

- update default body format for formatString() ([841b062](https://github.com/thi-ng/umbrella/commit/841b062))
  - use [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/main/packages/strings) stringify() as default body format to automatically
    JSON.stringify array/objects
  - update deps & tests

### [3.1.52](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@3.1.52) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([479706b](https://github.com/thi-ng/umbrella/commit/479706b))

### [3.1.10](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@3.1.10) (2020-02-25)

#### ♻️ Refactoring

- update imports ([77a672f](https://github.com/thi-ng/umbrella/commit/77a672f))

### [3.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@3.1.5) (2019-09-21)

#### ♻️ Refactoring

- fix [#121](https://github.com/thi-ng/umbrella/issues/121), add shared log() method ([4ebf20e](https://github.com/thi-ng/umbrella/commit/4ebf20e))

### [3.1.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@3.1.4) (2019-08-21)

#### ♻️ Refactoring

- update Logger ctor to new rstream API ([30a0276](https://github.com/thi-ng/umbrella/commit/30a0276))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@3.1.0) (2019-07-07)

#### 🚀 Features

- add maskSecrets() format xform ([481a65d](https://github.com/thi-ng/umbrella/commit/481a65d))

#### ♻️ Refactoring

- TS strictNullChecks ([29ef1a5](https://github.com/thi-ng/umbrella/commit/29ef1a5))

### [3.0.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@3.0.13) (2019-04-26)

#### ♻️ Refactoring

- simplify level lookup in formatters ([1bebecd](https://github.com/thi-ng/umbrella/commit/1bebecd))

### [3.0.12](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@3.0.12) (2019-04-24)

#### ♻️ Refactoring

- update to use base types from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) pkg ([ef9bf8d](https://github.com/thi-ng/umbrella/commit/ef9bf8d))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@3.0.0) (2019-03-19)

#### 🛑 Breaking changes

- remove obsolete writeFile() fn ([1354171](https://github.com/thi-ng/umbrella/commit/1354171))
- BREAKING CHANGE: migrate writeFile() to new pkg [@thi.ng/rstream-log-file](https://github.com/thi-ng/umbrella/tree/main/packages/rstream-log-file)

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@2.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package scripts, outputs, imports in remaining packages ([f912a84](https://github.com/thi-ng/umbrella/commit/f912a84))
- BREAKING CHANGE: enable multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols

#### 🩹 Bug fixes

- remove __Level reverse enum lookup, update Level (non const) ([d89f28f](https://github.com/thi-ng/umbrella/commit/d89f28f))

#### ♻️ Refactoring

- use arrow fns ([14c00b2](https://github.com/thi-ng/umbrella/commit/14c00b2))
- use rstream nextID() util (fix regression) ([3e1467f](https://github.com/thi-ng/umbrella/commit/3e1467f))

### [1.0.60](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@1.0.60) (2018-09-24)

#### ⏱ Performance improvements

- `Level` => const enum ([fc6a4d3](https://github.com/thi-ng/umbrella/commit/fc6a4d3))
  - export `__Level` for reverse lookups

### [1.0.16](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@1.0.16) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

### [1.0.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@1.0.4) (2018-04-18)

#### 🩹 Bug fixes

- ID handling in Logger ctor ([3087776](https://github.com/thi-ng/umbrella/commit/3087776))

#### ♻️ Refactoring

- minor update matchID() ([08af60a](https://github.com/thi-ng/umbrella/commit/08af60a))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@1.0.0) (2018-04-15)

#### 🛑 Breaking changes

- update package structure & readme example ([e6c75b4](https://github.com/thi-ng/umbrella/commit/e6c75b4))
- BREAKING CHANGE: update package structure
  - rename src/transform => src/xform
  - move src/format.ts => src/xform/format.ts

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@0.6.0) (2018-03-21)

#### 🚀 Features

- update error handling, add [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) dep ([8a3e72e](https://github.com/thi-ng/umbrella/commit/8a3e72e))

### [0.5.40](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@0.5.40) (2018-03-21)

#### ♻️ Refactoring

- update Logger ctor arg handling ([2a1264a](https://github.com/thi-ng/umbrella/commit/2a1264a))

### [0.5.17](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@0.5.17) (2018-02-18)

#### ♻️ Refactoring

- update Logger ctor due to changes in StreamMerge ([5a728cb](https://github.com/thi-ng/umbrella/commit/5a728cb))
  - mark Logger instance as infinite stream merge (non-closing)

### [0.5.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@0.5.1) (2018-01-26)

#### 🩹 Bug fixes

- imports ([76c6734](https://github.com/thi-ng/umbrella/commit/76c6734))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@0.5.0) (2018-01-26)

#### 🩹 Bug fixes

- update module re-exports ([55c3b04](https://github.com/thi-ng/umbrella/commit/55c3b04))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@0.3.0) (2018-01-25)

#### 🚀 Features

- add ILogger ([8304c82](https://github.com/thi-ng/umbrella/commit/8304c82))
- add node check for writeFile() ([bc26d09](https://github.com/thi-ng/umbrella/commit/bc26d09))
- add support for body formatter (formatString()), add type aliases ([4048bec](https://github.com/thi-ng/umbrella/commit/4048bec))

### [0.2.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@0.2.2) (2018-01-25)

#### 🩹 Bug fixes

- project links in readme files ([e290d75](https://github.com/thi-ng/umbrella/commit/e290d75))

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/rstream-log@0.2.1) (2018-01-24)

#### 🚀 Features

- initial re-import as monorepo, update readme files, cleanup imports ([04ff6e9](https://github.com/thi-ng/umbrella/commit/04ff6e9))
