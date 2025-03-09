// SPDX-License-Identifier: Apache-2.0
import type { Fn, Fn2, Maybe } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import { LeakyBucketMap } from "@thi.ng/leaky-bucket";
import type { Interceptor, RequestCtx } from "../api.js";

/**
 * Configuration options for {@link RateLimiter}.
 *
 * References:
 * - https://thi.ng/leaky-bucket
 * - https://en.wikipedia.org/wiki/Leaky_bucket
 */
export interface RateLimitOpts<T extends RequestCtx = RequestCtx> {
	/**
	 * Function to produce a unique ID for rate limiting a client. By default
	 * uses client's remote IP address. If this function returns undefined, the
	 * client will NOT be rate limited.
	 */
	id?: Fn<T, Maybe<string>>;
	/**
	 * Max. number of concurrently active client IDs/buckets. A bucket is
	 * created for each unique ID produced via {@link RateLimitOpts.id}.
	 *
	 * @remarks
	 * A bucket's counter is incremented for each related request, up to the
	 * configured {@link RateLimitOpts.bucketCapacity}. Once a bucket's capacity
	 * has been reached, any new requests are dropped by the interceptor. Bucket
	 * counters are slowly decremented every
	 * {@link RateLimiterOpts.leakInterval} milliseconds, thus slowly allowing
	 * again new requests. Once a bucket's counter goes back to zero, the bucket
	 * will be removed.
	 *
	 * @defaultValue 1000
	 */
	maxBuckets: number;
	/**
	 * Function to compute the max number of allowed requests for given client
	 * ID bucket. If given as number, that limit will be uniformly enforced for
	 * all clients. If given as function, per-client quotas can be defined.
	 *
	 * @remarks
	 * Capacities are only computed whenever a new client ID is first
	 * encountered or when its existing bucket is empty again (also see
	 * {@link RateLimitOpts.leakInterval}).
	 *
	 * @defaultValue 60
	 */
	bucketCapacity: number | Fn2<T, string, number>;
	/**
	 * Time interval (in milliseconds) at which all active client ID buckets are
	 * decreasing their counters, slowly freeing again their capacities. Once a
	 * bucket is empty again (i.e. its counter is back at zero), the bucket will
	 * be automatically removed.
	 *
	 * @defaultValue 1000
	 */
	leakInterval: number;
}

/**
 * Creates a new {@link RateLimiter} interceptor.
 *
 * @param opts
 */
export const rateLimiter = <T extends RequestCtx = RequestCtx>(
	opts: RateLimitOpts<T>
) => new RateLimiter<T>(opts);

/**
 * Configurable rate limiter interceptor using a counter-based leaky bucket
 * algorithm to ensure both an average rate and allow temporary bursting (up to
 * an implicitly defined limit).
 *
 *
 */
export class RateLimiter<T extends RequestCtx = RequestCtx>
	implements Interceptor<T>
{
	buckets: LeakyBucketMap<string>;
	capacity: Fn2<T, string, number>;
	clientID: Fn<T, Maybe<string>>;

	constructor({
		id,
		maxBuckets,
		bucketCapacity,
		leakInterval,
	}: RateLimitOpts<T>) {
		this.clientID = id ?? ((ctx) => ctx.req.socket.remoteAddress);
		this.capacity = isNumber(bucketCapacity)
			? () => bucketCapacity
			: bucketCapacity;
		this.buckets = new LeakyBucketMap({ leakInterval, maxBuckets });
	}

	pre(ctx: T) {
		const id = this.clientID(ctx);
		if (!id) return true;
		const cap = !this.buckets.has(id) ? this.capacity(ctx, id) : undefined;
		if (!this.buckets.update(id, cap)) {
			ctx.res.rateLimit({}, `Try again later.`);
			return false;
		}
		return true;
	}
}
