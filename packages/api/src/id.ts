/**
 * `id` property declaration.
 */
export interface IID<T> {
	readonly id: T;
}

/**
 * Common minimal base interface for ID generators.
 */
export interface IIDGen<T> {
	/**
	 * Returns next available ID (or throws an error if none available).
	 */
	next(): T;
	/**
	 * Releases given ID (to be called when ID isn't needed anymore). Actual
	 * behavior is implementation specific.
	 *
	 * @param id
	 */
	free(id: T): boolean;
}
