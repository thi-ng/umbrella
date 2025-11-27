// SPDX-License-Identifier: Apache-2.0
import type { Keys } from "@thi.ng/api";
import { isSet } from "@thi.ng/checks/is-set";
import { empty } from "./empty.js";

const __ensureSet = <T>(x: Iterable<T>) =>
	isSet(x) ? <Set<T>>x : new Set<T>(x);

export const withoutKeysMap = <K, V>(src: Map<K, V>, keys: Iterable<K>) => {
	const ks = __ensureSet(keys);
	const dest = empty(src, Map);
	for (const p of src.entries()) {
		const k = p[0];
		!ks.has(k) && dest.set(k, p[1]);
	}
	return dest;
};

export const withoutKeysObj = <T extends object>(
	src: T,
	keys: Iterable<Keys<T>>
) => {
	const ks = __ensureSet(keys);
	const dest: Partial<T> = {};
	for (const k in src) {
		src.hasOwnProperty(k) &&
			!ks.has(<Keys<T>>k) &&
			(dest[<Keys<T>>k] = src[<Keys<T>>k]);
	}
	return dest;
};
