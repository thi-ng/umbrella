import { iterator } from "./iterator.js";

export function* interpose(x: any, input: Iterable<any>) {
	let iter = iterator(input);
	let v: IteratorResult<any> = iter.next();
	while (!v.done) {
		yield v.value;
		v = iter.next();
		if (!v.done) {
			yield x;
		}
	}
}
