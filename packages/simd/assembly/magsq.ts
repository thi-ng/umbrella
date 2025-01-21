// SPDX-License-Identifier: Apache-2.0
import { __magsq2, __magsq4 } from "./inline/magsq";

export function magsq2_f32_aos(out: usize, a: usize, num: usize): usize {
    const res = out;
    num >>= 1;
    for (; num-- > 0; ) {
        const v = __magsq2(v128.load(a));
        f32.store(out, f32x4.extract_lane(v, 0));
        f32.store(out, f32x4.extract_lane(v, 2), 4);
        out += 8;
        a += 16;
    }
    return res;
}

export function magsq4_f32_aos(
    out: usize,
    a: usize,
    num: usize,
    so: usize,
    sa: usize
): usize {
    const res = out;
    so <<= 2;
    sa <<= 2;
    for (; num-- > 0; ) {
        f32.store(out, __magsq4(v128.load(a)));
        out += so;
        a += sa;
    }
    return res;
}
