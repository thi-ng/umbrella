import type { INorm } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { preseed, sum } from "./utils.js";

/**
 * Low-pass filtered noise (same as brown noise). Opposite of {@link blue}.
 *
 * @param n - 
 * @param scale - 
 * @param rnd - 
 */
export function* red(n = 2, scale = 1, rnd: INorm = SYSTEM) {
    const state = preseed(n, scale, rnd);
    const invN = 1 / n;
    let acc = sum(state);
    for (let i = 0; true; ++i >= n && (i = 0)) {
        acc -= state[i];
        acc += state[i] = rnd.norm(scale);
        yield acc * invN;
    }
}
