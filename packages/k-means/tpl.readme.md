<!-- include ../../assets/tpl/header.md -->

<!-- toc -->

## About

{{pkg.description}}

{{meta.status}}

{{repo.supportPackages}}

{{repo.relatedPackages}}

{{meta.blogPosts}}

## Installation

{{pkg.install}}

{{pkg.size}}

## Dependencies

{{pkg.deps}}

{{repo.examples}}

## API

{{pkg.docs}}

Example usage:

```ts
import { kmeans, meansLatLon } from "@thi.ng/k-means";
import { HAVERSINE_LATLON } from "@thi.ng/distance";

// data from: https://simplemaps.com/data/world-cities
const cities = [
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
    cities.map((x) => x.latlon),
    {
        // custom centroid calc for geo locations
        // https://docs.thi.ng/umbrella/k-means/functions/meansLatLon.html
        strategy: meansLatLon,
        // custom distance function for geo location (default: DIST_SQ)
        dist: HAVERSINE_LATLON
    }
);

// print each cluster
for (let c of clusters) {
    console.log(c.items.map((i) => cities[i].id));
}

// [ 'boston', 'detroit', 'new york', 'philadelphia' ]
// [ 'kyoto', 'osaka', 'tokyo' ]
// [ 'berlin', 'london', 'paris', 'vienna' ]
```

<!-- include ../../assets/tpl/footer.md -->
