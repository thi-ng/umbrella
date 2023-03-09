<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

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

<!-- include ../../assets/tpl/footer.md -->
