// SPDX-License-Identifier: Apache-2.0
import type { Pair } from "@thi.ng/api";
import { isMap } from "@thi.ng/checks/is-map";

/**
 * Adds elements from `src` iterable to `coll` (Map or Set) and then returns it.
 *
 * @param coll - target collection
 * @param src - source collection
 */
export function into<K, V>(
	coll: Map<K, V>,
	src: Iterable<Pair<K, V>>
): Map<K, V>;
export function into<T>(coll: Set<T>, src: Iterable<T>): Set<T>;
export function into(coll: Map<any, any> | Set<any>, src: Iterable<any>) {
	if (isMap(coll)) {
		for (let x of src) {
			coll.set(x[0], x[1]);
		}
	} else {
		for (let x of src) {
			coll.add(x);
		}
	}
	return coll;
}
