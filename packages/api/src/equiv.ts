export interface IEquiv {
	/**
	 * Returns `true` if this *value* is equivalent to `o`. Also see
	 * [ICompare.compare](https://docs.thi.ng/umbrella/api/interfaces/ICompare.html#compare)
	 * and
	 * [IHash.hash](https://docs.thi.ng/umbrella/api/interfaces/IHash.html#hash).
	 *
	 * @param o - value to check for equivalence
	 */
	equiv(o: any): boolean;
}

/**
 * @param T - value type
 */
export interface IEqualsDelta<T> {
	/**
	 * Returns `true` if this value equals `o` with optional allowance
	 * for given tolerance `eps`.
	 *
	 * @param o - 2nd value to test
	 * @param eps - tolerance (usually defaults to `DEFAULT_EPS`)
	 */
	eqDelta(o: T, eps?: number): boolean;
}
