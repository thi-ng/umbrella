import { canvas2d } from "@thi.ng/canvas";
import {
	colorFromRange,
	CSS_LEVEL4,
	lch,
	setDefaultCSSConversions,
} from "@thi.ng/color";
import { arc, closestPoint, group, withAttribs } from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";
import { fit01, TAU } from "@thi.ng/math";
import { SYSTEM, weightedRandom } from "@thi.ng/random";
import { fromDOMEvent, fromRAF } from "@thi.ng/rstream";
import { map, normRange } from "@thi.ng/transducers";
import { dist, type Vec } from "@thi.ng/vectors";

// optional, configure CSS color conversions to use use CSS Color Level 4
// (i.e. direct support for LCH colors and avoiding conversions to sRGB)
setDefaultCSSConversions(CSS_LEVEL4);

const W = Math.min(window.innerWidth, window.innerHeight);
const ORIGIN = [W / 2, W / 2];

const PICK_DIST = 6;
const PICK_COL = "cyan";

const { canvas, ctx } = canvas2d(W, W, document.getElementById("app"));

// custom stroke weight distribution
const strokeWeight = weightedRandom(
	// thickness
	[1, 2, 4, 8, 16, 32],
	// weight
	[4, 8, 4, 2, 1, 0.25]
);

// generate random arc configurations
const arcs = [
	...map(
		(i) => ({
			// radius
			r: fit01(i, 50, W * 0.45),
			// stroke width
			w: strokeWeight(),
			// randomized color
			col: colorFromRange("warm", {
				base: lch(0.8, 0.8, 0),
				variance: 0.125,
			}),
			// start angle
			theta: SYSTEM.float(TAU),
			// angle spread
			spread: SYSTEM.float(TAU),
			// rotation speed
			speed: SYSTEM.norm(0.03),
		}),
		normRange(50)
	),
];

// mouse position stream
const mouse = fromDOMEvent(canvas, "mousemove").transform(
	map((e): Vec => {
		const b = canvas.getBoundingClientRect();
		return [e.clientX - b.left, e.clientY - b.top];
	})
);

// 60Hz update loop
fromRAF().subscribe({
	next() {
		// update rotations
		arcs.forEach((a) => (a.theta += a.speed));
		// get mouse pos
		const m = mouse.deref();
		draw(
			ctx,
			// group arcs and convert to hiccup tree required by `draw()`
			// (see hiccup-canvas readme for details)
			group(
				{ __background: "#222" },
				arcs.map(({ r, w, col, theta, spread }) => {
					// build (elliptic) arc from config
					const a = arc(ORIGIN, r, 0, theta, theta + spread);
					// select color via shape picking by computing distance from
					// mouse pos to closest point on arc
					return withAttribs(a, {
						weight: w,
						stroke:
							m &&
							dist(m, closestPoint(a, m)!) <
								Math.max(PICK_DIST, w)
								? PICK_COL
								: col,
					});
				})
			)
		);
	},
});
