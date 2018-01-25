import { isArrayLike } from "@thi.ng/checks/is-arraylike";

/**
 * Yields iterator producing input in reverse order.
 * Important: Input MUST be finite. Unless an
 * ```
 * [...tx.reverse("hello world")]
 * // [ "d", "l", "r", "o", "w", " ", "o", "l", "l", "e", "h" ]
 * ```
 * @param input
 */
export function* reverse<T>(input: Iterable<T>): IterableIterator<T> {
    if (!isArrayLike(input)) {
        input = [...input];
    }
    let n = (<any>input).length;
    while (--n >= 0) {
        yield input[n];
    }
}
