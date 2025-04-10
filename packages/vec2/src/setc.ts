// SPDX-License-Identifier: Apache-2.0
import type { Vec } from "./api.js";

export const setC2 = (out: Vec | null, x: number, y: number) => {
	!out && (out = []);
	out[0] = x;
	out[1] = y;
	return out;
};
