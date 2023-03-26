import type { Predicate } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import { map } from "@thi.ng/transducers/map";
import { State, type CommonOpts, type ISubscribable } from "./api.js";
import { ASidechain } from "./asidechain.js";
import { __optsWithID } from "./idgen.js";
import { fromRAF } from "./raf.js";
import type { Subscription } from "./subscription.js";

export interface SidechainPartitionOpts<T> extends CommonOpts {
	pred: Predicate<T>;
}

/**
 * Returns a {@link Subscription} which buffers values from `src` until
 * side chain fires, then emits buffer (unless empty) and repeats
 * process until either input is done.
 *
 * @remarks
 * By default, the values read from the side chain are ignored (i.e.
 * only their timing is used), however the `pred`icate option can be
 * used to only trigger for specific values / conditions.
 *
 * @example
 * ```t
 * // merge various event streams
 * events = merge([
 *     fromEvent(document,"mousemove"),
 *     fromEvent(document,"mousedown"),
 *     fromEvent(document,"mouseup")
 * ]);
 *
 * // queue event processing to only execute during the
 * // requestAnimationFrame cycle (RAF)
 * events.subscribe(sidechainPartition(fromRAF())).subscribe(trace())
 * ```
 *
 * @param side -
 * @param opts -
 */
export const sidechainPartition = <A, B>(
	side: ISubscribable<B>,
	opts?: Partial<SidechainPartitionOpts<B>>
): Subscription<A, A[]> => new SidechainPartition<A, B>(side, opts);

/**
 * Syntax sugar for one of most common {@link sidechainPartition} use cases, to
 * synchronize downstream processing w/ `requestAnimationFrame()`. The returned
 * subscription debounces any high frequency intra-frame input values and (if
 * any present), passes only most recent one downstream *during* next RAF event
 * processing.
 *
 * @param src -
 */
export const sidechainPartitionRAF = <T>(src: ISubscribable<T>) =>
	src
		.subscribe<T[]>(sidechainPartition<T, number>(fromRAF()))
		.transform(map(peek));

export class SidechainPartition<T, S> extends ASidechain<T, S, T[]> {
	buf: T[];

	constructor(
		side: ISubscribable<S>,
		opts?: Partial<SidechainPartitionOpts<S>>
	) {
		opts = __optsWithID("sidepart", opts);
		super(opts);
		this.buf = [];
		const pred = opts.pred || (() => true);
		const $this = this;
		this.sideSub = side.subscribe({
			next(x) {
				if ($this.buf.length && pred!(x)) {
					$this.dispatch($this.buf);
					$this.buf = [];
				}
			},
			done() {
				if ($this.buf.length) {
					$this.dispatch($this.buf);
				}
				$this.done();
				delete (<any>$this).buf;
			},
		});
	}

	next(x: T) {
		if (this.state < State.DONE) {
			this.buf.push(x);
		}
	}
}
