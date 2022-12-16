import { unsupported } from "@thi.ng/errors/unsupported";

/**
 * Specialized / optimized version of
 * [`thi.ng/defmulti`](https://thi.ng/defmulti) for vector operations. Uses
 * simplified logic to dispatch on length (vector size) of `dispatch` argument.
 *
 * @param dispatch - arg index
 */
export const vop = <T extends Function>(dispatch = 0) => {
	const impls = new Array(5);
	let fallback: T;
	const fn = (...args: any[]) => {
		const g = impls[args[dispatch].length] || fallback;
		return g
			? g(...args)
			: unsupported(`no impl for vec size ${args[dispatch].length}`);
	};
	fn.add = (dim: number, fn: T) => (impls[dim] = fn);
	fn.default = (fn: T) => (fallback = fn);
	fn.impl = (dim: number): T => impls[dim] || fallback;
	// fn.impls = impls;
	return fn;
};
