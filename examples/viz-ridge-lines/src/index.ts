import type { IObjectOf } from "@thi.ng/api";
import { COSINE_GRADIENTS, cosineColor } from "@thi.ng/color";
import { div } from "@thi.ng/hiccup-html";
import { svg } from "@thi.ng/hiccup-svg";
import { clamp, fitClamped, fract, mix } from "@thi.ng/math";
import { $attribs, $compile, $replace, $text } from "@thi.ng/rdom";
import {
	compileForm,
	container,
	range as inputRange,
} from "@thi.ng/rdom-forms";
import { reactive, sync } from "@thi.ng/rstream";
import {
	abs,
	defn,
	program,
	ret,
	vec2,
	type Vec2Sym,
} from "@thi.ng/shader-ast";
import { targetJS } from "@thi.ng/shader-ast-js";
import { fit, snoise2 } from "@thi.ng/shader-ast-stdlib";
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
// plot width
const WIDTH = 500;
// plot height (single ridge)
const HEIGHT = 100;
// gradient preset
const GRADIENT = COSINE_GRADIENTS["purple-orange-cyan"];

// pre-compute dummy data for visualization: NUM arrays of `res` noise samples
const generateData = ({ res, offsetX, offsetY }: IObjectOf<number>) => {
	// a *very* roundabout way to compute 2d simplex noise (via transpiling a
	// shader-ast function to JS and done like this to avoid having to pull in a
	// 3rd party dependency...)
	const noise = targetJS({}).compile(
		program([
			defn("float", "main", ["vec2"], (p: Vec2Sym) => [
				ret(
					abs(
						snoise2(
							fit(
								p,
								vec2(0),
								vec2(res - 1, NUM - 1),
								vec2(200 + offsetX, offsetY),
								vec2(200 + offsetX + 2, offsetY + 1.5)
							)
						)
					)
				),
			]),
		])
	).main;
	return [
		...repeatedly(
			(y) => [...repeatedly((x) => noise([x, y]) * HEIGHT, res)],
			NUM
		),
	];
};

// function to compute a single ridge line (aka area plot) in thi.ng/hiccup format
// the plot is configured to NOT include axis shapes
// the screen Y position is computed from the `i` (index) position
const plotSingle = (data: number[], i: number) =>
	plotCartesian({
		xaxis: linearAxis({
			domain: [0, data.length],
			range: [50, WIDTH],
			pos: 0,
			visible: false,
		}),
		yaxis: linearAxis({
			domain: [0, HEIGHT],
			range: [i * 50 + HEIGHT, i * 50],
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

const createViz = (data: number[][]) =>
	svg(
		{
			__convert: true,
			id: "viz",
			width: 600,
			height: data.length * 50 + HEIGHT + 50,
			stroke: "none",
			onpointermove: (e: PointerEvent) => updateCursor(data, e.clientX),
		},
		// this sub-plot ONLY contains the main axes and background grid
		plotCartesian({
			xaxis: linearAxis({
				domain: [0, data[0].length],
				range: [50, WIDTH],
				pos: NUM * 50 + HEIGHT - 40,
				major: { size: 10, ticks: linearTicks(10) },
				minor: { size: 5, ticks: linearTicks(1) },
				labelOffset: [0, 20],
				labelAttribs: { align: "center", baseline: "hanging" },
				format: int,
			}),
			yaxis: linearAxis({
				domain: [-2, NUM - 1],
				range: [0, NUM * 50 + HEIGHT - 50],
				pos: 40,
				major: { size: 10, ticks: () => [...range(NUM)] },
				labelOffset: [-20, 0],
				labelAttribs: { align: "right", baseline: "middle" },
				format: int,
			}),
			grid: { xmajor: true, xminor: false, ymajor: false },
			plots: [],
		}),
		// create the various area plots (ridge lines)
		...data.map(plotSingle),
		// create a group for the interactive cursor and value labels. the group
		// is initially moved outside the view box, but will be updated via the
		// SVG's `onpointermove` event handler defined above...
		[
			"g",
			{
				id: "cursor",
				font: "0.75rem sans-serif",
				translate: [-100, 0],
			},
			["line", { stroke: "#000" }, [0, 0], [0, NUM * 50 + HEIGHT - 50]],
			// pre-create value labels
			...repeatedly(
				() => [
					"g",
					{},
					["circle", { fill: "#000" }, [0, 0], 2],
					["rect", { fill: "#000c" }, [0, 0], 40, 16],
					["text", { fill: "#fff", baseline: "middle" }, [4, 9], ""],
				],
				NUM
			),
		]
	);

// update the cursors and value labels in the SVG
const updateCursor = (data: number[][], x: number) => {
	const viz = document.getElementById("viz")!;
	const cursor = document.getElementById("cursor")!;
	const { left } = viz.getBoundingClientRect();
	const res = data[0].length - 1;
	// clamp X to mapped domain range (in screen coords)
	const screenX = clamp(x, left + 50, left + WIDTH) - left;
	// compute sample position (array index, in [0, res) interval)
	const sampleX = fitClamped(x, left + 50, left + WIDTH, 0, res);
	// set X position of the entire cursor group
	$attribs(cursor, { transform: `translate(${screenX} 0)` });
	// update value labels and their Y positions
	const [_, ...labels] = cursor.children;
	for (let i = 0; i < NUM; i++) {
		const label = labels[i];
		// compute interpolated value
		const value = mix(
			data[i][sampleX | 0],
			data[i][Math.min(sampleX + 1, res) | 0],
			fract(sampleX)
		);
		const y = i * 50 + HEIGHT - value;
		// update label pos & text
		$attribs(label, { transform: `translate(0 ${y})` });
		$text(<SVGElement>label.children[2], value.toFixed(2));
	}
};

// reactive state values

// normalized sample resolution
// this is only needed for the resolution slider, which i wanted to be
// exponential/non-linear, i.e. value changes on the LHS are much smaller/slower
// than on the RHS of the slider
const normRes = reactive(1 / 2);
// actual (remapped) sample resolution
const res = normRes.map((x) => mix(10, 100, x ** 3) | 0);
// noise X/Y offset position
const offsetX = reactive(0);
const offsetY = reactive(0);
// combined params
const params = sync({ src: { res, offsetX, offsetY } });
// subscribe to combined params and recompute data:
// further down, the UI will subscribe to this dataset and then (re)generate the
// visualization
const dataset = params.map(generateData);

// create full SVG visualization and mount in browser DOM
$compile(
	div(
		{},
		// interactive controls
		compileForm(
			container(
				{ id: "controls" },
				inputRange({
					label: "resolution",
					min: 0,
					max: 1,
					step: 0.01,
					value: normRes,
					// custom label function to show actual transformed value used
					vlabel: (x) => mix(10, 100, x ** 3).toFixed(0),
				}),
				inputRange({
					label: "offset X",
					min: 0,
					max: 10,
					step: 0.01,
					value: offsetX,
				}),
				inputRange({
					label: "offset Y",
					min: 0,
					max: 10,
					step: 0.01,
					value: offsetY,
				})
			),
			// options to inject additional CSS classes etc.
			{ typeAttribs: { rangeLabel: { class: "range-label" } } }
		),
		// reactive SVG visualization
		$replace(dataset.map(createViz))
	)
).mount(document.getElementById("app")!);
