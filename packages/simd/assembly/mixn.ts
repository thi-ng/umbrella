// SPDX-License-Identifier: Apache-2.0
export function mixn4_f32(
    out: usize,
    a: usize,
    b: usize,
    t: f32,
    num: usize,
    so: usize,
    sa: usize,
    sb: usize
): usize {
    const res = out;
    so <<= 2;
    sa <<= 2;
    sb <<= 2;
    const vt = f32x4.splat(t);
    for (; num-- > 0; ) {
        const va = v128.load(a);
        v128.store(
            out,
            f32x4.add(va, f32x4.mul(f32x4.sub(v128.load(b), va), vt))
        );
        out += so;
        a += sa;
        b += sb;
    }
    return res;
}
