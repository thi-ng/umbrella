import { num, selectNum } from "@thi.ng/rdom-forms";
import { reactive, sync } from "@thi.ng/rstream";
import { range as $range } from "@thi.ng/transducers";
import { calculator, result, VOLUME_LIST } from "./common.js";

export const solutionAddition = () => {
	const v = reactive(16);
	const c0 = reactive(25);
	const cf = reactive(5);
	const d = sync({ src: { v, c0, cf } }).map(({ v, c0, cf }) =>
		Math.round(((cf / 100) * v) / ((c0 - cf) / 100))
	);
	const r = sync({ src: { v, c0, cf, d } }).map(({ v, c0, cf, d }) =>
		((c0 * d) / (d + v)).toFixed(2)
	);
	return calculator(
		{
			title: "Solution addition",
			desc:
				"Compute the amount of solution A (with concentration `C0`) " +
				"to add to another volume `V` to achieve a " +
				"target concentration `Cfinal` (for solution A): ",
			formula: `result = (Cfinal * V) / (C0 - Cfinal)`,
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
			label: "C0",
			desc: "Solution A initial concentration (percent)",
			items: [...$range(1, 101)],
			value: c0,
		}),
		selectNum({
			label: "Cfinal",
			desc: "Solution A target concentration (percent)",
			items: [...$range(1, 101)],
			value: cf,
		}),
		result("Result", "Amount to add of solution A", d),
		result("Actual ratio", "Based on rounded result", r)
	);
};
