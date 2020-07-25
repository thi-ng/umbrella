export function sqrt4_f32(
    out: usize,
    a: usize,
    num: usize,
    so: usize,
    sa: usize
): usize {
    so <<= 2;
    sa <<= 2;
    const res = out;
    for (; num-- > 0; ) {
        v128.store(out, f32x4.sqrt(v128.load(a)));
        out += so;
        a += sa;
    }
    return res;
}

export function invsqrt4_f32(
    out: usize,
    a: usize,
    num: usize,
    so: usize,
    sa: usize
): usize {
    so <<= 2;
    sa <<= 2;
    const res = out;
    let one = f32x4.splat(1);
    for (; num-- > 0; ) {
        v128.store(out, f32x4.div(one, f32x4.sqrt(v128.load(a))));
        out += so;
        a += sa;
    }
    return res;
}
