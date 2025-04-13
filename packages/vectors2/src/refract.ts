// SPDX-License-Identifier: Apache-2.0
import type { VecOpVVN } from "./api.js";
import { dot, dot2, dot3 } from "./dot.js";
import { maddN, maddN2, maddN3 } from "./maddn.js";
import { mulN, mulN2, mulN3 } from "./muln.js";
import { setN, setN2, setN3 } from "./setn.js";

export const refract: VecOpVVN = (out, a, n, eta) => {
	!out && (out = a);
	const d = dot(a, n);
	const k = 1 - eta * eta * (1 - d * d);
	return k < 0
		? setN(out, 0)
		: maddN(out, n, -(eta * d + Math.sqrt(k)), mulN(out, a, eta));
};

export const refract2: VecOpVVN = (out, a, n, eta) => {
	!out && (out = a);
	const d = dot2(a, n);
	const k = 1 - eta * eta * (1 - d * d);
	return k < 0
		? setN2(out, 0)
		: maddN2(out, n, -(eta * d + Math.sqrt(k)), mulN2(out, a, eta));
};

export const refract3: VecOpVVN = (out, a, n, eta) => {
	!out && (out = a);
	const d = dot3(a, n);
	const k = 1 - eta * eta * (1 - d * d);
	return k < 0
		? setN3(out, 0)
		: maddN3(out, n, -(eta * d + Math.sqrt(k)), mulN3(out, a, eta));
};
