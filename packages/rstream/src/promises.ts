import { mapcat } from "@thi.ng/transducers/mapcat";
import type { ISubscription, WithErrorHandlerOpts } from "./api.js";
import { __optsWithID } from "./idgen.js";
import { fromPromise } from "./promise.js";

/**
 * Wraps given iterable in `Promise.all()` to yield {@link Stream} of results in
 * same order as arguments, then closes.
 *
 * @remarks
 * If any of the promises rejects, all others will do so too. In this case the
 * stream calls {@link ISubscriber.error} in all of its subscribers.
 *
 * @remarks
 * Type signature updated to use `Awaited<T>`, a new core type introduced in
 * TypeScript 4.5.
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
 * @param opts -
 */
export const fromPromises = <T>(
	promises: Iterable<T | PromiseLike<T>>,
	opts?: Partial<WithErrorHandlerOpts>
): ISubscription<Awaited<T>[], Awaited<T>> =>
	fromPromise(
		Promise.all(promises),
		__optsWithID("promises", opts)
	).transform(mapcat((x: Awaited<T>[]) => x));
