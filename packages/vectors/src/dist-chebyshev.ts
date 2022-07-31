import type { MultiVecOpRoVV } from "./api.js";
import { compile } from "./compile/emit.js";
import { vop } from "./vop.js";

const $ = (dim: number) =>
	distChebyshev.add(
		dim,
		compile(
			dim,
			([a, b]) => `Math.abs(${a}-${b})`,
			"a,b",
			undefined,
			"",
			",",
			"return Math.max(",
			");"
		)
	);

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Chebyshev_distance
 */
export const distChebyshev: MultiVecOpRoVV<number> = vop();

distChebyshev.default((a, b) => {
	let max = 0;
	for (let i = a.length; i-- > 0; ) {
		max = Math.max(max, Math.abs(a[i] - b[i]));
	}
	return max;
});

export const distChebyshev2 = $(2);
export const distChebyshev3 = $(3);
export const distChebyshev4 = $(4);
