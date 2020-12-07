import { mapcat } from "@thi.ng/transducers";
import type { CommonOpts } from "../api";
import type { Subscription } from "../subscription";
import { optsWithID } from "../utils/idgen";
import { fromPromise } from "./promise";

/**
 * Wraps given iterable in `Promise.all()` to yield {@link Stream} of
 * results in same order as arguments, then closes.
 *
 * @remarks
 * If any of the promises rejects, all others will do so too. In this
 * case the stream calls {@link ISubscriber.error} in all of its
 * subscribers.
 *
 * @example
 * ```ts
 * fromPromises([
 *     Promise.resolve(1),
 *     Promise.resolve(2),
 *     Promise.resolve(3)
 * ]).subscribe(trace())
 * // 1
 * // 2
 * // 3
 * // done
 * ```
 *
 * @example
 * If individual error handling is required, an alternative is below
 * (however this approach provides no ordering guarantees):
 *
 * ```ts
 * fromIterable([
 *     Promise.resolve(1),
 *     new Promise(() => setTimeout(() => { throw new Error("eeek"); }, 10)),
 *     Promise.resolve(3)
 * ]).subscribe(resolve()).subscribe(trace())
 * ```
 *
 * @param promises -
 */
export const fromPromises = <T>(
    promises: Iterable<T | PromiseLike<T>>,
    opts?: Partial<CommonOpts>
): Subscription<T[], T> =>
    fromPromise(Promise.all(promises), optsWithID("promises", opts)).transform(
        mapcat((x: T[]) => x)
    );
