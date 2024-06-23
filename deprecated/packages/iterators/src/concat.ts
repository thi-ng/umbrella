import type { Nullable } from "@thi.ng/api";
import { ensureIterable } from "./ensure.js";
import { iterator } from "./iterator.js";

export function* concat<T>(...inputs: Nullable<Iterable<T>>[]) {
	let iter = iterator(inputs);
	let v: IteratorResult<Nullable<Iterable<T>>>;
	while (((v = iter.next()), !v.done)) {
		if (v.value != null) {
			yield* ensureIterable(v.value);
		}
	}
}
