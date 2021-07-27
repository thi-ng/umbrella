# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.52](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@2.1.51...@thi.ng/geom-accel@2.1.52) (2021-07-27)

**Note:** Version bump only for package @thi.ng/geom-accel





## [2.1.51](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@2.1.50...@thi.ng/geom-accel@2.1.51) (2021-07-01)

**Note:** Version bump only for package @thi.ng/geom-accel





## [2.1.50](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@2.1.49...@thi.ng/geom-accel@2.1.50) (2021-06-08)

**Note:** Version bump only for package @thi.ng/geom-accel





## [2.1.33](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@2.1.32...@thi.ng/geom-accel@2.1.33) (2021-01-21)


### Bug Fixes

* **geom-accel:** size update in ASpatialGrid.set() ([b41f7ba](https://github.com/thi-ng/umbrella/commit/b41f7ba38b454f6790c640d9363faa56ebe2190e))





# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@2.0.11...@thi.ng/geom-accel@2.1.0) (2020-04-23)


### Features

* **geom-accel:** add 2d/3d spatial grids ([e34c44d](https://github.com/thi-ng/umbrella/commit/e34c44d624026bbce946d904c5b861f7a48fd484))





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.2.10...@thi.ng/geom-accel@2.0.0) (2020-01-24)

### Bug Fixes

* **geom-accel:** use Heap in NdQtNode.query to select closest ([5fd6726](https://github.com/thi-ng/umbrella/commit/5fd67260eeb85cfce8216bc3a3d9e5d304f3d846))

### Features

* **geom-accel:** add IEmpty & clear() impls ([af747d0](https://github.com/thi-ng/umbrella/commit/af747d0e607f193b02e2e9d561d66ce588a8bdc8))
* **geom-accel:** add initial nD quadtree impl & tests ([6f59869](https://github.com/thi-ng/umbrella/commit/6f59869f80222d200c68083b2dad5c1a8da731a0))
* **geom-accel:** add NdQuadTreeMap/Set, update/add KdTreeMap/Set ([7c6f7d2](https://github.com/thi-ng/umbrella/commit/7c6f7d249780dbfcabd60e3f8f6369fb1b42998d))

### Performance Improvements

* **geom-accel:** add benchmark ([a09bcba](https://github.com/thi-ng/umbrella/commit/a09bcbacae2cd7f1e284baaa47f40f64ed6a327e))

### BREAKING CHANGES

* **geom-accel:** replace KdTree with KdTreeMap/Set

# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.1.17...@thi.ng/geom-accel@1.2.0) (2019-07-07)

### Features

* **geom-accel:** enable TS strict compiler flags (refactor) ([e19e6bc](https://github.com/thi-ng/umbrella/commit/e19e6bc))

## [1.1.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.1.6...@thi.ng/geom-accel@1.1.7) (2019-03-10)

### Bug Fixes

* **geom-accel:** fix/update existing point search in add()/select*() ([8186f12](https://github.com/thi-ng/umbrella/commit/8186f12))

## [1.1.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.1.1...@thi.ng/geom-accel@1.1.2) (2019-02-15)

### Bug Fixes

* **geom-accel:** fix addAll(), addKeys() ([51959b7](https://github.com/thi-ng/umbrella/commit/51959b7))

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.0.2...@thi.ng/geom-accel@1.1.0) (2019-02-05)

### Features

* **geom-accel:** add selectVals() impl ([bd1754d](https://github.com/thi-ng/umbrella/commit/bd1754d))

### Performance Improvements

* **geom-accel:** optimize single nearest point search, fix select() ([9022d5b](https://github.com/thi-ng/umbrella/commit/9022d5b))

## [1.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@1.0.0...@thi.ng/geom-accel@1.0.1) (2019-01-21)

### Bug Fixes

* **geom-accel:** add root null check for select/selectKeys() ([8fd5728](https://github.com/thi-ng/umbrella/commit/8fd5728))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom-accel@0.1.11...@thi.ng/geom-accel@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# 0.1.0 (2018-10-21)

### Features

* **geom-accel:** add KV support, update select/selectKeys() ([b47e641](https://github.com/thi-ng/umbrella/commit/b47e641))
* **geom-accel:** re-import geom-accel skeleton (MBP2010) ([e14ac8b](https://github.com/thi-ng/umbrella/commit/e14ac8b))
