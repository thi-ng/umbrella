import { mapcat } from "@thi.ng/transducers";
import { CommonOpts } from "../api";
import { Subscription } from "../subscription";
import { optsWithID } from "../utils/idgen";
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
export const fromPromises = <T>(
    promises: Iterable<Promise<T>>,
    opts?: Partial<CommonOpts>
): Subscription<T[], T> =>
    fromPromise(Promise.all(promises), optsWithID("promises-", opts)).transform(
        mapcat((x: T[]) => x)
    );
