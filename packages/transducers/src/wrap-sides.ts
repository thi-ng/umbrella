import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { inRange } from "@thi.ng/math/interval";

/**
 * Yields iterator of `src` with the last `numLeft` values of `src`
 * prepended at the beginning and/or the first `numRight` values
 * appended at the end.
 *
 * @remarks
 * `numLeft` defaults to 1 and `numRight` defaults to same value as
 * `numLeft`, therefore wraps both sides by default and throws error if
 * either `nXXX < 0` or larger than `src.length`.
 *
 * See also:
 * - {@link extendSides}
 * - {@link padSides}
 *
 * @param src -
 * @param numLeft -
 * @param numRight -
 */
export function* wrapSides<T>(
	src: Iterable<T>,
	numLeft = 1,
	numRight = numLeft
): IterableIterator<T> {
	const _src: T[] = ensureArray(src);
	!(inRange(numLeft, 0, _src.length) && inRange(numRight, 0, _src.length)) &&
		illegalArgs(`allowed wrap range: [0..${_src.length}]`);
	if (numLeft > 0) {
		for (let m = _src.length, i = m - numLeft; i < m; i++) {
			yield _src[i];
		}
	}
	yield* _src;
	if (numRight > 0) {
		for (let i = 0; i < numRight; i++) {
			yield _src[i];
		}
	}
}
