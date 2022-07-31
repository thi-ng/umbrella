import { hsl } from "@thi.ng/color/hsl/hsl";
import { arc } from "@thi.ng/geom/arc";
import { asCubic } from "@thi.ng/geom/as-cubic";
import { closestPoint } from "@thi.ng/geom/closest-point";
import { group } from "@thi.ng/geom/group";
import { pathFromCubics } from "@thi.ng/geom/path";
import { draw } from "@thi.ng/hiccup-canvas/draw";
import { TAU } from "@thi.ng/math/api";
import { fit01 } from "@thi.ng/math/fit";
import { SYSTEM } from "@thi.ng/random/system";
import { fromDOMEvent } from "@thi.ng/rstream/event";
import { fromRAF } from "@thi.ng/rstream/raf";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import { dist } from "@thi.ng/vectors/dist";

const W = 600;
const ORIGIN = [W / 2, W / 2];

const PICK_DIST = 10;
const PICK_COL = "cyan";

const canvas: HTMLCanvasElement = document.createElement("canvas");
canvas.width = canvas.height = W;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d")!;

// generate random arc configurations
const arcs = [
	...map(
		(i) => ({
			// radius
			r: fit01(i, 50, W * 0.4),
			// stroke width
			w: SYSTEM.minmax(1, 5),
			// randomized HSLA color
			col: hsl([SYSTEM.norm(0.1), SYSTEM.minmax(0.5, 1), 0.5]),
			// start angle
			theta: SYSTEM.float(TAU),
			// angle spread
			spread: SYSTEM.float(TAU),
			// rotation speed
			speed: SYSTEM.norm(0.02),
		}),
		normRange(20)
	),
];

// mouse position stream
const mouse = fromDOMEvent(canvas, "mousemove").transform(
	map((e) => {
		const b = canvas.getBoundingClientRect();
		return [e.clientX - b.left, e.clientY - b.top];
	})
);

// 60Hz update loop
fromRAF().subscribe({
	next() {
		// update rotations
		arcs.forEach((a) => (a.theta += a.speed));
		// clear viewport
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// get mouse pos
		const m = mouse.deref();
		draw(
			ctx,
			// group arcs and convert to hiccup tree required by `draw()`
			// (see hiccup-canvas readme for details)
			group(
				{},
				arcs.map(({ r, w, col, theta, spread }) => {
					// build (elliptic) arc from config
					const a = arc(ORIGIN, r, 0, theta, theta + spread);
					// convert to cubic path due to HTML Canvas API limitations
					// (doesn't support elliptic arcs, so we need to convert them...)
					// also perform shape picking by computing distance to
					// closest point on arc to mouse pos. adjust color based on result
					return pathFromCubics(asCubic(a), {
						weight: w,
						stroke:
							m && dist(m, closestPoint(a, m)!) < PICK_DIST
								? PICK_COL
								: col,
					});
				})
			)
		);
	},
});
