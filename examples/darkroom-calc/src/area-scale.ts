// SPDX-License-Identifier: Apache-2.0
import { num, range, str } from "@thi.ng/rdom-forms";
import { reactive, sync } from "@thi.ng/rstream";
import { calculator, result, VOLUME_LIST } from "./common.js";

export const areaScale = () => {
	const n = reactive(16);
	const sw = reactive(6);
	const sh = reactive(4);
	const dw = reactive(10);
	const dh = reactive(8);
	const m = sync({ src: { n, sw, sh, dw, dh } }).map(
		({ n, sw, sh, dw, dh }) => Math.round((n * (dw * dh)) / (sw * sh))
	);
	return calculator(
		{
			title: "Scale amount by area",
			desc: "Given reference dimensions and amount `N`, compute new amount needed for target area:",
			formula: `result = N * (W * H) / (Wref * Href)`,
		},
		num({
			label: "N",
			desc: "Amount needed for reference area",
			min: 1,
			max: 1000,
			list: VOLUME_LIST,
			value: n,
		}),
		range({
			label: "Wref",
			desc: "Reference width",
			min: 1,
			max: 30,
			step: 0.5,
			vlabel: 1,
			value: sw,
		}),
		range({
			label: "Href",
			desc: "Reference height",
			min: 1,
			max: 30,
			step: 0.5,
			vlabel: 1,
			value: sh,
		}),
		range({
			label: "Width",
			desc: "Target width",
			min: 1,
			max: 30,
			step: 0.5,
			vlabel: 1,
			value: dw,
		}),
		range({
			label: "Height",
			desc: "Target height",
			min: 1,
			max: 30,
			step: 0.5,
			vlabel: 1,
			value: dh,
		}),
		result("Result", "Target amount (rounded)", m)
	);
};
