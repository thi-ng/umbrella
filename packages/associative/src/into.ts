import type { Pair } from "@thi.ng/api";
import { isMap } from "@thi.ng/checks";

/**
 * Adds elements from `src` iterable to `dest` Map or Set.
 *
 * @param dest - target collection
 * @param src - source collection
 */
// prettier-ignore
export function into<K, V>(dest: Map<K, V>, src: Iterable<Pair<K, V>>): Map<K, V>;
export function into<T>(dest: Set<T>, src: Iterable<T>): Set<T>;
export function into(dest: Map<any, any> | Set<any>, src: Iterable<any>) {
    if (isMap(dest)) {
        for (let x of src) {
            dest.set(x[0], x[1]);
        }
    } else {
        for (let x of src) {
            dest.add(x);
        }
    }
    return dest;
}
