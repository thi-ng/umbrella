// SPDX-License-Identifier: Apache-2.0
export function mix4_f32(
    out: usize,
    a: usize,
    b: usize,
    t: usize,
    num: usize,
    so: usize,
    sa: usize,
    sb: usize,
    st: usize
): usize {
    const res = out;
    so <<= 2;
    sa <<= 2;
    sb <<= 2;
    st <<= 2;
    for (; num-- > 0; ) {
        const va = v128.load(a);
        v128.store(
            out,
            f32x4.add(va, f32x4.mul(f32x4.sub(v128.load(b), va), v128.load(t)))
        );
        out += so;
        a += sa;
        b += sb;
        t += st;
    }
    return res;
}
