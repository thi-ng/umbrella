import { Lane } from "../api.js";
import { defIntFormat } from "./int-format.js";

export const RGB888 = defIntFormat({
	type: "u32",
	size: 24,
	channels: [
		{ size: 8, lane: Lane.RED },
		{ size: 8, lane: Lane.GREEN },
		{ size: 8, lane: Lane.BLUE },
	],
});
