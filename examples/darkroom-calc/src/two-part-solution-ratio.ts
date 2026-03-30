import { num, selectNum, str } from "@thi.ng/rdom-forms";
import { reactive, sync } from "@thi.ng/rstream";
import { range as $range } from "@thi.ng/transducers";
import { calculator, result, VOLUME_LIST } from "./common.js";

export const twoPartSolutionRatio = () => {
	const v = reactive(16);
	const k = reactive(1);
	const b = sync({ src: { v, k } }).map(({ v, k }) =>
		Math.round(v / (1 + k))
	);
	const a = sync({ src: { v, b } }).map(({ v, b }) => v - b);
	const r = sync({ src: { a, b } }).map(({ a, b }) => (a / b).toFixed(2));
	return calculator(
		{
			title: "Two-part solution ratio",
			desc: "For a total volume `V` of a two-part solution with target A:B ratio `K`, compute how many units are needed of both `A` and `B`:",
			formula: `A = V - B\nB = V / (1 + K)`,
		},
		num({
			label: "V",
			desc: "Total volume",
			min: 1,
			max: 1000,
			list: VOLUME_LIST,
			value: v,
		}),
		selectNum({
			label: "K",
			desc: "Target A:B ratio",
			items: [
				1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.5, 3, 3.33,
				4, 5, 6, 6.66, 7, 7.5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
				19, 20, 25, 30, 33, 40, 50, 60, 66, 70, 75, 80, 90, 100, 125,
				150, 175, 200,
			],
			value: k,
		}),
		result("A", "Number of units (rounded)", a),
		result("B", "Number of units (rounded)", b),
		result("Actual ratio", "Computed A:B ratio", r)
	);
};
