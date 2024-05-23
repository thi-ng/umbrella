import { adaptiveCanvas2d } from "@thi.ng/canvas";
import { COSINE_GRADIENTS, cosineColor } from "@thi.ng/color";
import {
	SUBDIV_CHAIKIN_CLOSED,
	asPath,
	asPolygon,
	complexPolygon,
	group,
	pathFromSvg,
	pointInside,
	points,
	proximity,
	scatter,
	simplify,
	star,
	subdivCurve,
	text,
	vertices,
	withAttribs,
} from "@thi.ng/geom";
import { KdTreeSet } from "@thi.ng/geom-accel";
import type { IHiccupShape2 } from "@thi.ng/geom-api";
import { draw } from "@thi.ng/hiccup-canvas";
import { fitClamped } from "@thi.ng/math";
import { samplePoisson } from "@thi.ng/poisson";
import { filter, range2d } from "@thi.ng/transducers";

const W = 300;
const R = W / 2;
const R2 = R / 4;
const COLW = W + 150;

// 8-sided star polygon
const A = star(R, 8, [1, 1 / 2]);

// plus-shaped polygon from SVG path
const B = asPolygon(
	pathFromSvg(`M-10,${R2}H10V10H${R2}V-10H10V${-R2}H-10V-10H${-R2}V10H-10z`),
	{ num: 1 }
)[0];

// complex polygon with A as outer shell and B as hole
const C = complexPolygon(A, [B]);

// subdivided version for future ref
const D = subdivCurve(C, SUBDIV_CHAIKIN_CLOSED, 3);

// create different shape variations
const SHAPES: [IHiccupShape2, string][] = [
	[A, "original"],
	[C, "with hole"],
	[subdivCurve(C, SUBDIV_CHAIKIN_CLOSED, 1), "subdiv x1"],
	[subdivCurve(C, SUBDIV_CHAIKIN_CLOSED, 2), "subdiv x2"],
	[D, "subdiv x3"],
	[subdivCurve(C, SUBDIV_CHAIKIN_CLOSED, 4), "subdiv x4"],
	[asPath(C, { scale: 1 }), "asPath()"],
	[asPath(C, { mode: "breakpoints" }), "asPath()"],
	[
		points(vertices(C, { dist: 5 }), { size: 2, shape: "circle" }),
		"vertices (dist: 5)",
	],
	[
		points(vertices(D, { dist: 5 }), {
			size: 2,
			shape: "circle",
		}),
		"subdiv vertices",
	],
	[
		points(vertices(simplify(D, 1)), {
			size: 2,
			shape: "circle",
		}),
		"simplified vertices",
	],
	[
		points(
			filter(
				(p) => pointInside(C, p),
				range2d(-200, 200, -200, 200, 5, 5)
			),
			{
				size: 2,
				shape: "circle",
			}
		),
		"pointInside()",
	],
	[
		points(scatter(C, 1000), {
			size: 2,
			shape: "circle",
		}),
		"scatter()",
	],
	[
		points(
			samplePoisson({
				density: (p) => fitClamped(proximity(D, p)!, 0, 50, 2, 10),
				points: () => scatter(D, 1)![0],
				index: new KdTreeSet(2),
				max: 2000,
			}),
			{
				size: 2,
				shape: "circle",
			}
		),
		"poisson samples",
	],
];

// color gradient preset
const GRAD = COSINE_GRADIENTS["blue-magenta-orange"];

// create canvas, compute size for 2-column layout
const { ctx } = adaptiveCanvas2d(
	COLW * 2,
	Math.ceil(SHAPES.length / 2) * W,
	document.body
);

// draw all shapes & labels in 2-column layout
draw(
	ctx,
	group(
		{
			fill: "black",
			font: "1rem sans-serif",
			baseline: "middle",
			scale: window.devicePixelRatio,
		},
		SHAPES.map(([shape, label], i) =>
			group(
				{
					translate: [(i & 1) * COLW + R, (i >> 1) * W + R],
				},
				[
					withAttribs(
						shape,
						{ fill: cosineColor(GRAD, i / (SHAPES.length - 1)) },
						false
					),
					text([R + 10, 0], label),
				]
			)
		)
	)
);
