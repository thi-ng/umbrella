import type { IBuffered, ICopy } from "@thi.ng/api";
import type { ISeedable } from "./api.js";
import { ARandom } from "./arandom.js";
import { DEFAULT_SEED_32 } from "./constants.js";

/**
 * @remarks
 * References:
 * -
 * - https://github.com/thi-ng/ct-head/blob/master/random.h
 * - https://gist.github.com/voidqk/d112165a26b45244a65298933c0349a4
 */
export class Smush32
    extends ARandom
    implements IBuffered<Uint32Array>, ICopy<Smush32>, ISeedable<number>
{
    buffer: Uint32Array;

    constructor(seed = DEFAULT_SEED_32) {
        super();
        this.buffer = new Uint32Array([seed, 0]);
    }

    copy() {
        const gen = new Smush32();
        gen.buffer.set(this.buffer);
        return gen;
    }

    seed(s: number) {
        this.buffer.set([s, 0]);
        return this;
    }

    int() {
        const b = this.buffer;
        const m = 0x5bd1e995;
        const k = (b[1]++ * m) >>> 0;
        const s = (b[0] = ((k ^ (k >> 24) ^ ((b[0] * m) >>> 0)) * m) >>> 0);
        return (s ^ (s >>> 13)) >>> 0;
    }
}
