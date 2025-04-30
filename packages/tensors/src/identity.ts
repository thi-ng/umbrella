// SPDX-License-Identifier: Apache-2.0
import type { TensorOpts, Type } from "./api.js";
import { STORAGE } from "./storage.js";
import { Tensor2 } from "./tensor.js";

export const identity = <T extends Exclude<Type, "str">>(
	type: T,
	size: number,
	opts?: Pick<TensorOpts<any, any>, "storage">
) => {
	const storage = opts?.storage || STORAGE[type];
	const data = storage.alloc(size * size);
	for (let i = 0; i < data.length; i += size + 1) data[i] = 1;
	return new Tensor2<number>(type, storage, data, [size, size], [size, 1]);
};
