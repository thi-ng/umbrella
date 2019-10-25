import { hadd2_f32, hadd4_f32 } from "./hadd";

export function normalize2_f32_aos(
    out: usize,
    a: usize,
    num: usize,
    norm: f32
): usize {
    const res = out;
    num >>= 1;
    for (; num-- > 0; ) {
        const v = v128.load(a);
        let vm = hadd2_f32(f32x4.mul(v, v));
        const m1 = f32x4.extract_lane(vm, 0);
        const m2 = f32x4.extract_lane(vm, 2);
        vm = f32x4.replace_lane(
            vm,
            0,
            m1 > f32.EPSILON ? norm / sqrt<f32>(m1) : 1
        );
        vm = f32x4.replace_lane(
            vm,
            2,
            m2 > f32.EPSILON ? norm / sqrt<f32>(m2) : 1
        );
        v128.store(out, f32x4.mul(v, v128.shuffle<f32>(vm, vm, 0, 0, 2, 2)));
        out += 16;
        a += 16;
    }
    return res;
}

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
        const mag = hadd4_f32(f32x4.mul(v, v));
        v128.store(
            out,
            mag > f32.EPSILON
                ? f32x4.mul(v, f32x4.splat(norm / sqrt<f32>(mag)))
                : v
        );
        out += so;
        a += sa;
    }
    return res;
}
