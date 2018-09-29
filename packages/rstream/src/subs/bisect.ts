import { Predicate } from "@thi.ng/api/api";

import { ISubscriber } from "../api";
import { PubSub } from "../pubsub";

/**
 * Returns a new `PubSub` instance using given predicate `pred` as
 * boolean topic function and `a` & `b` as subscribers for truthy (`a`)
 * and falsy `b` values.
 *
 * ```
 * rs.fromIterable([1, 2, 3, 4]).subscribe(
 *   rs.bisect(
 *     (x) => !!(x & 1),
 *     rs.trace("odd"),
 *     rs.trace("even")
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
 * If `a` or `b` need to be subscribed to directly, then `a` / `b` MUST
 * be first created as `Subscription` (if not already) and a reference
 * kept prior to calling `bisect()`.
 *
 * ```
 * const odd = rs.subscription();
 * const even = rs.subscription();
 * odd.subscribe(rs.trace("odd"));
 * odd.subscribe(rs.trace("odd x10"), tx.map((x)=> x * 10));
 * even.subscribe(rs.trace("even"));
 *
 * rs.fromIterable([1, 2, 3, 4]).subscribe(
 *     rs.bisect((x) => !!(x & 1), odd, even)
 * );
 * ```
 *
 * @param pred predicate function
 * @param a subscription for truthy branch
 * @param b subscription for falsy branch
 */
export function bisect<T>(pred: Predicate<T>, a?: ISubscriber<T>, b?: ISubscriber<T>): PubSub<T, T> {
    const sub = new PubSub<T, T>({ topic: pred });
    sub.subscribeTopic(true, a);
    sub.subscribeTopic(false, b);
    return sub;
}
