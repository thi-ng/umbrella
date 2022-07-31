import { Lane } from "../api.js";
import { __luminanceABGR } from "../internal/utils.js";
import { defIntFormat } from "./int-format.js";

export const GRAY16 = defIntFormat({
	type: "u16",
	size: 16,
	channels: [{ size: 16, lane: Lane.RED }],
	fromABGR: (x) => ((__luminanceABGR(x) + 0.5) | 0) * 0x0101,
	toABGR: (x) => (0xff000000 | ((x >>> 8) * 0x010101)) >>> 0,
});
