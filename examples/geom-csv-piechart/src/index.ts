import {
	COSINE_GRADIENTS,
	cosineColor,
	type CosGradientSpec,
} from "@thi.ng/color";
import { compareByKey, compareNumDesc } from "@thi.ng/compare";
import { float, parseCSVFromString } from "@thi.ng/csv";
import {
	arc,
	asSector,
	asSvg,
	circle,
	group,
	polyline,
	svgDoc,
	text,
} from "@thi.ng/geom";
import { TAU } from "@thi.ng/math";
import { percent } from "@thi.ng/strings";
import { add, pluck, transduce } from "@thi.ng/transducers";
import { cartesian2 } from "@thi.ng/vectors";
import CSV from "./co2-emissions.csv?raw";

interface PiePiece {
	value: number;
	label: string;
}

/**
 * Pie chart generator. Takes an array of data items, a cosine-gradient spec,
 * radius and offset (to shift pieces outward from the center). Returns group of
 * constructed pie pieces (each a group itself).
 *
 * @param items
 * @param gradient
 * @param radius
 * @param offset
 */
const pieChart = (
	items: PiePiece[],
	gradient: CosGradientSpec,
	radius: number,
	offset = 0
) => {
	let theta = 0;
	const pieces = [];
	// total sum of all item values
	const total = transduce(pluck("value"), add(), items);
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		// compute piece's end & mid angles
		const end = theta + (item.value / total) * TAU;
		const mid = (theta + end) / 2;
		// construct pie piece/sector & assign color from gradient
		const piece = asSector(
			// use polar coords to offset center (only if offset>0)
			arc(cartesian2([], [offset, mid]), radius, 0, theta, end),
			{ fill: cosineColor(gradient, i / items.length) }
		);
		// compute points for label (again using polar coords)
		const p1 = cartesian2([], [offset + radius + 5, mid]);
		const p2 = cartesian2([], [offset + radius + 30, mid]);
		const p3 = [p2[0] + 120 * Math.sign(p2[0]), p2[1]];
		const labelLine = polyline([p1, p2, p3], { stroke: "black" });
		const label = text(
			[p3[0], p3[1] - 5],
			`${item.label} (${percent(1)(item.value / total)})`,
			{ align: p3[0] > 0 ? "right" : "left" }
		);
		// store all elements as group
		pieces.push(group({}, [piece, labelLine, circle(p1, 2), label]));
		// end angle = start angle for next piece
		theta = end;
	}
	return group({}, pieces);
};

// load dataset from CSV, then sort by value
const countries = <PiePiece[]>[
	...parseCSVFromString(
		{
			// column specs
			cols: {
				Entity: { alias: "label" },
				"Annual CO2 emissions": { alias: "value", tx: float() },
			},
			// only keep specified columns
			all: false,
		},
		// embedded CSV file (see imports)
		CSV
	),
].sort(compareByKey("value", compareNumDesc));

// serialize to SVG
document.getElementById("app")!.innerHTML = asSvg(
	svgDoc(
		{
			__margin: 32,
			font: "0.8rem sans-serif",
			"font-weight": "bold",
			fill: "black",
			stroke: "none",
		},
		text([0, -180], "CO2 emissions 2022 (top 5 only)", {
			align: "center",
			"font-size": "1.5rem",
		}),
		// build piechart with given gradient & radius
		pieChart(countries, COSINE_GRADIENTS["rainbow1"], 100)
	)
);
