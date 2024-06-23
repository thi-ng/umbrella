import type { Maybe } from "@thi.ng/api";
import { iterator } from "./iterator.js";

export function* dedupe<T>(input: Iterable<T>) {
	let iter = iterator(input);
	let v: IteratorResult<T>;
	let prev: Maybe<T>;
	while (((v = iter.next()), !v.done)) {
		if (v.value !== prev) {
			prev = v.value;
			yield v.value;
		}
	}
}
