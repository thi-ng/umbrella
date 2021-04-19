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

Example usage:

```ts
import { kmeans } from "@thi.ng/k-means";
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
    // use custom distance function (default: DIST_SQ)
    { dist: HAVERSINE_LATLON }
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

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}
