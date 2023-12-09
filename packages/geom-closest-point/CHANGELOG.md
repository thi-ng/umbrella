# Change Log

- **Last updated**: 2023-12-09T19:12:03Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [2.1.82](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@2.1.82) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [2.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@2.1.0) (2021-11-17)

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

### [2.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@2.0.9) (2021-11-10)

#### ♻️ Refactoring

- update all countdown loops ([a5f374b](https://github.com/thi-ng/umbrella/commit/a5f374b))

### [2.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@2.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@2.0.0) (2021-10-12)

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
- update imports ([a2f825d](https://github.com/thi-ng/umbrella/commit/a2f825d))

### [0.5.4](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@0.5.4) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports in various tests/pkgs ([3fd9c24](https://github.com/thi-ng/umbrella/commit/3fd9c24))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@0.5.0) (2020-09-22)

#### 🚀 Features

- add support for custom dist fn ([95557f6](https://github.com/thi-ng/umbrella/commit/95557f6))

#### 🩹 Bug fixes

- update closestPointPolyline() ([1358bac](https://github.com/thi-ng/umbrella/commit/1358bac))
  - add check if at least a single closest point has been found

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@0.4.0) (2020-09-13)

#### 🚀 Features

- add ellipse support, restructure pkg ([d331b26](https://github.com/thi-ng/umbrella/commit/d331b26))
  - add `closestPointEllipse()`

#### 🩹 Bug fixes

- use alt algorithm closestPointEllipse() ([6b3d00f](https://github.com/thi-ng/umbrella/commit/6b3d00f))
  - new approach has no weird edge cases as previous

#### ♻️ Refactoring

- update deps, imports, use new Fn types ([dcef770](https://github.com/thi-ng/umbrella/commit/dcef770))

### [0.3.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@0.3.7) (2019-08-21)

#### ♻️ Refactoring

- update closestPointRect/AABB (re-use) ([0c33878](https://github.com/thi-ng/umbrella/commit/0c33878))
  - extract closestBoxEdge()

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@0.3.0) (2019-07-07)

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([b6b69e6](https://github.com/thi-ng/umbrella/commit/b6b69e6))

#### 🩹 Bug fixes

- update polyline & point array fns ([c5b4757](https://github.com/thi-ng/umbrella/commit/c5b4757))
- type hints (TS 3.5.2) ([fa146d7](https://github.com/thi-ng/umbrella/commit/fa146d7))

#### ♻️ Refactoring

- TS strictNullChecks, update return types ([f1b8ef9](https://github.com/thi-ng/umbrella/commit/f1b8ef9))

### [0.2.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@0.2.3) (2019-05-22)

#### 🩹 Bug fixes

- flip sign of plane W component, extract distToPlane() ([74dbcb0](https://github.com/thi-ng/umbrella/commit/74dbcb0))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-closest-point@0.2.0) (2019-04-15)

#### 🚀 Features

- add fns for more shape types ([5ae2887](https://github.com/thi-ng/umbrella/commit/5ae2887))
  - closestPointLine
  - distToLine
  - closestPointPlane
  - closestPointCircle/Sphere
  - closestPointAABB/Rect
