import { ensureArray } from "@thi.ng/arrays/ensure-array";

/**
 * Yields iterator which consumes input and yield its values in reverse
 * order. Important: Input MUST be finite.
 *
 * @example
 * ```ts
 * [...tx.reverse("hello world")]
 * // [ "d", "l", "r", "o", "w", " ", "o", "l", "l", "e", "h" ]
 * ```
 *
 * @param input -
 */
export function* reverse<T>(input: Iterable<T>): IterableIterator<T> {
    const _input = ensureArray(input);
    let n = _input.length;
    while (--n >= 0) {
        yield _input[n];
    }
}
