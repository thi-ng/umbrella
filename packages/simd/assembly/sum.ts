export function sum4_f32(a: usize, num: usize, sa: usize): f64 {
    sa <<= 2;
    let acc = f32x4.splat(0);
    for (; num-- > 0; ) {
        acc = f32x4.add(acc, v128.load(a));
        a += sa;
    }
    acc = f32x4.add(acc, v128.shuffle<f32>(acc, acc, 2, 3, 0, 1));
    return f32x4.extract_lane(acc, 0) + f32x4.extract_lane(acc, 1);
}
