import type { Predicate } from "@thi.ng/api";
import { SEMAPHORE } from "@thi.ng/api/api";
import {
	State,
	type CommonOpts,
	type ISubscribable,
	type ISubscription,
} from "./api.js";
import { ASidechain } from "./asidechain.js";
import { __optsWithID } from "./idgen.js";

export interface SidechainTriggerOpts<T> extends CommonOpts {
	pred: Predicate<T>;
}

/**
 * Returns a subscription which buffers the most recent value received from
 * `src` and only forwards it downstream whenever a new control value is
 * received from the `side` chain.
 *
 * @remarks
 * By default, the values read from the side chain are ignored (i.e. only their
 * timing is used), however the `pred`icate option can be used to only trigger
 * for specific values/conditions. Every time the predicate fn returns true AND
 * if `src` already has delivered at least one value, it will be forwarded
 * downstream.
 *
 * @example
 * ```ts
 * import { reactive, stream, sidechainTrigger, trace } from "@thi.ng/rstream";
 *
 * const src = reactive("payload");
 *
 * const side = stream();
 *
 * sidechainTrigger(src, side).subscribe(trace("data:"));
 *
 * side.next(1);
 * // data: payload
 *
 * side.next(1);
 * // data: payload
 *
 * // only newest value will be buffered
 * src.next("update #1");
 * src.next("update #2");
 *
 * // ...until side chain triggers again
 * side.next(1);
 * // data: update #2
 * ...
 * ```
 *
 * @param src
 * @param side
 * @param opts
 */
export const sidechainTrigger = <T, S>(
	src: ISubscribable<T>,
	side: ISubscribable<S>,
	opts?: Partial<SidechainTriggerOpts<S>>
): ISubscription<T, T> => src.subscribe(new SidechainTrigger<T, S>(side, opts));

export class SidechainTrigger<T, S> extends ASidechain<T, S, T> {
	buf: T | typeof SEMAPHORE = SEMAPHORE;

	constructor(
		side: ISubscribable<S>,
		opts?: Partial<SidechainTriggerOpts<S>>
	) {
		opts = __optsWithID("sidetrigger", opts);
		super(opts);
		const pred = opts.pred || (() => true);
		this.sideSub = side.subscribe({
			next: (x) => {
				if (this.buf !== SEMAPHORE && pred(x)) {
					this.dispatch(this.buf);
				}
			},
			done: () => this.done(),
		});
	}

	next(x: T) {
		if (this.state < State.DONE) {
			this.buf = x;
		}
	}
}
