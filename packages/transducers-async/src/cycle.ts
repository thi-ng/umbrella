import type { MaybeAsyncIterable } from "@thi.ng/api";

export async function* cycle<T>(input: MaybeAsyncIterable<T>, num = Infinity) {
	if (num < 1) return;
	let cache: T[] = [];
	for await (const i of input) {
		cache.push(i);
		yield i;
	}
	if (cache.length > 0) {
		while (--num > 0) {
			yield* cache;
		}
	}
}
