# @thi.ng/vectors

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/vectors.svg)](https://www.npmjs.com/package/@thi.ng/vectors)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/vectors.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Features](#features)
    - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
    - [Breaking changes in v3.0.0](#breaking-changes-in-v300)
    - [Naming conventions](#naming-conventions)
    - [Constants](#constants)
    - [Component setters & copying](#component-setters--copying)
    - [Component swizzling](#component-swizzling)
    - [Vector creation](#vector-creation)
    - [Basic vector math](#basic-vector-math)
    - [Multiply-add](#multiply-add)
    - [Constraints](#constraints)
    - [Cross product](#cross-product)
    - [Dot product](#dot-product)
    - [Interpolation](#interpolation)
    - [Normalization / magnitude](#normalization--magnitude)
    - [Distances](#distances)
    - [Orientation](#orientation)
    - [Rotations](#rotations)
    - [Polar / cartesian conversion](#polar--cartesian-conversion)
    - [Randomness](#randomness)
    - [Unary vector math ops](#unary-vector-math-ops)
    - [Vector array batch processing](#vector-array-batch-processing)
    - [Comparison / equality](#comparison--equality)
    - [Bitwise operations (int / uint vec)](#bitwise-operations-int--uint-vec)
    - [Boolean vector logic](#boolean-vector-logic)
    - [Componentwise comparisons](#componentwise-comparisons)
    - [Hashing](#hashing)
    - [Code generator](#code-generator)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

Likely the most comprehensive vector library for TypeScript / JavaScript
currently available.

This package provides **600+ largely code generated functions** and
supporting types to perform vector operations on fixed and
arbitrary-length vectors, both packed and strided (i.e. where individual
vector components are not successive array elements, for example in SOA
memory layouts).

Includes componentwise logic operations for boolean vectors,
componentwise comparisons for numeric vectors and componentwise binary
ops for signed & unsigned integer vectors.

### Features

-   Small & fast: The vast majority of functions are code generated with
    fixed-sized versions not using any loops. Minified + gzipped, the
    entire package is ~9.2KB.
-   Unified API: Any `ArrayLike` type can be used as vector containers
    (e.g. JS arrays, typed arrays, custom impls). Most functions are
    implemented as multi-methods, dispatching to any potentially optimized
    versions based on given vector arguments.
-   Highly modular: Each function is defined in its own submodule / file.
    In addition to each generic multi-method base function, all
    fixed-length optimized versions are exported too. E.g. If
    [`add`](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/add.ts)
    performs vector addition on arbitrary-length vectors, `add2`, `add3`,
    `add4` are the optimized version for fixed-length vectors...
-   Extensible: Custom vector ops can be defined in a similar manner using
    the provided code generation helpers (see
    [vop.ts](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/internal/vop.ts)
    and
    [codegen.ts](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/internal/codegen.ts)
    for details).
-   Immutable by default: Each operation producing a vector result takes
    an output vector as first argument. If `null`, the vector given as 2nd
    argument will be used as output (i.e. for mutation).
-   Strided vector support is handled via the lightweight
    [`Vec2/3/4`](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/vec2.ts)
    class wrappers and the
    [`gvec()`](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/gvec.ts)
    proxy (for generic, arbitrary-length vectors). These types behave like
    normal arrays (for read/write operations) and are also iterable. A
    subset of functions (suffixed with `S`, e.g.
    [`addS`](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/adds.ts)
    vs. `add`) also support striding without the need for extra class
    wrappers. This is handled via additional index and stride arguments
    for each input/output vector. These functions are only available for
    sizes 2 / 3 / 4, though.
-   Random vector functions support the `IRandom` interface defined by
    [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/master/packages/random)
    to work with custom (P)RNGs. If omitted, the built-in `Math.random()`
    will be used.

### Related packages

-   [@thi.ng/color](https://github.com/thi-ng/umbrella/tree/master/packages/color) - vector based color operations / conversions
-   [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/master/packages/geom) - 2D/3D geometry types & operations
-   [@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices) - 2x2, 2x3, 3x3, 4x4 matrix & quaternion ops
-   [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/master/packages/shader-ast)
-   [@thi.ng/vector-pools](https://github.com/thi-ng/umbrella/tree/master/packages/vector-pools) - operations on memory mapped data

## Installation

```bash
yarn add @thi.ng/vectors
```

## Dependencies

-   [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
-   [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
-   [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
-   [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/master/packages/errors)
-   [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
-   [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/master/packages/random)
-   [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

```ts
import * as v from "@thi.ng/vectors";

// immutable vector addition (1st arg is result)
v.add([], [1, 2, 3, 4], [10, 20, 30, 40]);
// [11, 22, 33, 44]

// mutable addition (if first arg is null)
a = [1, 2, 3];
v.add(null, a, a);
// [2, 4, 6]

// multiply-add (o = a * b + c)
v.madd([], [10, 20], [0.5, 0.25], [1, 2]);
// [6, 7]

// multiply-add w/ scalar (o = a * n + b)
v.maddN([], [10, 20], 0.5, [1, 2]);
// [6, 12]

// scalar addition w/ arbitrary length & strided vector
v.addN([], gvec([0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0], 3, 1, 4), 10);
// [11, 12, 13]

v.dist([1, 2], [100, 200]);
// 221.37072977247917

v.distManhattan([1, 2], [100, 200]);
// 297

v.distChebyshev([1, 2], [100, 200]);
// 198

v.mixN([], [1, 2], [10, 20], 0.5);
// [5.5, 11]

v.fromHomogeneous([], [100, 200, 0.5]);
// [200, 400]

v.swizzle4([], [1, 2], 1, 1, 0, 0);
// [ 2, 2, 1, 1 ]

v.hash([1, 2, 3])
// 2383338936
```

## API

### Breaking changes in v3.0.0

- to avoid confusion, the arg order of `madd` and `maddN` functions has
  been updated to be compatible with the OpenCL `mad` function
  - `madd([], a, b, c)`: before `a + b * c`, now: `a * b + c`
  - `maddN([], a, b, n)` => `maddN([], a, n, b)` (i.e. `a * n + b`)
- rename `perpendicularLeft2` => `perpendicularCCW`
- rename `perpendicularRight2` => `perpendicularCW`
- rename `normalLeft2`/ `normalRight2` => `normalCCW` / `normalCW`

### Naming conventions

Wherever possible, each operation comes in different variations. All
fixed size versions use optimized, loop-free implementations.

| Suffix          | Description                            | Example                                           |
|-----------------|----------------------------------------|---------------------------------------------------|
| none            | arbitrary length vector arg(s)         | `add([], [1,2], [10,20])`                         |
|                 |                                        | => `[11,22]`                                      |
| 2               | 2d vector arg(s)                       | `add2([], [1,2], [10,20])`                        |
|                 |                                        | => `[11,22]`                                      |
| 3               | 3d vector arg(s)                       | `add3([], [1,2,3], [10,20,30])`                   |
|                 |                                        | => `[11,22,33]`                                   |
| 4               | 4d vector arg(s)                       | `add4([], [1,2,3,4], [10,20,30,40])`              |
|                 |                                        | => `[11,22,33,44]`                                |
| N2              | 2d vector & scalar                     | `addN2([], [1,2], 10)`                            |
|                 |                                        | => `[11,12]`                                      |
| N3              | 3d vector & scalar                     | `addN3([], [1,2,3], 10)`                          |
|                 |                                        | => `[11,12,13]`                                   |
| N4              | 4d vector & scalar                     | `addN4([], [1,2,3,4], 10)`                        |
|                 |                                        | => `[11,12,13,14]`                                |
| I               | arbitrary len, signed int vec          | `addI([], [-1,2], [10,-20])`                      |
|                 |                                        | => `[9,-18]`                                      |
| U               | arbitrary len, unsigned int vec        | `addU([], [1,2], [10,20])`                        |
|                 |                                        | => `[11,22]`                                      |
| I2 / I3 / I4    | fixed size signed int vec              | `bitNotI3([], [10,-20,30])`                       |
|                 |                                        | => `[-11,19,-31]`                                 |
| U2 / U3 / U4    | fixed size signed int vec              | `bitNotU3([], [10,20,30])`                        |
|                 |                                        | => `[4294967285,4294967275,4294967265]`           |
| NI / NU         | arbitrary len, signed int vec & scalar | `addNI([], [1,-2,3], 10)`                         |
|                 |                                        | => `[11,8,13]`                                    |
| NI2 / NI3 / NI4 | fixed size signed int vec & scalar     | `addNI3([], [1,-2,3], 10)`                        |
|                 |                                        | => `[11,8,13]`                                    |
| NU2 / NU3 / NU4 | fixed size unsigned int vec & scalar   | `addNU3([], [1,2,3], 10)`                         |
|                 |                                        | => `[11,12,13]`                                   |
| S2 / S3 / S4    | fixed size strided vec into unstrided  | `addS2([], [0,1,0,2], [10,0,20,0], 0,1,0, 1,2,2)` |
|                 |                                        | => `[11,22]`                                      |
| SN2 / SN3 / SN4 | fixed size strided vec & scalar        | `setSN2([0,0,0,0], 10, 1, 2)`                     |
|                 |                                        | => `[0,10,0,10]`                                  |
| C               | arbitrary len vec, component wise args | `setC([], 1,2,3,4)`                               |
|                 |                                        | => `[1,2,3,4]`                                    |
| C2 / C3 / C4    | fixed size vec, component wise args    | `setC4([], 1,2,3,4)`                              |
|                 |                                        | => `[1,2,3,4]`                                    |

### Constants

-   `MAX2` / `MAX3` / `MAX4` - each component `+Infinity`
-   `MIN2` / `MIN3` / `MIN4` - each component `-Infinity`
-   `ONE2` / `ONE3` / `ONE4` - each component `1`
-   `ZERO2` / `ZERO3` / `ZERO4` - each component `0`
-   `X2` / `X3` / `X4` - positive X axis
-   `Y2` / `Y3` / `Y4` - positive Y axis
-   `Z3` / `Z4` - positive Z axis
-   `W4` - positive W axis

### Component setters & copying

-   `set` / `set2` / `set3` / `set4`
-   `setC` / `setC2` / `setC3` / `setC4` / `setC6`
-   `setN` / `setN2` / `setN3` / `setN4`
-   `setS` / `setS2` / `setS3` / `setS4`
-   `setSN2` / `setSN3` / `setSN4`
-   `copy`
-   `empty`
-   `one`
-   `zero`

### Component swizzling

-   `swizzle2` / `swizzle3` / `swizzle4`
-   `setSwizzle1` / `setSwizzle2` / `setSwizzle3` / `setSwizzle4`
-   `swapXY` / `swapXZ` / `swapYZ`

### Vector creation

Functions to create wrapped (strided) vector instances:

-   `vec2` / `vec2n`
-   `vec3` / `vec3n`
-   `vec4` / `vec4n`
-   `gvec`

Wrap existing vanilla vectors:

-   `asVec2` / `asVec3` / `asVec4`

Vanilla vector (array) factories:

-   `ones`
-   `zeroes`
-   `vecOf`
-   `setVN3` / `setVN4`
-   `setVV4` / `setVV6` / `setVV9` / `setVV16`

### Basic vector math

#### Vector / vector

Component wise op with 2 input vectors:

-   `add` / `add2` / `add3` / `add4`
-   `div` / `div2` / `div3` / `div4`
-   `mul` / `mul2` / `mul3` / `mul4`
-   `sub` / `sub2` / `sub3` / `sub4`
-   `fmod` / `fmod2` / `fmod3` / `fmod4` (GLSL behavior)
-   `mod` / `mod2` / `mod3` / `mod4` (JS modulo)
-   `pow` / `pow2` / `pow3` / `pow4`

#### Integer vector

- `addI` / `addI2` / `addI3` / `addI4`
- `addU` / `addU2` / `addU3` / `addU4`
- `divI` / `divI2` / `divI3` / `divI4`
- `divU` / `divU2` / `divU3` / `divU4`
- `mulI` / `mulI2` / `mulI3` / `mulI4`
- `mulU` / `mulU2` / `mulU3` / `mulU4`
- `subI` / `subI2` / `subI3` / `subI4`
- `subU` / `subU2` / `subU3` / `subU4`

#### Vector / scalar

Component wise op with one input vector and single scalar:

-   `addN` / `addN2` / `addN3` / `addN4`
-   `divN` / `divN2` / `divN3` / `divN4`
-   `mulN` / `mulN2` / `mulN3` / `mulN4`
-   `subN` / `subN2` / `subN3` / `subN4`
-   `neg` - same as `mulN(out, v, -1)`
-   `fmodN` / `fmodN2` / `fmodN3` / `fmodN4` (GLSL behavior)
-   `modN` / `modN2` / `modN3` / `modN4` (JS modulo)
-   `powN` / `powN2` / `powN3` / `powN4`

#### Integer vector / scalar

- `addNI` / `addNI2` / `addNI3` / `addNI4`
- `addNU` / `addNU2` / `addNU3` / `addNU4`
- `divNI` / `divNI2` / `divNI3` / `divNI4`
- `divNU` / `divNU2` / `divNU3` / `divNU4`
- `mulNI` / `mulNI2` / `mulNI3` / `mulNI4`
- `mulNU` / `mulNU2` / `mulNU3` / `mulNU4`
- `subNI` / `subNI2` / `subNI3` / `subNI4`
- `subNU` / `subNU2` / `subNU3` / `subNU4`

#### Strided vectors

Functions for memory mapped, strided vectors (without requiring wrappers):

-   `addS2` / `addS3` / `addS4`
-   `divS2` / `divS3` / `divS4`
-   `mulS2` / `mulS3` / `mulS4`
-   `subS2` / `subS3` / `subS4`

### Multiply-add

-   `addm` / `addm2` / `addm3` / `addm4`
-   `addmN` / `addmN2` / `addmN3` / `addmN4`
-   `addW2` / `addW3` / `addW4` / `addW5`
-   `madd` / `madd2` / `madd3` / `madd4`
-   `maddN` / `maddN2` / `maddN3` / `maddN4`
-   `subm` / `subm2` / `subm3` / `subm4`
-   `submN` / `submN2` / `submN3` / `submN4`

### Constraints

-   `clamp`
-   `clamp2` / `clamp3` / `clamp4`
-   `clampN` / `clampN2` / `clampN3` / `clampN4`
-   `clamp01` / `clamp01_2` / `clamp01_3` / `clamp01_4`
-   `clamp11` / `clamp11_2` / `clamp11_3` / `clamp11_4`
-   `max` / `max2` / `max3` / `max4`
-   `min` / `min2` / `min3` / `min4`

### Cross product

-   `cross2`
-   `cross3`
-   `orthoNormal3`
-   `signedArea2`

### Dot product

-   `dot`
-   `dot2` / `dot3` / `dot4`
-   `dotC4` / `dotC6` / `dotC8`
-   `dotS2` / `dotS3` / `dotS4`

### Interpolation

-   `fit` / `fit2` / `fit3` / `fit4`
-   `fit01` / `fit01_2` / `fit01_3` / `fit01_4`
-   `fit11` / `fit11_2` / `fit11_3` / `fit11_4`
-   `mix` / `mix2` / `mix3` / `mix4`
-   `mixN` / `mixN2` / `mixN3` / `mixN4`
-   `mixBilinear` / `mixBilinear2` / `mixBilinear3` / `mixBilinear4`
-   `mixCubic`
-   `mixQuadratic`
-   `smoothStep` / `smoothStep2` / `smoothStep3` / `smoothStep4`
-   `step` / `step2` / `step3` / `step4`

### Normalization / magnitude

-   `limit`
-   `mag`
-   `magSq` / `magSq2` / `magSq3` / `magSq4`
-   `normalize`

### Distances

-   `dist`
-   `distSq` / `distSq2` / `distSq3` / `distSq4`
-   `distChebyshev` / `distChebyshev2` / `distChebyshev3` / `distChebyshev4`
-   `distManhattan` / `distManhattan2` / `distManhattan3` / `distManhattan4`

### Orientation

-   `angleBetween2` / `angleBetween3`
-   `angleRatio`
-   `bisect2`
-   `degrees` / `degrees2` / `degrees3` / `degrees4`
-   `direction`
-   `faceForward`
-   `heading` / `headingXY` / `headingXZ` / `headingYZ`
-   `headingSegment` / `headingSegmentXY` / `headingSegmentXZ` / `headingSegmentYZ`
-   `normalLeft2` / `normalRight2`
-   `perpendicularLeft2` / `perpendicularRight2`
-   `project`
-   `radians` / `radians2` / `radians3` / `radians4`
-   `reflect`
-   `refract`

### Rotations

(Also see rotation matrices provided by
[@thi.ng/matrices](https://github.com/thi-ng/umbrella/tree/master/packages/matrices))

-   `rotateAroundAxis3`
-   `rotateAroundPoint2`
-   `rotateX` \ `rotateY` \ `rotateZ`

### Polar / cartesian conversion

-   `cartesian` / `cartesian2` / `cartesian3`
-   `polar` / `polar2` / `polar3`

### Randomness

All ops support custom PRNG impls based on the
[@thi.ng/random](https://github.com/thi-ng/umbrella/tree/master/packages/random)
`IRandom` interface and use `Math.random` by default:

-   `jitter`
-   `randMinMax` / `randMinMax2` / `randMinMax3` / `randMinMax4`
-   `randNorm`
-   `random` / `random2` / `random3` / `random4`

### Unary vector math ops

-   `abs` / `abs2` / `abs3` / `abs4`
-   `acos` / `acos2` / `acos3` / `acos4`
-   `asin` / `asin2` / `asin3` / `asin4`
-   `atan` / `atan2` / `atan3` / `atan4`
-   `ceil` / `ceil2` / `ceil3` / `ceil4`
-   `cos` / `cos2` / `cos3` / `cos4`
-   `cosh` / `cosh2` / `cosh3` / `cosh4`
-   `exp` / `exp2` / `exp3` / `exp4`
-   `floor` / `floor2` / `floor3` / `floor4`
-   `fmod` / `fmod2` / `fmod3` / `fmod4` (C / GLSL modulo)
-   `fract` / `fract2` / `fract3` / `fract4`
-   `fromHomogeneous` / `fromHomogeneous3` / `fromHomogeneous4`
-   `invert` / `invert2` / `invert3` / `invert4`
-   `invSqrt` / `invSqrt2` / `invSqrt3` / `invSqrt4`
-   `log` / `log2` / `log3` / `log4`
-   `major` / `major2` / `major3` / `major4`
-   `minor` / `minor2` / `minor3` / `minor4`
-   `mod` / `mod2` / `mod3` / `mod4` (JS modulo)
-   `round` / `round2` / `round3` / `round4`
-   `sign` / `sign2` / `sign3` / `sign4`
-   `sin` / `sin2` / `sin3` / `sin4`
-   `sinh` / `sinh2` / `sinh3` / `sinh4`
-   `sqrt` / `sqrt2` / `sqrt3` / `sqrt4`
-   `sum` / `sum2` / `sum3` / `sum4`
-   `tan` / `tan2` / `tan3` / `tan4`
-   `tanh` / `tanh2` / `tanh3` / `tanh4`
-   `trunc` / `trunc2` / `trunc3` / `trunc4`
-   `wrap` / `wrap2` / `wrap3` / `wrap4`

### Vector array batch processing

Functions to transform flat / strided buffers w/ vector operations:

-   `mapV` / `mapVN` / `mapVV` / `mapVVN` / `mapVVV`

### Comparison / equality

-   `comparator2` / `comparator3` / `comparator4`
-   `eqDelta` / `eqDelta2` / `eqDelta3` / `eqDelta4`
-   `eqDeltaS`
-   `eqDeltaArray`

### Bitwise operations (int / uint vec)

Arguments are assumed to be signed / unsigned ints. Results will be
forced accordingly.

-   `bitAndI` / `bitAndI2` / `bitAndI3` / `bitAndI4`
-   `bitAndU` / `bitAndU2` / `bitAndU3` / `bitAndU4`
-   `bitAndNI` / `bitAndNI2` / `bitAndNI3` / `bitAndNI4`
-   `bitAndNU` / `bitAndNU2` / `bitAndNU3` / `bitAndNU4`
-   `bitNotI` / `bitNotI2` / `bitNotI3` / `bitNotI4` (unary)
-   `bitNotU` / `bitNotU2` / `bitNotU3` / `bitNotU4` (unary)
-   `bitOrI` / `bitOrI2` / `bitOrI3` / `bitOrI4`
-   `bitOrU` / `bitOrU2` / `bitOrU3` / `bitOrU4`
-   `bitOrNI` / `bitOrNI2` / `bitOrNI3` / `bitOrNI4`
-   `bitOrNU` / `bitOrNU2` / `bitOrNU3` / `bitOrNU4`
-   `bitXorI` / `bitXorI2` / `bitXorI3` / `bitXorI4`
-   `bitXorU` / `bitXorU2` / `bitXorU3` / `bitXorU4`
-   `bitXorNI` / `bitXorNI2` / `bitXorNI3` / `bitXorNI4`
-   `bitXorNU` / `bitXorNU2` / `bitXorNU3` / `bitXorNU4`
-   `lshiftI` / `lshiftI4` /`lshiftI4` / `lshiftI4`
-   `lshiftU` / `lshiftU4` /`lshiftU4` / `lshiftU4`
-   `rshiftI` / `rshiftI2` /`rshiftI3` / `rshiftI4`
-   `rshiftU` / `rshiftU2` /`rshiftU3` / `rshiftU4`
-   `lshiftNI` / `lshiftNI4` /`lshiftNI4` / `lshiftNI4`
-   `lshiftNU` / `lshiftNU4` /`lshiftNU4` / `lshiftNU4`
-   `rshiftNI` / `rshiftNI2` /`rshiftNI3` / `rshiftNI4`
-   `rshiftNU` / `rshiftNU2` /`rshiftNU3` / `rshiftNU4`

### Boolean vector logic

- `logicAnd` / `logicAnd2` / `logicAnd3` / `logicAnd4`
- `logicAndN` / `logicAndN2` / `logicAndN3` / `logicAndN4` (3rd arg is boolean)
- `logicOr` / `logicOr2` / `logicOr3` / `logicOr4`
- `logicOrN` / `logicOrN2` / `logicOrN3` / `logicOrN4`  (3rd arg is boolean)
- `logicNot` / `logicNot2` / `logicNot3` / `logicNot4`
- `every` / `every2` / `every3` / `every4`
- `some` / `some2` / `some3` / `some4`

### Componentwise comparisons

All resulting in boolean vectors:

- `lt` / `lt2` / `lt3`/ `lt4`
- `lte` / `lte2` / `lte3`/ `lte4`
- `gt` / `gt2` / `gt3`/ `gt4`
- `gte` / `gte2` / `gte3`/ `gte4`
- `eq` / `eq2` / `eq3`/ `eq4`
- `neq` / `neq2` / `neq3`/ `neq4`

### Hashing

- `hash`

### Code generator

-   `compile` / `compileG` / `compileGHOF` / `compileHOF`
-   `defOp` / `defOpS` / `defFnOp` / `defHofOp`
-   `defMathNOp` / `defMathOp`
-   `vop`

For more information about the code generator see:

-   [codegen.ts](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/internal/codegen.ts)
-   [templates.ts](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/internal/templates.ts)
-   [vop.ts](https://github.com/thi-ng/umbrella/tree/master/packages/vectors/src/internal/vop.ts)

## Authors

-   Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
