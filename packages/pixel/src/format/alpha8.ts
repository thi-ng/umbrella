import { defIntFormat } from "./int-format.js";

export const ALPHA8 = defIntFormat({
	type: "u8",
	size: 8,
	alpha: 8,
	channels: [{ size: 8, lane: 0 }],
});
