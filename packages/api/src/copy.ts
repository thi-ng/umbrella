/**
 * Generic interface for clonable types.
 */
export interface ICopy<T> {
	/**
	 * Returns a copy of this instance. Shallow or deep copies are
	 * implementation specific.
	 */
	copy(): T;
}
