/**
 * Takes three vec4 buffers, computes componentwise a * b + c and stores
 * results in `out`. Both AOS / SOA layouts are supported, as long as
 * all buffers are using the same layout.
 *
 * All strides must by multiples of 4. All pointers must be aligned to
 * multiples of 16. Returns `out` pointer.
 *
 * @param out
 * @param a
 * @param b
 * @param c
 * @param num number of vec4
 * @param so out element stride
 * @param sa A element stride
 * @param sb B element stride
 * @param sc C element stride
 */
export function madd4_f32(
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
