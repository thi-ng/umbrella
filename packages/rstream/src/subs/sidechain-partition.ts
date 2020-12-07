import type { Predicate } from "@thi.ng/api";
import { CommonOpts, ISubscribable, State } from "../api";
import type { Subscription } from "../subscription";
import { optsWithID } from "../utils/idgen";
import { ASidechain } from "./asidechain";

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

export class SidechainPartition<T, S> extends ASidechain<T, S, T[]> {
    buf: T[];

    constructor(
        side: ISubscribable<S>,
        opts?: Partial<SidechainPartitionOpts<S>>
    ) {
        opts = optsWithID("sidepart", opts);
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
