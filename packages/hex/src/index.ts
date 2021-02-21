const P32 = 0x100000000;

/**
 * Hex digits
 */
export const HEX = "0123456789abcdef";

/**
 * Returns 4bit uint as hex string
 *
 * @param x
 */
export const U4 = (x: number) => HEX[x & 0xf];

/**
 * Returns 8bit uint as hex string
 *
 * @param x
 */
export const U8 = (x: number) => HEX[(x >>> 4) & 0xf] + HEX[x & 0xf];

/**
 * Returns hex string of 8bit uint, read from given byte array at index `i`.
 *
 * @param x -
 * @param i -
 */
export const U8A = (x: ArrayLike<number>, i: number) => U8(x[i]);

/**
 * Returns 16bit uint as hex string
 *
 * @param x
 */
export const U16 = (x: number) => U8(x >>> 8) + U8(x & 0xff);

/**
 * Returns hex string of 16bit uint, read in big-endian order from given byte
 * array at index `i`.
 *
 * @param x -
 * @param i -
 */
export const U16BE = (x: ArrayLike<number>, i: number) =>
    U8(x[i]) + U8(x[i + 1]);

/**
 * Returns hex string of 16bit uint, read in litte-endian order from given byte
 * array at index `i`.
 *
 * @param x -
 * @param i -
 */
export const U16LE = (x: ArrayLike<number>, i: number) =>
    U8(x[i + 1]) + U8(x[i]);

/**
 * Returns 24bit uint as hex string
 *
 * @param x
 */
export const U24 = (x: number) => U8(x >>> 16) + U16(x);

/**
 * Returns hex string of 24bit uint, read in big-endian order from given byte
 * array at index `i`.
 *
 * @param x -
 * @param i -
 */
export const U24BE = (x: ArrayLike<number>, i: number) =>
    U8(x[i]) + U16BE(x, i + 1);

/**
 * Returns hex string of 24bit uint, read in litte-endian order from given byte
 * array at index `i`.
 *
 * @param x -
 * @param i -
 */
export const U24LE = (x: ArrayLike<number>, i: number) =>
    U8(x[i + 2]) + U16LE(x, i);

/**
 * Returns 32bit uint as hex string
 *
 * @param x
 */
export const U32 = (x: number) => U16(x >>> 16) + U16(x);

/**
 * Returns hex string of 32bit uint, read in big-endian order from given byte
 * array at index `i`.
 *
 * @param x -
 * @param i -
 */
export const U32BE = (x: ArrayLike<number>, i: number) =>
    U16BE(x, i) + U16BE(x, i + 2);

/**
 * Returns hex string of 32bit uint, read in litte-endian order from given byte
 * array at index `i`.
 *
 * @param x -
 * @param i -
 */
export const U32LE = (x: ArrayLike<number>, i: number) =>
    U16LE(x, i + 2) + U16LE(x, i);

/**
 * Returns 48bit uint as hex string
 *
 * @param x
 */
export const U48 = (x: number) => U48HL(x / P32, x % P32);

/**
 * Similar to {@link U48}, but takes the 64bit arg as 2x 32bit values.
 *
 * @param hi -
 * @param lo -
 */
export const U48HL = (hi: number, lo: number) => U16(hi) + U32(lo);

/**
 * Returns hex string of 48bit uint, read in big-endian order from given byte
 * array at index `i`.
 *
 * @param x -
 * @param i -
 */
export const U48BE = (x: ArrayLike<number>, i: number) =>
    U16BE(x, i) + U32BE(x, i + 2);

/**
 * Returns hex string of 48bit uint, read in litte-endian order from given byte
 * array at index `i`.
 *
 * @param x -
 * @param i -
 */
export const U48LE = (x: ArrayLike<number>, i: number) =>
    U16LE(x, i + 4) + U32LE(x, i);

/**
 * Returns 64bit uint as hex string.
 *
 * @remarks
 * Note: JS numbers are only integer precise up to `2**53 - 1`. Use
 * {@link U64BE} or {@link U64LE} for byte array based values (full 64bit range
 * supported). Alternatively, use `BigInt(x).toString(16)`.
 *
 * @param x
 */
export const U64 = (x: number) => U64HL(x / P32, x % P32);

/**
 * Similar to {@link U64}, but takes the 64bit arg as 2x 32bit values.
 *
 * @param hi -
 * @param lo -
 */
export const U64HL = (hi: number, lo: number) => U32(hi) + U32(lo);

/**
 * Returns hex string of 64bit uint, read in big-endian order from given byte
 * array at index `i`.
 *
 * @param x -
 * @param i -
 */
export const U64BE = (x: ArrayLike<number>, i: number) =>
    U32BE(x, i) + U32BE(x, i + 4);

/**
 * Returns hex string of 64bit uint, read in litte-endian order from given byte
 * array at index `i`.
 *
 * @param x -
 * @param i -
 */
export const U64LE = (x: ArrayLike<number>, i: number) =>
    U32LE(x, i + 4) + U32LE(x, i);

/**
 * Returns UUID formatted string of given byte array from optional start index
 * `i` (default: 0). Array must have min. length 16 (starting from `i`).
 *
 * @param id -
 * @param i -
 */
export const uuid = (id: ArrayLike<number>, i = 0) =>
    // prettier-ignore
    `${U32BE(id, i)}-${U16BE(id, i + 4)}-${U16BE(id, i + 6)}-${U16BE(id, i + 8)}-${U48BE(id, i + 10)}`;
