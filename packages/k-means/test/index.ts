import { HAVERSINE_LATLON } from "@thi.ng/distance";
import { XsAdd } from "@thi.ng/random";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { kmeans, meansLatLon } from "../src/index.js";

group("k-means", {
	latlon: () => {
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
		const clusters = kmeans(
			3,
			cities.map((x) => x.latlon),
			{
				strategy: meansLatLon,
				dist: HAVERSINE_LATLON,
				rnd: new XsAdd(0xdecafbad),
			}
		);
		assert.deepStrictEqual(
			clusters.map((c) => c.items.map((i) => cities[i].id)),
			[
				["boston", "detroit", "new york", "philadelphia"],
				["berlin", "london", "paris", "vienna"],
				["kyoto", "osaka", "tokyo"],
			]
		);
	},
});
