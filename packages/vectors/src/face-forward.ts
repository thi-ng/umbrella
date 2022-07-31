import type { VecOpVVV } from "./api.js";
import { dot } from "./dot.js";
import { mulN } from "./muln.js";
import { set } from "./set.js";

export const faceForward: VecOpVVV = (out, n, i, nref) => {
	!out && (out = n);
	return dot(nref, i) < 0
		? out !== n
			? set(out, n)
			: out
		: mulN(out, n, -1);
};
