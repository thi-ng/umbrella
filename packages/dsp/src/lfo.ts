import { TAU } from "@thi.ng/math";

/**
 * Iterator of sine & cosine oscillator values of given frequency in the
 * form of [sin,cos] tuples. Start phase always zero.
 *
 * @remarks
 * Implementation based on a self-oscillating SVF (state-variable
 * filter) without using any trig functions. Therefore, ~30% faster, but
 * precision only useful for very low (< ~2Hz) frequencies. Phase &
 * amplitude drift will occur for higher frequencies.
 *
 * - http://www.earlevel.com/main/2003/03/02/the-digital-state-variable-filter/
 *
 * @param freq
 * @param sampleRate
 * @param amp
 */
export function* lfo(freq: number, sampleRate: number, amp = 1) {
    const f = (TAU * freq) / sampleRate;
    let s = 0;
    let c = amp;
    for (;;) {
        yield [s, c];
        s += f * c;
        c -= f * s;
    }
}
