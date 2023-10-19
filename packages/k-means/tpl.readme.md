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

<!-- include ../../assets/tpl/footer.md -->
