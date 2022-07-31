import { ensureIterable } from "./ensure.js";
import { iterator } from "./iterator.js";
import { take } from "./take.js";

export function* dropNth<T>(n: number, input: Iterable<T>) {
	let iter = ensureIterable(iterator(input));
	do {
		yield* take(n - 1, iter);
	} while (!iter.next().done);
}
