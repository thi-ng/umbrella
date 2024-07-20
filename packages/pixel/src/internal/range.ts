// thing:export
/**
 * Yields monotonically increasing iterator of [0..n)
 *
 * @param n -
 *
 * @internal
 */
export function* __range(n: number) {
	for (let i = 0; i < n; i++) yield i;
}
