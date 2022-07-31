import { isNode } from "@thi.ng/checks/is-node";
import type { CommonOpts } from "./api.js";
import { __optsWithID } from "./idgen.js";
import { fromInterval } from "./interval.js";
import { stream } from "./stream.js";

/**
 * Yields {@link Stream} of a monotonically increasing counter,
 * triggered by a `requestAnimationFrame()` loop (only available in
 * browser environments).
 *
 * @remarks
 * In NodeJS, this function falls back to {@link fromInterval}, yielding
 * a similar (approx. 60Hz) stream.
 *
 * All subscribers to this stream will be processed during that same
 * loop iteration.
 */
export const fromRAF = (opts?: Partial<CommonOpts>) =>
	isNode()
		? fromInterval(16, opts)
		: stream<number>((stream) => {
				let i = 0;
				let isActive = true;
				const loop = () => {
					isActive && stream.next(i++);
					isActive && (id = requestAnimationFrame(loop));
				};
				let id = requestAnimationFrame(loop);
				return () => {
					isActive = false;
					cancelAnimationFrame(id);
				};
		  }, __optsWithID("raf", opts));
