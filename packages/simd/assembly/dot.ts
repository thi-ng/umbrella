/**
 * Takes two densely packed vec2 AOS buffers `a` and `b`, computes their
 * 2D dot products and stores results in `out`. Computes two results per
 * iteration, hence `num` must be an even number or else the last vector
 * will not be processed. `so` should be 1 for packed result buffer.
 *
 * `a` & `b` should be aligned to 16, `out` to multiples of 4.
 *
 * @param out
 * @param a
 * @param b
 * @param num
 * @param so
 */
export function dot2_f32_aos(
    out: usize,
    a: usize,
    b: usize,
    num: usize,
    so: usize
): usize {
    const res = out;
    const so2 = so << 3;
    so <<= 2;
    num >>= 1;
    for (; num-- > 0; ) {
        let m = f32x4.mul(v128.load(a), v128.load(b));
        m = f32x4.add(m, v128.shuffle<f32>(m, m, 1, 0, 3, 2));
        f32.store(out, f32x4.extract_lane(m, 0));
        f32.store(out + so, f32x4.extract_lane(m, 2));
        out += so2;
        a += 16;
        b += 16;
    }
    return res;
}

/**
 * Takes two vec4 AOS buffers, computes their dot products and stores
 * results in `out`. `so` should be 1 for packed result buffer. `sa` and
 * `sb` indicate the stride lengths (in floats) between each vector in
 * each respective buffer and should be a multiple of 4.
 *
 * @param out
 * @param a
 * @param b
 * @param num
 * @param so
 * @param sa
 * @param sb
 */
export function dot4_f32_aos(
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
        let m = f32x4.mul(v128.load(a), v128.load(b));
        m = f32x4.add(m, v128.shuffle<f32>(m, m, 2, 3, 0, 1));
        f32.store(out, f32x4.extract_lane(m, 0) + f32x4.extract_lane(m, 1));
        out += so;
        a += sa;
        b += sb;
    }
    return res;
}

export function dot4_f32_soa(
    out: usize,
    a: usize,
    b: usize,
    num: usize,
    sa: usize,
    sb: usize
): usize {
    sa <<= 2;
    sb <<= 2;
    num >>= 2;
    const sa2 = sa * 2;
    const sb2 = sb * 2;
    const sa3 = sa * 3;
    const sb3 = sb * 3;
    const res = out;
    for (; num-- > 0; ) {
        v128.store(
            out,
            f32x4.add(
                f32x4.add(
                    f32x4.add(
                        f32x4.mul(v128.load(a), v128.load(b)),
                        f32x4.mul(v128.load(a + sa), v128.load(b + sb))
                    ),
                    f32x4.mul(v128.load(a + sa2), v128.load(b + sb2))
                ),
                f32x4.mul(v128.load(a + sa3), v128.load(b + sb3))
            )
        );
        out += 16;
        sa += 16;
        sb += 16;
    }
    return res;
}
