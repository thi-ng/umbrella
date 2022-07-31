import { Lane } from "../api.js";
import { defIntFormat } from "./int-format.js";

export const ARGB1555 = defIntFormat({
	type: "u16",
	size: 16,
	alpha: 1,
	channels: [
		{ size: 1, lane: Lane.ALPHA },
		{ size: 5, lane: Lane.RED },
		{ size: 5, lane: Lane.GREEN },
		{ size: 5, lane: Lane.BLUE },
	],
});
