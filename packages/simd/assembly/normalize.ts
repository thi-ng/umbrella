export function normalize4_f32_aos(
    out: usize,
    a: usize,
    num: usize,
    norm: f32,
    so: usize,
    sa: usize
): usize {
    so <<= 2;
    sa <<= 2;
    const res = out;
    for (; num-- > 0; ) {
        const v = v128.load(a);
        let m = f32x4.mul(v, v);
        m = f32x4.add(m, v128.shuffle<f32>(m, m, 2, 3, 0, 1));
        const mag = f32x4.extract_lane(m, 0) + f32x4.extract_lane(m, 1);
        v128.store(
            out,
            mag > f32.EPSILON
                ? f32x4.mul(v, f32x4.splat(sqrt<f32>(norm / mag)))
                : v
        );
        out += so;
        a += sa;
    }
    return res;
}
