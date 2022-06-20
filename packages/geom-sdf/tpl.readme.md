# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

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

Result:

![metaballs example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom-sdf/metaballs.png)

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
