export function maddN4(
    out: usize,
    a: usize,
    b: f32,
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
    const vb = v128.splat<f32>(b);
    for (; num-- > 0; ) {
        v128.store(
            out,
            v128.add<f32>(v128.mul<f32>(v128.load(a), vb), v128.load(c))
        );
        out += so;
        a += sa;
        c += sc;
    }
    return res;
}
