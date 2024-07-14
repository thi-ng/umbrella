import { COSINE_GRADIENTS, cosineColor } from "@thi.ng/color";
import { svg } from "@thi.ng/hiccup-svg";
import { clamp, fitClamped } from "@thi.ng/math";
import { $attribs, $compile, $text } from "@thi.ng/rdom";
import {
	abs,
	defn,
	mul,
	program,
	ret,
	vec2,
	type Vec2Sym,
} from "@thi.ng/shader-ast";
import { targetJS } from "@thi.ng/shader-ast-js";
import { snoise2 } from "@thi.ng/shader-ast-stdlib";
import { int } from "@thi.ng/strings";
import { range, repeatedly } from "@thi.ng/transducers";
import {
	areaPlot,
	linearAxis,
	linearTicks,
	plotCartesian,
	uniformDomain,
} from "@thi.ng/viz";

// number of ridge lines
const NUM = 10;
// ridge resolution
const RES = 100;
// gradient preset
const GRADIENT = COSINE_GRADIENTS["purple-orange-cyan"];
// scale factor for noise dummy data
const NOISE_SCALE = vec2(0.02, 0.15);

// a very roundabout way to compute 2d simplex noise (via transpiling a
// shader-ast function to JS and done like this to avoid having to pull in a 3rd
// party dependency...)
const NOISE = targetJS({}).compile(
	program([
		defn("float", "main", ["vec2"], (p: Vec2Sym) => [
			ret(abs(snoise2(mul(p, NOISE_SCALE)))),
		]),
	])
).main;

// pre-compute dummy data for visualization: NUM arrays of RES noise items
const DATA = [
	...repeatedly(
		(y) => [...repeatedly((x) => NOISE([x + 200, y]) * 100, RES)],
		NUM
	),
];

// function to compute a single ridge line (aka area plot) in thi.ng/hiccup format
// the plot is configured to NOT include axis shapes
// the screen Y position is computed from the `i` (index) position
const plotSingle = (data: number[], i: number) =>
	plotCartesian({
		xaxis: linearAxis({
			domain: [0, RES],
			range: [50, 500],
			pos: 0,
			visible: false,
		}),
		yaxis: linearAxis({
			domain: [0, 100],
			range: [i * 50 + 100, i * 50],
			pos: 0,
			visible: false,
		}),
		plots: [
			areaPlot(uniformDomain(data), {
				attribs: {
					fill: cosineColor(GRADIENT, i / (NUM - 1)),
				},
			}),
		],
	});

// event handler used to update the cursors and value labels in the SVG
const updateCursor = (e: PointerEvent) => {
	const viz = document.getElementById("viz")!;
	const cursor = document.getElementById("cursor")!;
	const bounds = viz.getBoundingClientRect();
	// clamp X to mapped domain range (in screen coords)
	const screenX =
		clamp(e.clientX, bounds.left + 50, bounds.left + 500) - bounds.left;
	// compute sample position (in [0, RES) interval)
	const sampleX = fitClamped(
		e.clientX,
		bounds.left + 50,
		bounds.left + 500,
		0,
		RES - 1
	);
	// set X position of the entire cursor group
	$attribs(cursor, { transform: `translate(${screenX} 0)` });
	// update value labels and their Y positions
	const [_, ...dots] = cursor.children;
	for (let i = 0; i < NUM; i++) {
		const dot = dots[i];
		const value = DATA[i][sampleX | 0];
		const y = i * 50 + 100 - value;
		$attribs(dot, { transform: `translate(0 ${y})` });
		$text(<SVGElement>dot.children[1], value.toFixed(2));
	}
};

// create full SVG visualization and mount in browser DOM
$compile(
	svg(
		{
			__convert: true,
			id: "viz",
			width: 600,
			height: DATA.length * 50 + 150,
			stroke: "none",
			onpointermove: updateCursor,
		},
		// this sub-plot ONLY contains the main axes and background grid
		plotCartesian({
			xaxis: linearAxis({
				domain: [0, RES],
				range: [50, 500],
				pos: NUM * 50 + 60,
				major: { size: 10, ticks: linearTicks(10) },
				minor: { size: 5, ticks: linearTicks(1) },
				labelOffset: [0, 20],
				labelAttribs: { align: "center", baseline: "hanging" },
				format: int,
			}),
			yaxis: linearAxis({
				domain: [-2, NUM - 1],
				range: [0, NUM * 50 + 50],
				pos: 40,
				major: { size: 10, ticks: () => [...range(NUM)] },
				labelOffset: [-20, 0],
				labelAttribs: { align: "right", baseline: "middle" },
				format: (x) => (x >= 0 ? `${x | 0}` : ""),
			}),
			grid: { xmajor: true, xminor: false, ymajor: false },
			plots: [],
		}),
		// create the various area plots (ridge lines)
		...DATA.map(plotSingle),
		// create a group for the interactive cursor and value labels. the group
		// is initially moved outside the view box, but will be updated via the
		// SVG's `onpointermove` event handler defined above...
		[
			"g",
			{ id: "cursor", font: "0.75rem sans-serif", translate: [-100, 0] },
			["line", { stroke: "#000" }, [0, 0], [0, NUM * 50 + 50]],
			// pre-create value labels
			...repeatedly(
				() => [
					"g",
					{},
					["rect", { fill: "#000c" }, [0, 0], 40, 16],
					["text", { fill: "#fff", baseline: "middle" }, [4, 9], ""],
				],
				NUM
			),
		]
	)
).mount(document.getElementById("app")!);
