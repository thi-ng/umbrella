import type { IBuffered, ICopy } from "@thi.ng/api";
import { ARandom } from "./arandom.js";
import { randomBytes } from "./random-bytes.js";

/**
 * Currently browser only, a `window.crypto` backed {@link IRandom}
 * implementation. Random values are buffered to minimize overhead. Buffer size
 * is configurable via ctor.
 *
 * @remarks
 * Internally uses {@link randomBytes} to source values, which falls back to
 * using {@link SYSTEM} iff `window.crypto` is not available.
 *
 */
export class Crypto
    extends ARandom
    implements IBuffered<Uint8Array>, ICopy<Crypto>
{
    buffer: Uint8Array;
    protected u32: Uint32Array;
    protected i: number;

    /**
     * @param size - buffer size in bytes (will be rounded to next multiple of 4)
     */
    constructor(size = 64) {
        super();
        this.buffer = new Uint8Array((size + 3) & ~3);
        this.u32 = new Uint32Array(this.buffer.buffer);
        this.i = size >>> 2;
    }

    copy() {
        return new Crypto(this.buffer.length);
    }

    bytes() {
        return new Uint8Array(this.buffer.buffer);
    }

    int() {
        if (this.i >= this.u32.length) {
            randomBytes(this.buffer);
            this.i = 0;
        }
        return this.u32[this.i++];
    }
}

/**
 * Default instance for {@link Crypto} PRNG.
 */
export const CRYPTO = new Crypto();
