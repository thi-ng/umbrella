import { Predicate } from "@thi.ng/api/api";

import { ISubscriber } from "../api";
import { PubSub } from "../pubsub";

/**
 * Returns a new `PubSub` instance using given predicate `pred` as
 * boolean topic function and `a` & `b` as subscribers for truthy (`a`)
 * and falsy `b` values.
 *
 * ```
 * rs.fromIterable([1,2,3,4]).subscribe(
 *   rs.bisect(
 *     (x) => x & 1,
 *     { next: (x) => console.log("odd", x) }
 *     { next: (x) => console.log("even", x) },
 *   )
 * );
 * ```
 *
 * If `a` or `b` need to be subscribed to directly, then `a` / `b` MUST
 * be converted into a `Subscription` instance (if not already) and a
 * reference kept prior to calling `bisect()`.
 *
 * ```
 * const odd = rs.subscription({ next: (x) => console.log("odd", x) });
 * const even = rs.subscription({ next: (x) => console.log("even", x) });
 *
 * rs.fromIterable([1,2,3,4]).subscribe(rs.bisect((x) => x & 1, odd, even));
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
