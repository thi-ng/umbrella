// SPDX-License-Identifier: Apache-2.0
import { reactive, sync } from "@thi.ng/rstream";
import { calculator, concentration, result, volume } from "./common.js";

export const solutionAmount = () => {
	const v = reactive(100);
	const c = reactive(15);
	// combine reactive values and compute results
	const r = sync({ src: { v, c } }).map(({ v, c }) =>
		((c / 100) * v).toFixed(2)
	);
	return calculator(
		{
			title: "Solution amount",
			desc:
				"Compute the amount of a substance to create a solution " +
				"with concentration `C` in total target volume `V`.",
			formula: `result = (C * V)`,
		},
		concentration("C", "Solution concentration (percent)", c),
		volume("V", "Target Volume", v),
		result("Result", "Rounded result", r)
	);
};
