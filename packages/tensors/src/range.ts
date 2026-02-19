// SPDX-License-Identifier: Apache-2.0
import { peek } from "@thi.ng/arrays/peek";
import { isPlainObject } from "@thi.ng/checks";
import type { ITensor1, NumType, TensorOpts } from "./api.js";
import { tensor } from "./tensor.js";

export interface RangeOpts<T extends NumType>
	extends Pick<TensorOpts<T, [number]>, "storage"> {
	/**
	 * Tensor data type.
	 *
	 * @defaultValue "num"
	 */
	type: T;
}

/**
 * Creates a 1D tensor of monotonically increasing values in the interval `[0,max)`.
 *
 * @param max
 * @param opts
 */
export function range<T extends NumType>(
	max: number,
	opts?: RangeOpts<T>
): ITensor1;
/**
 * Creates a 1D tensor of monotonically increasing values in the interval
 * `[min,max)`, using optional `step` and `opts`. If `from <= to`, the default
 * step is 1, otherise -1.
 *
 * @param from
 * @param to
 * @param opts
 */
export function range<T extends NumType>(
	from: number,
	to: number,
	step?: number,
	opts?: RangeOpts<T>
): ITensor1;
export function range(...args: any[]) {
	const opts = isPlainObject(peek(args)) ? args.pop() : undefined;
	const type = opts?.type ?? "num";
	let [from, to, step] = args;
	if (to === undefined) {
		to = from;
		from = 0;
	}
	step = step ?? (from < to ? 1 : -1);
	const data: number[] = [];
	if (step > 0) {
		while (from < to) {
			data.push(from);
			from += step;
		}
	} else if (step < 0) {
		while (from > to) {
			data.push(from);
			from += step;
		}
	}
	return tensor(type, [data.length], { ...opts, copy: type !== "num", data });
}
