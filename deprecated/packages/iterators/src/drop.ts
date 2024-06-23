import { consume } from "./consume.js";
import { ensureIterator } from "./ensure.js";

export function* drop<T>(n: number, input: Iterable<T>) {
	let iter = ensureIterator(input);
	consume(iter, n);
	yield* iter;
}
