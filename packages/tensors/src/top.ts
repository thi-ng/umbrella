// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { unsupportedOp } from "@thi.ng/errors/unsupported";
import type { MultiTensorOpImpl } from "./api.js";

/**
 * Specialized / optimized version of
 * [`thi.ng/defmulti`](https://thi.ng/defmulti) for tensor operations. Uses
 * simplified logic to dispatch on tensor dimension ({@link ITensor.dim}) of
 * `dispatch` argument.
 *
 * @param dispatch - arg index (default: 1)
 */
export const top = <T extends Function>(
	dispatch = 1,
	fallback?: T,
	...optimized: Maybe<T>[]
): MultiTensorOpImpl<T> => {
	const impls = (<Maybe<T>[]>[undefined]).concat(optimized);
	const fn = (...args: any[]) => {
		const g = impls[args[dispatch].dim] || fallback;
		return g
			? g(...args)
			: unsupportedOp(`no impl for dimension ${args[dispatch].dim}`);
	};
	fn.add = (dim: number, fn: T) => (impls[dim] = fn);
	fn.default = (fn: T) => (fallback = fn);
	fn.impl = (dim?: number): Maybe<T> =>
		dim != null ? impls[dim] || fallback : fallback;
	return <any>fn;
};
