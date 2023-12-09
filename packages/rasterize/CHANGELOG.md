# Change Log

- **Last updated**: 2023-12-09T19:12:03Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.0.58](https://github.com/thi-ng/umbrella/tree/@thi.ng/rasterize@1.0.58) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

### [1.0.53](https://github.com/thi-ng/umbrella/tree/@thi.ng/rasterize@1.0.53) (2023-10-24)

#### 🩹 Bug fixes

- update arg types for point/vec arrays ([588aff8](https://github.com/thi-ng/umbrella/commit/588aff8))

### [1.0.37](https://github.com/thi-ng/umbrella/tree/@thi.ng/rasterize@1.0.37) (2023-08-12)

#### ♻️ Refactoring

- update .probability() call sites in various pkgs ([c8c8141](https://github.com/thi-ng/umbrella/commit/c8c8141))

### [1.0.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/rasterize@1.0.13) (2022-12-22)

#### ♻️ Refactoring

- update drawRect() (rows2d iterator changes) ([a77ee60](https://github.com/thi-ng/umbrella/commit/a77ee60))

# [1.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rasterize@1.0.0) (2022-09-27)

#### 🛑 Breaking changes

- add defBlendF/I shader fns, update Shader2D ([4656c50](https://github.com/thi-ng/umbrella/commit/4656c50))
- BREAKING CHANGE: update Shader2D args
  - add [@thi.ng/porter-duff](https://github.com/thi-ng/umbrella/tree/main/packages/porter-duff) dependency
  - update Shader2D args, pass target buffer as new initial arg
  - add `defBlendF()`/`defBlendI()` shader fns for PD blend ops

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rasterize@0.3.0) (2021-11-17)

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

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rasterize@0.2.0) (2021-11-10)

#### 🚀 Features

- update to new IGrid2D impls ([71ac0ca](https://github.com/thi-ng/umbrella/commit/71ac0ca))
  - add floodFillWith() for custom fill content/procedures
  - update/fix rect()
  - optimize __draw2D() for primitive values
  - add/update deps
- major update/additions ([e6f7fb0](https://github.com/thi-ng/umbrella/commit/e6f7fb0))
  - add new shapes (polyline, polygon)
  - add "shader" function support for all draw fns
  - add shader functions
  - rename drawLineWith() => traceLine()

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rasterize@0.1.0) (2021-11-03)

#### 🚀 Features

- import as new pkg ([585eb8d](https://github.com/thi-ng/umbrella/commit/585eb8d))
