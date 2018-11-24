import { IBuffered, ICopy } from "@thi.ng/api/api";
import { ARandom, ISeedable } from "./api";

// https://en.wikipedia.org/wiki/Xorshift#xorwow

const DEFAULT_SEED = [0xdecafbad, 0x2fa9d75b, 0xe41f67e3, 0x5c83ec1a, 0xf69a5c71];

export class XorWow extends ARandom implements
    IBuffered<Uint32Array>,
    ICopy<XorWow>,
    ISeedable<ArrayLike<number>> {

    buffer: Uint32Array;

    constructor(seed: ArrayLike<number> = DEFAULT_SEED) {
        super();
        this.buffer = new Uint32Array(5);
        this.seed(seed);
    }

    copy() {
        return new XorWow(this.buffer);
    }


    seed(seed: ArrayLike<number>) {
        this.buffer.set(seed);
        return this;
    }

    bytes() {
        return new Uint8Array(this.buffer.buffer);
    }

    int() {
        const s = this.buffer;
        let t = s[3];
        let w;
        t ^= t >>> 2;
        t ^= t << 1;
        s[3] = s[2];
        s[2] = s[1];
        w = s[1] = s[0];
        t ^= w;
        t ^= w << 4;
        s[0] = t;
        return (t + (s[4] += 0x587c5)) >>> 0;
    }
}
