import { ctz32 } from "@thi.ng/binary/count";
import type { INorm } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { preseed, sum } from "./utils.js";

/**
 * Exponential decay (1/f) noise, based on Voss-McCarthy algorithm.
 *
 * @remarks
 * The number of internal states should be in the [4..32] range (default: 8).
 * Due to JS integer limitations, `n` > 32 are meaningless.
 *
 * References:
 *
 * - https://www.dsprelated.com/showarticle/908.php
 * - https://www.firstpr.com.au/dsp/pink-noise/#Voss-McCartney
 *
 * @param n - 
 * @param scale - 
 * @param rnd - 
 */
export function* pink(n = 8, scale = 1, rnd: INorm = SYSTEM) {
    const state = preseed(n, scale, rnd);
    const invN = 1 / n;
    let acc = sum(state);
    for (let i = 0; true; i = (i + 1) >>> 0) {
        const id = ctz32(i) % n;
        acc -= state[id];
        acc += state[id] = rnd.norm(scale);
        yield acc * invN;
    }
}
