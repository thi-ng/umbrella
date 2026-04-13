// SPDX-License-Identifier: Apache-2.0
import { reactive, sync } from "@thi.ng/rstream";
import { calculator, concentration, result, volume } from "./common.js";

export const solutionAddition = () => {
	const v = reactive(16);
	const c1 = reactive(25);
	const c2 = reactive(5);
	// combine reactive values and compute results
	const d = sync({ src: { v, c1, c2 } }).map(({ v, c1, c2 }) =>
		Math.round(((c2 / 100) * v) / ((c1 - c2) / 100))
	);
	const r = sync({ src: { v, c1, d } }).map(({ v, c1, d }) =>
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
		volume("V", "Volume of other liquid", v),
		concentration("C1", "Solution A initial concentration (percent)", c1),
		concentration("C2", "Solution A target concentration (percent)", c2),
		result("Result", "Amount to add of solution A", d),
		result("Actual ratio", "Based on rounded result", r)
	);
};
