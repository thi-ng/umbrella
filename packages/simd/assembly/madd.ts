/**
 * f32x4 multiply-add: out = a * b + c.
 *
 * `num` and all strides must by multiples of 4.
 * All pointers must be aligned to multiples of 16.
 * Returns `out` pointer.
 *
 * @param out
 * @param a
 * @param b
 * @param c
 * @param num number of 4D vectors
 * @param so out element stride
 * @param sa
 * @param sb
 * @param sc
 */
export function madd4(
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
            v128.add<f32>(
                v128.mul<f32>(v128.load(a), v128.load(b)),
                v128.load(c)
            )
        );
        out += so;
        a += sa;
        b += sb;
        c += sc;
    }
    return res;
}
