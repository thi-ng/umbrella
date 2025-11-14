// SPDX-License-Identifier: Apache-2.0
import type { VecOpVV } from "./api.js";
import { dot, dot2, dot3 } from "./dot.js";
import { maddN, maddN2, maddN3 } from "./maddn.js";

export const reflect: VecOpVV = (out, a, b) =>
	maddN(out || a, b, -2 * dot(a, b), a);

export const reflect2: VecOpVV = (out, a, b) =>
	maddN2(out || a, b, -2 * dot2(a, b), a);

export const reflect3: VecOpVV = (out, a, b) =>
	maddN3(out || a, b, -2 * dot3(a, b), a);
