import type { Predicate } from "@thi.ng/api";
import { iterator } from "./iterator.js";

export function* takeWhile<T>(pred: Predicate<T>, input: Iterable<T>) {
	let iter = iterator(input);
	let v: IteratorResult<T>;
	while (((v = iter.next()), !v.done && pred(v.value))) {
		yield v.value;
	}
}
