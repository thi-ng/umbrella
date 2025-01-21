// SPDX-License-Identifier: Apache-2.0
export function maddn4_f32(
    out: usize,
    a: usize,
    n: f32,
    c: usize,
    num: usize,
    so: usize,
    sa: usize,
    sc: usize
): usize {
    const res = out;
    so <<= 2;
    sa <<= 2;
    sc <<= 2;
    const vn = f32x4.splat(n);
    for (; num-- > 0; ) {
        v128.store(out, f32x4.add(f32x4.mul(v128.load(a), vn), v128.load(c)));
        out += so;
        a += sa;
        c += sc;
    }
    return res;
}
