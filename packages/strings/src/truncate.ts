import { memoizeJ } from "@thi.ng/memoize/memoizej";
import type { Stringer } from "./api.js";

export const truncate: (n: number, suffix?: string) => Stringer<string> =
	memoizeJ(
		(n: number, suffix = "") =>
			(x) =>
				x.length > n ? x.substring(0, n - suffix.length) + suffix : x
	);

/**
 * Alias for {@link truncate}
 */
export const truncateRight = truncate;
