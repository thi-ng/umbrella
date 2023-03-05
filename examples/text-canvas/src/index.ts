import { add, osc, saw, sin } from "@thi.ng/dsp";
import { aabb, center, Rect, rect, vertices } from "@thi.ng/geom";
import {
	concat,
	lookAt,
	perspective,
	project3,
	rotationX44,
	rotationY44,
	viewport,
} from "@thi.ng/matrices";
import {
	beginClip,
	Canvas,
	circle,
	clear,
	endClip,
	formatCanvas,
	line,
} from "@thi.ng/text-canvas";
import {
	BG_GREEN,
	BG_LIGHT_MAGENTA,
	FG_CYAN,
	FG_WHITE,
	FG_YELLOW,
	FMT_HTML_TACHYONS,
} from "@thi.ng/text-format";
import { add3 } from "@thi.ng/vectors";

const W = 64;
const H = 32;

// create text canvas
const canvas = new Canvas(W, H);

const cube = vertices(center(aabb(1))!);
// edge list (vertex indices)
const edges = [
	[0, 1],
	[1, 2],
	[2, 3],
	[3, 0],
	[4, 5],
	[5, 6],
	[6, 7],
	[7, 4],
	[0, 4],
	[1, 5],
	[2, 6],
	[3, 7],
];

// animated parameters
let rotx = add(0.01);
let roty = add(0.03);
let clipSize = osc(sin, 0.0045, W / 2, W / 2);
let ringPhase = osc(saw, -0.04);

// transformation matrices
const view = lookAt([], [0, 0, 2], [0, 0, 0], [0, 1, 0]);
const proj = perspective([], 60, W / H, 0.1, 10);
const viewp = viewport([], 0, W, H, 0);

// cube instance position offsets
const instances = [
	[-1, 0, 0],
	[1, 0, 0],
	[0, -1, 0],
	[0, 1, 0],
	[0, 0, -1],
	[0, 0, 1],
];

const root = document.getElementById("app");

requestAnimationFrame(function update() {
	clear(canvas);
	// draw background rings
	for (let i = 7, phase = ringPhase.next(); --i >= 1; ) {
		const id =
			i & 1
				? ((FG_CYAN | BG_GREEN) << 16) | 0x2f
				: ((FG_YELLOW | BG_GREEN) << 16) | 0x2e;
		// stroke only
		// circle(canvas, W / 2, H / 2, (i + phase) * 8, id);
		// filled disc
		circle(canvas, W / 2, H / 2, (i + phase) * 8, id, true);
	}
	// animated center clip rectangle for 3D cube layer
	const { pos, size } = <Rect>center(rect(clipSize.next()), [W / 2, H / 2])!;
	beginClip(canvas, pos[0], pos[1], size[0], size[1]);
	// model rotation matrix
	const model = concat(
		[],
		rotationX44([], rotx.next()),
		rotationY44([], roty.next())
	);
	// combined model-view-projection matrix
	const mvp = concat([], proj, view, model);
	// draw cube instances
	for (let pos of instances) {
		// project 3D points to 2D viewport (canvas coords)
		const pts = cube.map(
			(p) => project3([], mvp, viewp, add3([], p, pos))!
		);
		// draw cube edges
		for (let e of edges) {
			const a = pts[e[0]];
			const b = pts[e[1]];
			line(
				canvas,
				a[0],
				a[1],
				b[0],
				b[1],
				"#",
				FG_WHITE | BG_LIGHT_MAGENTA
			);
		}
	}
	// remove clip rect
	endClip(canvas);

	// draw canvas
	root!.innerHTML = formatCanvas(canvas, FMT_HTML_TACHYONS);
	requestAnimationFrame(update);
});
