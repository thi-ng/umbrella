<!-- This file is generated - DO NOT EDIT! -->

# ![k-means](https://media.thi.ng/umbrella/banners-20220914/thing-k-means.svg?974198f6)

[![npm version](https://img.shields.io/npm/v/@thi.ng/k-means.svg)](https://www.npmjs.com/package/@thi.ng/k-means)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/k-means.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

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

```text
# with flag only for < v16
node --experimental-repl-await

> const kMeans = await import("@thi.ng/k-means");
```

Package sizes (brotli'd, pre-treeshake): ESM: 906 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/distance](https://github.com/thi-ng/umbrella/tree/develop/packages/distance)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/vectors](https://github.com/thi-ng/umbrella/tree/develop/packages/vectors)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                             | Description                                                                 | Live demo                                             | Source                                                                             |
|:-----------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|:------------------------------------------------------|:-----------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/> | Color palette generation via dominant color extraction from uploaded images | [Demo](https://demo.thi.ng/umbrella/dominant-colors/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/pixel-indexed.jpg" width="240"/>   | Image dithering and remapping using indexed palettes                        | [Demo](https://demo.thi.ng/umbrella/pixel-indexed/)   | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/pixel-indexed)   |

## API

[Generated API docs](https://docs.thi.ng/umbrella/k-means/)

Example usage:

```ts
import { kmeans, meansLatLon } from "@thi.ng/k-means";
import { HAVERSINE_LATLON } from "@thi.ng/distance";

// data from: https://simplemaps.com/data/world-cities
const items = [
    { id: "berlin", latlon: [52.5167, 13.3833] },
    { id: "boston", latlon: [42.3188, -71.0846] },
    { id: "detroit", latlon: [42.3834, -83.1024] },
    { id: "kyoto", latlon: [35.0111, 135.7669] },
    { id: "london", latlon: [51.5072, -0.1275] },
    { id: "new york", latlon: [40.6943, -73.9249] },
    { id: "osaka", latlon: [34.6936, 135.5019] },
    { id: "paris", latlon: [48.8566, 2.3522] },
    { id: "philadelphia", latlon: [40.0077, -75.1339] },
    { id: "tokyo", latlon: [35.6897, 139.6922] },
    { id: "vienna", latlon: [48.2083, 16.3731] },
];

// cluster based on lat/lon
const clusters = kmeans(
    3,
    items.map((x) => x.latlon),
    {
        // custom centroid calc for geo locations
        // https://docs.thi.ng/umbrella/k-means/modules.html#meansLatLon
        strategy: meansLatLon,
        // custom distance function for geo location (default: DIST_SQ)
        dist: HAVERSINE_LATLON
    }
);

// print each cluster
for (let c of clusters) {
    console.log(c.items.map((i) => items[i].id));
}

// [ 'boston', 'detroit', 'new york', 'philadelphia' ]
// [ 'kyoto', 'osaka', 'tokyo' ]
// [ 'berlin', 'london', 'paris', 'vienna' ]
```

## Authors

Karsten Schmidt

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

&copy; 2021 - 2022 Karsten Schmidt // Apache Software License 2.0
