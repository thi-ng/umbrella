// SPDX-License-Identifier: Apache-2.0
import type { MaybeAsyncIterable } from "@thi.ng/api";
import type { AsyncReducer } from "./api.js";
import { reducer } from "./reduce.js";

export function push<T>(): AsyncReducer<T, T[]>;
export function push<T>(src: MaybeAsyncIterable<T>): Promise<T[]>;
export function push<T>(src?: MaybeAsyncIterable<T>) {
	return src
		? (async () => {
				let res: T[] = [];
				for await (let x of src) res.push(x);
				return res;
		  })()
		: reducer<T, T[]>(
				() => [],
				(acc, x) => (acc.push(x), acc)
		  );
}
