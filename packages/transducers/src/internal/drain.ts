import type { Fn } from "@thi.ng/api";
import type { ReductionFn } from "../api.js";
import { isReduced } from "../reduced.js";

/**
 * Helper HOF yielding a buffer drain completion function for some
 * transducers.
 *
 * @param buf -
 * @param complete -
 * @param reduce -
 *
 * @internal
 */
export const __drain =
	<T>(buf: T[], complete: Fn<any, any>, reduce: ReductionFn<any, T>) =>
	(acc: T[]) => {
		while (buf.length && !isReduced(acc)) {
			acc = reduce(acc, buf.shift()!);
		}
		return complete(acc);
	};
