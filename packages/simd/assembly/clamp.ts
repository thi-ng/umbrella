/**
 * Takes three vec4 buffers, clamps `a` componentwise to `min(max(a, b),
 * c)` and stores results in `out`. Both AOS / SOA layouts are
 * supported, as long as all buffers are using the same layout.
 *
 * All strides must by multiples of 4. All pointers must be aligned to
 * multiples of 16. Returns `out` pointer.
 *
 * Set `sb` and `sc` to 0 for clamping all `a` vectors against same
 * bounds.
 *
 * @param out -
 * @param a -
 * @param b -
 * @param c -
 * @param num - number of vec4
 * @param so - out element stride
 * @param sa - A element stride
 * @param sb - B element stride
 * @param sc - C element stride
 */
export function clamp4_f32(
    out: usize,
    a: usize,
    b: usize,
    c: usize,
    num: usize,
    so: usize,
    sa: usize,
    sb: usize,
    sc: usize
): usize {
    const res = out;
    so <<= 2;
    sa <<= 2;
    sb <<= 2;
    sc <<= 2;
    for (; num-- > 0; ) {
        v128.store(
            out,
            f32x4.min(f32x4.max(v128.load(a), v128.load(b)), v128.load(c))
        );
        out += so;
        a += sa;
        b += sb;
        c += sc;
    }
    return res;
}

export function clampn4_f32(
    out: usize,
    a: usize,
    b: f32,
    c: f32,
    num: usize,
    so: usize,
    sa: usize
): usize {
    const res = out;
    so <<= 2;
    sa <<= 2;
    const vmin = f32x4.splat(b);
    const vmax = f32x4.splat(c);
    for (; num-- > 0; ) {
        v128.store(out, f32x4.min(f32x4.max(v128.load(a), vmin), vmax));
        out += so;
        a += sa;
    }
    return res;
}
