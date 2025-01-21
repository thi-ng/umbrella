// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import { div } from "@thi.ng/hiccup-html";
import { defs, svg } from "@thi.ng/hiccup-svg";
import { plasticND } from "@thi.ng/lowdisc";
import { $compile, $replace } from "@thi.ng/rdom";
import { compileForm, container, range, toggle } from "@thi.ng/rdom-forms";
import { reactive, stream, sync } from "@thi.ng/rstream";
import { int } from "@thi.ng/strings";
import { map, take } from "@thi.ng/transducers";
import { defFormat } from "@thi.ng/vectors";
import {
	lensAxis,
	linearTicks,
	linePlot,
	plotCartesian,
	processedPoints,
	uniformDomain,
	type DomainValueFn,
	type DomainValues,
	type PlotFn,
} from "@thi.ng/viz";

// string format function for vectors
const FMT = defFormat({ prec: 2 });

// function to produce N low-discrepancy samples
// see thi.ng/lowdisc for details & references
// the uniformDomain() function takes a sequence of 1D sample values and creates
// 2D samples which are uniformly spaced along X-axis
const generateSamples = (n: number) => ({
	n,
	data: uniformDomain(
		take(
			n,
			map((x) => x[0] * n, plasticND(1))
		)
	),
});

// thi.ng/viz currently only provides a scatter plot for static visualizations
// (using a point cloud). here we create an alternative implementation which
// uses individual shape elements (created by a user supplied shape function)...
//
// - the shape fn receives a tuple of [screenPos, origDatum]
// - the `processedPoints()` iterator is one of the core functions of the
//   thi.ng/viz pkg and used by other plot types too...
// - the output of this function is a shape tree in thi.ng/hiccup format (as are
//   all other elements of the plot. this format will then be converted into SVG
//   DOM elements when the visualization will be updated in the UI)
const shapeScatterPlot =
	(
		shape: Fn<[number[], number[]], any>,
		data: DomainValues,
		attribs: any = {}
	): PlotFn =>
	(spec) =>
		["g", attribs, ...map(shape, processedPoints(spec, data))];

// our custom shape function for a single datum of the scatter plot
// `pos` is the mapped position, `orig` the original domain position
const dot = ([pos, orig]: [number[], number[]]) => {
	const value = FMT(orig);
	return ["circle", { data: { value } }, pos, 3, ["title", {}, value]];
};

interface VizOpts {
	/** precomputed data samples */
	data: { n: number; data: DomainValueFn };
	/** X-axis focal point (normalized [0,1] interval) */
	lensX: number;
	/** Y-axis focal point (normalized [0,1] interval) */
	lensY: number;
	/** Lens dilation in [-1,1] range (0 = linear, i.e. no distortion) */
	dilate: number;
	/** display line plot */
	showLines: boolean;
}

// the main function of this example: creates a full SVG visualization (as
// thi.ng/hiccup tree) using the provided config options
const createViz = ({
	data: { n, data },
	lensX,
	lensY,
	dilate,
	showLines,
}: VizOpts) => {
	// shared axis tick configuration
	const ticks = {
		major: { size: 10, ticks: linearTicks(n / 5) },
		minor: { size: 5, ticks: linearTicks(n / 10) },
	};
	return svg(
		{
			// the hiccup format created by the thi.ng/viz package is NOT ONLY
			// intended for SVG output and hence we instruct the svg() function
			// here to perform necessary conversions automatically
			__convert: true,
			// document size
			width: 500,
			height: 500,
			// instead of creating `onclick` event handlers for each individual
			// plot point (of which there could be thousands), we only use a
			// single onclick handler here and use data attribs on the
			// individual shapes...
			// btw. `selected` is a reactive UI state value (defined further below)
			onclick: (e: Event) =>
				selected.next((<HTMLElement>e.target).dataset.value!),
		},
		// define linear gradient (only used for the line plot)
		defs([
			"linearGradient",
			{ id: "grad", from: [0, 0], to: [0, 500] },
			[
				[0, "#0ff"],
				[1, "#00f"],
			],
		]),
		// generate the plot via given spec
		plotCartesian({
			// use non-linear lens axis type, allowing for a multitude of
			// behaviors/scales
			xaxis: lensAxis({
				// lens config
				focus: lensX * n,
				strength: dilate,
				// value range of inputs
				// (with extra padding to ensure last axis tick will be created)
				domain: [0, n + 0.01],
				// value range of screen X coordinates
				range: [55, 450],
				// Y-position of this X axis
				pos: 450,
				// label config
				labelAttribs: { align: "center", baseline: "hanging" },
				labelOffset: [0, 20],
				format: int,
				// inject shared axis tick config
				...ticks,
				// uncomment to NOT show this axis:
				// visible: false,
			}),
			// same for the Y-axis...
			yaxis: lensAxis({
				focus: lensY * n,
				strength: dilate,
				domain: [0, n * 1.05],
				range: [445, 0],
				pos: 50,
				labelAttribs: { align: "end", baseline: "middle" },
				labelOffset: [-20, 0],
				format: int,
				...ticks,
			}),
			// define one or more plots to produce. here we make the line plot
			// conditional on config option (controlled via UI toggle)
			plots: [
				showLines
					? linePlot(data, {
							// configure to the gradient defined above
							// see: https://github.com/thi-ng/umbrella/blob/develop/packages/hiccup-svg/README.md#automatic-attribute-conversions
							attribs: { stroke: "$grad", weight: 0.5 },
					  })
					: () => () => null,
				shapeScatterPlot(dot, data, { id: "scatter" }),
			],
		})
	);
};

// reactive UI state/controls

// number of samples
const n = reactive(1000);
// data will be updated each time `n` is changed
const data = n.map(generateSamples);
// lens axis config
const lensX = reactive(0.5);
const lensY = reactive(0.5);
const dilate = reactive(0.5);
// display flag for line plot
const showLines = reactive(true);
// info of last selected sample
const selected = stream<string>();
// combined
const main = sync({ src: { data, lensX, lensY, dilate, showLines } });

// compile & mount UI components
$compile(
	div(
		{},
		// create UI controls for state values
		// see thi.ng/rdom-forms for details
		compileForm(
			container(
				{ id: "controls" },
				// range slider
				range({
					label: "samples",
					value: n,
					min: 100,
					max: 1000,
					step: 100,
					// no fractional digits for value label
					vlabel: 0,
				}),
				range({
					label: "lens X",
					value: lensX,
					min: 0.001,
					max: 1,
					step: 0.001,
					vlabel: 2,
				}),
				range({
					label: "lens Y",
					value: lensY,
					min: 0.001,
					max: 1,
					step: 0.001,
					vlabel: 2,
				}),
				range({
					label: "dilate",
					value: dilate,
					min: -1,
					max: 1,
					step: 0.1,
					vlabel: 1,
				}),
				toggle({ label: "lines", value: showLines })
			),
			// options to inject additional CSS classes etc.
			{ typeAttribs: { rangeLabel: { class: "range-label" } } }
		),
		// control component which subscribes to combined state & (re)creates SVG viz
		$replace(main.map(createViz)),
		// container for showing details of selected item
		div(
			{ id: "selection" },
			selected.map((x) => (x ? `Last selected: ${x}` : ""))
		)
	)
).mount(document.getElementById("app")!);
