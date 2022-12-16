import type { LVar } from "@thi.ng/fuzzy";
import { convertTree } from "@thi.ng/hiccup-svg/convert";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { serialize } from "@thi.ng/hiccup/serialize";
import { fit } from "@thi.ng/math/fit";
import { inRange } from "@thi.ng/math/interval";
import type { VizualizeVarOpts } from "./api.js";

/**
 * Takes an [`LVar`](https://docs.thi.ng/umbrella/fuzzy/interfaces/LVar.html)
 * and visualization options. Evaluates all of the var's fuzzy sets in the var's
 * value domain and visualizes them as polygons. Returns a
 * [thi.ng/hiccup-canvas](https://thi.ng/thi.ng/hiccup-canvas) compatible shape
 * component tree.
 *
 * @param var -
 * @param opts -
 */
export const varToHiccup = (
	{ domain: [min, max], terms }: LVar<any>,
	opts: Partial<VizualizeVarOpts> = {}
) => {
	const {
		samples,
		width,
		height,
		labels,
		stroke: strokeFn,
		fill: fillFn,
	} = {
		samples: 200,
		width: 600,
		height: 100,
		labels: true,
		stroke: (x: number) => `hsl(${(x * 360) | 0},100%,40%)`,
		fill: (x: number) => `hsla(${(x * 360) | 0},100%,50%,20%)`,
		...opts,
	};
	const keys = Object.keys(terms);
	const dt = (max - min) / samples;
	const ds = width / samples;
	const dn = 1 / keys.length;
	const curves: any[] = [];
	const legend: any[] = [];
	for (let i = 0; i < keys.length; i++) {
		const id = keys[i];
		const f = terms[id];
		const y = (i + 1) * 12;
		const stroke = strokeFn(i * dn);
		const curr: number[][] = [];
		for (let i = 0; i <= samples; i++) {
			curr.push([i * ds, (1 - f(min + i * dt)) * height]);
		}
		curr.push([width, height], [0, height]);
		curves.push([
			"polygon",
			{
				stroke,
				fill: fillFn(i * dn),
			},
			curr,
		]);
		if (labels) {
			legend.push(
				["line", { stroke }, [0, y], [20, y]],
				[
					"text",
					{
						baseline: "middle",
						fill: "black",
					},
					[30, y],
					id,
				]
			);
		}
	}
	const zero = fit(0, min, max, 0, width);
	return svg(
		{
			width,
			height: height + 12,
			fill: "none",
			"font-family": "sans-serif",
			"font-size": 10,
		},
		...curves,
		...legend,
		inRange(zero, width * 0.05, width * 0.95)
			? [
					"g",
					{},
					[
						"line",
						{
							stroke: "black",
							dash: [1, 1],
						},
						[zero, 0],
						[zero, height],
					],
					[
						"text",
						{ align: "center", fill: "black" },
						[zero, height + 10],
						"0.00",
					],
			  ]
			: null,
		[
			"g",
			{ fill: "black" },
			["text", {}, [0, height + 10], min.toFixed(2)],
			["text", { align: "end" }, [width, height + 10], max.toFixed(2)],
		]
	);
};

/**
 * Similar to {@link varToHiccup}, but then also serializes the result to an
 * actual SVG string.
 *
 * @param $var
 * @param opts -
 */
export const varToSvg = ($var: LVar<any>, opts: Partial<VizualizeVarOpts>) =>
	serialize(convertTree(varToHiccup($var, opts)));
