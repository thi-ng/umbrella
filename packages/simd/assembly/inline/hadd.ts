/**
 * Pairwise horizontal sum of `v`:
 *
 * ```text
 * [a, b, c, d] => [a+b, a+b, c+d, c+d]
 * ```
 *
 * @param v -
 */
// @ts-ignore: decorator
@inline
export function __hadd2_f32(v: v128): v128 {
    return f32x4.add(v, v128.shuffle<f32>(v, v, 1, 0, 3, 2));
}

/**
 * Full horizontal sum of `v`:
 *
 * ```text
 * [a, b, c, d] => a + c + b + d
 * ```
 * @param v -
 */
// @ts-ignore: decorator
@inline
export function __hadd4_f32(v: v128): f32 {
    v = f32x4.add(v, v128.shuffle<f32>(v, v, 2, 3, 0, 1));
    return f32x4.extract_lane(v, 0) + f32x4.extract_lane(v, 1);
}
