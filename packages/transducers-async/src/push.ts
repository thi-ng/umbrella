import type { MaybeAsyncIterable } from "@thi.ng/api";
import type { AsyncReducer } from "./api.js";
import { reducer } from "./reduce.js";

export function push<T>(): AsyncReducer<T, T[]>;
export function push<T>(xs: MaybeAsyncIterable<T>): Promise<T[]>;
export function push<T>(xs?: MaybeAsyncIterable<T>) {
	return xs
		? (async () => {
				let res: T[] = [];
				for await (let x of xs) res.push(x);
				return res;
		  })()
		: reducer<T, T[]>(
				() => [],
				(acc, x) => (acc.push(x), acc)
		  );
}
