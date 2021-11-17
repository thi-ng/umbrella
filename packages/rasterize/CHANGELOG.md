# Change Log

Last updated: 2021-11-17T23:24:59Z

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code changes and/or
version bumps of transitive dependencies.

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

- major update/additions ([e6f7fb0](https://github.com/thi-ng/umbrella/commit/e6f7fb0))
  - add new shapes (polyline, polygon)
  - add "shader" function support for all draw fns
  - add shader functions
  - rename drawLineWith() => traceLine()
- update to new IGrid2D impls ([71ac0ca](https://github.com/thi-ng/umbrella/commit/71ac0ca))
  - add floodFillWith() for custom fill content/procedures
  - update/fix rect()
  - optimize __draw2D() for primitive values
  - add/update deps

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/rasterize@0.1.0) (2021-11-03)

#### 🚀 Features

- import as new pkg ([585eb8d](https://github.com/thi-ng/umbrella/commit/585eb8d))
