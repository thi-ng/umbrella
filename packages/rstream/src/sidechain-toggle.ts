import type { Predicate } from "@thi.ng/api";
import { CommonOpts, ISubscribable, State } from "./api";
import { ASidechain } from "./asidechain";
import { __optsWithID } from "./idgen";
import type { Subscription } from "./subscription";

export interface SidechainToggleOpts<T> extends CommonOpts {
    pred: Predicate<T>;
    initial: boolean;
}

/**
 * Returns {@link Subscription} which filters values from input based on
 * values received from side chain.
 *
 * @remarks
 * By default, the value read from the side chain is ignored (i.e. only
 * their timing is used), however the `pred`icate option can be used to
 * only trigger for specific values/conditions. Every time the predicate
 * fn returns true, the filter will be toggled on/off. Whilst switched
 * off, no input values will be forwarded.
 *
 * @example
 * ```ts
 * // use slower interval stream to toggle main stream on/off
 * fromInterval(500)
 *   .subscribe(sidechainToggle(fromInterval(1000)))
 *   .subscribe(trace());
 * // 0
 * // 3
 * // 4
 * // 7
 * // 8
 * ...
 * ```
 *
 * @param side -
 * @param opts -
 */
export const sidechainToggle = <A, B>(
    side: ISubscribable<B>,
    opts?: Partial<SidechainToggleOpts<B>>
): Subscription<A, A> => new SidechainToggle(side, opts);

export class SidechainToggle<T, S> extends ASidechain<T, S, T> {
    isActive: boolean;

    constructor(
        side: ISubscribable<S>,
        opts?: Partial<SidechainToggleOpts<S>>
    ) {
        opts = __optsWithID("sidetoggle", opts);
        super(opts);
        this.isActive = !!opts.initial;
        const pred = opts.pred || (() => true);
        const $this = this;
        this.sideSub = side.subscribe({
            next(x) {
                if (pred(x)) {
                    $this.isActive = !$this.isActive;
                }
            },
            done() {
                $this.done();
            },
        });
    }

    next(x: T) {
        if (this.isActive && this.state < State.DONE) {
            super.next(x);
        }
    }
}
