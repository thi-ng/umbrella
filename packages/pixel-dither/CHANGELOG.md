# Change Log

- **Last updated**: 2024-01-30T15:21:31Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.1.84](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-dither@1.1.84) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-dither@1.1.0) (2021-11-17)

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

### [1.0.9](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-dither@1.0.9) (2021-11-04)

#### ♻️ Refactoring

- minor changes (rename types) ([4fc248a](https://github.com/thi-ng/umbrella/commit/4fc248a))

### [1.0.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-dither@1.0.8) (2021-11-03)

#### ♻️ Refactoring

- minor update ([69b3028](https://github.com/thi-ng/umbrella/commit/69b3028))

### [1.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-dither@1.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports
- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/pixel-dither@0.1.0) (2021-10-12)

#### 🚀 Features

- import as new pkg ([4294df4](https://github.com/thi-ng/umbrella/commit/4294df4))
- add ditherWithKernel() & various presets ([e2ce82a](https://github.com/thi-ng/umbrella/commit/e2ce82a))

#### ♻️ Refactoring

- simplify kernel defs/handling ([3d9d807](https://github.com/thi-ng/umbrella/commit/3d9d807))
  - update ditherWith() to only require DitherKernel
  - remove obsolete DitherKernelFactory type alias
