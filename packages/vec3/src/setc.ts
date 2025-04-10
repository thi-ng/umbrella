// SPDX-License-Identifier: Apache-2.0
import type { Vec } from "@thi.ng/vec-api";

export const setC3 = (out: Vec | null, x: number, y: number, z: number) => {
	!out && (out = []);
	out[0] = x;
	out[1] = y;
	out[2] = z;
	return out;
};
