// SPDX-License-Identifier: Apache-2.0
import { setC3 } from "@thi.ng/vectors/setc";
import type { ColorOp } from "../api.js";
import { clampH } from "../clamp.js";
import { hueRgb } from "../rgb/hue-rgb.js";

export const hsvRgb: ColorOp = (out, src) => {
	out = clampH(out || src, src);
	const s = out[1];
	const v = out[2];
	hueRgb(out, src[0], out[3]);
	return setC3(
		out,
		((out[0] - 1) * s + 1) * v,
		((out[1] - 1) * s + 1) * v,
		((out[2] - 1) * s + 1) * v
	);
};
