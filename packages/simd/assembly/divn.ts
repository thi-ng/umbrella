// SPDX-License-Identifier: Apache-2.0
export function divn4_f32(
    out: usize,
    a: usize,
    n: f32,
    num: usize,
    so: usize,
    sa: usize
): usize {
    so <<= 2;
    sa <<= 2;
    const res = out;
    const vn = f32x4.splat(n);
    for (; num-- > 0; ) {
        v128.store(out, f32x4.div(v128.load(a), vn));
        out += so;
        a += sa;
    }
    return res;
}
