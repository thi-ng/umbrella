// SPDX-License-Identifier: Apache-2.0
import type { ITensor2, TensorOpts, Type } from "./api.js";
import { STORAGE } from "./storage.js";
import { Tensor2 } from "./tensor.js";

/**
 * Creates a square identity matrix of given `size` and options.
 *
 * @param type
 * @param size
 * @param opts
 */
export const identity = <T extends Exclude<Type, "str">>(
	type: T,
	size: number,
	opts?: Pick<TensorOpts<any, any>, "storage">
): ITensor2 => {
	const n = size * size;
	const storage = opts?.storage || STORAGE[type];
	const data = storage.alloc(n);
	for (let i = 0; i < n; i += size + 1) data[i] = 1;
	return new Tensor2<number>(type, storage, data, [size, size], [size, 1]);
};
