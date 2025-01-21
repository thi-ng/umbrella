// SPDX-License-Identifier: Apache-2.0
import { __optsWithID } from "./idgen.js";
import { fromIterable } from "./iterable.js";
import { metaStream, type MetaStreamOpts } from "./metastream.js";

/**
 * Returns a subscription which buffers any intermediate inputs arriving faster
 * than given `delay` time period, then emits last received value after `delay`
 * milliseconds.
 *
 * @example
 * ```ts tangle:../export/debounce.ts
 * import { debounce, fromIterable, trace } from "@thi.ng/rstream";
 *
 * const src = fromIterable([1, 2, 3], { delay: 10 })
 * src.subscribe(debounce(20)).subscribe(trace());
 * // 3
 * // done
 * ```
 *
 * @param delay -
 */
export const debounce = <T>(delay: number, opts?: Partial<MetaStreamOpts>) =>
	metaStream(
		(x: T) => fromIterable([x], { delay }),
		__optsWithID("debounce", {
			emitLast: true,
			...opts,
		})
	);
