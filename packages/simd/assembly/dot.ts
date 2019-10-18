/**
 * f32x4 dot product. `so` should be 1 for packed result buffer.
 *
 * @param out
 * @param a
 * @param b
 * @param num
 * @param so
 * @param sa
 * @param sb
 */
export function dot4(
    out: usize,
    a: usize,
    b: usize,
    num: usize,
    so: usize,
    sa: usize,
    sb: usize
): usize {
    const res = out;
    so <<= 2;
    sa <<= 2;
    sb <<= 2;
    // a1*b1 + a2*b2 + a3*b3 + a4*b4
    for (; num-- > 0; ) {
        let m = v128.mul<f32>(v128.load(a), v128.load(b));
        m = v128.add<f32>(m, v128.shuffle<f32>(m, m, 2, 3, 0, 1));
        store<f32>(
            out,
            v128.extract_lane<f32>(m, 0) + v128.extract_lane<f32>(m, 1)
        );
        out += so;
        a += sa;
        b += sb;
    }
    return res;
}
