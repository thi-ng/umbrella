import type { Comparator, FnAny } from "@thi.ng/api";
import { compare } from "@thi.ng/compare/compare";
import type { Reducer, ReductionFn } from "../api.js";
import { $$reduce, reducer } from "../reduce.js";

/**
 * Higher-order reducer for math operations.
 *
 * @param rfn -
 * @param fn -
 * @param initDefault -
 * @param args -
 *
 * @internal
 */
export const __mathOp = (
	rfn: FnAny<Reducer<number, number>>,
	fn: ReductionFn<number, number>,
	initDefault: number,
	args: any[]
) => {
	const res = $$reduce(rfn, args);
	if (res !== undefined) return res;
	const init = args[0] || initDefault;
	return reducer(() => init, fn);
};

/**
 * Shared impl for {@link minCompare} & {@link maxCompare}.
 *
 * @param rfn
 * @param args
 * @param sign
 *
 * @internal
 */
export const __compareOp = (
	rfn: FnAny<Reducer<any, any>>,
	args: any[],
	sign: 1 | -1
) => {
	const res = $$reduce(rfn, args);
	if (res !== undefined) return res;
	const init = args[0];
	const cmp: Comparator<any> = args[1] || compare;
	return reducer(init, (acc, x) => (sign * cmp(acc, x) >= 0 ? acc : x));
};
