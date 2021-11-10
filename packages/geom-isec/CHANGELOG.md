# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.9](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@2.0.8...@thi.ng/geom-isec@2.0.9) (2021-11-10)

**Note:** Version bump only for package @thi.ng/geom-isec





## [2.0.8](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@2.0.7...@thi.ng/geom-isec@2.0.8) (2021-11-04)

**Note:** Version bump only for package @thi.ng/geom-isec





## [2.0.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@2.0.6...@thi.ng/geom-isec@2.0.7) (2021-11-03)

**Note:** Version bump only for package @thi.ng/geom-isec





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@1.0.5...@thi.ng/geom-isec@2.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@1.0.4...@thi.ng/geom-isec@1.0.5) (2021-09-03)

**Note:** Version bump only for package @thi.ng/geom-isec

##  [0.7.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@0.7.3...@thi.ng/geom-isec@0.7.4) (2021-01-02)

###  Bug Fixes

- **geom-isec:** fix [#269](https://github.com/thi-ng/umbrella/issues/269) update rayBox() ([441cddb](https://github.com/thi-ng/umbrella/commit/441cddbdc4707465a182f3fa903a4c6bdc4e9004))

#  [0.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@0.6.1...@thi.ng/geom-isec@0.7.0) (2020-11-24)

###  Features

- **geom-isec:** add pointIn3Circle/4Sphere() checks ([76d44bf](https://github.com/thi-ng/umbrella/commit/76d44bf9acd0078f5644dad867443ab83721c3c8))

#  [0.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@0.5.8...@thi.ng/geom-isec@0.6.0) (2020-09-22)

###  Bug Fixes

- **geom-isec:** testCenteredAABBSphere() ([95a29b1](https://github.com/thi-ng/umbrella/commit/95a29b199077c741c83f4f78871f9627264f198d))

###  Features

- **geom-isec:** update ray-line/polyline fns ([b3775b0](https://github.com/thi-ng/umbrella/commit/b3775b08e1c33cf7c2e94e0a4b119b33e4a104ba))

#  [0.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@0.4.26...@thi.ng/geom-isec@0.5.0) (2020-07-17)

###  Features

- **geom-isec:** add intersectLinePolylineAll() ([1f38d92](https://github.com/thi-ng/umbrella/commit/1f38d92e0d88c855251fa14627975b0bb1c7cf39))

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@0.3.10...@thi.ng/geom-isec@0.4.0) (2020-01-24)

###  Features

- **geom-isec:** add testBoxSphere nD version, minor optimizations ([122c187](https://github.com/thi-ng/umbrella/commit/122c1876375f638b35f9f576824f2af081008081))
- **geom-isec:** add testCenteredBoxSphere() & pointInCenteredBox() tests (nD) ([6c5af97](https://github.com/thi-ng/umbrella/commit/6c5af97a8da9bce307bc76f956c185c5e75a9e8d))

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@0.2.0...@thi.ng/geom-isec@0.3.0) (2019-07-07)

###  Bug Fixes

- **geom-isec:** add missing return type for intersectRayCircle() ([eaceb1a](https://github.com/thi-ng/umbrella/commit/eaceb1a))
- **geom-isec:** update madd & perpendicular call sites ([#95](https://github.com/thi-ng/umbrella/issues/95)) ([d2e9969](https://github.com/thi-ng/umbrella/commit/d2e9969))

###  Features

- **geom-isec:** enable TS strict compiler flags (refactor) ([4cdbd31](https://github.com/thi-ng/umbrella/commit/4cdbd31))

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-isec@0.1.16...@thi.ng/geom-isec@0.2.0) (2019-05-22)

###  Bug Fixes

- **geom-isec:** fix [#84](https://github.com/thi-ng/umbrella/issues/84), update pointInSegment, add tests ([2bef312](https://github.com/thi-ng/umbrella/commit/2bef312))

###  Features

- **geom-isec:** add ray-plane, plane-plane fns, update readme ([40a8bff](https://github.com/thi-ng/umbrella/commit/40a8bff))

#  0.1.0 (2019-02-05)

###  Features

- **geom-isec:** add ray-rect/aabb tests, fix ray-line, add NONE, update docs ([93e2ea6](https://github.com/thi-ng/umbrella/commit/93e2ea6))
- **geom-isec:** extract from geom as new package ([285dde4](https://github.com/thi-ng/umbrella/commit/285dde4))
- **geom-isec:** migrate point intersection/containment checks ([2b23546](https://github.com/thi-ng/umbrella/commit/2b23546))
