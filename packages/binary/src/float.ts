const F32 = new Float32Array(1);
const I32 = new Int32Array(F32.buffer);
const U32 = new Uint32Array(F32.buffer);

export const floatToIntBits = (x: number) => ((F32[0] = x), I32[0]);

export const floatToUintBits = (x: number) => ((F32[0] = x), U32[0]);

export const intBitsToFloat = (x: number) => ((I32[0] = x), F32[0]);

export const uintBitsToFloat = (x: number) => ((U32[0] = x), F32[0]);

/**
 * Converts given float into a sortable integer representation, using
 * raw bitwise conversion via {@link floatToIntBits}.
 *
 * {@link https://github.com/tzaeschke/phtree/blob/master/PhTreeRevisited.pdf}
 * (page 3)
 *
 * @param x - value to convert
 */
export const floatToSortableInt = (x: number) => {
    if (x === -0) x = 0;
    const i = floatToIntBits(x);
    return x < 0 ? ~i | (1 << 31) : i;
};

const clamp11 = (x: number) => (x < -1 ? -1 : x > 1 ? 1 : x);

export const f32u8 = (x: number) => (clamp11(x) * 0x7f) & 0xff;

export const f32u16 = (x: number) => (clamp11(x) * 0x7fff) & 0xffff;

export const f32u24 = (x: number) => (clamp11(x) * 0x7fffff) & 0xffffff;

export const f32u32 = (x: number) => (clamp11(x) * 0x7fffffff) >>> 0;

export const u8f32 = (x: number) => (
    (x &= 0xff), (x | ((x >> 7) * 0xffffff00)) / 0x7f
);

export const u16f32 = (x: number) => (
    (x &= 0xffff), (x | ((x >> 15) * 0xffff0000)) / 0x7fff
);

export const u24f32 = (x: number) => (
    (x &= 0xffffff), (x | ((x >> 23) * 0xff000000)) / 0x7fffff
);

export const u32f32 = (x: number) => (x | 0) / 0x7fffffff;
