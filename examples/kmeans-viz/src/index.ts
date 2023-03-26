import { shuffle } from "@thi.ng/arrays";
import { colorsFromRange } from "@thi.ng/color";
import {
	asSvg,
	convexHull,
	group,
	points,
	Polygon,
	svgDoc,
	withAttribs,
} from "@thi.ng/geom";
import { kmeans } from "@thi.ng/k-means";
import { SYSTEM } from "@thi.ng/random";
import { repeatedly } from "@thi.ng/transducers";
import { add2, randNormDistrib2, type Vec } from "@thi.ng/vectors";

const W = 600;
const W2 = W / 2;

// number of points to generate per cluster
const NUM = 5000;
// cluster radius
const R = 150;
// cluster offset
const OFFSET = R * 0.8;
// number of target clusters
const K = SYSTEM.minmaxInt(2, 25);
// color themes
// see: https://github.com/thi-ng/umbrella/blob/develop/packages/color/README.md#color-theme-generation
const THEME = [...colorsFromRange("hard", { num: K })];

// generates points scattered in given radius around pos
const makeCluster = (pos: Vec, r: number, num: number) => [
	...repeatedly(
		() => add2(null, randNormDistrib2([], SYSTEM.float(r * r) ** 0.5), pos),
		num
	),
];

// generate & combine points from 3 overlapping clusters
// (the shuffling is unnecessary, just to show initial order is irrelevant)
const allPoints = shuffle([
	...makeCluster([W2, W2 + OFFSET], R, NUM),
	...makeCluster([W2 + OFFSET, W2 - OFFSET], R, NUM),
	...makeCluster([W2 - OFFSET, W2 - OFFSET], R, NUM),
]);

// now segment all points into K new clusters
// k-means clustering is non-deterministic, multiple runs might produce different results
const clusters = kmeans(K, allPoints);

// visualize result clusters as SVG
document.getElementById("app")!.innerHTML = asSvg(
	svgDoc(
		{ width: W, height: W, viewBox: `0 0 ${W} ${W}`, stroke: "none" },
		...clusters.map((x, id) => {
			// result clusters contain only point indices
			// here we look up their actual positions again and add styling info
			const pts = points(
				x.items.map((i) => allPoints[i]),
				{ fill: THEME[id], size: 3 }
			);
			// also compute the convex hull polygon
			const hull = <Polygon>withAttribs(convexHull(pts), {
				stroke: "black",
				fill: "none",
			});
			// return both as group
			return group({}, [pts, hull]);
		})
	)
);
