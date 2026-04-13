// SPDX-License-Identifier: Apache-2.0
import { reactive, sync } from "@thi.ng/rstream";
import { calculator, concentration, result, volume } from "./common.js";

export const dilutionConcentration = () => {
	const v1 = reactive(100);
	const v2 = reactive(150);
	const c1 = reactive(18);
	// combine reactive values and compute result
	const res = sync({ src: { v1, c1, v2 } }).map(({ v1, c1, v2 }) =>
		Math.round((((c1 / 100) * v1) / v2) * 100)
	);
	return calculator(
		{
			title: "Dilution concentration",
			desc:
				"Compute the new concentration of solution with initial concentration " +
				"`C1` and volume `V1` diluted to volume `V2`.",
			formula: `result = (C1 * V1) / V2`,
		},
		volume("V1", "Initial volume", v1),
		concentration("C1", "Initial concentration (percent)", c1),
		volume("V2", "Target volume", v2),
		result("Result", "New concentration (percent)", res)
	);
};
