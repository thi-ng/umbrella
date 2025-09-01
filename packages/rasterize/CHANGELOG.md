# Change Log

- **Last updated**: 2025-09-01T16:38:35Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.0.82](https://github.com/thi-ng/umbrella/tree/@thi.ng/rasterize@1.0.82) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://github.com/thi-ng/umbrella/commit/f36aeb0))

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
