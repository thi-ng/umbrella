import { IObjectOf } from "@thi.ng/api/api";

/**
 * Merges all given maps in left-to-right order into `dest`.
 * Returns `dest`.
 *
 * @param dest
 * @param xs
 */
export function mergeMap<K, V>(dest: Map<K, V>, ...xs: Map<K, V>[]) {
    for (let x of xs) {
        for (let pair of x) {
            dest.set(pair[0], pair[1]);
        }
    }
    return dest;
}

/**
 * Merges all given objects in left-to-right order into `dest`.
 * Returns `dest`.
 *
 * @param dest
 * @param xs
 */
export function mergeObj<T>(dest: IObjectOf<T>, ...xs: IObjectOf<T>[]): IObjectOf<T> {
    return Object.assign(dest, ...xs);
}
