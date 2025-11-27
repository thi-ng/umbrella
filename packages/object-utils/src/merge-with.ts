// SPDX-License-Identifier: Apache-2.0
import type { Fn2, IObjectOf, Nullable } from "@thi.ng/api";
import { isIllegalKey } from "@thi.ng/checks/is-proto-path";
import { copy, copyObj } from "./copy.js";

export const mergeMapWith = <K, V>(
	f: Fn2<V, V, V>,
	dest: Map<K, V>,
	...maps: Nullable<Map<K, V>>[]
) => {
	const res: Map<K, V> = copy(dest, Map);
	for (const x of maps) {
		if (x != null) {
			for (const [k, v] of x) {
				res.set(k, res.has(k) ? f(res.get(k)!, v) : v);
			}
		}
	}
	return res;
};

/**
 * Immutably merges given objects in a pairwise manner. Applies function
 * `f` if the same key exists in both objects and uses that function's
 * return value as new value for that key.
 *
 * @remarks
 * Since v4.4.0, the `__proto__` property will be ignored to avoid
 * prototype pollution.
 *
 * @param f -
 * @param dest -
 * @param objects -
 */
export const mergeObjWith = <T>(
	f: Fn2<T, T, T>,
	dest: IObjectOf<T>,
	...objects: Nullable<IObjectOf<T>>[]
) => meldObjWith(f, copyObj(dest), ...objects);

/**
 * Mutable version of {@link mergeObjWith}. Returns modified `dest`
 * object.
 *
 * @remarks
 * Since v4.4.0, the `__proto__` property will be ignored to avoid
 * prototype pollution.
 *
 * @param f -
 * @param dest -
 * @param objects -
 */
export const meldObjWith = <T>(
	f: Fn2<T, T, T>,
	dest: IObjectOf<T>,
	...objects: Nullable<IObjectOf<T>>[]
) => {
	for (const x of objects) {
		if (x != null) {
			for (const k in x) {
				if (isIllegalKey(k)) continue;
				const v = x[k];
				dest[k] = dest.hasOwnProperty(k) ? f(dest[k], v) : v;
			}
		}
	}
	return dest;
};
