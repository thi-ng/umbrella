// SPDX-License-Identifier: Apache-2.0
import { Lane } from "../api.js";
import { __swapLane13 } from "../internal/utils.js";
import { defIntFormat } from "./int-format.js";

export const ARGB8888 = defIntFormat({
	type: "u32",
	size: 32,
	alpha: 8,
	channels: [
		{ size: 8, lane: Lane.ALPHA },
		{ size: 8, lane: Lane.RED },
		{ size: 8, lane: Lane.GREEN },
		{ size: 8, lane: Lane.BLUE },
	],
	fromABGR: __swapLane13,
	toABGR: __swapLane13,
});
