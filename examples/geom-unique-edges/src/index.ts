import { adaptiveCanvas2d } from "@thi.ng/canvas";
import { COSINE_GRADIENTS, cosineColor } from "@thi.ng/color";
import { fiber } from "@thi.ng/fibers";
import {
	TESSELLATE_QUAD_FAN,
	TESSELLATE_TRI_FAN_SPLIT,
	circle,
	edgePointsFromTessellation,
	group,
	line,
	meshTessellation,
	rect,
	tessellate,
	text,
	withAttribs,
} from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";
import { map } from "@thi.ng/transducers";

const gradient = COSINE_GRADIENTS["rainbow1"];
const scale = window.devicePixelRatio;

// create hexagon and tessellate it using multiple passes/algorithms
const tess = tessellate(
	circle([250, 250], 240, { __samples: 6 }),
	[TESSELLATE_TRI_FAN_SPLIT, TESSELLATE_QUAD_FAN, TESSELLATE_QUAD_FAN],
	// use 2D mesh tessellation to enable vertex welding and avoiding to
	// generate duplicate points...
	meshTessellation(2)
);

// iterate all unique edges from tessellation and collect as group of line
// segments
const geo = group(
	{ __background: "#f0f0f0", stroke: "#000", scale },
	map((e) => line(e), edgePointsFromTessellation(tess))
);

// create canvas
const { ctx } = adaptiveCanvas2d(500, 500, document.getElementById("app"));

// update/draw loop (co-routine)
fiber(function* () {
	while (true) {
		// draw line group
		draw(ctx, geo);
		for (let i = 0, num = geo.children.length; i < num; i++) {
			// draw individual edge, using color from gradient
			draw(
				ctx,
				group({ stroke: "none", scale }, [
					withAttribs(geo.children[i], {
						stroke: cosineColor(gradient, i / num),
						weight: 5,
					}),
					// show edge ID
					rect([100, 50], { fill: "#f0f0f0" }),
					text([18, 18], `edge: ${i}`, {
						baseline: "hanging",
						fill: "#000",
						font: "18px sans-serif",
					}),
				])
			);
			// wait for next frame
			yield;
		}
	}
}).run();
