import {
	area,
	centroid,
	clipConvex,
	convexHull,
	points,
	polygon,
	rect,
	scatter,
	withAttribs,
} from "@thi.ng/geom";
import type { IShape } from "@thi.ng/geom-api";
import { renderOnce } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";

// refactored version of an example by Pete Cory
// http://www.petecorey.com/blog/2019/07/29/clipping-convex-hulls-with-thing/

const width = 600;
const height = 600;

const bounds = rect([width, height]);

// generate random points within given shape
const pts1 = scatter(bounds, 5)!;
const pts2 = scatter(bounds, 5)!;

// complex hull for shape
const hull1 = convexHull(polygon(pts1));
const hull2 = convexHull(polygon(pts2));

// Sutherland-Hodgman
const clip = clipConvex(hull1, hull2)!;

const COL1 = (a = 1) => `rgba(245,93,62,${a})`;
const COL2 = (a = 1) => `rgba(118,190,208,${a})`;
const COL3 = (a = 1) => `rgba(102,102,102,${a})`;

// render shapes with thi.ng/hdom & thi.ng/hdom-canvas
renderOnce([
	canvas,
	{ width, height },
	points(pts1, { shape: "circle", fill: COL1(), size: 5 }),
	points(pts2, { shape: "circle", fill: COL2(), size: 5 }),
	withAttribs(hull1, { fill: COL1(0.5) }),
	withAttribs(hull2, { fill: COL2(0.5) }),
	withAttribs(clip, {
		fill: COL3(0.5),
		stroke: COL3(),
		weight: 3,
	}),
	...(<[IShape, string][]>[
		[hull1, COL1()],
		[hull2, COL2()],
		[clip, COL3()],
	]).map(([shape, col]) => [
		"text",
		{ fill: col },
		centroid(shape),
		area(shape).toFixed(2),
	]),
]);
