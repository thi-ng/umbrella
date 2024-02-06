export interface IBase extends BaseCommon, IBaseEncode, IBaseDecode {}

export interface BaseCommon {
	/**
	 * The base of this implementation.
	 */
	readonly N: number;
	/**
	 * The character set (as string) used for the encoding.
	 */
	readonly base: string;
}

export interface IBaseEncode {
	/**
	 * Encodes `x` into a baseN encoded string. `x` MUST be < 2^53. Use
	 * `encodeBigInt()` for arbitrary values. If the optional `size > 0` the
	 * resulting string will be "zero padded" (using the zero-equivalent digit)
	 * to given size.
	 *
	 * @param x -
	 * @param size -
	 */
	encode(x: number): string;
	/**
	 * Encodes bigint `x` into a baseN encoded string. If the optional `size >
	 * 0` the resulting string will be "zero padded" (using the zero-equivalent
	 * digit) to given size.
	 *
	 * @param x -
	 * @param size -
	 */
	encodeBigInt(x: bigint, size?: number): string;
	/**
	 * Encodes given byte array into a bigint and then baseN encodes it. If the
	 * optional `size > 0` the resulting string will be "zero padded" (using the
	 * zero-equivalent digit) to given size.
	 *
	 * @param buf -
	 * @param size -
	 */
	encodeBytes(buf: Uint8Array, size?: number): string;

	size(x: number): number;
}

/**
 * Base-n decode-only interface.
 */
export interface IBaseDecode {
	/**
	 * Decodes baseN encoded string `x` into a numeric value. Assumes the
	 * resulting `x` will be < 2^53. Use `decodeBigInt()` for arbitrary values.
	 *
	 * @param x -
	 */
	decode(x: string): number;
	/**
	 * Decodes baseN encoded string `x` into a bigint value.
	 *
	 * @param x -
	 */
	decodeBigInt(x: string): bigint;
	/**
	 * Decodes given string in a byte array. The byte values will be big endian
	 * order, with the LSB aligned to end of the given array. If `buf` is
	 * shorter than the space required by the encoded source string, the most
	 * significant bytes will be ignored.
	 *
	 * @param buf -
	 */
	decodeBytes(x: string, buf: Uint8Array): Uint8Array;
}
