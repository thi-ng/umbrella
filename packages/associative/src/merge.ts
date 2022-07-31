import type { IObjectOf, Nullable } from "@thi.ng/api";

/**
 * Merges all given maps in left-to-right order into `dest`.
 * Returns `dest`.
 *
 * @param dest - target map
 * @param xs - input maps
 */
export const mergeMap = <K, V>(
	dest: Map<K, V>,
	...xs: Nullable<Map<K, V>>[]
) => {
	for (let x of xs) {
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
 * @param xs - input objects
 */
export const mergeObj = <T>(
	dest: IObjectOf<T>,
	...xs: Nullable<IObjectOf<T>>[]
): IObjectOf<T> => Object.assign(dest, ...xs);
