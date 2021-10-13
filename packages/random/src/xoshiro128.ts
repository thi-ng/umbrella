import type { IBuffered, ICopy } from "@thi.ng/api";
import type { ISeedable } from "./api.js";
import { ARandom } from "./arandom.js";
import { DEFAULT_SEED_128 } from "./constants.js";

/**
 * @remarks
 * References:
 * - http://prng.di.unimi.it/
 * - http://prng.di.unimi.it/xoshiro128plusplus.c
 */
export class Xoshiro128
    extends ARandom
    implements
        IBuffered<Uint32Array>,
        ICopy<Xoshiro128>,
        ISeedable<ArrayLike<number>>
{
    buffer: Uint32Array;

    constructor(seed: ArrayLike<number> = DEFAULT_SEED_128) {
        super();
        this.buffer = new Uint32Array(4);
        this.seed(seed);
    }

    copy() {
        return new Xoshiro128(this.buffer);
    }

    bytes() {
        return new Uint8Array(this.buffer.buffer);
    }

    seed(seed: ArrayLike<number>) {
        this.buffer.set(seed);
        return this;
    }

    int() {
        const s = this.buffer;
        let t = s[0] + s[3];
        const res = ((t << 7) | (t >>> 25)) >>> 0;
        t = s[1] << 9;
        s[2] ^= s[0];
        s[3] ^= s[1];
        s[1] ^= s[2];
        s[0] ^= s[3];
        s[2] ^= t;
        t = s[3];
        s[3] = ((t << 11) | (t >>> 21)) >>> 0;
        return res;
    }
}
