// SPDX-License-Identifier: Apache-2.0
import type { Vec } from "@thi.ng/vec-api";

export const setCS3 = (
	out: Vec | null,
	x: number,
	y: number,
	z: number,
	io = 0,
	so = 1
) => {
	!out && (out = []);
	out[io] = x;
	out[io + so] = y;
	out[io + 2 * so] = z;
	return out;
};
