import type { Maybe } from "@thi.ng/api";
import { iterator } from "./iterator.js";

export const last = <T>(input: Iterable<T>) => {
	let iter = iterator(input);
	let v: IteratorResult<T>;
	let prev: Maybe<T>;
	while (((v = iter.next()), !v.done)) {
		prev = v.value;
	}
	return prev;
};
