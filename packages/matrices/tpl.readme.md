<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

This package provides 160+ matrix & quaternion operations for 2D/3D
geometry processing and acts as companion package for
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors).
Like with the vectors package, most functions are defined as
multi-method dispatching to optimized implementations based on matrix
size (which themselves are exposed for direct use too).

Any `ArrayLike` type can be used as matrix containers (e.g. JS arrays,
typed arrays, custom impls) and hence many other functions provided by
the vectors package can also be used directly with matrices (where
sensible).

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

### Constants

- `IDENT22` / `IDENT23` / `IDENT33` / `IDENT44`

### Matrix creation

- `fit23` / `fit44`
- `rotation22` / `rotation23`
- `rotationAroundAxis33` / `rotationAroundAxis44`
- `rotationAroundPoint23`
- `rotationX33` / `rotationX44`
- `rotationY33` / `rotationY44`
- `rotationZ33` / `rotationZ44`
- `scale22` / `scale23` / `scale33` / `scale44`
- `scaleWithCenter23` / `scaleWithCenter44`
- `shearX22` / `shearY22`
- `shearX23` / `shearY23`
- `shearXY33` / `shearXZ33` / `shearYX33` / `shearYZ33` / `shearZX33` / `shearZY33`
- `shearXY44` / `shearXZ44` / `shearYX44` / `shearYZ44` / `shearZX44` / `shearZY44`
- `skewX22` / `skewY22`
- `skewX23` / `skewY23`
- `skewXY33` / `skewXZ33` / `skewYX33` / `skewYZ33` / `skewZX33` / `skewZY33`
- `skewXY44` / `skewXZ44` / `skewYX44` / `skewYZ44` / `skewZX44` / `skewZY44`
- `translation23` / `translation44`
- `transform23` / `transform44`

#### WebGL related

- `frustum` / `frustumBounds`
- `lookAt`
- `ortho`
- `perspective`
- `viewport`

### Matrix conversion

- `mat22to23`
- `mat23to22` / `mat23to44`
- `mat33to44` / `mat44to33`
- `normal44`

### Setters

- `set` / `set22` / `set23` / `set33` / `set44`
- `identity` / `identity22` / `identity23` / `identity33` / `identity44`

### Row & column accessors

- `column` / `column22` / `column23` / `column33` / `column44`
- `row` / `row22` / `row23` / `row33` / `row44`

### Componentwise matrix - matrix

- `add` / `add22` / `add23` / `add33` / `add44`
- `div` / `div22` / `div23` / `div33` / `div44`
- `mul` / `mul22` / `mul23` / `mul33` / `mul44`
- `sub` / `sub22` / `sub23` / `sub33` / `sub44`

### Componentwise matrix - scalar

- `addN` / `addN22` / `addN23` / `addN33` / `addN44`
- `divN` / `divN22` / `divN23` / `divN33` / `divN44`
- `mulN` / `mulN22` / `mulN23` / `mulN33` / `mulN44`
- `subN` / `subN22` / `subN23` / `subN33` / `subN44`

### Matrix multiplication

- `mulM` / `mulM22` / `mulM23` / `mulM33` / `mulM44`
- `concat`

### Matrix - vector multiplication

- `mulV` / `mulV22` / `mulV23` / `mulV33` / `mulV344` / `mulV44`
- `project`
- `unproject`

### Determinant & inversion

- `det22` / `det23` / `det33` / `det44`
- `det44FromCoeffs` / `detCoeffs44`
- `diag` / `diag22` / `diag23` / `diag33` / `diag44`
- `invert` / `invert22` / `invert23` / `invert33` / `invert44`
- `trace`

### Matrix transposition

- `transpose22` / `transpose33` / `transpose44`

### Quaternion

- `alignmentQuat`
- `conjugateQ`
- `invertQ`
- `mixQ`
- `mulQ`
- `mulVQ`
- `quatFromAxisAngle`
- `quatFromEuler`
- `quatToAxisAngle`
- `quatToMat33`
- `quatToMat44`

<!-- include ../../assets/tpl/footer.md -->
