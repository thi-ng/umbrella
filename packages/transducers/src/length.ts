import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Transducer } from "./api.js";
import { iterator1 } from "./iterator.js";
import { map } from "./map.js";
import type { ILength } from "@thi.ng/api";

/**
 * Similar to `map((x) => x.length)`. A transducer which returns the `.length`
 * of each input (optionally with offset `n` added, default: 0) and yields
 * sequence of these values.
 *
 * @example
 * ```ts
 * [...length(0, ["a", "bc", "def"])]
 * // [1, 2, 3]
 * ```
 *
 * @param n - optional offset
 */
export function length(n?: number): Transducer<ILength, number>;
export function length(
	n: number,
	src: Iterable<ILength>
): IterableIterator<number>;
export function length(n = 0, src?: Iterable<ILength>): any {
	return isIterable(src)
		? iterator1(length(n), src)
		: map(
				n === 0
					? (x: ILength) => x.length
					: (x: ILength) => x.length + n
		  );
}
