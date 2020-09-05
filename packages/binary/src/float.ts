import type { FnN, FnN2 } from "@thi.ng/api";

const F64 = new Float64Array(1);
const F32 = new Float32Array(F64.buffer);
const I32 = new Int32Array(F64.buffer);
const U32 = new Uint32Array(F64.buffer);

/**
 * This value is true iff the environment is Little Endian.
 */
export const IS_LE = ((F64[0] = 2), U32[1] === 0x40000000);

export const floatToIntBits: FnN = (x) => ((F32[0] = x), I32[0]);

export const floatToUintBits: FnN = (x) => ((F32[0] = x), U32[0]);

export const intBitsToFloat: FnN = (x) => ((I32[0] = x), F32[0]);

export const uintBitsToFloat: FnN = (x) => ((U32[0] = x), F32[0]);

/**
 * Returns i32 representation of f64 as [hi, lo] tuple (takes
 * environment's Little Endianess into account).
 *
 * @param x
 */
export const floatToIntBits64 = (x: number): [number, number] => (
    (F64[0] = x), IS_LE ? [I32[1], I32[0]] : [I32[0], I32[1]]
);

/**
 * Returns u32 representation of f64 as [hi, lo] tuple (takes
 * environment's Little Endianess into account).
 *
 * @param x
 */
export const floatToUintBits64 = (x: number): [number, number] => (
    (F64[0] = x), IS_LE ? [U32[1], U32[0]] : [U32[0], U32[1]]
);

/**
 * Reverse op of {@link floatToIntBits64}.
 *
 * @param hi
 * @param lo
 */
export const intBitsToFloat64: FnN2 = (hi, lo) => {
    IS_LE ? ((I32[1] = hi), (I32[0] = lo)) : ((I32[0] = hi), (I32[1] = lo));
    return F64[0];
};

/**
 * Reverse op of {@link floatToUintBits64}.
 *
 * @param hi
 * @param lo
 */
export const uintBitsToFloat64: FnN2 = (hi, lo) => {
    IS_LE ? ((U32[1] = hi), (U32[0] = lo)) : ((U32[0] = hi), (U32[1] = lo));
    return F64[0];
};

/**
 * Converts given float (f32) into a sortable integer representation,
 * using raw bitwise conversion via {@link floatToIntBits}.
 *
 * {@link https://github.com/tzaeschke/phtree/blob/develop/PhTreeRevisited.pdf}
 * (page 3)
 *
 * @param x - value to convert
 */
export const floatToSortableInt: FnN = (x) => {
    if (x === -0) x = 0;
    const i = floatToIntBits(x);
    return x < 0 ? ~i | (1 << 31) : i;
};

const clamp11: FnN = (x) => (x < -1 ? -1 : x > 1 ? 1 : x);

/**
 * Converts normalized float ([-1..1] range) to u8.
 *
 * @param x
 */
export const f32u8: FnN = (x) => (clamp11(x) * 0x7f) & 0xff;

/**
 * Converts normalized float ([-1..1] range) to u16.
 *
 * @param x
 */
export const f32u16: FnN = (x) => (clamp11(x) * 0x7fff) & 0xffff;

/**
 * Converts normalized float ([-1..1] range) to u24.
 *
 * @param x
 */
export const f32u24: FnN = (x) => (clamp11(x) * 0x7fffff) & 0xffffff;

/**
 * Converts normalized float ([-1..1] range) to u32.
 *
 * @param x
 */
export const f32u32: FnN = (x) => (clamp11(x) * 0x7fffffff) >>> 0;

/**
 * Reverse op of {@link f32u8}.
 *
 * @param x
 */
export const u8f32: FnN = (x) => (
    (x &= 0xff), (x | ((x >> 7) * 0xffffff00)) / 0x7f
);

/**
 * Reverse op of {@link f32u16}.
 *
 * @param x
 */
export const u16f32: FnN = (x) => (
    (x &= 0xffff), (x | ((x >> 15) * 0xffff0000)) / 0x7fff
);

/**
 * Reverse op of {@link f32u24}.
 *
 * @param x
 */
export const u24f32: FnN = (x) => (
    (x &= 0xffffff), (x | ((x >> 23) * 0xff000000)) / 0x7fffff
);

/**
 * Reverse op of {@link f32u32}.
 *
 * @param x
 */
export const u32f32: FnN = (x) => (x | 0) / 0x7fffffff;
