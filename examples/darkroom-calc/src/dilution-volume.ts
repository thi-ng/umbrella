// SPDX-License-Identifier: Apache-2.0
import { reactive, sync } from "@thi.ng/rstream";
import { calculator, concentration, result, volume } from "./common.js";

export const dilutionVolume = () => {
	const v1 = reactive(100);
	const c1 = reactive(18);
	const c2 = reactive(15);
	// combine reactive values and compute result
	const res = sync({ src: { v1, c1, c2 } }).map(({ v1, c1, c2 }) =>
		Math.round(((c1 / 100) * v1) / (c2 / 100))
	);
	return calculator(
		{
			title: "Dilution volume",
			desc:
				"Compute the new volume of solution with initial concentration " +
				"`C1` and volume `V1` diluted to obtain concentration `C2`.",
			formula: `result = (C1 * V1) / C2`,
		},
		volume("V1", "Initial volume", v1),
		concentration("C1", "Initial concentration (percent)", c1),
		concentration("C2", "Target concentration (percent)", c2),
		result("Result", "New volume", res)
	);
};
