import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { consume } from "./consume.js";
import { iterator } from "./iterator.js";

export function* partition<T>(
	n: number,
	step: number,
	input: Iterable<T>,
	all = false
) {
	if (n < 1) {
		illegalArgs(`invalid partition size: ${n}`);
	}
	if (step < 1) {
		illegalArgs(`invalid step size: ${step}`);
	}
	let iter = iterator(input);
	let chunk: T[] = [];
	while (true) {
		let i = chunk.length;
		while (i++ < n) {
			let v = iter.next();
			if (v.done) {
				if (all && chunk.length > 0) {
					yield chunk;
				}
				return;
			}
			chunk.push(v.value);
		}
		yield chunk;
		chunk = step < n ? chunk.slice(step) : [];
		if (step > n) {
			consume(iter, step - n);
		}
	}
}
