import { memoizeJ } from "@thi.ng/memoize/memoizej";
import type { Stringer } from "./api.js";

/**
 * Returns a {@link Stringer} which wrap inputs with given `pad` string on
 * both sides.
 */
export const wrap: (pad: string) => Stringer<any> = memoizeJ(
	(pad: string) => (x: any) => pad + x + pad
);
