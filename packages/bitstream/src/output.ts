import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { BitInputStream } from "./input.js";

const DEFAULT_BUF_SIZE = 0x10;
const U32 = Math.pow(2, 32);

export class BitOutputStream {
    buffer: Uint8Array;
    protected start: number;
    protected pos!: number;
    protected bit!: number;
    protected bitPos!: number;

    constructor(buffer?: number | Uint8Array, offset = 0) {
        this.buffer =
            typeof buffer === "undefined"
                ? new Uint8Array(DEFAULT_BUF_SIZE)
                : typeof buffer === "number"
                ? new Uint8Array(buffer)
                : buffer;
        this.start = offset;
        this.seek(offset);
        this.buffer[this.pos] &= ~((1 << this.bit) - 1);
    }

    get position() {
        return this.bitPos;
    }

    seek(pos: number): BitOutputStream {
        if (pos < this.start || pos >= this.buffer.length << 3) {
            illegalArgs(`seek pos out of bounds: ${pos}`);
        }
        this.pos = pos >>> 3;
        this.bit = 8 - (pos & 0x7);
        this.bitPos = pos;
        return this;
    }

    bytes() {
        return this.buffer.slice(0, this.pos + (this.bit & 7 ? 1 : 0));
    }

    reader(from = 0) {
        return new BitInputStream(this.buffer, from, this.position);
    }

    write(x: number, wordSize = 1) {
        if (wordSize > 32) {
            let hi = Math.floor(x / U32);
            this.write(hi, wordSize - 32);
            this.write(x - hi * U32, 32);
        } else if (wordSize > 8) {
            let n = wordSize & -8;
            let msb = wordSize - n;
            if (msb > 0) {
                this._write(x >>> n, msb);
            }
            n -= 8;
            while (n >= 0) {
                this._write(x >>> n, 8);
                n -= 8;
            }
        } else {
            this._write(x, wordSize);
        }
        return this;
    }

    writeWords(input: Iterable<number>, wordSize = 8) {
        let iter = input[Symbol.iterator]();
        let v: IteratorResult<number>;
        while (((v = iter.next()), !v.done)) {
            this.write(v.value, wordSize);
        }
    }

    writeBit(x: number) {
        this.bit--;
        this.buffer[this.pos] =
            (this.buffer[this.pos] & ~(1 << this.bit)) | (x << this.bit);
        if (this.bit === 0) {
            this.ensureSize();
            //this.buffer[this.pos] = 0;
            this.bit = 8;
        }
        this.bitPos++;
        return this;
    }

    protected _write(x: number, wordSize: number) {
        x &= (1 << wordSize) - 1;
        let buf = this.buffer;
        let pos = this.pos;
        let bit = this.bit;
        let b = bit - wordSize;
        let m = bit < 8 ? ~((1 << bit) - 1) : 0;
        if (b >= 0) {
            m |= (1 << b) - 1;
            buf[pos] = (buf[pos] & m) | ((x << b) & ~m);
            if (b === 0) {
                this.ensureSize();
                this.bit = 8;
            } else {
                this.bit = b;
            }
        } else {
            this.bit = bit = 8 + b;
            buf[pos] = (buf[pos] & m) | ((x >>> -b) & ~m);
            this.ensureSize();
            this.buffer[this.pos] =
                (this.buffer[this.pos] & ((1 << bit) - 1)) |
                ((x << bit) & 0xff);
        }
        this.bitPos += wordSize;
        return this;
    }

    protected ensureSize() {
        if (++this.pos === this.buffer.length) {
            let b = new Uint8Array(this.buffer.length << 1);
            b.set(this.buffer);
            this.buffer = b;
        }
    }
}
