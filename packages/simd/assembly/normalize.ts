// SPDX-License-Identifier: Apache-2.0
import { __magsq2, __magsq4 } from "./inline/magsq";

// @ts-ignore: decorator
@inline
function $norm(m: f32, norm: f32): f32 {
    return m > f32.EPSILON ? norm / sqrt<f32>(m) : 1;
}

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
        let vm = __magsq2(v);
        vm = f32x4.replace_lane(vm, 0, $norm(f32x4.extract_lane(vm, 0), norm));
        vm = f32x4.replace_lane(vm, 2, $norm(f32x4.extract_lane(vm, 2), norm));
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
        const mag = __magsq4(v);
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
