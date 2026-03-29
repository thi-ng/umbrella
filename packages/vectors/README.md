<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/vectors](https://codeberg.org/thi.ng/umbrella/media/branch/develop/assets/banners/thing-vectors.svg?33739496)

[![npm version](https://img.shields.io/npm/v/@thi.ng/vectors.svg)](https://www.npmjs.com/package/@thi.ng/vectors)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/vectors.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 214 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://codeberg.org/thi.ng/umbrella/) ecosystem
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring
> me](https://codeberg.org/thi.ng/umbrella/src/branch/develop/CONTRIBUTING.md#donations).
> Thank you! ❤️

- [About](#about)
  - [Features](#features)
- [Status](#status)
  - [Breaking changes in v8.0.0](#breaking-changes-in-v800)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Basic usage](#basic-usage)
  - [Naming conventions](#naming-conventions)
  - [Constants](#constants)
  - [Component setters & copying](#component-setters--copying)
  - [Component swizzling](#component-swizzling)
  - [Vector creation](#vector-creation)
  - [Basic vector math](#basic-vector-math)
    - [Vector / vector](#vector--vector)
    - [Vector / scalar](#vector--scalar)
  - [Combined operations](#combined-operations)
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
  - [Vector conversions / coercions](#vector-conversions--coercions)
  - [Boolean vector logic](#boolean-vector-logic)
  - [Componentwise comparisons](#componentwise-comparisons)
  - [Hashing](#hashing)
- [Authors](#authors)
- [License](#license)

## About

Optimized 2d/3d/4d and arbitrary length vector operations, support for memory mapping/layouts.

Likely the most comprehensive vector library for TypeScript / JavaScript
currently available.

This package provides **almost 900(!) functions** and supporting types to
perform vector operations on fixed and arbitrary-length vectors, both packed and
strided (i.e. where individual vector components are not successive array
elements, for example in [SOA memory
layouts](https://en.wikipedia.org/wiki/AoS_and_SoA)).

Includes componentwise logic operations for boolean vectors, componentwise
comparisons for numeric vectors and componentwise binary ops for signed &
unsigned integer vectors.

### Features

- The vast majority of operations are templated via higher-order functions with
  fixed-sized 2D/3D/4D versions being loop-free. Minified + gzipped, the entire
  package is ~15KB (though most projects will likely use only a small subset of
  the provided functions).
- Unified API: Any `ArrayLike` type can be used as vector containers (e.g. JS
  arrays, typed arrays, custom vector classes). Most functions are implemented
  as multi-methods, dispatching to any potentially optimized versions based on
  given vector arguments.
- Highly modular & tree-shakeable: Each function is defined in its own
  submodule/file. In addition to each generic multi-method base function, all
  fixed-length optimized versions are exported too. E.g. If
  [`add`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors/src/add.ts)
  performs vector addition on arbitrary-length vectors, `add2`, `add3`, `add4`
  are the optimized version for fixed-length vectors...
- Pluggable interface: The [`VecAPI`
  interface](https://docs.thi.ng/umbrella/vectors/interfaces/VecAPI.html)
  defines objects with the ~70 most common vector operations implemented for
  specific vector sizes. Using this interface simplifies performance-critical
  use cases & algorithms which target different dimensions (e.g. 2D/3D), but
  should use the avaiable size-optimized vector ops. See
  [`VEC2`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors/src/vec2-api.ts),
  [`VEC3`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors/src/vec3-api.ts)
  and
  [`VEC4`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors/src/vec4-api.ts)
- Extensible: Custom vector ops can be defined in a similar manner using the
  provided code templating helpers (see
  [`vop()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors/src/vop.ts)
  and various `defOpXXX()` functions, e.g.
  [`defOpV()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors/src/defopv.ts)).
- Immutable by default: Each operation producing a vector result takes an output
  vector as first argument. If `null`, the vector given as 2nd argument will
  (usually) be used as output (i.e. for mutation).
- Strided vector support is handled via the lightweight
  [`Vec2/3/4`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors/src/vec2.ts)
  class wrappers and the
  [`gvec()`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors/src/gvec.ts)
  proxy (for generic, arbitrary-length vectors). These types behave like normal
  arrays (for read/write operations) and are also iterable. A subset of
  functions (suffixed with `S`, e.g.
  [`addS`](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vectors/src/adds.ts)
  vs. `add`) also support striding without the need for extra class wrappers.
  This is handled via additional index and stride arguments for each
  input/output vector. These functions are _mostly_ only available for sizes 2 /
  3 / 4, though. Example: [SOA-ECS](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/soa-ecs)
- Random vector functions support the `IRandom` interface defined by
  [@thi.ng/random](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/random)
  to work with custom (P)RNGs. If omitted, the built-in `Math.random()` will be
  used.

Partially ported from [thi.ng/geom-clj](http://thi.ng/geom-clj) (Clojure) and
[c.thi.ng](http://c.thi.ng) (C11).

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://codeberg.org/thi.ng/umbrella/issues?q=%5Bvectors%5D)

### Breaking changes in v8.0.0

Due to an increase of web security measures, many websites are implementing
strict(er) [Content Security
Policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
including `default-src` or `script-src` directives. These directives disallow
usage of any dynamic code generation, as it was _heavily_ utilized by this
package in earlier versions. To allow this package being used in such
environments, a complete rewrite was undertaken, replacing code generation with
code templating via higher-order functions.

To the user, most of these underlying changes are invisible with the exception
of some other refactoring, renaming & restructuring:

- `atan` functions are now called `atan_2`, `atan_3`, `atan_4`
- `atan2` functions are now called `atan2_2`, `atan2_3`, `atan2_4`
- `exp` functions are now called `exp_2`, `exp_3`, `exp_4`
- `exp2` (aka `2^x`) functions are now called `exp2_2`, `exp2_3`, `exp2_4`
- `log` functions are now called `log_2`, `log_3`, `log_4`
- `log2` functions are now called `log2_2`, `log2_3`, `log2_4`

The former code generator functionality has been removed and replaced with a set
of higher-order templating functions. There're many variations of function
template families (one family per operation type/signature), all of which are
prefixed with `defOpXXX`. See relevant files in the [/src]() directory... (Also
note: If you want to use these template functions/submodules for your own custom
vector ops — they are _not_ exposed via package-level imports and need to be
imported directly!)

Other structural changes (only relevant when _not_ using package-level imports):
Some source files have been broken up to be more granular. Not listing them here
for brevity. Please consult source code (or submit an issue) if an existing
import doesn't work anymore.

## Related packages

- [@thi.ng/color](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/color) - Array-based color types, CSS parsing, conversions, transformations, declarative theme generation, gradients, presets
- [@thi.ng/distance](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/distance) - N-dimensional distance metrics & K-nearest neighborhoods for point queries
- [@thi.ng/ecs](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/ecs) - Entity Component System based around typed arrays & sparse sets
- [@thi.ng/geom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/geom) - Functional, polymorphic API for 2D geometry types & SVG generation
- [@thi.ng/hdom-canvas](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom-canvas) - [@thi.ng/hdom](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/hdom) component wrapper for declarative canvas scenegraphs
- [@thi.ng/imgui](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/imgui) - Immediate mode GUI with flexible state handling & data only shape output
- [@thi.ng/matrices](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/matrices) - Matrix & quaternion operations for 2D/3D geometry processing
- [@thi.ng/simd](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/simd) - WASM based SIMD vector operations for batch processing
- [@thi.ng/soa](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/soa) - SOA & AOS memory mapped structured views with optional & extensible serialization
- [@thi.ng/shader-ast-js](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/shader-ast-js) - Customizable JS codegen, compiler & runtime for [@thi.ng/shader-ast](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/shader-ast)
- [@thi.ng/vector-pools](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/vector-pools) - Data structures for managing & working with strided, memory mapped vectors
- [@thi.ng/webgl](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/webgl) - WebGL & GLSL abstraction layer

## Installation

```bash
yarn add @thi.ng/vectors
```

ESM import:

```ts
import * as vec from "@thi.ng/vectors";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/vectors"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const vec = await import("@thi.ng/vectors");
```

Package sizes (brotli'd, pre-treeshake): ESM: 15.62 KB

## Dependencies

- [@thi.ng/api](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/api)
- [@thi.ng/binary](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/binary)
- [@thi.ng/checks](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/checks)
- [@thi.ng/errors](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/errors)
- [@thi.ng/math](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/math)
- [@thi.ng/memoize](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/memoize)
- [@thi.ng/random](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/random)
- [@thi.ng/strings](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/strings)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

37 projects in this repo's
[/examples](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples)
directory are using this package:

| Screenshot                                                                                                                                   | Description                                                                                  | Live demo                                                   | Source                                                                                           |
|:---------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------|:------------------------------------------------------------|:-------------------------------------------------------------------------------------------------|
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/ascii-raymarch.jpg" width="240"/>                | ASCII art raymarching with thi.ng/shader-ast & thi.ng/text-canvas                            | [Demo](https://demo.thi.ng/umbrella/ascii-raymarch/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/ascii-raymarch)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/boid-basics.png" width="240"/>                   | Basic 2D boid simulation and spatial indexing neighbor lookups                               | [Demo](https://demo.thi.ng/umbrella/boid-basics/)           | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/boid-basics)           |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/canvas-dial.png" width="240"/>                   | Canvas based dial widget                                                                     | [Demo](https://demo.thi.ng/umbrella/canvas-dial/)           | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/canvas-dial)           |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/canvas-recorder.png" width="240"/>               | Self-modifying, animated typographic grid with emergent complex patterns                     | [Demo](https://demo.thi.ng/umbrella/canvas-recorder/)       | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/canvas-recorder)       |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/ellipse-proximity.png" width="240"/>             | Interactive visualization of closest points on ellipses                                      | [Demo](https://demo.thi.ng/umbrella/ellipse-proximity/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/ellipse-proximity)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-csv-piechart.png" width="240"/>             | Piechart visualization of CSV data                                                           | [Demo](https://demo.thi.ng/umbrella/geom-csv-piechart/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-csv-piechart)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-knn.jpg" width="240"/>                      | Doodle w/ K-nearest neighbor search result visualization                                     | [Demo](https://demo.thi.ng/umbrella/geom-knn/)              | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-knn)              |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-knn-hash.jpg" width="240"/>                 | K-nearest neighbor search in an hash grid                                                    | [Demo](https://demo.thi.ng/umbrella/geom-knn-hash/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-knn-hash)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/geom-sdf-path.png" width="240"/>                 | SVG path to SDF, applying deformation and converting back to SVG                             | [Demo](https://demo.thi.ng/umbrella/geom-sdf-path/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/geom-sdf-path)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/gesture-analysis.png" width="240"/>              | Mouse gesture / stroke analysis, simplification, corner detection                            | [Demo](https://demo.thi.ng/umbrella/gesture-analysis/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/gesture-analysis)      |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/hdom-canvas-clock.png" width="240"/>             | Realtime analog clock demo                                                                   | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-clock/)     | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-canvas-clock)     |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/hdom-canvas-draw.jpg" width="240"/>              | Interactive pattern drawing demo using transducers                                           | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-draw/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-canvas-draw)      |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/hdom-canvas-particles.jpg" width="240"/>         | 2D Bezier curve-guided particle system                                                       | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-particles/) | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-canvas-particles) |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export                         | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/hdom-canvas-shapes)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/imgui/imgui-all.png" width="240"/>                        | Canvas based Immediate Mode GUI components                                                   | [Demo](https://demo.thi.ng/umbrella/imgui/)                 | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/imgui)                 |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/geom/geom-isoline.png" width="240"/>                      | Animated sine plasma effect visualized using contour lines                                   | [Demo](https://demo.thi.ng/umbrella/iso-plasma/)            | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/iso-plasma)            |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/kmeans-viz.jpg" width="240"/>                    | k-means clustering visualization                                                             | [Demo](https://demo.thi.ng/umbrella/kmeans-viz/)            | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/kmeans-viz)            |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/optical-flow.avif" width="240"/>                 | Optical flow analysis of web cam or video inputs                                             | [Demo](https://demo.thi.ng/umbrella/optical-flow/)          | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/optical-flow)          |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/poly-subdiv.jpg" width="240"/>                   | Animated, iterative polygon subdivisions & visualization                                     | [Demo](https://demo.thi.ng/umbrella/poly-subdiv/)           | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/poly-subdiv)           |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/quasi-lattice.png" width="240"/>                 | Quasi-random lattice generator                                                               | [Demo](https://demo.thi.ng/umbrella/quasi-lattice/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/quasi-lattice)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/ramp-synth.png" width="240"/>                    | Unison wavetable synth with waveform editor                                                  | [Demo](https://demo.thi.ng/umbrella/ramp-synth/)            | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/ramp-synth)            |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/rasterize-blend.jpg" width="240"/>               | Steering behavior drawing with alpha-blended shapes                                          | [Demo](https://demo.thi.ng/umbrella/rasterize-blend/)       | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rasterize-blend)       |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/rdom-canvas-basics.jpg" width="240"/>            | Minimal rdom-canvas animation                                                                | [Demo](https://demo.thi.ng/umbrella/rdom-canvas-basics/)    | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rdom-canvas-basics)    |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/rotating-voronoi.jpg" width="240"/>              | Animated Voronoi diagram, cubic splines & SVG download                                       | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/rotating-voronoi)      |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/scenegraph.png" width="240"/>                    | 2D scenegraph & shape picking                                                                | [Demo](https://demo.thi.ng/umbrella/scenegraph/)            | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/scenegraph)            |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/scenegraph-image.png" width="240"/>              | 2D scenegraph & image map based geometry manipulation                                        | [Demo](https://demo.thi.ng/umbrella/scenegraph-image/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/scenegraph-image)      |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/shader-graph.jpg" width="240"/>                  | Minimal shader graph developed during livestream #2                                          | [Demo](https://demo.thi.ng/umbrella/shader-graph/)          | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/shader-graph)          |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/simd-plot.png" width="240"/>                     | Fitting, transforming & plotting 10k data points per frame using SIMD                        | [Demo](https://demo.thi.ng/umbrella/simd-plot/)             | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/simd-plot)             |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/soa-ecs-100k.png" width="240"/>                  | Entity Component System w/ 100k 3D particles                                                 | [Demo](https://demo.thi.ng/umbrella/soa-ecs/)               | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/soa-ecs)               |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/spline-tangent.png" width="240"/>                | Compute cubic spline position & tangent using Dual Numbers                                   | [Demo](https://demo.thi.ng/umbrella/spline-tangent/)        | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/spline-tangent)        |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/text-canvas.png" width="240"/>                   | 3D wireframe textmode demo                                                                   | [Demo](https://demo.thi.ng/umbrella/text-canvas/)           | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/text-canvas)           |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/unbiased-normals.png" width="240"/>              | Visual comparison of biased vs. unbiased normal vectors projected on the surface of a sphere | [Demo](https://demo.thi.ng/umbrella/unbiased-normals/)      | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/unbiased-normals)      |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/webgl-cube.png" width="240"/>                    | 3D arcball controller to rotate the camera view of a colored cube                            | [Demo](https://demo.thi.ng/umbrella/webgl-arcball/)         | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-arcball)         |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/webgl-cube.png" width="240"/>                    | WebGL multi-colored cube mesh                                                                | [Demo](https://demo.thi.ng/umbrella/webgl-cube/)            | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-cube)            |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/webgl-float-fbo.jpg" width="240"/>               | Drawing to floating point offscreen / multi-pass shader pipeline                             | [Demo](https://demo.thi.ng/umbrella/webgl-float-fbo/)       | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-float-fbo)       |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/webgl-grid.jpg" width="240"/>                    | WebGL instancing, animated grid                                                              | [Demo](https://demo.thi.ng/umbrella/webgl-grid/)            | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-grid)            |
| <img src="https://codeberg.org/thi.ng/umbrella/media/branch/develop/develop/assets/examples/webgl-msdf.jpg" width="240"/>                    | WebGL MSDF text rendering & particle system                                                  | [Demo](https://demo.thi.ng/umbrella/webgl-msdf/)            | [Source](https://codeberg.org/thi.ng/umbrella/src/branch/develop/examples/webgl-msdf)            |

## API

[Generated API docs](https://docs.thi.ng/umbrella/vectors/)

### Basic usage

```ts
import * as v from "@thi.ng/vectors";

// immutable vector addition (1st arg is result)
v.add([], [1, 2, 3, 4], [10, 20, 30, 40]);
// [11, 22, 33, 44]

// mutable addition
// (if first arg (output) is null writes result to 2nd arg)
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

// or operate on raw arrays directly...
// here the last 4 args define:
// out index, src index, out stride, src stride
v.addNS3(null, [0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0], 10, 1, 1, 4, 4)
// [0, 11, 0, 0, 0, 12, 0, 0, 0, 13, 0, 0, 0]

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

Using the
[`VecAPI`](https://docs.thi.ng/umbrella/vectors/interfaces/VecAPI.html)
implementation objects to use size-optimized vector ops in a pluggable manner
(this is in addition/alternative to using the standard set of polymorphic
functions for similar results).

```ts
import { VEC2, VEC3, type Vec, type VecAPI } from "@thi.ng/vectors";

interface Particle {
    pos: Vec;
    dir: Vec;
    targetDir: Vec;
    speed: number;
    turnSpeed: number;
}

const updateParticle = (p: Particle, { maddN, mixN, normalize }: VecAPI) => {
    // interpolate current direction toward target dir
    mixN(null, p.dir, p.targetDir, p.turnSpeed);
    // normalize direction
    normalize(null, p.dir);
    // add scaled direction to position (and store as new position)
    return maddN(p.pos, p.dir, p.speed, p.pos);
};

// 2d version
let p2d: Particle = {
    pos: [10, 20], dir: [0, 1], targetDir: [1, 0], speed: 5, turnSpeed: 0.1,
};

updateParticle(p2d, VEC2);
// [ 10.552, 24.969 ]

// 3d version
let p3d: Particle = {
    pos: [10, 20, 30], dir: [0, 1, 0], targetDir: [0, 0, 1], speed: 5, turnSpeed: 0.1,
};

updateParticle(p3d, VEC3);
// [ 10, 24.969, 30.552 ]
```

### Naming conventions

Wherever possible, each operation comes in different variations. All fixed size
versions use optimized, loop-free implementations.

| Suffix          | Description                            |
|-----------------|----------------------------------------|
| none            | arbitrary length vector arg(s)         |
| 2               | 2d vector arg(s)                       |
| 3               | 3d vector arg(s)                       |
| 4               | 4d vector arg(s)                       |
| N2              | 2d vector(s) & scalar                  |
| N3              | 3d vector(s) & scalar                  |
| N4              | 4d vector(s) & scalar                  |
| I               | arbitrary len, signed int vec          |
| U               | arbitrary len, unsigned int vec        |
| I2 / I3 / I4    | fixed size signed int vec              |
| U2 / U3 / U4    | fixed size signed int vec              |
| NI / NU         | arbitrary len, signed int vec & scalar |
| NI2 / NI3 / NI4 | fixed size signed int vec & scalar     |
| NU2 / NU3 / NU4 | fixed size unsigned int vec & scalar   |
| S2 / S3 / S4    | fixed size strided vec                 |
| NS2 / NS3 / NS4 | fixed size strided vec & scalar        |
| C               | arbitrary len vec, component wise args |
| C2 / C3 / C4    | fixed size vec, component wise args    |
| CS2 / CS3 / CS4 | fixed size strided vec, component args |

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
-   `setCS2` / `setCS3` / `setCS4`
-   `setNS2` / `setNS3` / `setNS4`
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

| Function    | Generic | Fixed | Strided | Int          | Comments        |
|-------------|---------|-------|---------|--------------|-----------------|
| `add`       | ✓       | 2-4   | S2-S4   | I2-I4, U2-U4 |                 |
| `div`       | ✓       | 2-4   | S2-S4   | I2-I4, U2-U4 |                 |
| `mul`       | ✓       | 2-4   | S2-S4   | I2-I4, U2-U4 |                 |
| `sub`       | ✓       | 2-4   | S2-S4   | I2-I4, U2-U4 |                 |
| `fmod`      | ✓       | 2-4   |         |              | (C/JS behavior) |
| `mod`       | ✓       | 2-4   |         |              | (GLSL behavior) |
| `pow`       | ✓       | 2-4   |         |              |                 |
| `remainder` | ✓       | 2-4   |         |              | (C behavior)    |

```ts
import { add, add2, addU2, addS2 } from "@thi.ng/vectors";

// generic
add([], [1, 2, 3, 4, 5], [10, 20, 30, 40, 50]);
// [11, 22, 33, 44, 55]

// fixed size & packed
add2([], [1, 2], [10, 20])
// [11, 22]

// unsigned int
addU2([], [1, -2], [-10, 20])
// [4294967287, 18]

// strided
addS2([], [1,0,2,0], [0,10,0,0,0,20], 0, 0, 1, 1, 2, 4)
// [11, 22]
```

#### Vector / scalar

Component wise op with one input vector and single scalar:

| Function     | Generic | Fixed | Strided  | Int          | Comments                   |
|--------------|---------|-------|----------|--------------|----------------------------|
| `addN`       | ✓       | 2-4   | S, S2-S4 | I2-I4, U2-U4 |                            |
| `divN`       | ✓       | 2-4   | S, S2-S4 | I2-I4, U2-U4 |                            |
| `mulN`       | ✓       | 2-4   | S, S2-S4 | I2-I4, U2-U4 |                            |
| `subN`       | ✓       | 2-4   | S, S2-S4 | I2-I4, U2-U4 |                            |
| `neg`        | ✓       | 2-4   |          |              | same as `mulN(out, v, -1)` |
| `fmodN`      | ✓       | 2-4   |          |              | (C/JS behavior)            |
| `modN`       | ✓       | 2-4   |          |              | (GLSL behavior)            |
| `powN`       | ✓       | 2-4   |          |              |                            |
| `remainderN` | ✓       | 2-4   |          |              | (C behavior)               |
| `roundN`     | ✓       | 2-4   |          |              |                            |

### Combined operations

| Function | Generic | Fixed | Strided  | Int | Comments    |
|----------|---------|-------|----------|-----|-------------|
| `addm`   | ✓       | 2-4   | S, S2-S4 |     | (a + b) * c |
| `addmN`  | ✓       | 2-4   | S, S2-S4 |     | (a + b) * n |
| `madd`   | ✓       | 2-4   | S, S2-S4 |     | a * n + c   |
| `maddN`  | ✓       | 2-4   | S, S2-S4 |     | a * n + b   |
| `msub`   | ✓       | 2-4   | S, S2-S4 |     | a * n - c   |
| `msubN`  | ✓       | 2-4   | S, S2-S4 |     | a * n - b   |
| `subm`   | ✓       | 2-4   | S, S2-S4 |     | (a - b) * c |
| `submN`  | ✓       | 2-4   | S, S2-S4 |     | (a - b) * n |

### Constraints

| Function  | Generic | Fixed   | Strided | Int | Comments             |
|-----------|---------|---------|---------|-----|----------------------|
| `clamp`   | ✓       | 2-4     |         |     | `min(max(a, b), c)`  |
| `clampN`  | ✓       | 2-4     |         |     | `min(max(a, n), m)`  |
| `clamp01` | ✓       | _2 - _4 |         |     | `min(max(a, 0), 1)`  |
| `clamp11` | ✓       | _2 - _4 |         |     | `min(max(a, -1), 1)` |
| `max`     | ✓       | 2-4     |         |     | `max(a, b)`          |
| `min`     | ✓       | 2-4     |         |     | `min(a, b)`          |

### Cross product

| Function      | Generic | Fixed | Strided | Int | Comments                  |
|---------------|---------|-------|---------|-----|---------------------------|
| `cross`       |         | 2, 3  | S2, S3  |     | 2D version returns scalar |
| `orthoNormal` |         | 3     |         |     |                           |
| `signedArea`  |         | 2     |         |     |                           |

### Dot product

| Function | Generic | Fixed | Strided  | Cwise      | Comments |
|----------|---------|-------|----------|------------|----------|
| `dot`    | ✓       | 2-4   | S, S2-S4 | C4, C6, C8 |          |

### Interpolation

| Function       | Generic | Fixed   | Strided    | Int | Comments |
|----------------|---------|---------|------------|-----|----------|
| `fit`          | ✓       | 2-4     |            |     |          |
| `fit01`        | ✓       | _2 - _4 |            |     |          |
| `fit11`        | ✓       | _2 - _4 |            |     |          |
| `mix`          | ✓       | 2-4     | S, S2 - S4 |     |          |
| `mixN`         | ✓       | 2-4     | S, S2 - S4 |     |          |
| `mixBilinear`  | ✓       | 2-4     |            |     |          |
| `mixCubic`     | ✓       |         |            |     |          |
| `mixQuadratic` | ✓       |         |            |     |          |
| `smoothStep`   | ✓       | 2-4     |            |     |          |
| `step`         | ✓       | 2-4     |            |     |          |

### Normalization / magnitude

| Function    | Generic | Fixed | Strided  | Int | Comments             |
|-------------|---------|-------|----------|-----|----------------------|
| `limit`     | ✓       |       |          |     |                      |
| `mag`       | ✓       | 2-4   | S, S2-S4 |     |                      |
| `magSq`     | ✓       | 2-4   | S, S2-S4 |     |                      |
| `normalize` | ✓       |       | S, S2-S4 |     | w/ opt target length |

### Distances

| Function              | Generic | Fixed | Strided | Int | Comments            |
|-----------------------|---------|-------|---------|-----|---------------------|
| `dist`                | ✓       | 2-4   |         |     |                     |
| `distSq`              | ✓       | 2-4   |         |     |                     |
| `distBrayCurtis`      | ✓       |       |         |     |                     |
| `distCanberra`        | ✓       |       |         |     |                     |
| `distChebyshev`       | ✓       | 2-4   |         |     |                     |
| `distCosine`          | ✓       |       |         |     |                     |
| `distHamming`         | ✓       |       |         |     |                     |
| `distHaversineLatLon` |         | 2     |         |     | lat/lon coordinates |
| `distHaversineLonLat` |         | 2     |         |     | lon/lat coordinates |
| `distJaccard`         | ✓       |       |         |     |                     |
| `distManhattan`       | ✓       | 2-4   |         |     |                     |
| `distMinkowski`       | ✓       |       |         |     |                     |
| `distSorensenDice`    | ✓       |       |         |     |                     |
| `distWeighted`        | ✓       |       |         |     |                     |
| `pointOnRay`          | ✓       | 2-3   |         |     | point at distance   |

### Orientation

| Function           | Generic | Fixed | Strided | Int | Comments                 |
|--------------------|---------|-------|---------|-----|--------------------------|
| `angleBetween`     |         | 2, 3  |         |     |                          |
| `angleRatio`       | ✓       |       |         |     |                          |
| `atan2`            | ✓       | 2-4   |         |     | `Math.atan2(y, x)`       |
| `bisect`           |         | 2     |         |     |                          |
| `cornerBisector`   | ✓       |       |         |     |                          |
| `degrees`          | ✓       | 2-4   |         |     |                          |
| `direction`        | ✓       | 2-3   |         |     | normalize(b - a)         |
| `faceForward`      | ✓       |       |         |     |                          |
| `heading`          | ✓       |       |         |     | alias `headingXY`        |
| `headingXY`        | ✓       |       |         |     |                          |
| `headingXZ`        | ✓       |       |         |     |                          |
| `headingYZ`        | ✓       |       |         |     |                          |
| `headingSegment`   | ✓       |       |         |     | alias `headingSegmentXY` |
| `headingSegmentXY` | ✓       |       |         |     |                          |
| `headingSegmentXZ` | ✓       |       |         |     |                          |
| `headingSegmentYZ` | ✓       |       |         |     |                          |
| `normalCCW`        |         |       |         |     | 2D only                  |
| `normalCW`         |         |       |         |     | 2D only                  |
| `perpendicularCCW` |         |       |         |     | 2D only                  |
| `perpendicularCW`  |         |       |         |     | 2D only                  |
| `project`          | ✓       |       |         |     |                          |
| `radians`          | ✓       | 2-4   |         |     |                          |
| `reflect`          | ✓       |       |         |     |                          |
| `refract`          | ✓       |       |         |     |                          |

### Rotations

(Also see rotation matrices provided by
[@thi.ng/matrices](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/matrices))

| Function              | Generic | Fixed | Strided | Int | Comments            |
|-----------------------|---------|-------|---------|-----|---------------------|
| `rotationAroundAxis`  |         | 3     |         |     |                     |
| `rotationAroundPoint` |         | 2     |         |     |                     |
| `rotate`              |         |       | S2      |     | alias for `rotateZ` |
| `rotateX`             |         |       | S3      |     |                     |
| `rotateY`             |         |       | S3      |     |                     |
| `rotateZ`             |         |       | S3      |     |                     |

### Polar / cartesian conversion

| Function    | Generic | Fixed | Strided | Int | Comments   |
|-------------|---------|-------|---------|-----|------------|
| `cartesian` | ✓       | 2, 3  |         |     | 2D/3D only |
| `polar`     | ✓       | 2, 3  |         |     | 2D/3D only |

### Randomness

All ops support custom PRNG impls based on the
[@thi.ng/random](https://codeberg.org/thi.ng/umbrella/src/branch/develop/packages/random)
`IRandom` interface and use `Math.random` by default:

| Function          | Generic | Fixed | Strided  | Int | Comments |
|-------------------|---------|-------|----------|-----|----------|
| `jitter`          | ✓       |       |          |     |          |
| `randMinMax`      | ✓       | 2-4   | S, S2-S4 |     |          |
| `randNorm`        | ✓       | 2-4   | S, S2-S4 |     |          |
| `randNormDistrib` | ✓       | 2-4   | S, S2-S4 |     |          |
| `random`          | ✓       | 2-4   | S, S2-S4 |     |          |
| `randomDistrib`   | ✓       | 2-4   | S, S2-S4 |     |          |

### Unary vector math ops

| Function          | Generic | Fixed | Strided | Int | Comments           |
|-------------------|---------|-------|---------|-----|--------------------|
| `abs`             | ✓       | 2-4   |         |     |                    |
| `acos`            | ✓       | 2-4   |         |     |                    |
| `acosh`           | ✓       | 2-4   |         |     |                    |
| `asin`            | ✓       | 2-4   |         |     |                    |
| `asinh`           | ✓       | 2-4   |         |     |                    |
| `atan` (1)        | ✓       | 2-4   |         |     | `Math.atan(y / x)` |
| `atanh` (1)       | ✓       | 2-4   |         |     |                    |
| `atan2` (1)       | ✓       | 2-4   |         |     | `Math.atan(y / x)` |
| `ceil`            | ✓       | 2-4   |         |     |                    |
| `cos`             | ✓       | 2-4   |         |     |                    |
| `cosh`            | ✓       | 2-4   |         |     |                    |
| `exp` (1)         | ✓       | 2-4   |         |     |                    |
| `exp2` (1)        | ✓       | 2-4   |         |     |                    |
| `floor`           | ✓       | 2-4   |         |     |                    |
| `fract`           | ✓       | 2-4   |         |     |                    |
| `fromHomogeneous` | ✓       | 3, 4  |         |     | 3D/4D only         |
| `invert`          | ✓       | 2-4   |         |     |                    |
| `invSqrt`         | ✓       | 2-4   |         |     |                    |
| `isInf`           | ✓       | 2-4   |         |     |                    |
| `isNaN`           | ✓       | 2-4   |         |     |                    |
| `leakyRelu`       | ✓       |       | S       |     |                    |
| `log` (1)         | ✓       | 2-4   |         |     |                    |
| `log2` (1)        | ✓       | 2-4   |         |     |                    |
| `major`           | ✓       | 2-4   |         |     |                    |
| `minor`           | ✓       | 2-4   |         |     |                    |
| `relu`            | ✓       |       | S       |     |                    |
| `round`           | ✓       | 2-4   |         |     |                    |
| `sigmoid`         | ✓       |       | S       |     |                    |
| `sign`            | ✓       | 2-4   |         |     |                    |
| `sin`             | ✓       | 2-4   |         |     |                    |
| `sinh`            | ✓       | 2-4   |         |     |                    |
| `sqrt`            | ✓       | 2-4   |         |     |                    |
| `sum`             | ✓       | 2-4   |         |     |                    |
| `tan`             | ✓       | 2-4   |         |     |                    |
| `tanh`            | ✓       | 2-4   | S       |     |                    |
| `trunc`           | ✓       | 2-4   |         |     |                    |
| `wrap`            | ✓       | 2-4   |         |     |                    |

- (1): Fixed names are suffixed with `_2`, `_3`, `_4`

### Vector array batch processing

Functions to transform flat / strided buffers w/ vector operations:

-   `mapV` / `mapVN` / `mapVV` / `mapVVN` / `mapVVV`
-   `mean` / `median`
-   `minBounds` / `maxBounds`

### Comparison / equality

-   `comparator2` / `comparator3` / `comparator4`
-   `equals` / `equals2` / `equals3` / `equals4`
-   `eqDelta` / `eqDelta2` / `eqDelta3` / `eqDelta4`
-   `eqDeltaS`
-   `eqDeltaArray`

### Bitwise operations (int / uint vec)

Arguments are assumed to be signed / unsigned ints. Results will be
forced accordingly.

| Function  | Generic | Fixed | Strided | Int          | Comments |
|-----------|---------|-------|---------|--------------|----------|
| `bitAnd`  | ✓       |       |         | I2-I4, U2-U4 |          |
| `bitAndN` | ✓       |       |         | I2-I4, U2-U4 |          |
| `bitNot`  | ✓       |       |         | I2-I4, U2-U4 |          |
| `bitOr`   | ✓       |       |         | I2-I4, U2-U4 |          |
| `bitOrN`  | ✓       |       |         | I2-I4, U2-U4 |          |
| `bitXor`  | ✓       |       |         | I2-I4, U2-U4 |          |
| `bitXorN` | ✓       |       |         | I2-I4, U2-U4 |          |
| `lshift`  | ✓       |       |         | I2-I4, U2-U4 |          |
| `rshift`  | ✓       |       |         | I2-I4, U2-U4 |          |
| `lshiftN` | ✓       |       |         | I2-I4, U2-U4 |          |
| `rshiftN` | ✓       |       |         | I2-I4, U2-U4 |          |

### Vector conversions / coercions

- `asIVec` (2-4) -  signed int vector
- `asUVec` (2-4) -  unsigned int vector
- `asBVec` (2-4) -  boolean vector
- `fromBVec` (2-4) -  coerces each component to 0/1

### Boolean vector logic

| Function    | Generic | Fixed | Strided | Int | Comments          |
|-------------|---------|-------|---------|-----|-------------------|
| `logicAnd`  | ✓       | 2-4   |         |     |                   |
| `logicAndN` | ✓       | 2-4   |         |     |                   |
| `logicOr`   | ✓       | 2-4   |         |     |                   |
| `logicOrN`  | ✓       | 2-4   |         |     |                   |
| `logicNot`  | ✓       | 2-4   |         |     |                   |
| `every`     | ✓       | 2-4   |         |     | returns `boolean` |
| `some`      | ✓       | 2-4   |         |     | returns `boolean` |

### Componentwise comparisons

All resulting in boolean vectors:

| Function | Generic | Fixed | Strided | Int | Comments |
|----------|---------|-------|---------|-----|----------|
| `eq`     | ✓       | 2-4   |         |     |          |
| `lt`     | ✓       | 2-4   |         |     |          |
| `lte`    | ✓       | 2-4   |         |     |          |
| `gt`     | ✓       | 2-4   |         |     |          |
| `gte`    | ✓       | 2-4   |         |     |          |
| `neq`    | ✓       | 2-4   |         |     |          |

### Hashing

- `hash`

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-vectors,
  title = "@thi.ng/vectors",
  author = "Karsten Schmidt",
  note = "https://thi.ng/vectors",
  year = 2015
}
```

## License

&copy; 2015 - 2026 Karsten Schmidt // Apache License 2.0
