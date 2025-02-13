# Change Log

- **Last updated**: 2025-02-13T16:03:11Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
Only versions published since **2022-01-01** are listed here.
Please consult the Git history for older version information.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

### [8.1.22](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@8.1.22) (2025-01-14)

#### ♻️ Refactoring

- use optional chaining & nullish coalescing ([c5a0a13](https://github.com/thi-ng/umbrella/commit/c5a0a13))

### [8.1.11](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@8.1.11) (2024-10-05)

#### ♻️ Refactoring

- add explicit type casts (TS5.6.2) ([dcbdd60](https://github.com/thi-ng/umbrella/commit/dcbdd60))

## [8.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@8.1.0) (2024-08-10)

#### 🚀 Features

- add circle inversion functions ([bb3a322](https://github.com/thi-ng/umbrella/commit/bb3a322))
  - add invertCircle(), invertCirclePoint()

### [8.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@8.0.1) (2024-06-29)

#### 🩹 Bug fixes

- add missing pkg exports ([7ec144f](https://github.com/thi-ng/umbrella/commit/7ec144f))

# [8.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@8.0.0) (2024-06-21)

#### 🛑 Breaking changes

- add/update asCubic()/asPath() impls/types/signatures ([9b4df2e](https://github.com/thi-ng/umbrella/commit/9b4df2e))
- BREAKING CHANGE: update asCubic/asPath() to use new CubicOpts
  - add support for more shape types, incl. 3D
- update svgDoc(), add SVGDocAttribs ([a26628b](https://github.com/thi-ng/umbrella/commit/a26628b))
- BREAKING CHANGE: rename `__bleed` attrib => `__margin`
  - set default SVG precision to 3 (fractional digits)
- update clipConvex(), add support for more shape types ([5d594c6](https://github.com/thi-ng/umbrella/commit/5d594c6))
- BREAKING CHANGE: update clipConvex() to return array of result shapes (rather than single)
  - add support for polyline & open paths
- update/extend tessellate() to use new setup/behavior ([c4dadfd](https://github.com/thi-ng/umbrella/commit/c4dadfd))
- BREAKING CHANGE: update/extend tessellate() to use new setup/behavior
  - update signature to return `Tessellation`
  - add/update impls for complex polygons & groups
  - add `groupFromTessellation()` to process tessellation results
  - add `TESSELLATE_EARCUT_COMPLEX` preset
  - remove `TESSELLATE_EDGE_SPLIT_THRESHOLD` & `TESSELLATE_TRI_FAN_SPLIT_THRESHOLD` (see [97f1f66200](https://github.com/thi-ng/umbrella/commit/97f1f66200))
- migrate types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api) ([3182726](https://github.com/thi-ng/umbrella/commit/3182726))
- BREAKING CHANGE: migrate/internalize types from [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/main/packages/geom-api)
  - add/migrate:
    - Attribs, GroupAttribs, IAttributed
    - IShape, IShape2/3
    - AABBLike, SphereLike
    - PCLike, PCLikeConstructor
    - IHiccupShape, IHiccupShape2/3
    - SegmentType2/3
    - PathSegment, PathSegment2/3
    - HiccupPathSegment, IHiccupPathSegment
    - CubicOpts
  - re-export types from geom helper packages (to avoid extraneous imports in user code):
    - IntersectionResult, IntersectionType, NONE (geom-isec)
    - SamplingOpts, setDefaultSamples (geom-resample)
    - SubdivKernel (geom-subdiv-curve)
    - Tessellator, Tessellation (geom-tessellate)
  - update CubicOpts.mode, rename `breakpoints` => `break`
  - update imports
  - update deps
- update tessellate() for new API ([4c6a5f4](https://github.com/thi-ng/umbrella/commit/4c6a5f4))
- BREAKING CHANGE: update tessellate() for new API
  - add optional ITessellation arg
  - add `basicTessellation()` & `meshTessellation()` factory fns
  - update tessellation post-processors (`graphFromTessellation()` etc.)
- update PathBuilder to support 2D/3D, add pathBuilder3() ([dcf5210](https://github.com/thi-ng/umbrella/commit/dcf5210))
- BREAKING CHANGE: PathBuilder now using injected segment ctors
  - users should only use pathBuilder() & pathBuilder3() factory functions
  - add internal P2D & P3D shape ctor configs
  - update PathBuilder ctor & internals to use injected shape ctors for segments
  - update pathFromSvg()
  - migrate roundedRect() to own file

#### 🚀 Features

- add/update various 2d/3d shape types ([262188c](https://github.com/thi-ng/umbrella/commit/262188c))
  - add 3d shape types & factory functions:
    - Cubic3
    - Line3
    - Path3
    - Points3
    - Polygon3
    - Polyline3
    - Quad3
    - Quadratic3
    - Ray3
    - Triangle3
  - update existing shape type impls & ctors/factories
- add/update rotate, scale, translate, transform ops (signatures & type support, impls) ([cb04a96](https://github.com/thi-ng/umbrella/commit/cb04a96))
- add rotateAroundAxis(), add rotateX/Y/Z() ops ([8831cc1](https://github.com/thi-ng/umbrella/commit/8831cc1))
- update applyTransforms(), add support for 3D shapes/transforms ([91be2ec](https://github.com/thi-ng/umbrella/commit/91be2ec))
- add/update internal helpers ([10a73f2](https://github.com/thi-ng/umbrella/commit/10a73f2))
- add/update bounds() impls and fitIntoBounds2/3() types/signatures ([e7a0b5c](https://github.com/thi-ng/umbrella/commit/e7a0b5c))
- add/update asPolygon()/asPolyline() / vertices() impls/types/signatures ([3ba9714](https://github.com/thi-ng/umbrella/commit/3ba9714))
- add/update resample()/simplify()/subdivCurve() impls ([1682577](https://github.com/thi-ng/umbrella/commit/1682577))
- add/update splitAt()/splitArcLength() impls/types ([e6f9e64](https://github.com/thi-ng/umbrella/commit/e6f9e64))
- add/update clipConvex()/convexHull() impls/types ([a6215c7](https://github.com/thi-ng/umbrella/commit/a6215c7))
- add shape types support for flip() ([9628c7b](https://github.com/thi-ng/umbrella/commit/9628c7b))
- add shape types support for arcLength() & center() ([2a9af0d](https://github.com/thi-ng/umbrella/commit/2a9af0d))
- add Group3 shape type, update pkg exports ([1646263](https://github.com/thi-ng/umbrella/commit/1646263))
- add sector() path builder ([807b5f1](https://github.com/thi-ng/umbrella/commit/807b5f1))
- update SVG default attribs & handling ([f80f67a](https://github.com/thi-ng/umbrella/commit/f80f67a))
  - update setSvgDefaultAttribs() to allow merging
- add/update splitAt() & splitNearPoint() impls ([1851b1d](https://github.com/thi-ng/umbrella/commit/1851b1d))
- add planeFromRay() ([c44d8da](https://github.com/thi-ng/umbrella/commit/c44d8da))
- add 2d line impl for classifyPoint() ([92e54ea](https://github.com/thi-ng/umbrella/commit/92e54ea))
- fix [#429](https://github.com/thi-ng/umbrella/issues/429), add polygon support for classifyPoint() ([b56ecc1](https://github.com/thi-ng/umbrella/commit/b56ecc1))
  - refactor plane impl
- add/update subdivCurve() type support, args & impls ([6233379](https://github.com/thi-ng/umbrella/commit/6233379))
- update AABB & Rect ctors to clamp size to zero ([7cec7d2](https://github.com/thi-ng/umbrella/commit/7cec7d2))
- add convolve() w/ impls for poly/polyline (incl. 3d versions) ([b682d34](https://github.com/thi-ng/umbrella/commit/b682d34))
  - also re-export kernel presets (KERNEL_BOX, KERNEL_TRIANGLE, KERNEL_GAUSSIAN)
- update convolve(), add ComplexPolygon support ([bfaa0aa](https://github.com/thi-ng/umbrella/commit/bfaa0aa))
- add/update/fix type info, docs & impls for various ops ([d5ccb1a](https://github.com/thi-ng/umbrella/commit/d5ccb1a))
- update convolve(), add group support ([00bdc66](https://github.com/thi-ng/umbrella/commit/00bdc66))
- add Dummy shape type to wrap arbitrary hiccup data ([b6e18bc](https://github.com/thi-ng/umbrella/commit/b6e18bc))
- add various dummy op impls for Dummy shape type ([05eeb9f](https://github.com/thi-ng/umbrella/commit/05eeb9f))
- add arcLength(), area() default impls (return 0) ([f2a30bf](https://github.com/thi-ng/umbrella/commit/f2a30bf))
- add TESSELLATE_EDGE_SPLIT_THRESHOLD() tessellator ([1d8feff](https://github.com/thi-ng/umbrella/commit/1d8feff))
- add new tessellators presets ([95d6f70](https://github.com/thi-ng/umbrella/commit/95d6f70))
  - add TESSELLATE_TRI_FAN_SPLIT
  - add TESSELLATE_TRI_FAN_SPLIT_THRESHOLD
- add tessellation post-processing helpers ([7687975](https://github.com/thi-ng/umbrella/commit/7687975))
  - add graphFromTessellation()
  - add edgesFromTessellation()
  - add edgePointsFromTessellation()
  - update deps (adjacency)
  - update pkg exports/meta
- add smoothPolygon()/smoothPolyline() ([217a8c2](https://github.com/thi-ng/umbrella/commit/217a8c2))
- add warpPoint(), add docs ([bf91ff3](https://github.com/thi-ng/umbrella/commit/bf91ff3))
- add internal __ensurePCLike() helper ([7306b35](https://github.com/thi-ng/umbrella/commit/7306b35))
- update tessellate(), add `TESSELLATE_TRI_FAN_BOUNDARY` ([1c0d1ce](https://github.com/thi-ng/umbrella/commit/1c0d1ce))
- add AABB impl for `asPolygon()` ([16e005c](https://github.com/thi-ng/umbrella/commit/16e005c))
- update/extend subdivCurve() shape type support ([b389db1](https://github.com/thi-ng/umbrella/commit/b389db1))
  - add docs
  - add example
- update subdivCurve() to reflect new API, update kernel presets ([b715d43](https://github.com/thi-ng/umbrella/commit/b715d43))
  - update/rename subdiv kernels to reflect upstream changes (cd69dd4e20)
  - update subdivCurve() impls
  - update docs
- add `ICopyTransformed` interface & impls for various shape types ([35781b2](https://github.com/thi-ng/umbrella/commit/35781b2))
- update/extend/simplify resample() impls ([c13c37a](https://github.com/thi-ng/umbrella/commit/c13c37a))
- update/extend/simplify convolve() impls, fix kernel naming ([5907a2a](https://github.com/thi-ng/umbrella/commit/5907a2a))
- add AABBLike.min(), fix AABBLike.offset() impls ([a4dec6b](https://github.com/thi-ng/umbrella/commit/a4dec6b))
- add centerOfWeight(), centroidOfBounds(), update centroid() ([9048aac](https://github.com/thi-ng/umbrella/commit/9048aac))
  - update centroid() impls for complex poly & poly, moved to centerOfWeight()
  - update centroid() to support more types
  - update pkg exports
- add/update iterator impls, add IEmpty impls ([0a15df5](https://github.com/thi-ng/umbrella/commit/0a15df5))
  - update ComplexPolygon
  - update Path/Path3
- update asPolygon() / asPolyline() ([80b8d9a](https://github.com/thi-ng/umbrella/commit/80b8d9a))
  - add support for more types
  - dedupe impls
- update pathFromCubics() closed shape check ([10a7558](https://github.com/thi-ng/umbrella/commit/10a7558))
  - use eqDelta() to check if path is closed
- update splitAt()/splitNearPoint() ([d863cdd](https://github.com/thi-ng/umbrella/commit/d863cdd))
  - add support for more shape types
  - dedupe internals
- add IPath, update Path/Path3 impls ([eb7a97d](https://github.com/thi-ng/umbrella/commit/eb7a97d))
- merge 2D/3D versions of pathFromCubics() & normalizedPath() ([159cd56](https://github.com/thi-ng/umbrella/commit/159cd56))
  - add PathConstructor type
  - update pathFromCubics() & normalizedPath()
  - migrate fns to separate files
  - update asPath()

#### 🩹 Bug fixes

- fix path `__samples` attrib handling in asPolygon() & asPolyline() impls ([3d7bd8c](https://github.com/thi-ng/umbrella/commit/3d7bd8c))
- update various transform op impls for ComplexPolygon ([1e12707](https://github.com/thi-ng/umbrella/commit/1e12707))
  - minor other internal refactoring
- update attrib checks in applyTransforms() ([a19f7be](https://github.com/thi-ng/umbrella/commit/a19f7be))
- fix vertices() impl for Polygon3 ([a968737](https://github.com/thi-ng/umbrella/commit/a968737))
- update pathFromCubics to mark path as closed if needed ([c95b5a8](https://github.com/thi-ng/umbrella/commit/c95b5a8))
- fix typo in centroid() dispatch table ([f1f986b](https://github.com/thi-ng/umbrella/commit/f1f986b))
- rename KERNEL_TRIANGLE, fix pkg exports ([ed776ed](https://github.com/thi-ng/umbrella/commit/ed776ed))

#### ⏱ Performance improvements

- update rotate() impls to reuse precomputed matrices ([00e33f0](https://github.com/thi-ng/umbrella/commit/00e33f0))
- internal update shape attrib copying ([fe0609a](https://github.com/thi-ng/umbrella/commit/fe0609a))
  - rename __copyAttribsRaw => __copyAttribs
  - avoid extraneous fn calls

#### ♻️ Refactoring

- update offset() & union() ops/signatures ([a943342](https://github.com/thi-ng/umbrella/commit/a943342))
- rename sector() => asSector(), minor refactor ([d1fb9bf](https://github.com/thi-ng/umbrella/commit/d1fb9bf))
- minor internal updates asPolygon() ([599572e](https://github.com/thi-ng/umbrella/commit/599572e))
- rename Dummy => Extra (dummy() => extra()) ([beb4bf0](https://github.com/thi-ng/umbrella/commit/beb4bf0))
  - update various op impls
  - update pkg exports
- update group to use GroupAttribs ([6f913ff](https://github.com/thi-ng/umbrella/commit/6f913ff))
- update SVGDocAttribs ([102bb5c](https://github.com/thi-ng/umbrella/commit/102bb5c))
  - remove `__prec` (now part of base`Attribs`)
- dedupe 2d/3d versions of pathFromCubics(), normalizedPath() ([da8ed42](https://github.com/thi-ng/umbrella/commit/da8ed42))
- simplify `applyTransforms()` for groups ([d1f5873](https://github.com/thi-ng/umbrella/commit/d1f5873))
- simplify various shape transform ops & impls ([ba32846](https://github.com/thi-ng/umbrella/commit/ba32846))
  - better re-use of impls for `PCLike` types
  - remove obsolete internal helpers
- simplify subdivCurve() impls ([e978fab](https://github.com/thi-ng/umbrella/commit/e978fab))
- minor internal updates ([644a478](https://github.com/thi-ng/umbrella/commit/644a478))
- minor update complex poly hiccup serialization ([b394842](https://github.com/thi-ng/umbrella/commit/b394842))
- enforce uniform naming convention of internal functions ([56992b2](https://github.com/thi-ng/umbrella/commit/56992b2))
- minor updates splitAt()/splitNearPoint() ([3e65f82](https://github.com/thi-ng/umbrella/commit/3e65f82))
- update proximity() to accept optional distance fn ([df7aef2](https://github.com/thi-ng/umbrella/commit/df7aef2))
- dedupe union() impls ([c1880c8](https://github.com/thi-ng/umbrella/commit/c1880c8))
- dedupe path impls for scale()/translate() ([b20cb32](https://github.com/thi-ng/umbrella/commit/b20cb32))

### [7.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@7.0.1) (2024-05-09)

#### 🩹 Bug fixes

- update arc() arg defaults, add docs ([cc57a57](https://github.com/thi-ng/umbrella/commit/cc57a57))

# [7.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@7.0.0) (2024-05-08)

#### 🛑 Breaking changes

- update Path to support sub-paths (holes), update impls ([#464](https://github.com/thi-ng/umbrella/issues/464)) ([9329d27](https://github.com/thi-ng/umbrella/commit/9329d27))
- BREAKING CHANGE: update path related ctors & functions
  - add `subPaths` argument for Path ctor/factory fn
  - rename `Path.add()` => `Path.addSegments()`
  - add `Path.addSubPaths()`
  - update `Path.toHiccup()` to include sub-paths
  - update `pathFromSvg()` to always return a single path only
    - sub-paths are included in main path now
  - update impls for following ops to also process sub-paths:
    - bounds()
    - rotate()
    - scale()
    - simplify()
    - translate()
    - transform()
    - transformVertices()
- update asPolyline(), add support for multiple boundaries ([#464](https://github.com/thi-ng/umbrella/issues/464)) ([0616b96](https://github.com/thi-ng/umbrella/commit/0616b96))
- BREAKING CHANGE: update asPolygon() to return array of polylines
  - add/update impls for complexpoly & path to produce multiple results
  - update other internal callsites
  - update tests
- update `Path` closing logic ([ce3a922](https://github.com/thi-ng/umbrella/commit/ce3a922))
- BREAKING CHANGE: update `Path` closing logic, `Path.closed` now a readonly property
  - add `Path.closed()` getter
  - add `Path.close()` to add a `Z`-type segment, check if not closed already
  - update `Path.addSegments()` to check each segment, throw error if path already closed
  - refactor `PathBuilder.closePath()`
- add asPolygon() support for complexpoly & path ([e3c9f20](https://github.com/thi-ng/umbrella/commit/e3c9f20))
- BREAKING CHANGE: update asPolygon() to return array of polygons (rather than single only)
  - add support for complexpoly & path (incl. sub-shapes, holes)
  - refactor internal call sites
- update asPath(), add AsPathOpts ([ef0ebdf](https://github.com/thi-ng/umbrella/commit/ef0ebdf))
- BREAKING CHANGE: update asPath() args, add AsPathOpts as 2nd arg
  - add option for using only linear path segments (no cubics)
  - update impls for complexpoly & other polygon types
- update Path & PathBuilder.close() ([b2134c2](https://github.com/thi-ng/umbrella/commit/b2134c2))
- BREAKING CHANGE: rename `PathBuilder.closePath()` => `PathBuilder.close()`
  - update `Path.close()` to return path itself
- rewrite roundedRect() to allow individual corner radii ([a4817aa](https://github.com/thi-ng/umbrella/commit/a4817aa))
- BREAKING CHANGE: update roundedRect() radius handling to allow individual corner radii
  - update docs
  - add tests

#### 🚀 Features

- initial import ComplexPolygon & impls ([#464](https://github.com/thi-ng/umbrella/issues/464)) ([ded007c](https://github.com/thi-ng/umbrella/commit/ded007c))
  - add complexPolygon() factory fn
  - add bounds() & centroid() impls
- add ops for complex polygons ([#464](https://github.com/thi-ng/umbrella/issues/464)) ([35ce854](https://github.com/thi-ng/umbrella/commit/35ce854))
  - add implementations for:
    - arcLength()
    - area()
    - asPath()
    - closestPoint()
    - convexHull()
    - edges()
    - flip()
    - pointInside()
    - resample()
    - rotate()
    - scale()
    - simplify()
    - subdivCurve()
    - transform()
    - transformVertices()
    - translate()
    - vertices()
  - add tests
- add proximity() ([5d5951c](https://github.com/thi-ng/umbrella/commit/5d5951c))
- update `vertices()` impl for `Path`, incl. sub-path vertices ([824067f](https://github.com/thi-ng/umbrella/commit/824067f))
- update simplify() default threshold ([bdba298](https://github.com/thi-ng/umbrella/commit/bdba298))
- add arcLength() for Path, refactor complexpoly impl ([d133bbe](https://github.com/thi-ng/umbrella/commit/d133bbe))
- add/update asCubic() impls for complex poly & path ([7f9e927](https://github.com/thi-ng/umbrella/commit/7f9e927))
- update pathFromCubics() to auto-create sub-paths if needed ([1170e45](https://github.com/thi-ng/umbrella/commit/1170e45))
- add closestPoint() impl for Path ([f0cf2f1](https://github.com/thi-ng/umbrella/commit/f0cf2f1))
- add pointInside() impl for Polyline ([d10bf43](https://github.com/thi-ng/umbrella/commit/d10bf43))
- add centroid() & convexHull() impl for Path ([76aa229](https://github.com/thi-ng/umbrella/commit/76aa229))
- add complexPolygonFromPath() ([cd526f1](https://github.com/thi-ng/umbrella/commit/cd526f1))
- update PathBuilder.close(), fix attrib handling ([e68d0bc](https://github.com/thi-ng/umbrella/commit/e68d0bc))
  - only insert closing line segment if needed
  - copy attribs for each new path
  - add docs
- add opt attribs for `pathFromSvg()` ([2da31f6](https://github.com/thi-ng/umbrella/commit/2da31f6))
  - update docs
  - add/update tests
- add scaleWithCenter() ([e328494](https://github.com/thi-ng/umbrella/commit/e328494))
- add complexpoly & path support for `clipConvex()` ([7665dc1](https://github.com/thi-ng/umbrella/commit/7665dc1))

#### 🩹 Bug fixes

- update vertices() ([2afc05e](https://github.com/thi-ng/umbrella/commit/2afc05e))
  - update impl for points, poly, polyline to return shallow copy of point array if no opts given

#### ♻️ Refactoring

- update withAttribs(), make new attribs optional ([688e1bf](https://github.com/thi-ng/umbrella/commit/688e1bf))
- update geom examples (recent API changes) ([f0f5ea7](https://github.com/thi-ng/umbrella/commit/f0f5ea7))
- update area() impl for Path ([0960817](https://github.com/thi-ng/umbrella/commit/0960817))
- update/simplify asPath() impls ([cbc71bb](https://github.com/thi-ng/umbrella/commit/cbc71bb))
- update centroid() for complexpoly ([58ac296](https://github.com/thi-ng/umbrella/commit/58ac296))
  - re-use migrated fn from [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/main/packages/geom-poly-utils)
- update path segment transformations ([88b2c40](https://github.com/thi-ng/umbrella/commit/88b2c40))

### [6.1.7](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@6.1.7) (2024-04-20)

#### ♻️ Refactoring

- update type usage ([2d72859](https://github.com/thi-ng/umbrella/commit/2d72859))

## [6.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@6.1.0) (2024-03-21)

#### 🚀 Features

- update intersects(), support more shape types ([21ce0d4](https://github.com/thi-ng/umbrella/commit/21ce0d4))
  - add IntersectOpts & as optional arg
    - update impl for ray-poly/ray-polyline
  - add support for new shape pairings:
    - line-polygon
    - line-polyline
    - ray-line
    - ray-group
- update intersects(), add line-group support ([1e270fa](https://github.com/thi-ng/umbrella/commit/1e270fa))
  - add line-group impl
  - refactor/simplify ray-group impl

### [6.0.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@6.0.6) (2023-12-03)

#### 🩹 Bug fixes

- fix [#431](https://github.com/thi-ng/umbrella/issues/431) update Path.withAttribs() impl ([eaad1cd](https://github.com/thi-ng/umbrella/commit/eaad1cd))
  - keep closed state of new path the same as original

### [6.0.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@6.0.2) (2023-11-09)

#### ♻️ Refactoring

- update all tests (packages A-S) ([e3085e4](https://github.com/thi-ng/umbrella/commit/e3085e4))

# [6.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@6.0.0) (2023-11-01)

#### 🛑 Breaking changes

- update tessellate() for groups, update return type ([1bb1752](https://github.com/thi-ng/umbrella/commit/1bb1752))
- BREAKING CHANGE: update tessellate() for groups, update return type to Iterable

### [5.2.13](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@5.2.13) (2023-10-27)

#### ♻️ Refactoring

- update vector imports ([5884c2b](https://github.com/thi-ng/umbrella/commit/5884c2b))

## [5.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@5.2.0) (2023-08-29)

#### 🚀 Features

- update various shape ctors to accept iterables ([ae0cf5b](https://github.com/thi-ng/umbrella/commit/ae0cf5b))
  - update shared APC ctor
  - update other shape ctors: BPatch, Group, Path
  - add assertions to verify vertex counts in these ctors:
    - BPatch
    - Cubic
    - Line
    - Quad/Quad3
    - Quadratic
    - Triangle

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@5.1.0) (2023-08-06)

#### 🚀 Features

- update API for various shape types ([3a45c5f](https://github.com/thi-ng/umbrella/commit/3a45c5f))
  - add IClear impls for APC, Group, Path
  - add .add() methods for APC, Group, Polygon, Polyline
  - update Path.add() to accept multiple args

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@5.0.0) (2023-04-08)

#### 🛑 Breaking changes

- update asSVG() bleed handling ([cf3eafb](https://github.com/thi-ng/umbrella/commit/cf3eafb))
- BREAKING CHANGE: rename `bleed` attrib to `__bleed`
  - for consistency, keep all control attribs prefixed as `__xxx`
  - add asSvg() support for `__prec`
  - update docs
- update splitArcLength() group handling ([6b97085](https://github.com/thi-ng/umbrella/commit/6b97085))
- BREAKING CHANGE: update splitArcLength() group handling & return type
  - update group handling to form sub-groups of predictable length
    (e.g. grouping shorter shapes and/or splitting longer shapes until desired arc length is reached)
  - remove support for nested groups
  - update docs, add example
  - update all impls to return single group

#### 🚀 Features

- update inscribedSquare/Hex() args, add attribs ([317f630](https://github.com/thi-ng/umbrella/commit/317f630))

## [4.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@4.4.0) (2023-03-24)

#### 🚀 Features

- avoid recursive application of __samples attrib ([189446d](https://github.com/thi-ng/umbrella/commit/189446d))
  - add internal __copyAttribsNoSamples() helper
  - update implementations for:
    - asPolygon()
    - asPolyline()
    - edges()
    - resample()
    - splitArcLength()
  - update Group ctor to make attribs optional
- add/expose subdiv & tessellation presets ([0f79c6d](https://github.com/thi-ng/umbrella/commit/0f79c6d))
  - re-export aliases for subdivCurve() from [@thi.ng/geom-subdiv-curve](https://github.com/thi-ng/umbrella/tree/main/packages/geom-subdiv-curve) (as `SUBDIV_XXX`...)
  - re-export aliases for tessellate() from [@thi.ng/geom-tessellate](https://github.com/thi-ng/umbrella/tree/main/packages/geom-tessellate) (as `TESSELLATE_XXX`...)

## [4.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@4.3.0) (2023-03-22)

#### 🚀 Features

- add splitArclength() ([906a326](https://github.com/thi-ng/umbrella/commit/906a326))
- add spiral() polyline factory fn ([572e0ef](https://github.com/thi-ng/umbrella/commit/572e0ef))

## [4.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@4.2.0) (2023-01-10)

#### 🚀 Features

- update vertices() for circle, ellipse, group ([9ff890a](https://github.com/thi-ng/umbrella/commit/9ff890a))
  - add support for SamplingOpts.start (circle/ellipse)
  - add SamplingOpts support for groups
  - migrate internal helpers
  - update export maps

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@4.1.0) (2022-12-22)

#### 🚀 Features

- add SVG default attribs & setter ([3cb07a6](https://github.com/thi-ng/umbrella/commit/3cb07a6))
  - set defaults to no fill & black stroke
  - add setSvgDefaultAttribs()

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@4.0.0) (2022-12-10)

#### 🛑 Breaking changes

- unify function naming ([980f625](https://github.com/thi-ng/umbrella/commit/980f625))
- BREAKING CHANGE: rename rect & aabb ctor fns
  - rename rectFromCentroid => rectWithCentroid
  - rename rectFromCentroidWithMargin => rectWithCentroidAndMargin
  - same for aabb versions

#### 🚀 Features

- add AABB.toHiccup() impl ([2c419cc](https://github.com/thi-ng/umbrella/commit/2c419cc))
- add startWithCentroid(), add docs ([6b4df6a](https://github.com/thi-ng/umbrella/commit/6b4df6a))
- update vertices(), config via attribs ([b5a53ba](https://github.com/thi-ng/umbrella/commit/b5a53ba))
  - add support for per-shape config overrides via `__samples` attrib object
  - add docs

#### 🩹 Bug fixes

- correct withAttribs() return type ([867c302](https://github.com/thi-ng/umbrella/commit/867c302))
- update applyTransforms() ([b6262c2](https://github.com/thi-ng/umbrella/commit/b6262c2))
  - always remove all spatial transform attribs

### [3.4.6](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@3.4.6) (2022-08-06)

#### ⏱ Performance improvements

- update vector fns ([d8726c9](https://github.com/thi-ng/umbrella/commit/d8726c9))

## [3.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@3.4.0) (2022-06-28)

#### 🚀 Features

- add IAttributed impls for all shape types ([ccb40f1](https://github.com/thi-ng/umbrella/commit/ccb40f1))
- add new transform ops & helpers ([cd8217c](https://github.com/thi-ng/umbrella/commit/cd8217c))
  - add applyTransforms(), rotate(), scale()
  - add internal helpers
  - update transform() rect coercion (now => Quad, previous Polygon)
- update edges(), support more types ([3e1b340](https://github.com/thi-ng/umbrella/commit/3e1b340))
- update warpPoints() args, add docs ([50cb467](https://github.com/thi-ng/umbrella/commit/50cb467))
- add AABB support for intersects() ([768dddd](https://github.com/thi-ng/umbrella/commit/768dddd))

#### 🩹 Bug fixes

- update AABB/Rect.offset(), clamp size to zero ([620121d](https://github.com/thi-ng/umbrella/commit/620121d))

### [3.3.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@3.3.1) (2022-06-23)

#### ♻️ Refactoring

- update size handling in various ctors ([ab4b93d](https://github.com/thi-ng/umbrella/commit/ab4b93d))

## [3.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@3.3.0) (2022-06-20)

#### 🚀 Features

- update rect/aabb, add new factory fns ([f74e377](https://github.com/thi-ng/umbrella/commit/f74e377))
  - add ...WithMargin() factory fns
  - add AABBLike.offset() impls
- update bounds() to support opt. margin ([8cdc372](https://github.com/thi-ng/umbrella/commit/8cdc372))

### [3.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@3.2.1) (2022-04-07)

#### 🩹 Bug fixes

- fix [#336](https://github.com/thi-ng/umbrella/issues/336), update attrib ctor arg handling ([cb8e52a](https://github.com/thi-ng/umbrella/commit/cb8e52a))
  - update internal __argAttribs() helper
  - add tests

## [3.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/geom@3.2.0) (2022-03-11)

#### 🚀 Features

- add opt. bleed attrib for `svgDoc()` ([fb3ed1e](https://github.com/thi-ng/umbrella/commit/fb3ed1e))
- add BPatch type, ctors and warp fn ([ea81cb5](https://github.com/thi-ng/umbrella/commit/ea81cb5))
- update/refactor various shape ops ([0e3b99a](https://github.com/thi-ng/umbrella/commit/0e3b99a))
