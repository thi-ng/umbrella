import type { Fn } from "@thi.ng/api";

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

export async function* raf(opts?: Partial<RAFOpts>): AsyncGenerator<number> {
	let frame = 0;
	let t0 = opts?.t0 || 0;
	while (true) {
		let resolve: Fn<number, void>;
		const promise = new Promise<number>(($resolve) => (resolve = $resolve));
		requestAnimationFrame(resolve!);
		let t = await promise;
		if (opts?.timestamp) {
			if (t0 === true) t0 = t;
			if (t0) t -= t0;
		} else {
			t = frame++;
		}
		const cancel = yield t;
		if (cancel === true) break;
	}
}
