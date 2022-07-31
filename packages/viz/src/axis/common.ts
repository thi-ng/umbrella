import { float } from "@thi.ng/strings/float";
import type { AxisSpec } from "../api.js";

export const axisDefaults = (extra?: any): Partial<AxisSpec> => ({
	attribs: { stroke: "#000" },
	label: (pos, body) => ["text", {}, pos, body],
	labelAttribs: {
		fill: "#000",
		stroke: "none",
	},
	labelOffset: [0, 0],
	format: float(2),
	visible: true,
	major: { ticks: () => [], size: 10 },
	minor: { ticks: () => [], size: 5 },
	...extra,
});
