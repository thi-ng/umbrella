/**
 * Sets a single float vector lane `id` in `num` items from `addr`,
 * spaced by `stride`. `id` is used as start offset for `addr`. Both
 * `id` and `stride` are in floats, not bytes. Returns `addr`.
 *
 * ```
 * // set Y component in AOS vec4 buffer from addr 0x1000
 * set_lane_f32(0x1000, 1, 1.23, 4, 4)
 * ```
 *
 * @param addr -
 * @param id -
 * @param x -
 * @param num -
 * @param stride -
 */
export function set_lane_f32(
    addr: usize,
    id: usize,
    x: f32,
    num: usize,
    stride: usize
): usize {
    const res = addr;
    addr += id << 2;
    stride <<= 2;
    for (; num-- > 0; ) {
        f32.store(addr, x);
        addr += stride;
    }
    return res;
}

/**
 * Swaps, reorders or replaces vector components in an AOS f32/u32 vec4
 * buffer. The `x`,`y`,`z`,`w` args indicate the intended lane values
 * (each 0-3).
 *
 * @example
 * ```ts
 * simd.f32.set([10, 20, 30, 40], 0)
 * simd.swizzle4_f32(
 *   16,         // dest ptr
 *   0,          // src ptr
 *   3, 0, 1, 2, // lane IDs
 *   1,          // num vectors
 *   4,          // output stride (in f32/u32)
 *   4           // input stride
 * )
 *
 * simd.f32.slice(4, 8)
 * // [40, 10, 20, 30]
 * ```
 *
 * @param out -
 * @param a -
 * @param x -
 * @param y -
 * @param z -
 * @param w -
 * @param num -
 * @param so -
 * @param sa -
 */
export function swizzle4_32_aos(
    out: usize,
    a: usize,
    x: u32,
    y: u32,
    z: u32,
    w: u32,
    num: usize,
    so: usize,
    sa: usize
): usize {
    const res = out;
    so <<= 2;
    sa <<= 2;
    // create swizzle pattern from xyzw
    // each lane: id * 0x04040404 + 0x03020100
    let mask = i64x2.replace_lane(
        i64x2.splat(<u64>y * 0x0404040400000000 + <u64>x * 0x0000000004040404),
        1,
        <u64>w * 0x0404040400000000 + <u64>z * 0x0000000004040404
    );
    mask = i64x2.add(mask, i32x4.splat(0x03020100));
    for (; num-- > 0; ) {
        v128.store(out, v128.swizzle(v128.load(a), mask));
        out += so;
        a += sa;
    }
    return res;
}
