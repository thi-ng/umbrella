# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.21](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@2.1.20...@thi.ng/geom@2.1.21) (2021-08-04)

**Note:** Version bump only for package @thi.ng/geom





## [2.1.20](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@2.1.19...@thi.ng/geom@2.1.20) (2021-07-27)

**Note:** Version bump only for package @thi.ng/geom





## [2.1.19](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@2.1.18...@thi.ng/geom@2.1.19) (2021-07-01)

**Note:** Version bump only for package @thi.ng/geom





## [2.1.18](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@2.1.17...@thi.ng/geom@2.1.18) (2021-06-08)

**Note:** Version bump only for package @thi.ng/geom





# [2.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@2.0.6...@thi.ng/geom@2.1.0) (2021-02-20)


### Bug Fixes

* **geom:** fix regression/update buffer arg types ([9cf5e5d](https://github.com/thi-ng/umbrella/commit/9cf5e5d43d648eecfdcba861f44acc4d3e9fd17c))


### Features

* **geom:** add tangentAt() support for cubic/quadratic ([4302f58](https://github.com/thi-ng/umbrella/commit/4302f58dd4d490fbb0b97754ae7d54f28a8fa269))





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.13.4...@thi.ng/geom@2.0.0) (2020-12-22)


### Bug Fixes

* **geom:** fix [#268](https://github.com/thi-ng/umbrella/issues/268) add Group.copyTransformed() ([2da6c63](https://github.com/thi-ng/umbrella/commit/2da6c63b5a2dbc45bc1272eaf592d3d74d8ce74e))


### Code Refactoring

* **geom:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace enum w/ type alias ([67988ad](https://github.com/thi-ng/umbrella/commit/67988ad31f478b28de85e40d8ab7c51501ef4acb))
* **geom:** fix [#256](https://github.com/thi-ng/umbrella/issues/256) replace Type enum w/ alias ([ef7ba74](https://github.com/thi-ng/umbrella/commit/ef7ba74c189755d760d84c700b0c970a281a3b04))


### BREAKING CHANGES

* **geom:** replace Type enum returned by IShape.type w/ string consts

- update all shape classes
- update all ops/multimethod dispatches
* **geom:** replace SegmentType w/ type alias





## [1.13.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.13.0...@thi.ng/geom@1.13.1) (2020-11-24)


### Bug Fixes

* **geom:** add missing translate() impls for Cubic/Quadratic ([fe4c027](https://github.com/thi-ng/umbrella/commit/fe4c027e8a652ccd7bf7513e9348f21560f50b9c))
* **geom:** update whitespace check in pathFromSvg() ([2ce5ec1](https://github.com/thi-ng/umbrella/commit/2ce5ec178bce371f3b8029ea1041f89e10500ead))





# [1.13.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.12.0...@thi.ng/geom@1.13.0) (2020-10-03)


### Bug Fixes

* **geom:** arg order pointAt() impl (RAY/RAY3) ([6ec9b46](https://github.com/thi-ng/umbrella/commit/6ec9b462ff4f6aaa0da8634f303ff37c329c8fdf))


### Features

* **vectors, geom:** point on ray at distance ([0b04b80](https://github.com/thi-ng/umbrella/commit/0b04b80f1eaa700e262f99d4726651c90d4fed2b))





# [1.12.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.11.8...@thi.ng/geom@1.12.0) (2020-09-22)


### Features

* **geom:** add basic text support ([9d1424d](https://github.com/thi-ng/umbrella/commit/9d1424d1c57e4d2c55fb6cfdd507f3ca7cd85dc3))





## [1.11.7](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.11.6...@thi.ng/geom@1.11.7) (2020-08-28)


### Bug Fixes

* **geom:** update asPolyline() for PATH/POLYGON ([243962c](https://github.com/thi-ng/umbrella/commit/243962ce4b2a690eb84e540f9d55d52d355edc39))





# [1.11.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.10.7...@thi.ng/geom@1.11.0) (2020-07-17)


### Bug Fixes

* **geom:** update svgDoc() attrib inject (add null check) ([6898975](https://github.com/thi-ng/umbrella/commit/6898975f9d1604486add067904ac284d3837dba6))


### Features

* **geom:** add PathBuilderOpts, update Path.toHiccup() ([deb9892](https://github.com/thi-ng/umbrella/commit/deb98927bd08f717abbee4d9a171bd3e3236cb00))
* **geom:** add/update clipVertex() impls ([a87c31c](https://github.com/thi-ng/umbrella/commit/a87c31cbb5be4ddd9c6159362386204f396d1f2e))





# [1.10.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.9.8...@thi.ng/geom@1.10.0) (2020-06-20)


### Features

* **geom:** add offset() & initial impls ([819afd1](https://github.com/thi-ng/umbrella/commit/819afd13896661266653a3b71b96ed0549b406ba))
* **geom:** add rectFromCentroid() ([7837961](https://github.com/thi-ng/umbrella/commit/78379612addef0563d09fccb3ed8bb9addd739fc))





## [1.9.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.9.2...@thi.ng/geom@1.9.3) (2020-05-14)


### Bug Fixes

* **geom:** Path.copy() deep-clone behavior ([2ade10e](https://github.com/thi-ng/umbrella/commit/2ade10e86e83076fd9499ad7ee863caf7c3b463d))





# [1.9.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.8.12...@thi.ng/geom@1.9.0) (2020-04-27)


### Features

* **geom:** add transformVertices() op ([ef68a27](https://github.com/thi-ng/umbrella/commit/ef68a2703aab83cf1b520a832a6b1c8268759a3b))
* **geom:** update asPolyline() impls ([cca8574](https://github.com/thi-ng/umbrella/commit/cca85744377c9957af82695236230bc75a005473))





# [1.8.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.7.10...@thi.ng/geom@1.8.0) (2020-02-25)


### Bug Fixes

* **geom:** add missing type annotation (asCubic) ([c4f7eae](https://github.com/thi-ng/umbrella/commit/c4f7eae7fe45a7e48e43420afe273a06d56ae936))


### Features

* **geom:** add cubic polyline impls ([263f2f9](https://github.com/thi-ng/umbrella/commit/263f2f9709045c40defcd79804a6b10dd44cb6b4))
* **geom:** add edges() impl for AABB ([b800686](https://github.com/thi-ng/umbrella/commit/b800686d42acf105764dddb6591eabc1ea72bcf8))
* **geom:** add fitIntoBounds3, fix [#202](https://github.com/thi-ng/umbrella/issues/202), [#206](https://github.com/thi-ng/umbrella/issues/206) ([19be3fa](https://github.com/thi-ng/umbrella/commit/19be3fa516147a7612515e80c11dfc9ebcff50b3))
* **geom:** add intersectionAABB/Rect() ([ecc9706](https://github.com/thi-ng/umbrella/commit/ecc9706c13d2bf7929b63fb8bf023d8ce2477268))
* **geom:** add Points3 and supporting ops ([7e1adb7](https://github.com/thi-ng/umbrella/commit/7e1adb7b0d4e78dc6988fe3c32e1fd6170914dc8))





# [1.7.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.6.1...@thi.ng/geom@1.7.0) (2019-07-12)

### Bug Fixes

* **geom:** update asCubic() circle impl (only 99.99% closed) ([36cdb4f](https://github.com/thi-ng/umbrella/commit/36cdb4f))

### Features

* **geom:** add asCubic() impls for circle, group, rect ([5ca4166](https://github.com/thi-ng/umbrella/commit/5ca4166))
* **geom:** add asPath(), update pathFromCubics() to accept opt attribs ([980af9f](https://github.com/thi-ng/umbrella/commit/980af9f))
* **geom:** add ellipse support for asCubic() ([4247801](https://github.com/thi-ng/umbrella/commit/4247801))
* **geom:** add polygon impl for asCubic(), add pathFromCubics() ([2faec7f](https://github.com/thi-ng/umbrella/commit/2faec7f))
* **geom:** add/update transform impls: arc, circle, ellipse, path, rect ([e77e7c2](https://github.com/thi-ng/umbrella/commit/e77e7c2))

# [1.6.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.5.0...@thi.ng/geom@1.6.0) (2019-07-07)

### Bug Fixes

* **geom:** update madd/maddN call sites ([#95](https://github.com/thi-ng/umbrella/issues/95)) ([a96e028](https://github.com/thi-ng/umbrella/commit/a96e028))

### Features

* **geom:** enable TS strict compiler flags (refactor) ([aa10de0](https://github.com/thi-ng/umbrella/commit/aa10de0))
* **geom:** TS strictNullChecks, update various classes & ops ([636dea7](https://github.com/thi-ng/umbrella/commit/636dea7))

# [1.5.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.4.2...@thi.ng/geom@1.5.0) (2019-05-22)

### Features

* **geom:** add Plane, Quad3 factories & ops ([2079bfe](https://github.com/thi-ng/umbrella/commit/2079bfe))

# [1.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.3.0...@thi.ng/geom@1.4.0) (2019-04-15)

### Features

* **geom:** add new shape factories & impls ([1a5ead1](https://github.com/thi-ng/umbrella/commit/1a5ead1))

# [1.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.2.21...@thi.ng/geom@1.3.0) (2019-04-11)

### Features

* **geom:** add AABB impls for vertices() & volume() ([a9ba010](https://github.com/thi-ng/umbrella/commit/a9ba010))
* **geom:** add inscribedSquare*() fns ([b1790b3](https://github.com/thi-ng/umbrella/commit/b1790b3))

# [1.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.1.1...@thi.ng/geom@1.2.0) (2019-02-05)

### Features

* **geom:** add ray-rect/aabb impls for intersects() ([5f7dd63](https://github.com/thi-ng/umbrella/commit/5f7dd63))

# [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@1.0.1...@thi.ng/geom@1.1.0) (2019-01-22)

### Bug Fixes

* **geom:** update Rect.toHiccup() format (separate widht/height vals) ([8c1df49](https://github.com/thi-ng/umbrella/commit/8c1df49))

### Features

* **geom:** add asPolyline() multi-fn ([c602379](https://github.com/thi-ng/umbrella/commit/c602379))
* **geom:** add attrib support to PathBuilder ([a017b10](https://github.com/thi-ng/umbrella/commit/a017b10))

# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@0.2.11...@thi.ng/geom@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/geom@0.1.0...@thi.ng/geom@0.2.0) (2018-10-21)

### Features

* **geom:** add IToCubic, add/update impls ([ce131d4](https://github.com/thi-ng/umbrella/commit/ce131d4))

# 0.1.0 (2018-10-17)

### Features

* **geom:** add ICollate & ICopy impls, re-add/update convexHull2 ([3b1bf64](https://github.com/thi-ng/umbrella/commit/3b1bf64))
* **geom:** add/update factory fns, arg handling, tessel, poly area ([555fc51](https://github.com/thi-ng/umbrella/commit/555fc51))
* **geom:** add/update interfaces & impls ([2657df6](https://github.com/thi-ng/umbrella/commit/2657df6))
* **geom:** add/update tessellate() impls ([fa87f1e](https://github.com/thi-ng/umbrella/commit/fa87f1e))
* **geom:** add/update various shape impls & ops ([3a20ef3](https://github.com/thi-ng/umbrella/commit/3a20ef3))
* **geom:** import (updated) old thi.ng/geom package (minus vectors) ([c03259c](https://github.com/thi-ng/umbrella/commit/c03259c))
* **geom:** re-add Arc2, update Circle2, update helper fns ([aa6b120](https://github.com/thi-ng/umbrella/commit/aa6b120))
* **geom:** re-import & refactor partial port of thi.ng/geom (clojure) ([d655ec2](https://github.com/thi-ng/umbrella/commit/d655ec2))
* **geom:** update all shape types, add interfaces & ops, update tests ([9c27c77](https://github.com/thi-ng/umbrella/commit/9c27c77))
