import { memoizeO } from "@thi.ng/memoize/memoizeo";
import { repeat } from "./repeat.js";

/**
 * @param n - target length
 * @param ch - pad character(s)
 */
export const padRight: (
	n: number,
	ch?: string | number
) => (x: any, length?: number) => string = memoizeO((n, ch = " ") => {
	const buf = repeat(String(ch), n);
	return (x, len?: number) => {
		if (x == null) return buf;
		x = x.toString();
		len = len !== undefined ? len : x.length;
		return len! < n ? x + buf.substring(len!) : x;
	};
});
