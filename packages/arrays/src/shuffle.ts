import { IRandom, SYSTEM } from "@thi.ng/random";

/**
 * Shuffles the first `n` items of given array, using Fisher-yates and
 * optional `rnd` PRNG. If `n` is `undefined`, the entire array will be
 * shuffled.
 *
 *
 * @param buf
 * @param n
 * @param rnd
 */
export const shuffle = (buf: any[], n = buf.length, rnd: IRandom = SYSTEM) => {
    n = Math.min(n, buf.length);
    const l = n;
    if (l > 1) {
        n = Math.min(n, l);
        while (--n >= 0) {
            const a = rnd.float(l) | 0;
            const b = rnd.float(l) | 0;
            const t = buf[a];
            buf[a] = buf[b];
            buf[b] = t;
        }
    }
    return buf;
};
