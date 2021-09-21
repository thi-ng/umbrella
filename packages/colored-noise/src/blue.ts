import type { INorm } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { preseed, sum } from "./utils";

/**
 * High-pass filtered noise. Opposite of {@link red}.
 *
 * @param n
 * @param scale
 * @param rnd
 */
export function* blue(n = 2, scale = 1, rnd: INorm = SYSTEM) {
    const state = preseed(n, scale, rnd);
    state.forEach((x, i) => (state[i] = i & 1 ? x : -x));
    const invN = 1 / n;
    let acc = sum(state);
    for (let i = 0, sign = -1; true; ++i >= n && (i = 0)) {
        acc -= state[i];
        acc += state[i] = sign * rnd.norm(scale);
        sign ^= 0xfffffffe;
        yield sign * acc * invN;
    }
}
