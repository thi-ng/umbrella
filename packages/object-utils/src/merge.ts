// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf, Nullable } from "@thi.ng/api";

/**
 * Merges all given maps in left-to-right order into `dest`.
 * Returns `dest`.
 *
 * @param dest - target map
 * @param maps - input maps
 */
export const mergeMap = <K, V>(
	dest: Map<K, V>,
	...maps: Nullable<Map<K, V>>[]
) => {
	for (let x of maps) {
		if (x != null) {
			for (let pair of x) {
				dest.set(pair[0], pair[1]);
			}
		}
	}
	return dest;
};

/**
 * Merges all given objects in left-to-right order into `dest`.
 * Returns `dest`.
 *
 * @param dest - target object
 * @param objects - input objects
 */
export const mergeObj = <T>(
	dest: IObjectOf<T>,
	...objects: Nullable<IObjectOf<T>>[]
): IObjectOf<T> => Object.assign(dest, ...objects);
