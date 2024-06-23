import type { Fn } from "@thi.ng/api";

/**
 * @deprecated use
 * [`@thi.ng/compose`](https://docs.thi.ng/umbrella/compose/functions/juxt.html)
 * instead
 *
 * @param fns -
 */
export const juxt =
	<T>(...fns: Fn<T, any>[]) =>
	(x: T) => {
		let res = [];
		for (let i = 0; i < fns.length; i++) {
			res[i] = fns[i](x);
		}
		return res;
	};
