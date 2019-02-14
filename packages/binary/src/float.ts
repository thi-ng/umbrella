const F32 = new Float32Array(1);
const I32 = new Int32Array(F32.buffer);
const U32 = new Uint32Array(F32.buffer);

export const floatToIntBits = (x: number) =>
    (F32[0] = x, I32[0]);

export const floatToUintBits = (x: number) =>
    (F32[0] = x, U32[0]);

export const intBitsToFloat = (x: number) =>
    (I32[0] = x, F32[0]);

export const uintBitsToFloat = (x: number) =>
    (U32[0] = x, F32[0]);

/**
 * Converts given float into a sortable integer representation, using
 * raw bitwise conversion via `floatToIntBits()`.
 *
 * https://github.com/tzaeschke/phtree/blob/master/PhTreeRevisited.pdf
 * (page 3)
 *
 * @param x
 */
export const floatToSortableInt = (x: number) => {
    if (x === -0) x = 0;
    const i = floatToIntBits(x);
    return x < 0 ? (~i) | (1 << 31) : i;
};
