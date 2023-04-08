import { isNode } from "@thi.ng/checks/is-node";
import type { CommonOpts } from "./api.js";
import { __optsWithID } from "./idgen.js";
import { fromInterval } from "./interval.js";
import { stream } from "./stream.js";

export interface FromRAFOpts extends CommonOpts {
	/**
	 * Browser only. If true (default: false), passes the timestamps received
	 * via `requestAnimationFrame()` as stream values. If false, a simple
	 * counter [0..∞) will be emitted.
	 *
	 * @defaultValue false
	 */
	timestamp: boolean;
}

/**
 * Yields {@link Stream} of a monotonically increasing counter (or timestamps),
 * triggered by a `requestAnimationFrame()` loop (only available in browser
 * environments).
 *
 * @remarks
 * In NodeJS, this function falls back to {@link fromInterval}, yielding a
 * similar (approx. 60Hz) stream (the {@link FromRAFOpts.timestamp} option will
 * be ignored).
 *
 * All subscribers to this stream will be processed during that same RAF loop
 * iteration.
 */
export const fromRAF = (opts: Partial<FromRAFOpts> = {}) =>
	isNode()
		? fromInterval(16, opts)
		: stream<number>((stream) => {
				let i = 0;
				let isActive = true;
				const loop: FrameRequestCallback = (time) => {
					isActive && stream.next(opts.timestamp ? time : i++);
					isActive && (id = requestAnimationFrame(loop));
				};
				let id = requestAnimationFrame(loop);
				return () => {
					isActive = false;
					cancelAnimationFrame(id);
				};
		  }, __optsWithID("raf", opts));
