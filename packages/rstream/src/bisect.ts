import type { Predicate } from "@thi.ng/api";
import type { ISubscriber } from "./api.js";
import { __nextID } from "./idgen.js";
import { PubSub } from "./pubsub.js";

/**
 * Returns a {@link PubSub} using given predicate `pred` as boolean
 * {@link PubSubOpts.topic | topic function} and `truthy` & `falsey` as
 * subscribers for their respective values.
 *
 * @remarks
 * If `a` or `b` need to be subscribed to directly, then `a` / `b` MUST
 * be first created as `Subscription` (if not already) and a reference
 * kept prior to calling `bisect()`.
 *
 * @example
 * ```ts
 * fromIterable([1, 2, 3, 4]).subscribe(
 *   bisect(
 *     (x) => !!(x & 1),
 *     trace("odd"),
 *     trace("even")
 *   )
 * );
 * // odd 1
 * // even 2
 * // odd 3
 * // even 4
 * // odd done
 * // even done
 * ```
 *
 * @example
 * ```ts
 * const odd = subscription();
 * const even = subscription();
 * odd.subscribe(trace("odd"));
 * odd.subscribe(trace("odd x10"), map((x) => x * 10));
 * even.subscribe(trace("even"));
 *
 * fromIterable([1, 2, 3, 4]).subscribe(
 *     bisect((x) => !!(x & 1), odd, even)
 * );
 * ```
 *
 * @param pred - predicate function
 * @param truthy - subscription for truthy branch
 * @param falsy - subscription for falsy branch
 */
export const bisect = <T>(
	pred: Predicate<T>,
	truthy?: ISubscriber<T>,
	falsy?: ISubscriber<T>
): PubSub<T, T> => {
	const sub = new PubSub<T, T>({ topic: pred, id: `bisect-${__nextID()}` });
	truthy && sub.subscribeTopic(true, truthy);
	falsy && sub.subscribeTopic(false, falsy);
	return sub;
};
