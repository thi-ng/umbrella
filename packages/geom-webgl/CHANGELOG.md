# Change Log

- **Last updated**: 2025-10-25T22:30:00Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom-webgl@0.1.0) (2024-06-21)

#### 🚀 Features

- import as new pkg ([75842ae](https://github.com/thi-ng/umbrella/commit/75842ae))
- add UV generators, update asWebGLModel() & opts ([6222d98](https://github.com/thi-ng/umbrella/commit/6222d98))
  - add generateUVPointIndex()
  - add generateUVBounds2()
  - update asWebGLModel() to return array of model specs
  - update tessellation opts/handling
  - update deps
- add 3d shape support, update default tessellator ([7fb0e90](https://github.com/thi-ng/umbrella/commit/7fb0e90))
  - add `asWebGLModel()` impls for: AABB, Polygon3, Quad3, Triangle3
  - use TESSELLATE_TRI_FAN_BOUNDARY as new default tessellator
  - update `defModel()` to support 3D geometry

#### 🩹 Bug fixes

- merge group options ([6ab7774](https://github.com/thi-ng/umbrella/commit/6ab7774))
- update group attrib handling ([5be3a28](https://github.com/thi-ng/umbrella/commit/5be3a28))

#### ♻️ Refactoring

- remove geom-api dep, update imports ([1a3ebca](https://github.com/thi-ng/umbrella/commit/1a3ebca))
