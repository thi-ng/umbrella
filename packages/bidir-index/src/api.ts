// SPDX-License-Identifier: Apache-2.0
export interface SerializedBidirIndex<T> {
	pairs: [T, number][];
	nextID: number;
}

export interface BidirIndexOpts<T> {
	/**
	 * Custom `key -> id` map implementation (e.g. {@link EquivMap} or
	 * {@link HashMap}). If omitted, a native JS `Map` will be used.
	 */
	map: Map<T, number>;
	/**
	 * Start ID for indexing new keys.
	 *
	 * @defaultValue 0
	 */
	start: number;
}
