/**
 * Generic interface for collection types to check if a given value is
 * part of the collection.
 */
export interface IContains<T> {
	/**
	 * Returns `true` if `x` is part of collection.
	 *
	 * @param x - value to check for
	 */
	contains(x: T): boolean;
}
