export interface IBase {
    /**
     * Encodes `x` into a baseN encoded string. `x` MUST be < 2^53. Use
     * `encodeBigInt()` for arbitrary values.
     *
     * @param x
     */
    encode(x: number): string;
    /**
     * Encodes bigint `x` into a baseN encoded string.
     *
     * @param x
     */
    encodeBigInt(x: bigint): string;
    /**
     * Decodes baseN encoded string `x` into a numeric value. Assumes the
     * resulting `x` will be < 2^53. Use `decodeBigInt()` for arbitrary values.
     *
     * @param x
     */
    decode(x: string): number;
    /**
     * Decodes baseN encoded string `x` into a bigint value.
     *
     * @param x
     */
    decodeBigInt(x: string): bigint;
}
