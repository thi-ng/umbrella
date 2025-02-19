// SPDX-License-Identifier: Apache-2.0
import type { Fn, Fn2, Maybe } from "@thi.ng/api";
import { TLRUCache } from "@thi.ng/cache";
import { isNumber } from "@thi.ng/checks";
import type { Interceptor, RequestCtx } from "../api.js";

export interface RateLimitOpts<T extends RequestCtx = RequestCtx> {
	/**
	 * Function to produce a unique ID for rate limiting a client. By default
	 * uses client's remote IP address. If this function returns undefined, the
	 * client will NOT be rate limited.
	 */
	id?: Fn<T, Maybe<string>>;
	/**
	 * Function to compute the max number of allowed requests for given client
	 * ID and configured {@link RateLimitOpts.period}. If given as number, that
	 * limit will be enforced for all identified clients.
	 *
	 * @remarks
	 * Quotas are only computed whenever a new client ID is first encountered or
	 * when its previous request records have expired from the cache (after
	 * {@link RateLimitOpts.period} seconds).
	 */
	quota: number | Fn2<T, string, number>;
	/**
	 * Size of the time window (in secords) to which this rate limiter applies.
	 *
	 * @defaultValue 900
	 */
	period?: number;
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
 * Configurable, sliding time window-based rate limiter interceptor.
 */
export class RateLimiter<T extends RequestCtx = RequestCtx>
	implements Interceptor<T>
{
	cache: TLRUCache<string, Timestamps>;
	clientQuota: Fn2<T, string, number>;
	clientID: Fn<T, Maybe<string>>;
	period: number;

	constructor({ id, quota, period = 15 * 60 }: RateLimitOpts<T>) {
		this.clientID = id ?? ((ctx) => ctx.req.socket.remoteAddress);
		this.clientQuota = isNumber(quota) ? () => quota : quota;
		this.period = (period ?? 15 * 60) * 1000;
		this.cache = new TLRUCache(null, {
			ttl: this.period,
			autoExtend: true,
		});
	}

	pre(ctx: T) {
		const now = Date.now();
		const id = this.clientID(ctx);
		if (!id) return true;
		let timestamps = this.cache.get(id);
		if (timestamps) {
			if (timestamps.expire(now - this.period) >= timestamps.quota) {
				ctx.res.rateLimit(
					{},
					`Try again @ ${new Date(
						timestamps.peek() + this.period
					).toISOString()}`
				);
				return false;
			}
		} else {
			timestamps = new Timestamps(this.clientQuota(ctx, id));
			this.cache.set(id, timestamps);
		}
		timestamps.write(now);
		return true;
	}
}

/**
 * Ring-buffer based history of request timestamps (per client).
 *
 * @remarks
 * Based on thi.ng/buffers `FIFOBuffer` implementation.
 *
 * @internal
 */
class Timestamps {
	buf: number[] = [];
	rpos = 0;
	wpos = 0;
	num = 0;

	constructor(public quota: number) {}

	/**
	 * Removes any timestamps older than `threshold` from the buffer and returns
	 * remaining number of timestamps.
	 *
	 * @param threshold
	 */
	expire(threshold: number) {
		let { buf, rpos, num } = this;
		const max = buf.length;
		while (num && buf[rpos] < threshold) {
			rpos = (rpos + 1) % max;
			num--;
		}
		this.rpos = rpos;
		return (this.num = num);
	}

	peek() {
		return this.buf[this.rpos];
	}

	writable() {
		return this.num < this.quota;
	}

	write(x: number) {
		const { buf, wpos } = this;
		buf[wpos] = x;
		this.wpos = (wpos + 1) % this.quota;
		this.num++;
		return true;
	}
}
