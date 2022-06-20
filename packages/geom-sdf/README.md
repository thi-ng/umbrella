<!-- This file is generated - DO NOT EDIT! -->

# ![geom-sdf](https://media.thi.ng/umbrella/banners/thing-geom-sdf.svg?6069668d)

[![npm version](https://img.shields.io/npm/v/@thi.ng/geom-sdf.svg)](https://www.npmjs.com/package/@thi.ng/geom-sdf)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/geom-sdf.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

2D Signed Distance Field creation from [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) shapes, conversions, sampling, combinators.

### Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bgeom-sdf%5D+in%3Atitle)

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

```text
# with flag only for < v16
node --experimental-repl-await

> const geomSdf = await import("@thi.ng/geom-sdf");
```

Package sizes (gzipped, pre-treeshake): ESM: 2.61 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/defmulti](https://github.com/thi-ng/umbrella/tree/develop/packages/defmulti)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/geom-isoline](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-isoline)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## API

[Generated API docs](https://docs.thi.ng/umbrella/geom-sdf/)

```js
import { asSvg, bounds, circle, group, simplify, svgDoc } from "@thi.ng/geom";
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
// the margin is to ensure
const sceneBounds = bounds(scene, 40);

// convert to an SDF distance function
// more information about supported shape types:
// https://docs.thi.ng/umbrella/geom-sdf/modules.html#asSDF
const sdf = asSDF(scene);

// sample SDF in given bounding rect and resolution
const image = sample2d(sdf, sceneBounds, RES);

// extract contour polygons from given image
// in this case the contours extracted are at distances in the [0..32) interval
// afterwards we also simplify the resulting polygons using the Douglas-Peucker algorithm
// see: https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
const contours = asPolygons(image, sceneBounds, RES, range(0, 32, 4)).map(
    (p) => simplify(p, 0.25)
);

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

| using `circle()`                                                                                                       | using `rect()`                                                                                                                 |
|------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| ![metaballs based on circles](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/metaballs.png) | ![metaballs based on rectangles](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/metaballs-rect.png) |

## Authors

Karsten Schmidt

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

&copy; 2022 Karsten Schmidt // Apache Software License 2.0
