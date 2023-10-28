<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->

# ![@thi.ng/k-means](https://media.thi.ng/umbrella/banners-20230807/thing-k-means.svg?974198f6)

[![npm version](https://img.shields.io/npm/v/@thi.ng/k-means.svg)](https://www.npmjs.com/package/@thi.ng/k-means)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/k-means.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo and anti-framework.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Configurable k-means & k-medians (with k-means++ initialization) for n-D vectors.

## Status

**BETA** - possibly breaking changes forthcoming

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bk-means%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/k-means
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/k-means"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const kMeans = await import("@thi.ng/k-means");
```

Package sizes (brotli'd, pre-treeshake): ESM: 878 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/distance](https://github.com/thi-ng/umbrella/tree/develop/packages/distance)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                             | Description                                                                 | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/> | Color palette generation via dominant color extraction from uploaded images | [Demo](https://demo.thi.ng/umbrella/dominant-colors/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/kmeans-viz.jpg" width="240"/>      | k-means clustering visualization                                            | [Demo](https://demo.thi.ng/umbrella/kmeans-viz/)      | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/kmeans-viz)      |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-indexed.jpg" width="240"/>   | Image dithering and remapping using indexed palettes                        | [Demo](https://demo.thi.ng/umbrella/pixel-indexed/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-indexed)   |

## API

[Generated API docs](https://docs.thi.ng/umbrella/k-means/)

Example usage: Clustering cities by lat/lon location

```ts tangle:export/readme.ts
import { HAVERSINE_LATLON } from "@thi.ng/distance";
import { kmeans, meansLatLon } from "@thi.ng/k-means";

// data sourced from:
// https://github.com/OpenDataFormats/worldcities/blob/master/src/data/cities.json
const cities = [
    { id: "anchorage", latlon: [61.21806, -149.90028] },
    { id: "berlin", latlon: [52.52437, 13.41053] },
    { id: "boston", latlon: [42.35843, -71.05977] },
    { id: "calgary", latlon: [51.05011, -114.08529] },
    { id: "cape town", latlon: [-33.92584, 18.42322] },
    { id: "detroit", latlon: [42.33143, -83.04575] },
    { id: "harare", latlon: [-17.82772, 31.05337] },
    { id: "london", latlon: [51.50853, -0.12574] },
    { id: "manila", latlon: [14.6042, 120.9822] },
    { id: "nairobi", latlon: [-1.28333, 36.81667] },
    { id: "new york", latlon: [40.71427, -74.00597] },
    { id: "paris", latlon: [48.85341, 2.3488] },
    { id: "philadelphia", latlon: [39.95233, -75.16379] },
    { id: "portland", latlon: [45.52345, -122.67621] },
    { id: "seoul", latlon: [37.566, 126.9784] },
    { id: "shanghai", latlon: [31.22222, 121.45806] },
    { id: "tokyo", latlon: [35.6895, 139.69171] },
    { id: "vancouver", latlon: [49.24966, -123.11934] },
    { id: "vienna", latlon: [48.20849, 16.37208] },
    { id: "windhoek", latlon: [-22.55941, 17.08323] },
];

// cluster based on lat/lon
const clusters = kmeans(
    5,
    cities.map((x) => x.latlon),
    {
        // custom centroid calc for geo locations
        // https://docs.thi.ng/umbrella/k-means/functions/meansLatLon.html
        strategy: meansLatLon,
        // custom distance function for geo location (default: DIST_SQ)
        dist: HAVERSINE_LATLON,
    }
);

// print each cluster
for (let c of clusters) {
    console.log(c.items.map((i) => cities[i].id));
}

// [ 'manila', 'seoul', 'shanghai', 'tokyo' ]
// [ 'berlin', 'london', 'paris', 'vienna' ]
// [ 'boston', 'detroit', 'new york', 'philadelphia' ]
// [ 'cape town', 'harare', 'nairobi', 'windhoek' ]
// [ 'anchorage', 'calgary', 'portland', 'vancouver' ]
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-k-means,
  title = "@thi.ng/k-means",
  author = "Karsten Schmidt",
  note = "https://thi.ng/k-means",
  year = 2021
}
```

## License

&copy; 2021 - 2023 Karsten Schmidt // Apache License 2.0
