import type { IObjectOf } from "@thi.ng/api";

export function dissoc<K, V>(map: Map<K, V>, keys: Iterable<K>): Map<K, V>;
export function dissoc<T>(set: Set<T>, keys: Iterable<T>): Set<T>;
export function dissoc(coll: Map<any, any> | Set<any>, keys: Iterable<any>) {
	for (let k of keys) {
		coll.delete(k);
	}
	return coll;
}

export const dissocObj = <T>(
	obj: IObjectOf<T>,
	keys: Iterable<string | number>
) => {
	for (let k of keys) {
		delete obj[k];
	}
	return obj;
};
