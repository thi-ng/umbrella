# Change Log

- **Last updated**: 2024-01-30T15:21:31Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [3.5.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.5.28) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [3.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.5.0) (2023-06-09)

#### 🚀 Features

- add AHashGrid.hasNeighborhood() ([4378125](https://github.com/thi-ng/umbrella/commit/4378125))
  - update HashGrid2/3 impls

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.4.0) (2023-04-25)

#### 🚀 Features

- add AHashGrid.get()/has() ([e94af0f](https://github.com/thi-ng/umbrella/commit/e94af0f))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.3.0) (2023-02-05)

#### 🚀 Features

- add AHashGrid and HashGrid2/3 impls ([493358a](https://github.com/thi-ng/umbrella/commit/493358a))

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.2.0) (2022-05-02)

#### 🚀 Features

- add custom dist fn for NdQuadtreeMap/Set too ([5fccbd3](https://github.com/thi-ng/umbrella/commit/5fccbd3))
  - minor refactor KdTreeMap dist fn handling

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.1.0) (2021-11-17)

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

### [3.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.0.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [3.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@3.0.0) (2021-10-12)

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
- update imports ([ec7199d](https://github.com/thi-ng/umbrella/commit/ec7199d))
- update imports ([b5368f0](https://github.com/thi-ng/umbrella/commit/b5368f0))
- update various benchmarks ([53e8a6a](https://github.com/thi-ng/umbrella/commit/53e8a6a))
- update imports (transducers) ([25b674f](https://github.com/thi-ng/umbrella/commit/25b674f))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))

### [2.1.33](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@2.1.33) (2021-01-21)

#### 🩹 Bug fixes

- size update in ASpatialGrid.set() ([b41f7ba](https://github.com/thi-ng/umbrella/commit/b41f7ba))

### [2.1.28](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@2.1.28) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))
- update type-only imports ([cd893cd](https://github.com/thi-ng/umbrella/commit/cd893cd))

### [2.1.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@2.1.24) (2020-09-22)

#### ♻️ Refactoring

- dedupe into() impls ([83b8cbd](https://github.com/thi-ng/umbrella/commit/83b8cbd))

### [2.1.23](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@2.1.23) (2020-09-13)

#### ♻️ Refactoring

- update imports ([4064e01](https://github.com/thi-ng/umbrella/commit/4064e01))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@2.1.0) (2020-04-23)

#### 🚀 Features

- add 2d/3d spatial grids ([e34c44d](https://github.com/thi-ng/umbrella/commit/e34c44d))

#### ♻️ Refactoring

- extract addResults(), update imports ([b322d95](https://github.com/thi-ng/umbrella/commit/b322d95))

### [2.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@2.0.2) (2020-02-25)

#### ♻️ Refactoring

- update imports ([401da1b](https://github.com/thi-ng/umbrella/commit/401da1b))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@2.0.0) (2020-01-24)

#### 🛑 Breaking changes

- add NdQuadTreeMap/Set, update/add KdTreeMap/Set ([7c6f7d2](https://github.com/thi-ng/umbrella/commit/7c6f7d2))
- BREAKING CHANGE: replace KdTree with KdTreeMap/Set

#### 🚀 Features

- add initial nD quadtree impl & tests ([6f59869](https://github.com/thi-ng/umbrella/commit/6f59869))
- add IEmpty & clear() impls ([af747d0](https://github.com/thi-ng/umbrella/commit/af747d0))

#### 🩹 Bug fixes

- use Heap in NdQtNode.query to select closest ([5fd6726](https://github.com/thi-ng/umbrella/commit/5fd6726))
  - NdQuadtreeMap.set/remove to update .size
  - minor updates KdTreeMap

#### ⏱ Performance improvements

- add benchmark ([a09bcba](https://github.com/thi-ng/umbrella/commit/a09bcba))

#### ♻️ Refactoring

- update fromMinMax factories, tests, minor updates ([7f30ee0](https://github.com/thi-ng/umbrella/commit/7f30ee0))
- minor updates NdQuadtreeSet ([1df4ab5](https://github.com/thi-ng/umbrella/commit/1df4ab5))

### [1.2.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@1.2.7) (2019-08-21)

#### ♻️ Refactoring

- simplify nearest()/nearest1(), dedupe/extract common ([1678b69](https://github.com/thi-ng/umbrella/commit/1678b69))
- simplify select*() methods, extract doSelect() ([002e3d1](https://github.com/thi-ng/umbrella/commit/002e3d1))

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@1.2.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([e19e6bc](https://github.com/thi-ng/umbrella/commit/e19e6bc))

#### ♻️ Refactoring

- address TS strictNullChecks flag ([e6e777f](https://github.com/thi-ng/umbrella/commit/e6e777f))

### [1.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@1.1.7) (2019-03-10)

#### 🩹 Bug fixes

- fix/update existing point search in add()/select*() ([8186f12](https://github.com/thi-ng/umbrella/commit/8186f12))

### [1.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@1.1.2) (2019-02-15)

#### 🩹 Bug fixes

- fix addAll(), addKeys() ([51959b7](https://github.com/thi-ng/umbrella/commit/51959b7))

#### ♻️ Refactoring

- update to use [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/main/packages/arrays) ([5efda38](https://github.com/thi-ng/umbrella/commit/5efda38))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@1.1.0) (2019-02-05)

#### 🚀 Features

- add selectVals() impl ([bd1754d](https://github.com/thi-ng/umbrella/commit/bd1754d))

### [1.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@1.0.2) (2019-01-31)

#### ⏱ Performance improvements

- optimize single nearest point search, fix select() ([9022d5b](https://github.com/thi-ng/umbrella/commit/9022d5b))
  - add nearest1() for single nearest point search
  - update select()/selectKeys() to use nearest1
  - fix buildSelection() to always use heap

### [1.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@1.0.1) (2019-01-21)

#### 🩹 Bug fixes

- add root null check for select/selectKeys() ([8fd5728](https://github.com/thi-ng/umbrella/commit/8fd5728))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@1.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

#### ♻️ Refactoring

- update to use new vectors package ([485051d](https://github.com/thi-ng/umbrella/commit/485051d))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-accel@0.1.0) (2018-10-21)

#### 🚀 Features

- re-import geom-accel skeleton (MBP2010) ([e14ac8b](https://github.com/thi-ng/umbrella/commit/e14ac8b))
- add KV support, update select/selectKeys() ([b47e641](https://github.com/thi-ng/umbrella/commit/b47e641))

#### ♻️ Refactoring

- move iterator into KdNode ([0c76c02](https://github.com/thi-ng/umbrella/commit/0c76c02))
