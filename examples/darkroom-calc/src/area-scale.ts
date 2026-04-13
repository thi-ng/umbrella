// SPDX-License-Identifier: Apache-2.0
import { reactive, sync } from "@thi.ng/rstream";
import { calculator, dimension, result, volume } from "./common.js";

export const areaScale = () => {
	const n = reactive(16);
	const sw = reactive(6);
	const sh = reactive(4);
	const dw = reactive(10);
	const dh = reactive(8);
	// combine reactive values and compute result
	const res = sync({ src: { n, sw, sh, dw, dh } }).map(
		({ n, sw, sh, dw, dh }) => Math.round((n * (dw * dh)) / (sw * sh))
	);
	return calculator(
		{
			title: "Scale amount by area",
			desc: "Given reference dimensions and amount `N`, compute new amount needed for target area:",
			formula: `result = N * (W * H) / (Wref * Href)`,
		},
		volume("N", "Amount needed for reference area", n),
		dimension("Wref", "Reference width", sw),
		dimension("Href", "Reference height", sh),
		dimension("Width", "Target width", dw),
		dimension("Height", "Target height", dh),
		result("Result", "Target amount (rounded)", res)
	);
};
