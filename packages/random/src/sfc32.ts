import type { IBuffered, ICopy } from "@thi.ng/api";
import type { ISeedable } from "./api.js";
import { ARandom } from "./arandom.js";
import { DEFAULT_SEED_128 } from "./constants.js";

/**
 * Simple Fast Counter PRNG (32bit version)
 *
 * @remarks
 * References:
 * - http://pracrand.sourceforge.net/
 */
export class SFC32
    extends ARandom
    implements
        IBuffered<Uint32Array>,
        ICopy<SFC32>,
        ISeedable<ArrayLike<number>>
{
    buffer: Uint32Array;

    constructor(seed: ArrayLike<number> = DEFAULT_SEED_128) {
        super();
        this.buffer = new Uint32Array(4);
        this.seed(seed);
    }

    copy() {
        return new SFC32(this.buffer);
    }

    bytes() {
        return new Uint8Array(this.buffer.buffer);
    }

    int() {
        const s = this.buffer;
        const t = (((s[0] + s[1]) >>> 0) + s[3]) >>> 0;
        s[3] = (s[3] + 1) >>> 0;
        s[0] = s[1] ^ (s[1] >>> 9);
        s[1] = (s[2] + (s[2] << 3)) >>> 0;
        s[2] = (((s[2] << 21) | (s[2] >>> 11)) + t) >>> 0;
        return t;
    }

    seed(seed: ArrayLike<number>) {
        this.buffer.set(seed);
        return this;
    }
}
