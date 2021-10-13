import type { IBuffered, ICopy } from "@thi.ng/api";
import type { ISeedable } from "./api.js";
import { ARandom } from "./arandom.js";
import { DEFAULT_SEED_32 } from "./constants.js";

/**
 * @remarks
 * Reference: https://github.com/MersenneTwister-Lab/XSadd/blob/develop/xsadd.h
 */
export class XsAdd
    extends ARandom
    implements IBuffered<Uint32Array>, ICopy<XsAdd>, ISeedable<number>
{
    buffer: Uint32Array;

    constructor(seed: number = DEFAULT_SEED_32) {
        super();
        this.buffer = new Uint32Array(4);
        this.seed(seed);
    }

    bytes() {
        return new Uint8Array(this.buffer.buffer);
    }

    copy() {
        const gen = new XsAdd();
        gen.buffer.set(this.buffer);
        return gen;
    }

    seed(seed: number) {
        const s = this.buffer;
        s.set([seed, 0, 0, 0]);
        for (let j = 0, i = 1; i < 8; j = i++) {
            let x = (s[j & 3] ^ (s[j & 3] >>> 30)) >>> 0;
            x = (0x8965 * x + (((0x6c07 * x) & 0xffff) << 16)) >>> 0;
            s[i & 3] ^= (i + x) >>> 0;
        }
        return this;
    }

    int() {
        const s = this.buffer;
        let t = s[0];
        t ^= t << 15;
        t ^= t >>> 18;
        t ^= s[3] << 11;
        s[0] = s[1];
        s[1] = s[2];
        s[2] = s[3];
        s[3] = t;
        return (t + s[2]) >>> 0;
    }
}
