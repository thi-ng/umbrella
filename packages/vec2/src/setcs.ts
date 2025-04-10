// SPDX-License-Identifier: Apache-2.0
import type { Vec } from "./api.js";

export const setCS2 = (
	out: Vec | null,
	x: number,
	y: number,
	io = 0,
	so = 1
) => {
	!out && (out = []);
	out[io] = x;
	out[io + so] = y;
	return out;
};
