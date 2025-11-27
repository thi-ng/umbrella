// SPDX-License-Identifier: Apache-2.0
import type { Fn, IRelease, Maybe } from "@thi.ng/api";

/**
 * Behavior options for a {@link LeakyBucket}. The default config provides an
 * average rate of 1 Hz, burstable to 60Hz.
 */
export interface LeakyBucketOpts {
	/**
	 * Counter value per bucket at which overflow occurs. The counter is
	 * increased each time {@link LeakyBucket.update} or
	 * {@link LeakyBucketMap.update} is called.
	 *
	 * @defaultValue 60
	 */
	capacity: number;
	/**
	 * If true (default), the buckets will be automatically updated every
	 * {@link LeakyBucketOpts.leakInterval} milliseconds. If false, the user
	 * must regularly call {@link LeakyBucket.leak} or
	 * {@link LeakyBucketMap.leak}.
	 *
	 * @defaultValue true
	 */
	autoLeak: boolean;
	/**
	 * Time (in milliseconds) at which all active buckets are leaking (i.e.
	 * decrementing their counter).
	 *
	 * @remarks
	 * Even if {@link LeakyBucket.leak} {@link LeakyBucketMap.leak} is called
	 * directly (e.g. if {@link LeakyBucketOpts.autoLeak} is disabled), a bucket
	 * is only leaking after the given time has passed since its last update
	 * (via {@link LeakyBucketMap.update}) and since {@link LeakyBucketMap.leak}
	 * was called last.
	 *
	 * @defaultValue 1000
	 */
	leakInterval: number;
}

export interface LeakyBucketMapOpts<T> extends LeakyBucketOpts {
	/**
	 * Max number of active buckets. Empty buckets are automatically removed
	 * (via {@link LeakyBucketMap.leak}).
	 *
	 * @defaultValue 1000
	 */
	maxBuckets: number;
	/**
	 * Callback when a bucket leaked and becomes empty. The function receives
	 * the bucket's key as argument.
	 */
	onEmpty: Fn<T, void>;
}

/**
 * Groups multiple {@link LeakyBucket}s in an ES6-Map and centrally manages
 * them. All buckets share the same config options given to the ctor of this
 * class.
 *
 * @remarks
 * Reference:
 * https://en.wikipedia.org/wiki/Leaky_bucket
 */
export class LeakyBucketMap<K> implements IRelease {
	buckets: Map<K, LeakyBucket>;
	maxBuckets: number;
	leakInterval: number;
	lastLeak = -1;
	timer: any;

	constructor(public opts: Partial<LeakyBucketMapOpts<K>> = {}) {
		this.buckets = new Map();
		this.maxBuckets = opts.maxBuckets ?? 1000;
		this.leakInterval = opts.leakInterval ?? 1000;
		if (opts.autoLeak !== false) {
			this.timer = setInterval(this.leak.bind(this), this.leakInterval);
		}
	}

	/**
	 * Returns true, if there's an active bucket for given `key`.
	 *
	 * @param key
	 */
	has(key: K) {
		return this.buckets.has(key);
	}

	/**
	 * Attempts to look up bucket for given `key` and returns it (or `undefined`
	 * if there's no active bucket for that key).
	 *
	 * @param key
	 */
	get(key: K) {
		return this.buckets.get(key);
	}

	/**
	 * Calls {@link LeakyBucket.update} for given bucket ID and returns its
	 * result. Creates a new bucket if no bucket yet exist. Returns true if the
	 * bucket still had capacity or false if capacity had already been reached.
	 *
	 * @remarks
	 * If `capacity` is given, it's used to define a custom per-bucket capacity,
	 * but will only be used for bucket creation, i.e. if no active bucket for
	 * the given `key` already exists. If no `capacity` is given, the bucket
	 * will use the capacity configured for this {@link LeakyBucketMap}.
	 *
	 * @param key
	 * @param capacity
	 */
	update(key: K, capacity = this.opts.capacity) {
		const bucket = this.buckets.get(key);
		if (bucket) {
			return bucket.update();
		} else {
			if (this.buckets.size >= this.maxBuckets) return false;
			this.buckets.set(
				key,
				new LeakyBucket({ ...this.opts, capacity, autoLeak: false }, 1)
			);
		}
		return true;
	}

	/**
	 * Returns true if bucket for given `key` has free capacity, or if no such
	 * bucket yet exists, if the map itself has capacity for creating a new
	 * bucket.
	 *
	 * @param key
	 */
	hasCapacity(key: K) {
		const bucket = this.buckets.get(key);
		return bucket
			? bucket.level < bucket.capacity
			: this.buckets.size < this.maxBuckets;
	}

	/**
	 * Leaks all bucket counters (taking into account current/given timestamp)
	 * and removes those which emptied. If {@link LeakyBucketMapOpts.onEmpty} is
	 * defined, also calls that function before removing the bucket.
	 *
	 * @remarks
	 * The function is a no-op if called within fewer than
	 * {@link LeakyBucketOpts.leakInterval} milliseconds since the last leak.
	 */
	leak(now = Date.now()) {
		if (now - this.lastLeak < this.leakInterval) return;
		for (const [key, bucket] of this.buckets) {
			if (bucket.leak(now) === false) {
				this.opts.onEmpty?.(key);
				this.buckets.delete(key);
			}
		}
		this.lastLeak = now;
	}

	/**
	 * Cancels/removes leak interval timer (if any) and removes all buckets.
	 */
	release() {
		if (this.timer != null) {
			clearInterval(this.timer);
			this.timer = null;
		}
		this.buckets.clear();
		return true;
	}
}

/**
 * A single counter-based leaky bucket with configurable capacity & leak
 * interval/behavior. See {@link LeakyBucketOpts} for details.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Leaky_bucket
 */
export class LeakyBucket implements IRelease {
	level: number;
	capacity: number;
	lastLeak: number;
	leakInterval: number;
	timer: any;

	constructor(opts?: Partial<LeakyBucketOpts>, initialLevel = 0) {
		this.capacity = opts?.capacity ?? 60;
		this.level = Math.min(initialLevel, this.capacity);
		this.leakInterval = opts?.leakInterval ?? 1000;
		this.lastLeak = Date.now();
		if (opts?.autoLeak !== false) {
			this.timer = setInterval(this.leak.bind(this), this.leakInterval);
		}
	}

	/**
	 * Updates bucket's counter/level and returns true if successful or false if
	 * capacity had already been reached.
	 */
	update() {
		if (this.level >= this.capacity) return false;
		this.level++;
		return true;
	}

	/**
	 * Returns true if the bucket has free capacity.
	 */
	hasCapacity() {
		return this.level < this.capacity;
	}

	/**
	 * Leaks bucket's counter (taking into account current/given timestamp) and
	 * then returns one of the following values:
	 *
	 * - `undefined` if bucket is already empty or if this function was called
	 *   within fewer than {@link LeakyBucketOpts.leakInterval} milliseconds
	 *   since the last leak
	 * - `false` if bucket leaked and is now empty
	 * - `true` if bucket leaked and still non-empty
	 *
	 * @param now
	 */
	leak(now = Date.now()): Maybe<boolean> {
		const delta = now - this.lastLeak;
		if (delta < this.leakInterval || !this.level) return;
		this.lastLeak = now;
		const loss = Math.floor(delta / this.leakInterval);
		if (this.level <= loss) {
			this.level = 0;
			return false;
		}
		this.level -= loss;
		return true;
	}

	/**
	 * Cancels/removes leak interval timer (if any).
	 */
	release() {
		if (this.timer != null) {
			clearInterval(this.timer);
			this.timer = null;
		}
		return true;
	}
}
