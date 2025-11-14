// SPDX-License-Identifier: Apache-2.0
export function neg4_f32(
    out: usize,
    a: usize,
    num: usize,
    so: usize,
    sa: usize
): usize {
    so <<= 2;
    sa <<= 2;
    const res = out;
    for (; num-- > 0; ) {
        v128.store(out, f32x4.neg(v128.load(a)));
        out += so;
        a += sa;
    }
    return res;
}
