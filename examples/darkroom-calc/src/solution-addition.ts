// SPDX-License-Identifier: Apache-2.0
import { num, selectNum } from "@thi.ng/rdom-forms";
import { reactive, sync } from "@thi.ng/rstream";
import { range as $range } from "@thi.ng/transducers";
import { calculator, result, VOLUME_LIST } from "./common.js";

export const solutionAddition = () => {
	const v = reactive(16);
	const c1 = reactive(25);
	const c2 = reactive(5);
	const d = sync({ src: { v, c1, c2 } }).map(({ v, c1, c2 }) =>
		Math.round(((c2 / 100) * v) / ((c1 - c2) / 100))
	);
	const r = sync({ src: { v, c1, c2, d } }).map(({ v, c1, c2, d }) =>
		((c1 * d) / (d + v)).toFixed(2)
	);
	return calculator(
		{
			title: "Solution addition",
			desc:
				"Compute the amount of solution A (with concentration `C1`) " +
				"to add to another volume `V` to achieve a " +
				"target concentration `C2` (for solution A): ",
			formula: `result = (C2 * V) / (C1 - C2)`,
		},
		num({
			label: "V",
			desc: "Volume of other liquid",
			min: 1,
			max: 1000,
			list: VOLUME_LIST,
			value: v,
		}),
		selectNum({
			label: "C1",
			desc: "Solution A initial concentration (percent)",
			items: [...$range(1, 101)],
			value: c1,
		}),
		selectNum({
			label: "C2",
			desc: "Solution A target concentration (percent)",
			items: [...$range(1, 101)],
			value: c2,
		}),
		result("Result", "Amount to add of solution A", d),
		result("Actual ratio", "Based on rounded result", r)
	);
};
