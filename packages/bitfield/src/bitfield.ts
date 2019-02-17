import { align } from "@thi.ng/binary";
import { radix } from "@thi.ng/strings";

const B32 = radix(2, 32);

export class BitField {

    data: Uint32Array;
    n: number;

    constructor(n: number) {
        this.n = align(n, 32);
        this.data = new Uint32Array(this.n >>> 5);
    }

    at(n: number) {
        return (this.data[n >>> 5] & (0x80000000 >>> (n & 31))) ? 1 : 0;
    }

    setAt(n: number, v = true) {
        const id = (n >>> 5);
        const mask = 0x80000000 >>> (n & 31);
        if (v) {
            this.data[id] |= mask;
        } else {
            this.data[id] &= ~mask;
        }
        return this;
    }

    toString() {
        return [...this.data].map(B32).join("");
    }
}
