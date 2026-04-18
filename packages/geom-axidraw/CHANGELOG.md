# Change Log

- **Last updated**: 2026-04-18T11:32:55Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2023-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [1.0.62](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-axidraw@1.0.62/packages/geom-axidraw) (2025-12-03)

#### ♻️ Refactoring

- update for-loops (use const where possible) ([5ceaf1a](https://codeberg.org/thi.ng/umbrella/commit/5ceaf1a))

### [0.6.2](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-axidraw@0.6.2/packages/geom-axidraw) (2024-06-21)

#### ♻️ Refactoring

- internal updates to use new geom types ([d75b4df](https://codeberg.org/thi.ng/umbrella/commit/d75b4df))
- remove geom-api dep, update imports ([da2b13b](https://codeberg.org/thi.ng/umbrella/commit/da2b13b))
- dedupe handling of interleaved draw commands ([c387d86](https://codeberg.org/thi.ng/umbrella/commit/c387d86))

## [0.6.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-axidraw@0.6.0/packages/geom-axidraw) (2024-05-08)

#### 🚀 Features

- add complex polygon support for asAxiDraw() ([#464](https://codeberg.org/thi.ng/umbrella/issues/464)) ([756c781](https://codeberg.org/thi.ng/umbrella/commit/756c781))
- add rdom-klist example project, update readmes ([cd458ac](https://codeberg.org/thi.ng/umbrella/commit/cd458ac))
- add rdom-klist example project, update readmes ([531437f](https://codeberg.org/thi.ng/umbrella/commit/531437f))

#### ♻️ Refactoring

- internal update (polyline conversion) ([64a18b7](https://codeberg.org/thi.ng/umbrella/commit/64a18b7))
- update asAxiDraw() impls ([fca73d6](https://codeberg.org/thi.ng/umbrella/commit/fca73d6))

### [0.5.87](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-axidraw@0.5.87/packages/geom-axidraw) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([c104159](https://codeberg.org/thi.ng/umbrella/commit/c104159))

### [0.5.68](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-axidraw@0.5.68/packages/geom-axidraw) (2024-02-22)

#### ♻️ Refactoring

- update object destructuring in all pkgs & examples ([f36aeb0](https://codeberg.org/thi.ng/umbrella/commit/f36aeb0))

### [0.5.40](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-axidraw@0.5.40/packages/geom-axidraw) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://codeberg.org/thi.ng/umbrella/commit/e3085e4))

#### 🧪 Tests

- update/refactor tests to use bun test runner ([8f6edb1](https://codeberg.org/thi.ng/umbrella/commit/8f6edb1))
- update/rename test files/imports (still many broken) ([1cb3c49](https://codeberg.org/thi.ng/umbrella/commit/1cb3c49))

## [0.5.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-axidraw@0.5.0/packages/geom-axidraw) (2023-03-22)

#### 🚀 Features

- add support for new draw commands ([e5e994c](https://codeberg.org/thi.ng/umbrella/commit/e5e994c))
  - update asGeometry() to handle new move commands

## [0.4.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-axidraw@0.4.0/packages/geom-axidraw) (2023-03-19)

#### 🚀 Features

- add InterleaveOpts for point clouds ([78012a0](https://codeberg.org/thi.ng/umbrella/commit/78012a0))
  - add InterleaveOpts & docs
  - update AxiDrawAttribs
  - update point cloud processing to support command sequence interleaving
- add interleave opts support for shape groups ([57783ff](https://codeberg.org/thi.ng/umbrella/commit/57783ff))
  - update asAxiDraw() impl for shape groups

#### ♻️ Refactoring

- update draw command handling ([18cd5bc](https://codeberg.org/thi.ng/umbrella/commit/18cd5bc))
- update InterleaveOpts ([0866f9f](https://codeberg.org/thi.ng/umbrella/commit/0866f9f))

## [0.3.0](https://codeberg.org/thi.ng/umbrella/src/tag/@thi.ng/geom-axidraw@0.3.0/packages/geom-axidraw) (2023-01-10)

#### 🚀 Features

- add asGeometry() command visualization ([78199ba](https://codeberg.org/thi.ng/umbrella/commit/78199ba))

#### 🩹 Bug fixes

- update group attrib handling ([7f5d9a3](https://codeberg.org/thi.ng/umbrella/commit/7f5d9a3))
  - ensure `__samples` attrib is being properly merged
