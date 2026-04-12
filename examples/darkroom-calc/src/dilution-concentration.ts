// SPDX-License-Identifier: Apache-2.0
import { num, selectNum } from "@thi.ng/rdom-forms";
import { reactive, sync } from "@thi.ng/rstream";
import { range as $range } from "@thi.ng/transducers";
import { calculator, result, VOLUME_LIST } from "./common.js";

export const dilutionConcentration = () => {
	const v1 = reactive(100);
	const v2 = reactive(150);
	const c1 = reactive(18);
	const c2 = sync({ src: { v1, c1, v2 } }).map(({ v1, c1, v2 }) =>
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
		num({
			label: "V2",
			desc: "Target volume",
			min: 1,
			max: 1000,
			list: VOLUME_LIST,
			value: v2,
		}),
		result("Result", "New concentration (percent)", c2)
	);
};
