# Change Log

- **Last updated**: 2023-12-09T19:12:03Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.2.61](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@2.2.61) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@2.2.0) (2022-09-21)

#### 🚀 Features

- add quadraticFromCubic() conversion ([0060a36](https://github.com/thi-ng/umbrella/commit/0060a36))

### [2.1.22](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@2.1.22) (2022-08-06)

#### ⏱ Performance improvements

- update vector fns ([3fcfc51](https://github.com/thi-ng/umbrella/commit/3fcfc51))

### [2.1.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@2.1.8) (2022-03-11)

#### ♻️ Refactoring

- minor refactor internal helper ([82c0cea](https://github.com/thi-ng/umbrella/commit/82c0cea))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@2.1.0) (2021-11-17)

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

### [2.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@2.0.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@2.0.0) (2021-10-12)

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
- update all test stubs ([f2d6d53](https://github.com/thi-ng/umbrella/commit/f2d6d53))
- update imports ([a541240](https://github.com/thi-ng/umbrella/commit/a541240))

### [0.5.37](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@0.5.37) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

### [0.5.32](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@0.5.32) (2020-09-13)

#### ♻️ Refactoring

- update deps, imports, use new Fn types ([780a7b7](https://github.com/thi-ng/umbrella/commit/780a7b7))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@0.5.0) (2020-02-25)

#### 🚀 Features

- add openCubicFromControlPoints(), [#208](https://github.com/thi-ng/umbrella/issues/208) ([1a95d94](https://github.com/thi-ng/umbrella/commit/1a95d94))
- add sampleCubicArray(), sampleQuadraticArray(), [#208](https://github.com/thi-ng/umbrella/issues/208) ([bfc09db](https://github.com/thi-ng/umbrella/commit/bfc09db))
- add openCubicFromBreakPoints(), refactor, [#208](https://github.com/thi-ng/umbrella/issues/208) ([1882262](https://github.com/thi-ng/umbrella/commit/1882262))

#### ♻️ Refactoring

- update imports ([03f629d](https://github.com/thi-ng/umbrella/commit/03f629d))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@0.4.0) (2019-08-21)

#### 🚀 Features

- add cubicTangentAt / quadraticTangentAt() ([e1cf355](https://github.com/thi-ng/umbrella/commit/e1cf355))

#### ♻️ Refactoring

- update cubicBounds() & sampleCubic/Quadratic() ([c3f0973](https://github.com/thi-ng/umbrella/commit/c3f0973))
  - extract private __sample() HOF & re-use
- split up closedCubicFromControlPoints() ([17ac114](https://github.com/thi-ng/umbrella/commit/17ac114))

### [0.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@0.3.1) (2019-07-31)

#### 🩹 Bug fixes

- fix seg count in cubicFromArc(), minor optimizations ([e289ade](https://github.com/thi-ng/umbrella/commit/e289ade))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@0.3.0) (2019-07-12)

#### 🚀 Features

- add closedCubicFromBreak/ControlPoints, update readme ([1284f37](https://github.com/thi-ng/umbrella/commit/1284f37))

#### 🩹 Bug fixes

- fix [#100](https://github.com/thi-ng/umbrella/issues/100), replace cubicBounds impl ([6c64b88](https://github.com/thi-ng/umbrella/commit/6c64b88))
- add full circle check for cubicFromArc() ([3e386f7](https://github.com/thi-ng/umbrella/commit/3e386f7))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-splines@0.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([748417b](https://github.com/thi-ng/umbrella/commit/748417b))

#### ♻️ Refactoring

- TS strictNullChecks, update return types ([198fb4c](https://github.com/thi-ng/umbrella/commit/198fb4c))
