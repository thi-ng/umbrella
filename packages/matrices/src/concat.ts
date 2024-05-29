import type { Mat, ReadonlyMat } from "./api.js";
import { mulM } from "./mulm.js";

/**
 * Concatenates / multiplies given matrices (min. 2 required) in left-to-right
 * order. A minimum of 2 input matrices must be given. If `out` is null, writes
 * result into `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 * @param rest -
 */
export const concat = (
	out: Mat | null,
	a: ReadonlyMat,
	b: ReadonlyMat,
	...rest: ReadonlyMat[]
): Mat => rest.reduce((acc: Mat, x) => mulM(acc, acc, x), mulM(out, a, b));
