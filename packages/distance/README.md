<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/distance](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/banners/thing-distance.svg?7bd4f62f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/distance.svg)](https://www.npmjs.com/package/@thi.ng/distance)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/distance.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 210 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Distance metrics](#distance-metrics)
  - [Neighborhoods](#neighborhoods)
    - [Nearest](#nearest)
    - [KNearest](#knearest)
    - [Radial](#radial)
- [Status](#status)
- [Support packages](#support-packages)
- [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

N-dimensional distance metrics & K-nearest neighborhoods for point queries.

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

#### Radial

An unbounded and unsorted version of [`KNearest`](#knearest), selecting _all_
items around the target location and given search radius. Qualifying neighbors
will be accumulated in order of processing via an internal array.

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bdistance%5D+in%3Atitle)

Work is underway integrating this approach into the spatial indexing data
structures provided by the
[@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel)
package.

## Support packages

- [@thi.ng/distance-transform](https://github.com/thi-ng/umbrella/tree/develop/packages/distance-transform) - Binary image to Distance Field transformation

## Related packages

- [@thi.ng/geom-accel](https://github.com/thi-ng/umbrella/tree/develop/packages/geom-accel) - n-D spatial indexing data structures with a shared ES6 Map/Set-like API
- [@thi.ng/k-means](https://github.com/thi-ng/umbrella/tree/develop/packages/k-means) - k-means & k-medians with customizable distance functions and centroid initializations for n-D vectors
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors) - Optimized 2d/3d/4d and arbitrary length vector operations, support for memory mapping/layouts

## Installation

```bash
yarn add @thi.ng/distance
```

ESM import:

```ts
import * as dist from "@thi.ng/distance";
```

Browser ESM import:

```html
<script type="module" src="https://esm.run/@thi.ng/distance"></script>
```

[JSDelivr documentation](https://www.jsdelivr.com/)

For Node.js REPL:

```js
const dist = await import("@thi.ng/distance");
```

Package sizes (brotli'd, pre-treeshake): ESM: 1.41 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/checks](https://github.com/thi-ng/umbrella/tree/develop/packages/checks)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/heaps](https://github.com/thi-ng/umbrella/tree/develop/packages/heaps)
- [@thi.ng/math](https://github.com/thi-ng/umbrella/tree/develop/packages/math)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

Note: @thi.ng/api is in _most_ cases a type-only import (not used at runtime)

## Usage examples

One project in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory is using this package:

| Screenshot                                                                                                           | Description                               | Live demo                                           | Source                                                                           |
|:---------------------------------------------------------------------------------------------------------------------|:------------------------------------------|:----------------------------------------------------|:---------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-knn-hash.jpg" width="240"/> | K-nearest neighbor search in an hash grid | [Demo](https://demo.thi.ng/umbrella/geom-knn-hash/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-knn-hash) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/distance/)

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

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-distance,
  title = "@thi.ng/distance",
  author = "Karsten Schmidt",
  note = "https://thi.ng/distance",
  year = 2021
}
```

## License

&copy; 2021 - 2025 Karsten Schmidt // Apache License 2.0
