import { partial } from "@thi.ng/compose";
import {
	arcLength,
	asPolygon,
	centroid,
	circle,
	group,
	Polygon,
	polygon,
	tessellate,
	TESSELLATE_EDGE_SPLIT,
	TESSELLATE_QUAD_FAN,
	TESSELLATE_TRI_FAN,
} from "@thi.ng/geom";
import type { IShape, Tessellator } from "@thi.ng/geom-api";
import { deg, fit01, fit11 } from "@thi.ng/math";
import { $compile } from "@thi.ng/rdom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromRAF } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { polar, type Vec } from "@thi.ng/vectors";

type Tint = (p: Polygon) => string;

const MIN_RES = 3;
const MAX_RES = 30;
// const MAX_RES = MIN_RES;

const SUBDIVS = [
	TESSELLATE_QUAD_FAN,
	TESSELLATE_TRI_FAN,
	TESSELLATE_EDGE_SPLIT,
	TESSELLATE_QUAD_FAN,
];
// const SUBDIVS = [...take(4, cycle([TESSELLATE_QUAD_FAN]))];

const W = 600;
const W2 = W / 2;

/**
 * Creates a color by mapping the centroid of given shape from cartesian
 * space to HSL.
 */
const centroidToHSL = (p: IShape) => {
	const c = polar(null, centroid(p)!);
	const h = deg(c[1]);
	const s = fit01(c[0] / W2, 0, 100);
	const l = fit01(c[0] / W2, 100, 50);
	return `hsl(${h},${s}%,${l}%)`;
};

/**
 * Creates an HSL color from the arc length / circumference of the given
 * shape.
 */
const arclengthToHSL = (max: number, p: IShape) =>
	`hsl(${fit01(arcLength(p) / max, 0, 360)},100%,50%)`;

/**
 * Converts given point array into a polygon and computes fill color
 * with provided `tint` function.
 */
const tintedPoly = (tint: Tint, points: Vec[]) => {
	const p = polygon(points);
	p.attribs = {
		fill: tint(p),
		// stroke: tint(p),
	};
	return p;
};

/**
 * Creates a regular polygon, then recursively subdivides it and tints each
 * resulting shape using {@link tintedPoly}.
 */
const tessellation = (t: number, tessel: Tessellator[], tint: Tint) => {
	return map(
		partial(tintedPoly, tint),
		tessellate(
			asPolygon(
				circle([0, 0], W2),
				Math.floor(fit11(Math.sin(t), MIN_RES, MAX_RES))
			),
			tessel
		)
	);
};

// reactive stream of tessellations based on requestAnimationFrame(), with each
// frame potentially producing a different result geometry. the canvas component
// will then subscribe to this stream and redraw automatically.
const main = fromRAF().map((time) => {
	time *= 0.1;
	// create tessellation and wrap as thi.ng/geom group
	return group(
		{
			__clear: true,
			translate: [300, 300],
			// rotate: (time / 10) % TAU,
			stroke: "#000",
			weight: 0.25,
		},
		tessellation(time, SUBDIVS, partial(arclengthToHSL, 250))
	);
});

$compile([
	"div.ma2.sans-serif",
	{},
	["div", {}, "cells: ", main.map((x) => x.children.length)],
	$canvas(main, [600, 600]),
]).mount(document.getElementById("app")!);
