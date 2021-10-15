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
[`IDistance`](https://docs.thi.ng/umbrella/distance/interfaces/IDistance.html)
interface for custom distance metric implementations & conversions from/to raw
distance values. The following preset metrics are provided too:

| **Preset**         | **Number** | **nD** | **2D** | **3D** | **Comments**                                                         |
|--------------------|------------|--------|--------|--------|----------------------------------------------------------------------|
| `EUCLEDIAN`        |            | ✅      |        |        | Eucledian distance                                                   |
| `EUCLEDIAN1`       | ✅          |        |        |        |                                                                      |
| `EUCLEDIAN2`       |            |        | ✅      |        |                                                                      |
| `EUCLEDIAN3`       |            |        |        | ✅      |                                                                      |
| `HAVERSINE_LATLON` |            |        | ✅      |        | Great-circle distance for lat/lon geo locations                      |
| `HAVERSINE_LONLAT` |            |        | ✅      |        | Great-circle distance for lon/lat geo locations                      |
| `DIST_SQ`          |            | ✅      |        |        | Squared dist (avoids `Math.sqrt`)                                    |
| `DIST_SQ1`         | ✅          |        |        |        |                                                                      |
| `DIST_SQ2`         |            |        | ✅      |        |                                                                      |
| `DIST_SQ3`         |            |        |        | ✅      |                                                                      |
| `defManhattan(n)`  |            | ✅      |        |        | [Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry) |
| `MANHATTAN2`       |            |        | ✅      |        |                                                                      |
| `MANHATTAN3`       |            |        |        | ✅      |                                                                      |

### Neighborhoods

Neighborhoods can be used to select n-D spatial items around a given target
location and an optional catchment radius (infinite by default). Neighborhoods
also use one of the given distance metrics and implement the widely used
[`IDeref`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/deref.ts)
interface to obtain the final query results.

Custom neighborhood selections can be defined via the
[`INeighborhood`](https://docs.thi.ng/umbrella/distance/interfaces/INeighborhood.html)
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

Work is underway integrating this approach into the spatial indexing data
structures provided by the
[@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel)
package.

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

const items = { a: 5, b: 16, c: 9.5, d: 2, e: 12 };

// collect the 3 nearest numbers for target=10 and using
// infinite selection radius and squared distance metric (defaults)
const k = d.knearestN(10, 3);
// consider each item for inclusion
Object.entries(items).forEach(([id, x]) => k.consider(x, id));

// retrieve result tuples of [distance, value]
k.deref()
// [ [ 25, 'a' ], [ 4, 'e' ], [ 0.25, 'c' ] ]

// result values only
k.values()
// [ 'a', 'e', 'c' ]

// neighborhood around 10, K=3 w/ max radius 5
// also use Eucledian distance and sort results by proximity
const k2 = d.knearestN(10, 3, 5, d.EUCLEDIAN1, true);
Object.entries(items).forEach(([id, x]) => k2.consider(x, id));

k2.deref()
// [ [ 0.5, 'c' ], [ 2, 'e' ], [ 5, 'a' ] ]
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
