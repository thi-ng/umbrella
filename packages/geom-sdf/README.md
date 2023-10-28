<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/geom-sdf](https://media.thi.ng/umbrella/banners-20230807/thing-geom-sdf.svg?31ffecd1)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-sdf.svg)](https://www.npmjs.com/package/@thi.ng/geom-sdf)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-sdf.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
  - [SDF creation](#sdf-creation)
  - [SDF combinators](#sdf-combinators)
  - [SDF discretization, sampling & domain modifiers](#sdf-discretization-sampling--domain-modifiers)
- [Status](#status)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D Signed Distance Field creation from [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) shapes, conversions, sampling, combinators.

Includes several distance functions and SDF operators ported from GLSL
implementations by:

- Inigo Quilez ([Article](https://iquilezles.org/articles/distfunctions2d/))
- Mercury demogroup ([HG_SDF](https://mercury.sexy/hg_sdf/))

### SDF creation

SDFs can be directly defined/composed via provided shape primitive functions and
combinators OR via automatic conversion from @thi.ng/geom geometry
types/hierarchies. In the latter case various
[attributes](https://docs.thi.ng/umbrella/geom-sdf/interfaces/SDFAttribs.html)
can be used to control the conversion process. Regardless of approach, the
result will be a single distance function which accepts a world position and
returns the signed distance to the encoded scene.

```ts
// via direct SDF composition
import { circle2, union } from "@thi.ng/geom-sdf";

const f = union([circle2([-50, 0], 100), circle2([50, 0], 100)]);

// via conversion
import { circle, group } from "@thi.ng/geom";
import { asSDF } from "@thi.ng/geom-sdf";

const f = asSDF(group({}, [circle([-50, 0], 100), circle([50, 0], 100)]));
```

### SDF combinators

The following table illustrates various options how SDFs can be combined. When
using the [`asSDF()`](https://docs.thi.ng/umbrella/geom-sdf/functions/asSDF.html)
geometry converter, these operators can be specified and configured (most are
parametric) via a shape `group()`'s
[attributes](https://docs.thi.ng/umbrella/geom-sdf/interfaces/SDFAttribs.html),
e.g.

```ts
group({ __sdf: { combine: "diff", chamfer: 50 }}, [
    rectFromCentroid([-50,-50], 200),
    rectFromCentroid([50,50], 200),
])
```

| Operator | Union                                                                                                    | Difference                                                                                              | Intersection                                                                                            |
|----------|----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| default  | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-none-union.png)    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-none-diff.png)    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-none-isec.png)    |
| chamfer  | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-chamfer-union.png) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-chamfer-diff.png) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-chamfer-isec.png) |
| round    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-round-union.png)   | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-round-diff.png)   | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-round-isec.png)   |
| smooth   | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-smooth-union.png)  | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-smooth-diff.png)  | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-smooth-isec.png)  |
| steps    | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-steps-union.png)   | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-steps-diff.png)   | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/combine-steps-isec.png)   |

### SDF discretization, sampling & domain modifiers

The package provides the
[`sample2d()`](https://docs.thi.ng/umbrella/geom-sdf/functions/sample2d.html) and
[`asPolygons()`](https://docs.thi.ng/umbrella/geom-sdf/functions/asPolygons.html)
functions to discretize an SDF and cache results in a buffer (image) and then
extract contour polygons from it, i.e. convert the 2D back into geometry (see
example further below). The SDF will be sampled in a user defined bounding
rectangle (with customizable resolution) and the sampling positions can be
modulated via several provided domain modifiers to create various axial/spatial
repetions, symmetries etc. Modifiers are nestable/composable via standard
functional composition (e.g. using
[`compL()`](https://docs.thi.ng/umbrella/compose/functions/compL.html)) and also
support custom modfifiers. The table below illustrates a few examples effects:

| Modifier          |                                                                                                     |                                                                                                     |                                                                                                     |
|-------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `repeat2()`       | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-repeat-01.png) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-repeat-02.png) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-repeat-03.png) |
| `repeatGrid2()`   | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-grid-01.png)   | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-grid-02.png)   | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-grid-03.png)   |
| `repeatMirror2()` | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-mirror-01.png) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-mirror-02.png) | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-mirror-03.png) |
| `repeatPolar2()`  | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-polar-01.png)  | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-polar-02.png)  | ![](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/domain-polar-03.png)  |

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-sdf%5D+in%3Atitle)

