import { iterator } from "./iterator.js";

export function* takeLast<T>(n: number, input: Iterable<T>) {
	let iter = iterator(input);
	let v: IteratorResult<T>;
	let prev: T[] = [];
	while (((v = iter.next()), !v.done)) {
		prev.push(v.value);
		if (prev.length > n) {
			prev = prev.slice(1);
		}
	}
	yield* prev;
}
