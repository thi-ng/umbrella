// SPDX-License-Identifier: Apache-2.0
import type { VecOpRoVV, VecOpVV } from "./api.js";
import { setC3 } from "./setc.js";

export const cross2: VecOpRoVV<number> = (a, b) => a[0] * b[1] - a[1] * b[0];

export const cross3: VecOpVV = (out, a, b) =>
	setC3(
		out || a,
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]
	);
