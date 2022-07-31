/**
 * Iterator which yields all names of given object's own properties
 * (Similar to `Object.keys()`).
 *
 * @remarks
 * See also:
 * - {@link pairs}
 * - {@link vals}
 *
 * @param x -
 */
export function* keys(x: any): IterableIterator<string> {
	for (let k in x) {
		if (x.hasOwnProperty(k)) {
			yield k;
		}
	}
}
