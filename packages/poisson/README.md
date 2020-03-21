<!-- This file is generated - DO NOT EDIT! -->

# ![@thi.ng/poisson](https://media.thi.ng/umbrella/banners/thing-poisson.svg?1584814476)

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
- [Authors](#authors)
- [License](#license)

## About

![example screenshot](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/geom/geom-voronoi.jpg)

nD [Poisson disk
sampling](https://en.wikipedia.org/wiki/Supersampling#Poisson_disc) with
support for variable spatial density, custom PRNGs (via
[@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)'s
`IRandom` interface & implementations) and customizable quality
settings.

Currently uses a [k-D
tree](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel/src/kdtree.ts#L57)
implementation to speed up the sampling process, but will be refactored
to support other, alternative spatial indexing mechanisms...

### Status

**STABLE** - used in production

### Related packages

- [@thi.ng/geom-voronoi](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-voronoi) - Fast, incremental 2D Delaunay & Voronoi mesh implementation
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random) - Pseudo-random number generators w/ unified API

## Installation

```bash
yarn add @thi.ng/poisson
```

Package sizes (gzipped): ESM: 0.3KB / CJS: 0.4KB / UMD: 0.5KB

## Dependencies

- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/geom-api](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-api)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)
- [tslib](https://github.com/thi-ng/umbrella/tree/develop/packages/undefined)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                                                      | Live demo                                              | Source                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/> | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/poisson/)

The package provides a single function `samplePoisson()` and the
following options to customize the sampling process:

```ts
interface PoissonOpts {
    /**
     * Point generator function. Responsible for producing a new
     * candidate point within user defined bounds using provided RNG.
     */
    points: PointGenerator;
    /**
     * Density field function. Called for each new sample point created
     * by point generator and should return the exclusion radius for
     * given point location. If this option is given as number, uses
     * this value to create a uniform distance field.
     */
    density: DensityFunction | number;
    /**
     * Spatial indexing implementation. Currently only KdTree from
     * thi.ng/geom-accel package is supported and must be
     * pre-initialized to given dimensions. Furthermore, pre-seeding the
     * tree allows already indexed points to participate in the sampling
     * process and act as exclusion zones.
     */
    accel: KdTree<ReadonlyVec, any>;
    /**
     * Max number of samples to produce.
     */
    max: number;
    /**
     * Step distance for the random walk each failed candidate point is
     * undergoing. This distance should be adjusted depending on overall
     * sampling area/bounds. Default: 1
     */
    jitter?: number;
    /**
     * Number of random walk steps performed before giving up on a
     * candidate point. Default: 5
     */
    iter?: number;
    /**
     * Number of allowed failed continuous candidate points before
     * stopping entire sampling process. Increasing this value improves
     * overall quality, especially in dense regions with small radii.
     * Default: 500
     */
    quality?: number;
    /**
     * Random number generator instance. Default thi.ng/random/SYSTEM
     * (aka Math.random)
     */
    rnd?: IRandom;
}
```

![example output](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/poisson/poisson.jpg)

```ts
import { samplePoisson } from "@thi.ng/poisson";

import { asSvg, svgDoc, circle } from "@thi.ng/geom";
import { KdTree } from "@thi.ng/geom-accel";
import { fit01 } from "@thi.ng/math";
import { dist2, randMinMax2 } from "@thi.ng/vectors";

accel = new KdTree(2);

pts = samplePoisson({
	accel,
	points: () => randMinMax2(null, [0, 0], [500, 500]),
	density: (p) => fit01(Math.pow(Math.max(dist2(p, [250, 250]) / 250, 0), 2), 2, 10),
	iter: 5,
	max: 8000,
	quality: 500
});

// use thi.ng/geom to visualize results
// each circle's radius is set to distance to its nearest neighbor
circles = pts.map((p) => circle(p, dist2(p, accel.selectKeys(p, 2, 40)[1]) / 2));

document.body.innerHTML = asSvg(svgDoc({ fill: "none", stroke: "red" }, ...circles));
```

## Authors

Karsten Schmidt

## License

&copy; 2016 - 2020 Karsten Schmidt // Apache Software License 2.0
