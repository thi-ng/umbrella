import { illegalArgs, illegalState } from "@thi.ng/errors";

const U32 = Math.pow(2, 32);

export class BitInputStream {
    public buffer: Uint8Array;
    protected start: number;
    protected pos: number;
    protected limit: number;
    protected bit: number;
    protected bitPos: number;

    constructor(buffer: Uint8Array, offset = 0, limit = buffer.length << 3) {
        this.buffer = buffer;
        this.start = offset;
        this.limit = limit;
        this.seek(offset);
    }

    *[Symbol.iterator]() {
        let j = this.start;
        let i = j >>> 3;
        let b = 7 - (j & 0x7);
        while (j < this.limit) {
            yield (this.buffer[i] >>> b) & 1;
            if (--b < 0) {
                i++;
                b = 7;
            }
            j++;
        }
    }

    public get length() {
        return this.limit;
    }

    public get position() {
        return this.bitPos;
    }

    public seek(pos: number): BitInputStream {
        if (pos < this.start || pos >= this.limit) {
            illegalArgs(`seek pos out of bounds: ${pos}`);
        }
        this.pos = pos >>> 3;
        this.bit = 8 - (pos & 0x7);
        this.bitPos = pos;
        return this;
    }

    public read(wordSize = 1) {
        if (wordSize > 32) {
            return this.read(wordSize - 32) * U32 + this.read(32);
        } else if (wordSize > 8) {
            let out = 0;
            let n = wordSize & -8;
            let msb = wordSize - n;
            if (msb > 0) {
                out = this._read(msb);
            }
            while (n > 0) {
                out = (out << 8 | this._read(8)) >>> 0;
                n -= 8;
            }
            return out;
        } else {
            return this._read(wordSize);
        }
    }

    public readFields(fields: number[]) {
        return fields.map((word) => this.read(word));
    }

    public readWords(n: number, wordSize = 8) {
        let out = [];
        while (--n >= 0) {
            out.push(this.read(wordSize));
        }
        return out;
    }

    public readStruct(fields: ([string, number])[]) {
        return fields.reduce((acc, [id, word]) => { return acc[id] = this.read(word), acc; }, {});
    }

    public readBit() {
        this.checkLimit(1);
        this.bit--;
        this.bitPos++;
        let out = (this.buffer[this.pos] >>> this.bit) & 1;
        if (this.bit === 0) {
            this.pos++;
            this.bit = 8;
        }
        return out;
    }

    protected _read(wordSize: number) {
        this.checkLimit(wordSize);
        let l = this.bit - wordSize, out;
        if (l >= 0) {
            this.bit = l;
            out = this.buffer[this.pos] >>> l & (1 << wordSize) - 1;
            if (l === 0) {
                this.pos++;
                this.bit = 8;
            }
        } else {
            out = (this.buffer[this.pos++] & (1 << this.bit) - 1) << -l;
            this.bit = 8 + l;
            out = out | (this.buffer[this.pos] >>> this.bit);
        }
        this.bitPos += wordSize;
        return out;
    }

    protected checkLimit(requested: number) {
        if (this.bitPos + requested > this.limit) {
            illegalState(`can't read past EOF`);
        }
    }
}
