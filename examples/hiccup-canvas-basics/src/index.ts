import { canvas2d } from "@thi.ng/canvas";
import { analogRgb } from "@thi.ng/color";
import { asRGB, NUM_THEMES } from "@thi.ng/color-palettes";
import { draw } from "@thi.ng/hiccup-canvas";
import { rad } from "@thi.ng/math";
import { pickRandom, SYSTEM } from "@thi.ng/random";
import { map, range2d } from "@thi.ng/transducers";
import { madd2 } from "@thi.ng/vectors";

const W = 600;
const GAP = 5;
const COLS = SYSTEM.minmaxInt(3, 20);
const ROWS = SYSTEM.minmaxInt(3, 20);
const CW = (W - (COLS + 1) * GAP) / COLS;
const CH = (W - (ROWS + 1) * GAP) / ROWS;
const R = Math.min(10, CW / 2, CH / 2);
const STEP = [CW + GAP, CH + GAP];
const OFFSET = [GAP, GAP];
const THEME = asRGB(SYSTEM.int() % NUM_THEMES);

const { ctx } = canvas2d(W, W, document.getElementById("app")!);

// draw a group of hiccup shape elements
// see thi.ng/hiccup-canvas readme for supported types & attribs
draw(ctx, [
	"g",
	{ __background: "#eee" },
	// draw grid of randomly colored rounded rects
	...map(
		(gridPos) => [
			"rect",
			{ fill: analogRgb([], pickRandom(THEME), 0.1) },
			madd2([], gridPos, STEP, OFFSET),
			CW,
			CH,
			R,
		],
		range2d(COLS, ROWS)
	),
	// diagonal line overlay
	[
		"line",
		{ stroke: "#fd0", weight: W * 0.1, lineCap: "round" },
		[50, W - 50],
		[W - 50, 50],
	],
	// text label, centered and 45 degrees rotated
	[
		"text",
		{
			fill: "#000",
			font: "32px sans-serif",
			align: "center",
			baseline: "middle",
			translate: [W / 2, W / 2],
			rotate: rad(-45),
		},
		// draw at transformed origin
		[0, 0],
		"@thi.ng/hiccup-canvas",
	],
]);
