import { mapcat } from "@thi.ng/transducers/xform/mapcat";

import { Subscription } from "../subscription";
import { fromPromise } from "./promise";

/**
 * Wraps given promises in `Promise.all()` to yield stream of results in
 * same order as arguments, then closes. If any of the promises rejects,
 * all others do too and calls `error()` in subscribers.
 *
 * ```
 * rs.fromPromises([
 *     Promise.resolve(1),
 *     Promise.resolve(2),
 *     Promise.resolve(3)
 * ]).subscribe(rs.trace())
 * // 1
 * // 2
 * // 3
 * // done
 * ```
 *
 * If individual error handling is required, an alternative is below
 * (however this approach provides no ordering guarantees):
 *
 * ```
 * rs.fromIterable([
 *     Promise.resolve(1),
 *     new Promise(()=> { setTimeout(()=> { throw new Error("eeek"); }, 10); }),
 *     Promise.resolve(3)
 * ]).subscribe(rs.resolve()).subscribe(rs.trace())
 * ```
 *
 * @param promises
 */
export function fromPromises<T>(promises: Iterable<Promise<T>>): Subscription<T[], T> {
    return fromPromise(Promise.all(promises)).transform(mapcat((x: T[]) => x));
}
