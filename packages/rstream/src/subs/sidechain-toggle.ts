import { Predicate } from "@thi.ng/api/api";

import { ISubscribable } from "../api";
import { Subscription } from "../index";
import { Stream } from "../stream";

export class SidechainToggle<A, B> extends Subscription<A, A> {

    sideSub: Subscription<B, B>;
    isActive: boolean;

    constructor(side: ISubscribable<B>, initial = true, pred?: Predicate<B>, id?: string) {
        super(null, null, null, id || `sidetoggle-${Stream.NEXT_ID++}`);
        this.isActive = initial;
        const $this = this;
        pred = pred || (() => true);
        this.sideSub = side.subscribe({
            next(x) {
                if (pred(x)) {
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

/**
 * Filters values from input based on values received from side chain.
 * By default, the value read from the side chain is ignored, however the optional
 * predicate can be used to only trigger for specific values/conditions.
 * Everytime the predicate fn returns true, the filter will be toggled on/off.
 * Whilst switched off, no input values will be forwarded.
 *
 * ```
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
 * @param pred
 * @param initial initial switch state
 * @param id
 */
export function sidechainToggle<A, B>(side: ISubscribable<B>, initial = true, pred?: Predicate<B>, id?: string): Subscription<A, A> {
    return new SidechainToggle(side, initial, pred, id);
}
