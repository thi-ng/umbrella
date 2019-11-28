import { Predicate } from "@thi.ng/api";
import { CommonOpts, ISubscribable } from "../api";
import { Subscription } from "../subscription";
import { optsWithID } from "../utils/idgen";

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
 * @param side
 * @param opts
 */
export const sidechainToggle = <A, B>(
    side: ISubscribable<B>,
    opts?: Partial<SidechainToggleOpts<B>>
): Subscription<A, A> => new SidechainToggle(side, opts);

export class SidechainToggle<A, B> extends Subscription<A, A> {
    sideSub: Subscription<B, B>;
    isActive: boolean;

    constructor(
        side: ISubscribable<B>,
        opts?: Partial<SidechainToggleOpts<B>>
    ) {
        opts = optsWithID("sidetoggle", opts);
        super(undefined, opts);
        this.isActive = !!opts.initial;
        const pred = opts.pred || (() => true);
        const $this = this;
        this.sideSub = side.subscribe({
            next(x) {
                if (pred!(x)) {
                    $this.isActive = !$this.isActive;
                }
            },
            done() {
                $this.done();
            }
        });
    }

    unsubscribe(sub?: Subscription<any, any>) {
        const res = super.unsubscribe(sub);
        if (!sub || !this.subs.length) {
            this.sideSub.unsubscribe();
        }
        return res;
    }

    next(x: A) {
        if (this.isActive) {
            super.next(x);
        }
    }

    done() {
        super.done();
        this.sideSub.unsubscribe();
    }
}