## Related packages

- [@thi.ng/distance-transform](https://github.com/thi-ng/umbrella/tree/develop/packages/distance-transform) - Binary image to Distance Field transformation
- [@thi.ng/geom-isoline](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isoline) - Fast 2D contour line extraction / generation
- [@thi.ng/pixel](https://github.com/thi-ng/umbrella/tree/develop/packages/pixel) - Typedarray integer & float pixel buffers w/ customizable formats, blitting, drawing, convolution
- [@thi.ng/shader-ast-stdlib](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast-stdlib) - Function collection for modular GPGPU / shader programming with [@thi.ng/shader-ast](https://github.com/thi-ng/umbrella/tree/develop/packages/shader-ast)

## Installation

```bash
yarn add @thi.ng/geom-sdf
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/geom-sdf"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const geomSdf = await import("@thi.ng/geom-sdf");
```

Package sizes (brotli'd, pre-treeshake): ESM: 3.53 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-isoline](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isoline)
- [@thi.ng/geom-poly-utils](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-poly-utils)
- [@thi.ng/geom-resample](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-resample)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                           | Description                                                       | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-sdf-logo.jpg" width="240"/> | (Re)Constructing the thi.ng logo using a 2D signed-distance field | [Demo](https://demo.thi.ng/umbrella/geom-sdf-logo/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-sdf-logo) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-sdf/)

```js
import { asSvg, bounds, circle, group, svgDoc } from "@thi.ng/geom";
import { asPolygons, asSDF, sample2d } from "@thi.ng/geom-sdf";
import { range, repeatedly } from "@thi.ng/transducers";
import { randMinMax2 } from "@thi.ng/vectors";
import { writeFileSync } from "fs";

const RES = [256, 256];

// create a group of 20 random circle shapes
// the special `__sdf` attrib object is used to control the conversion later
// the `smooth` option will combine the circles using the `smoothUnion()` operator
// see: https://docs.thi.ng/umbrella/geom-sdf/interfaces/SDFAttribs.html
const scene = group({ stroke: "red", __sdf: { smooth: 20 } }, [
    ...repeatedly(
        () =>
            circle(
                randMinMax2([], [-100, -100], [100, 100]),
                5 + Math.random() * 15
            ),
        20
    ),
]);

// compute bounding box + some extra margin
// the extra margin is to ensure the SDF can be fully sampled
// at some distance from the original boundary (see further below)
const sceneBounds = bounds(scene, 40);

// convert to an SDF distance function
// more information about supported shape types:
// https://docs.thi.ng/umbrella/geom-sdf/functions/asSDF.html
const sdf = asSDF(scene);

// sample SDF in given bounding rect and resolution
const image = sample2d(sdf, sceneBounds, RES);

// extract contour polygons from given image
// in this case the contours extracted are at distances in the [0..32) interval
// the function also simplifies the resulting polygons using the Douglas-Peucker algorithm
// with the given threshold (0.25) - the default setting only removes co-linear vertices...
// see: https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
const contours = asPolygons(image, sceneBounds, RES, range(0, 32, 4), 0.25);

// convert to SVG and output as file
writeFileSync(
    "export/metaballs.svg",
    asSvg(
        svgDoc(
            { fill: "none" },
            // contour polygons
            group({ stroke: "#000" }, contours),
            // original geometry
            scene
        )
    )
);
```

Results:

| `circle()`                                                                                                                   | `rect()`                                                                                                                          |
|------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| ![metaballs based on circles](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/metaballs.png)       | ![metaballs based on rectangles](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/metaballs-rect.png)    |
| `circle()` (smooth)                                                                                                          | `rect()` (smooth)                                                                                                                 |
| ![metaballs w/ smooth union](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/metaballs-smooth.png) | ![metaballs w/ smooth union](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/metaballs-rect-smooth.png) |

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-geom-sdf,
  title = "@thi.ng/geom-sdf",
  author = "Karsten Schmidt",
  note = "https://thi.ng/geom-sdf",
  year = 2022
}
```

## License

&copy; 2022 - 2023 Karsten Schmidt // Apache License 2.0
