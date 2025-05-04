import { peek } from "@thi.ng/arrays/peek";
import { isPlainObject } from "@thi.ng/checks";
import { range as $range } from "@thi.ng/transducers/range";
import type { TensorOpts } from "./api.js";
import { tensor, Tensor1 } from "./tensor.js";

/**
 * Creates a 1D tensor of monotonically increasing values in the interval `[0,max)`.
 *
 * @param max
 * @param opts
 */
export function range(
	max: number,
	opts?: Pick<TensorOpts<number, any>, "storage">
): Tensor1;
/**
 * Creates a 1D tensor of monotonically increasing values in the interval
 * `[min,max)`, using optional `step` and `opts`. If `from <= to`, the default
 * step is 1, otherise -1.
 *
 * @param from
 * @param to
 * @param opts
 */
export function range(
	from: number,
	to: number,
	step?: number,
	opts?: Pick<TensorOpts<number, any>, "storage">
): Tensor1;
export function range(...args: any[]) {
	const opts = isPlainObject(peek(args)) ? args.pop() : undefined;
	const data = [...$range(...(<[number]>args))];
	return tensor("num", [data.length], { ...opts, data });
}
