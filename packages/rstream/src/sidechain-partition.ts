import type { Predicate } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import { map } from "@thi.ng/transducers/map";
import {
	State,
	type CommonOpts,
	type ISubscribable,
	type ISubscription,
} from "./api.js";
import { ASidechain } from "./asidechain.js";
import { __optsWithID } from "./idgen.js";
import { fromRAF } from "./raf.js";

export interface SidechainPartitionOpts<T> extends CommonOpts {
	pred: Predicate<T>;
}

/**
 * Returns a subscription which buffers values from `src` until side chain
 * delivers its next value, then emits buffer (unless empty) and repeats process
 * until either input is done.
 *
 * @remarks
 * By default, the values read from the side chain are ignored (i.e. only their
 * timing is used), however the `pred`icate option can be used to only trigger
 * for specific values / conditions.
 *
 * Also see: {@link sidechainToggle}, {@link sidechainTrigger}, {@link syncRAF}.
 *
 * @example
 * ```ts
 * // merge various event streams
 * events = merge([
 *     fromEvent(document,"mousemove"),
 *     fromEvent(document,"mousedown"),
 *     fromEvent(document,"mouseup")
 * ]);
 *
 * // queue event processing to only execute during the
 * // requestAnimationFrame cycle (RAF)
 * sidechainPartition(events, fromRAF()).subscribe(trace())
 * ```
 *
 * @param src -
 * @param side -
 * @param opts -
 */
export const sidechainPartition = <T, S>(
	src: ISubscribable<T>,
	side: ISubscribable<S>,
	opts?: Partial<SidechainPartitionOpts<S>>
): ISubscription<T, T[]> =>
	src.subscribe(new SidechainPartition<T, S>(side, opts));

/**
 * **Deprecated** syntax sugar for one of most common {@link sidechainPartition}
 * use cases, to synchronize downstream processing w/ `requestAnimationFrame()`.
 * Please use {@link syncRAF} instead.
 *
 * @remarks
 * The returned subscription debounces any high frequency intra-frame input
 * values and (if any present), passes only most recent one downstream during
 * next RAF event processing.
 *
 * This example uses thi.ng/atom as state container. Also see {@link fromAtom}
 * and {@link syncRAF}.
 *
 * @example
 * ```ts
 * const atom = defAtom("alice");
 *
 * // any change to the atom will only be applied during next RAF update
 * sideChainPartitionRAF(fromAtom(atom)).subscribe({
 *   next({ name }) { document.body.innerText = name; }
 * });
 *
 * // trigger update
 * atom.reset("bob");
 * ```
 *
 * @param src -
 *
 * @deprecated
 */
export const sidechainPartitionRAF = <T>(src: ISubscribable<T>) =>
	sidechainPartition<T, number>(src, fromRAF()).transform(map(peek));

export class SidechainPartition<T, S> extends ASidechain<T, S, T[]> {
	buf: T[];

	constructor(
		side: ISubscribable<S>,
		opts?: Partial<SidechainPartitionOpts<S>>
	) {
		opts = __optsWithID("sidepart", opts);
		super(opts);
		const pred = opts.pred || (() => true);
		this.buf = [];
		this.sideSub = side.subscribe({
			next: (x) => {
				if (this.buf.length && pred!(x)) {
					this.dispatch(this.buf);
					this.buf = [];
				}
			},
			done: () => {
				if (this.buf.length) {
					this.dispatch(this.buf);
				}
				this.done();
				delete (<any>this).buf;
			},
		});
	}

	next(x: T) {
		if (this.state < State.DONE) {
			this.buf.push(x);
		}
	}
}
