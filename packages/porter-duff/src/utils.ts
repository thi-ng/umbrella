// thing:no-export
import type { Color, ReadonlyColor } from "./api.js";

/** @internal */
export const setC4 = (
	out: Color,
	a: number,
	b: number,
	c: number,
	d: number
) => ((out[0] = a), (out[1] = b), (out[2] = c), (out[3] = d), out);

/** @internal */
export const setN4 = (out: Color, n: number) => setC4(out, n, n, n, n);

/** @internal */
export const setV4 = (out: Color, a: ReadonlyColor) =>
	setC4(out, a[0], a[1], a[2], a[3]);
