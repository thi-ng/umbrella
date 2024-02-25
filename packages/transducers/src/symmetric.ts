interface Cell<T> {
	x: T;
	n?: Cell<T>;
}

/**
 * Yields an iterator of all `src` values, followed by the same values in
 * reverse order. Efficiently builds the reversed order via an internal linked
 * list.
 *
 * @example
 * ```ts
 * import { symmetric } from "@thi.ng/transducers";
 *
 * [...symmetric([1, 2, 3])]
 * // [ 1, 2, 3, 3, 2, 1 ]
 * ```
 *
 * @param src -
 */
export function* symmetric<T>(src: Iterable<T>): IterableIterator<T> {
	let head: Cell<T> | undefined = undefined;
	for (let x of src) {
		head = { x, n: head };
		yield x;
	}
	while (head) {
		yield head.x;
		head = head.n;
	}
}
