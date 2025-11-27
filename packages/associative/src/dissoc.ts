// SPDX-License-Identifier: Apache-2.0
/**
 * Removes given `keys` from `coll` (a Map or Set), then returns `coll`.
 *
 * @param keys
 */
export function dissoc<K, V>(coll: Map<K, V>, keys: Iterable<K>): Map<K, V>;
export function dissoc<T>(coll: Set<T>, keys: Iterable<T>): Set<T>;
export function dissoc(coll: Map<any, any> | Set<any>, keys: Iterable<any>) {
	for (const k of keys) {
		coll.delete(k);
	}
	return coll;
}
