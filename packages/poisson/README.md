<!-- This file is generated - DO NOT EDIT! -->

# ![poisson](https://media.thi.ng/umbrella/banners/thing-poisson.svg?bc909da4)

[![npm version](https://img.shields.io/npm/v/@thi.ng/poisson.svg)](https://www.npmjs.com/package/@thi.ng/poisson)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/poisson.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [Poisson disc sampling](#poisson-disc-sampling)
  - [Stratified grid sampling](#stratified-grid-sampling)
- [Authors](#authors)
- [License](#license)

## About

![example screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-voronoi.jpg)

nD Stratified grid and [Poisson disc
sampling](https://en.wikipedia.org/wiki/Supersampling#Poisson_disc) with
support for variable spatial density, custom PRNGs (via
[@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)'s
`IRandom` interface & implementations) and customizable quality
settings.

The Poisson disc sampler requires a spatial index and we recommend using
`KdTreeSet` from the
[@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel)
package to speed up the sampling process, but other
[`ISpatialSet`-compatible](https://docs.thi.ng/umbrella/geom-api/interfaces/ISpatialSet.html)
indices are supported as well...

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bpoisson%5D+in%3Atitle)

### Related packages

- [@thi.ng/geom](https://github.com/thi-ng/umbrella/tree/develop/packages/geom) - Functional, polymorphic API for 2D geometry types & SVG generation
- [@thi.ng/geom-voronoi](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-voronoi) - Fast, incremental 2D Delaunay & Voronoi mesh implementation
- [@thi.ng/lowdisc](https://github.com/thi-ng/umbrella/tree/develop/packages/lowdisc) - n-dimensional low-discrepancy sequence generators/iterators
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random) - Pseudo-random number generators w/ unified API, distributions, weighted choices, ID generation

## Installation

```bash
yarn add @thi.ng/poisson
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/poisson"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const poisson = await import("@thi.ng/poisson");
```

Package sizes (gzipped, pre-treeshake): ESM: 511 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                                                      | Live demo                                              | Source                                                                              |
|:------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/> | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/poisson.jpg" width="240"/>           | 2D Poisson-disc sampler with procedural gradient map                             | [Demo](https://demo.thi.ng/umbrella/poisson-circles/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poisson-circles)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/stratified-grid.png" width="240"/>   | 2D Stratified grid sampling example                                              | [Demo](https://demo.thi.ng/umbrella/stratified-grid/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/stratified-grid)  |

## API

[Generated API docs](https://docs.thi.ng/umbrella/poisson/)

### Poisson disc sampling

The package provides a single function `samplePoisson()` and the
following options to customize the sampling process:

- **points**: Point generator function. Responsible for producing a new
  candidate point within user defined bounds using provided RNG.
- **density**: Density field function. Called for each new candidate
  point created by point generator and should return the poisson disc
  exclusion radius for the given point location. The related candidate
  point can only be placed if no other points are already existing
  within the given radius/distance. If this option is given as number,
  uses this value to create a uniform distance field.
- **index**: Spatial indexing implementation for nearest neighbor
  searches of candidate points. Currently only
  [@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel)
  types are supported. The data structure is used to store all
  successful sample points. Furthermore, pre-seeding the data structure
  allows already indexed points to participate in the sampling process
  and so can be used to define exclusion zones. It also can be used as
  mechanism for progressive sampling, i.e. generating a large number of
  samples and distributing the process over multiple invocations of
  smaller sample sizes (see `max` option) to avoid long delays.
- **max**:  Max number of samples to produce. Must be given, no default.
- **jitter?**: Step distance for the random walk each failed
  candidate point is undergoing. This distance should be adjusted
  depending on overall sampling area/bounds. Default: 1
- **iter?**: Number of random walk steps performed before giving up on a
  candidate point. Increasing this value improves overall quality.
  Default: 1
- **quality?**: Number of allowed failed consecutive candidate points
  before stopping entire sampling process (most likely due to not being
  able to place any further points). As with the `iter` param,
  increasing this value improves overall quality, especially in dense
  regions with small radii. Default: 500
- **rnd?**: Random number generator instance. Default:
  [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
  `SYSTEM` (aka Math.random)

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/poisson.jpg)

```ts
import { asSvg, circle, svgDoc } from "@thi.ng/geom";
import { KdTreeSet } from "@thi.ng/geom-accel";
import { fit01 } from "@thi.ng/math";
import { samplePoisson } from "@thi.ng/poisson";
import { dist, randMinMax2 } from "@thi.ng/vectors";

const index = new KdTreeSet(2);

const pts = samplePoisson({
    index,
    points: () => randMinMax2(null, [0, 0], [500, 500]),
    density: (p) => fit01(Math.pow(dist(p, [250, 250]) / 250, 2), 2, 10),
    iter: 5,
    max: 8000,
    quality: 500,
});

// use thi.ng/geom to visualize results
// each circle's radius is set to distance to its nearest neighbor
const circles = pts.map((p) =>
    circle(p, dist(p, index.queryKeys(p, 40, 2)[1]) / 2)
);

document.body.innerHTML = asSvg(
    svgDoc({ fill: "none", stroke: "blue" }, ...circles)
);
```

### Stratified grid sampling

The `stratifiedGrid` function can produce nD grid samples based on the following config options:

- **dim**: nD vector defining grid size (in cells)
- **samples?**: Number of samples per grid cell (default: 1)
- **rnd?**: Random number generator instance. Default:
  [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
  `SYSTEM` (aka Math.random)

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/stratified-grid.png)

```ts
import { asSvg, circle, svgDoc } from "@thi.ng/geom";
import { KdTreeSet } from "@thi.ng/geom-accel";
import { stratifiedGrid } from "@thi.ng/poisson";
import { map } from "@thi.ng/transducers";
import { dist } from "@thi.ng/vectors";

const index = new KdTreeSet(2);
index.into(stratifiedGrid({ dim: [50, 50], samples: 1 }));

document.body.innerHTML = asSvg(
    svgDoc(
        {
            width: 600,
            height: 600,
            fill: "none",
            stroke: "blue",
            "stroke-width": 0.1,
        },
        ...map(
            (p) => circle(p, dist(p, index.queryKeys(p, 2 * Math.SQRT2, 2)[1]) / 2),
            index.keys()
        )
    )
);
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-poisson,
  title = "@thi.ng/poisson",
  author = "Karsten Schmidt",
  note = "https://thi.ng/poisson",
  year = 2016
}
```

## License

&copy; 2016 - 2022 Karsten Schmidt // Apache Software License 2.0
