// SPDX-License-Identifier: Apache-2.0
import type { IDeref, Maybe } from "@thi.ng/api";
import type { ClosableAsyncGenerator } from "./api.js";
import { source } from "./source.js";

export interface RAFOpts {
	/**
	 * If true (default: false), passes the timestamps received
	 * via `requestAnimationFrame()` as iterator values. If false, a simple
	 * counter [0..∞) will be emitted.
	 *
	 * @defaultValue false
	 */
	timestamp: boolean;
	/**
	 * Only used if {@link RAFOpts.timestamp} is enabled. If given as
	 * number, the value will be subtracted from all emitted timestamps. If this
	 * option is set to true, the timestamps will be automatically zero-adjusted
	 * such that the first emitted value will be zero. If undefined (default),
	 * the browser supplied timestamps will be used as is.
	 */
	t0: number | boolean;
}

export const raf = (
	opts?: Partial<RAFOpts>
): ClosableAsyncGenerator<number> & IDeref<Maybe<number>> => {
	let frame = 0;
	let t0 = opts?.t0 || 0;
	let isClosed = false;
	const gen = source<number>();
	gen.close = () => {
		isClosed = true;
		gen.write(undefined);
	};
	const update = (t: number) => {
		if (isClosed) return;
		if (opts?.timestamp) {
			if (t0 === true) t0 = t;
			if (t0) t -= t0;
		} else {
			t = frame++;
		}
		gen.write(t);
		requestAnimationFrame(update);
	};
	requestAnimationFrame(update);
	return gen;
};
