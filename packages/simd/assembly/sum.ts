import { hadd4_f32 } from "./hadd";

export function sum4_f32(a: usize, num: usize, sa: usize): f32 {
    sa <<= 2;
    let acc = f32x4.splat(0);
    for (; num-- > 0; ) {
        acc = f32x4.add(acc, v128.load(a));
        a += sa;
    }
    return hadd4_f32(acc);
}
