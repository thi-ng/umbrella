// SPDX-License-Identifier: Apache-2.0
export function max4_f32(
    out: usize,
    a: usize,
    b: usize,
    num: usize,
    so: usize,
    sa: usize,
    sb: usize
): usize {
    so <<= 2;
    sa <<= 2;
    sb <<= 2;
    const res = out;
    for (; num-- > 0; ) {
        v128.store(out, f32x4.max(v128.load(a), v128.load(b)));
        out += so;
        a += sa;
        b += sb;
    }
    return res;
}
