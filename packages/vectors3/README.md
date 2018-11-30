# @thi.ng/vectors3

[![npm (scoped)](https://img.shields.io/npm/v/@thi.ng/vectors3.svg)](https://www.npmjs.com/package/@thi.ng/vectors3)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/vectors3.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

- [About](#about)
    - [Features](#features)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
    - [API](#api)
- [Authors](#authors)
- [License](#license)

<!-- /TOC -->

## About

**This still unreleased package will soon replace the existing
[@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/master/packages/vectors)
package.**

This package provides 100+ functions & supporting types to perform
vector operations on fixed and arbitrary-length vectors, both packed and
strided (i.e. where individual vector components are not successive
array elements, for example in SOA layouts).

### Features

- Small & fast: The vast majority of these functions are code generated
  with fixed-sized versions not using any loops.
- Unified API: Most functions are implemented as multi-methods,
  dispatching to any potentially optimized versions based on given
  vector arguments.
- Each function is defined in its own submodule. In addition to the
  generic multi-method base function, all fixed-length optimized
  versions are exported too. E.g. If `add` performs vector addition on
  arbitrary-length vectors, `add2`, `add3`, `add4` are the optimized
  version for fixed-length vectors...
- Extensible. Custom vector ops can be defined in a similar manner using
  the provided code generation helpers.
- Immutable by default. Each operation producing a vector result takes
  an output vector as first argument. If `null`, the vector given as 2nd
  argument will be used as output (i.e. for mutation).
- Strided vector support is handled via the
  [`Vec2/3/4`](https://github.com/thi-ng/umbrella/feature/vec-refactor/packages/vectors3/src/vec2.ts)
  class wrappers and the
  [`gvec()`](https://github.com/thi-ng/umbrella/feature/vec-refactor/packages/vectors3/src/gvec.ts)
  proxy (for generic, arbitrary-length vectors). These types behave like
  normal arrays (for read/write operations) and are also iterable. A
  subset of functions (suffixed with `S`, e.g. `addS` vs. `add`) also
  support striding without the need for extra class wrappers. This is
  handled via additional index and stride arguments for each
  input/output vector.

## Installation

```bash
yarn add @thi.ng/vectors3
```

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/master/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/master/packages/checks)
- [@thi.ng/equiv](https://github.com/thi-ng/umbrella/tree/master/packages/equiv)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/master/packages/math)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/feature/vec-refactor/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/master/packages/transducers)

## Usage examples

```ts
import * as v from "@thi.ng/vectors3";

v.add([], [1, 2, 3, 4], [10, 20, 30, 40])
// [11, 22, 33, 44]

// multiply-add (o = a + b * c)
v.madd([], [1,2], [10, 20], [0.5, 0.25]);
// [6, 7]

// scalar addition
v.addN([], gvec([0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0], 3, 1, 4), 10)
// [11, 12, 13]

v.dist([1,2], [100, 200])
// 221.37072977247917

v.distManhattan([1,2], [100, 200])
// 297

v.distChebyshev([1,2], [100, 200])
// 198

v.mixN([], [1, 2], [10, 20], 0.5);
// [5.5, 11]

v.fromHomogeneous([], [100, 200, 0.5])
// [200, 400]

v.swizzle4([], [1, 2], 1, 1, 0, 0)
// [ 2, 2, 1, 1 ]
```

### API

(Incomplete) list of functions:

- abs
- acos
- add
- addN
- addS
- angleBetween
- asin
- bisect
- cartesian
- ceil
- clamp
- clampN
- compare
- copy
- cos
- cosh
- cross
- distChebyshev
- distManhattan
- dist
- distSq
- div
- divN
- divS
- dotValues
- dot
- dotS
- empty
- eqDelta
- exp
- faceForward
- floor
- fract
- gvec
- headingXY
- headingXZ
- headingYZ
- fromHomogeneous
- invert
- invSqrt
- jitter
- limit
- log
- madd
- maddN
- mag
- magSq
- major
- max
- min
- minor
- mixBilinear
- mix
- mixN
- mod
- modN
- mul
- mulN
- mulS
- neg
- normalize
- one
- ones
- orthoNormal
- perpendicularLeft
- perpendicularRight
- polar
- pow
- powN
- project
- random
- randNorm
- reflect
- refract
- rotateAroundAxis
- rotateAroundPoint
- rotateX
- rotateY
- rotateZ
- round
- set
- setN
- setS
- setSN
- sign
- sin
- sinh
- smoothstep
- sqrt
- step
- sub
- subN
- subS
- sum
- swizzle
- tan
- tanh
- trunc
- vec2
- vec2n
- vec3
- vec3n
- vec4
- vec4n
- wrap
- zero
- zeroes

## Authors

- Karsten Schmidt

## License

&copy; 2018 Karsten Schmidt // Apache Software License 2.0
