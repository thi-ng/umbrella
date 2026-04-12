// SPDX-License-Identifier: Apache-2.0
import { num, selectNum } from "@thi.ng/rdom-forms";
import { reactive, sync } from "@thi.ng/rstream";
import { range as $range } from "@thi.ng/transducers";
import { calculator, result, VOLUME_LIST } from "./common.js";

export const dilutionVolume = () => {
	const v1 = reactive(100);
	const c1 = reactive(18);
	const c2 = reactive(15);
	const v2 = sync({ src: { v1, c1, c2 } }).map(({ v1, c1, c2 }) =>
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
		num({
			label: "V1",
			desc: "Initial volume",
			min: 1,
			max: 1000,
			list: VOLUME_LIST,
			value: v1,
		}),
		selectNum({
			label: "C1",
			desc: "Initial concentration (percent)",
			items: [...$range(1, 101)],
			value: c1,
		}),
		selectNum({
			label: "C2",
			desc: "Target concentration (percent)",
			items: [...$range(1, 101)],
			value: c2,
		}),
		result("Result", "New volume", v2)
	);
};
