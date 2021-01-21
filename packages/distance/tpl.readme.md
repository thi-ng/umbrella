# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

### Distance metrics

The package provides the
[`IDistance`](https://github.com/thi-ng/umbrella/blob/develop/packages/distance/src/api.ts)
interface for custom distance metric implementations & conversions from/to raw
distance values. The following preset metrics are provided too:

| **Preset**        | **Number** | **n-D** | **2D** | **3D** |
|-------------------|------------|---------|--------|--------|
| `EUCLEDIAN`       |            | ✅       |        |        |
| `EUCLEDIAN1`      | ✅          |         |        |        |
| `EUCLEDIAN2`      |            |         | ✅      |        |
| `EUCLEDIAN3`      |            |         |        | ✅      |
| `DIST_SQ`         |            | ✅       |        |        |
| `DIST_SQ1`        | ✅          |         |        |        |
| `DIST_SQ2`        |            |         | ✅      |        |
| `DIST_SQ3`        |            |         |        | ✅      |
| `defManhattan(n)` |            | ✅       |        |        |
| `MANHATTAN2`      |            |         | ✅      |        |
| `MANHATTAN3`      |            |         |        | ✅      |

### Neighborhoods

Custom neighborhood selections can be defined via the
[`INeighborhood`](https://github.com/thi-ng/umbrella/blob/develop/packages/distance/src/api.ts)
interface. Currently, there are two different implementations available, each
providing several factory functions to instantiate and provide defaults for
different dimensions. See documentation and examples below.

#### Nearest

An `INeighborhood` implementation for nearest neighbor queries around a given
target location, initial query radius and `IDistance` metric to determine
proximity.

#### KNearest

An `INeighborhood` implementation for K-nearest neighbor queries around a given
target location, initial query radius and `IDistance` metric to determine
proximity. The K-nearest neighbors will be accumulated via an internal
[heap](https://github.com/thi-ng/umbrella/tree/develop/packages/heaps) and
results can be optionally returned in order of proximity (via `.deref()` or
`.values()`). For K=1 it will be more efficient to use `Nearest` to avoid the
additional overhead.

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

```ts
import * as d from "@thi.ng/distance";

// collect the 3 nearest numbers for target=10 and using
// infinite selection radius and squared distance metric (defaults)
const k = d.knearestN(10, 3);
// c
[5, 16, 9.5, 2, 12].forEach((x) => k.consider(x, x));

// retrieve result tuples of [distance, value]
k.deref()
// [ [ 25, 5 ], [ 4, 12 ], [ 0.25, 9.5 ] ]

// result values only
k.values()
// [ 5, 12, 9.5 ]

// neighborhood around 10, K=3 w/ max radius 5
// also use Eucledian distance and sort results by proximity
const k2 = d.knearestN(10, 3, 5, d.EUCLEDIAN1, true);
[5, 16, 9.5, 2, 12].forEach((x) => k2.consider(x, x));

k2.deref()
// [ [ 0.5, 9.5 ], [ 2, 12 ], [ 5, 5 ] ]
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
