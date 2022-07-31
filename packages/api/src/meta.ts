/**
 * Generic interface for types supporting metadata. Implementations MUST
 * exclude metadata from any comparisons, equality checks & hashing.
 */
export interface IMeta<T> {
	meta(): any;
	/**
	 * Returns a copy of the original value with given metadata
	 * attached.
	 *
	 * @param meta - meta data
	 */
	withMeta(meta: any): T;
}
