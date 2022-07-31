import { memoizeJ } from "@thi.ng/memoize/memoizej";
import type { Stringer } from "./api.js";
import { repeat } from "./repeat.js";

/**
 * @param n - target length
 * @param ch - pad character(s)
 */
export const padRight: (
	n: number,
	ch?: string | number
) => (x: any, length?: number) => string = memoizeJ<
	number,
	string | number | undefined,
	Stringer<any>
>((n, ch = " ") => {
	const buf = repeat(String(ch), n);
	return (x, len?: number) => {
		if (x == null) return buf;
		x = x.toString();
		len = len !== undefined ? len : x.length;
		return len! < n ? x + buf.substring(len!) : x;
	};
});
