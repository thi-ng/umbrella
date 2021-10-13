import type { TypedArray } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import type { AnyArray } from "./api.js";

/**
 * Shuffles the items in the given index range of array `buf` using
 * Fisher-yates and optional `rnd` PRNG.
 *
 * @remarks
 * If neither `start` / `end` are given, the entire array will be
 * shuffled. Mutates original array.
 *
 * See {@link @thi.ng/random#IRandom}
 *
 * @param buf - array
 * @param n - num items
 * @param rnd - PRNG
 */
export const shuffleRange = <T extends AnyArray>(
    buf: T,
    start = 0,
    end = buf.length,
    rnd: IRandom = SYSTEM
) => {
    assert(
        start >= 0 && end >= start && end <= buf.length,
        `illegal range ${start}..${end}`
    );
    let n = end - start;
    const l = n;
    if (l > 1) {
        while (--n >= 0) {
            const a = (start + rnd.float(l)) | 0;
            const b = (start + rnd.float(l)) | 0;
            const t = buf[a];
            buf[a] = buf[b];
            buf[b] = t;
        }
    }
    return buf;
};

/**
 * Applies {@link shuffleRange} to the given array. If `n` is given,
 * only the first `n` items are shuffled. Mutates original array.
 *
 * {@link shuffleRange}
 *
 * @param buf - array
 * @param n - num items
 * @param rnd - PRNG
 */
export const shuffle = <T extends any[] | TypedArray>(
    buf: T,
    n = buf.length,
    rnd: IRandom = SYSTEM
) => shuffleRange(buf, 0, n, rnd);
