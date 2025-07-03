// SPDX-License-Identifier: Apache-2.0
/**
 * Returns first key of `obj` with non-nullish value. The key selection can be
 * constrained via given `keys` (default: `Object.keys()`) and keys will be
 * checked in given order.
 *
 * @param obj
 * @param keys
 */
export const firstNonNullKey = <T extends object>(
	obj: T,
	keys?: (keyof T)[]
) => {
	for (const key of keys ?? <(keyof T)[]>Object.keys(obj)) {
		if (obj.hasOwnProperty(key) && obj[key] != null) return key;
	}
};
