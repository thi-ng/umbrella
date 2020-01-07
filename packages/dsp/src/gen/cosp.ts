import { INV_TAU, TAU } from "@thi.ng/math";
import { AGen } from "./agen";

/**
 * Approximated cosine generator using given normalized `freq` and `amp`
 * (default: 1).
 *
 * @param freq -
 * @param amp -
 */
export const cosp = (freq: number, amp?: number) => new CosP(freq, amp);

export class CosP extends AGen<number> {
    protected cos!: number;
    protected nxt!: number;

    constructor(freq: number, amp = 1) {
        super(0);
        this.set(freq, amp);
    }

    next() {
        const t = this.nxt * this.cos - this.val;
        this.val = this.nxt;
        this.nxt = t;
        return this.val;
    }

    freq() {
        return Math.acos(this.cos * 0.5) * INV_TAU;
    }

    set(freq: number, amp: number) {
        this.nxt = amp;
        this.cos = Math.cos(freq * TAU) * 2;
        this.val = this.cos * amp * 0.5;
    }
}
