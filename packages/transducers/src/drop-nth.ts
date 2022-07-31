import { isIterable } from "@thi.ng/checks/is-iterable";
import { clamp0 } from "@thi.ng/math/interval";
import type { Transducer } from "./api.js";
import { iterator1 } from "./iterator.js";
import { throttle } from "./throttle.js";

export function dropNth<T>(n: number): Transducer<T, T>;
export function dropNth<T>(n: number, src: Iterable<T>): IterableIterator<T>;
export function dropNth<T>(n: number, src?: Iterable<T>): any {
	if (isIterable(src)) {
		return iterator1(dropNth(n), src);
	}
	n = clamp0(n - 1);
	return throttle(() => {
		let skip = n;
		return () => (skip-- > 0 ? true : ((skip = n), false));
	});
}
