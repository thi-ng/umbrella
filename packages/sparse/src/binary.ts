export class AdjacencyBitMatrix {

    data: Uint32Array;
    stride: number;
    n: number;

    constructor(n: number) {
        this.n = n = (n + 31) & ~31;
        this.stride = n >>> 5;
        this.data = new Uint32Array(n * this.stride);
    }

    /**
     * Resizes matrix to new size given.
     *
     * @param n
     */
    expand(n: number) {
        n = (n + 31) & ~31;
        const dstride = n >>> 5,
            sstride = this.stride,
            src = this.data,
            dest = new Uint32Array(n * dstride);
        for (let i = this.n - 1, si = i * sstride, di = i * dstride; i >= 0; i-- , si -= sstride, di -= dstride) {
            dest.set(src.slice(si, si + sstride), di);
        }
        this.n = n;
        this.stride = dstride;
        this.data = dest;
        return this;
    }

    get(m: number, n: number) {
        return (this.data[(n >>> 5) + m * this.stride] & (0x80000000 >>> (n & 31))) !== 0;
    }

    getSym(m: number, n: number) {
        return ((this.data[(n >>> 5) + m * this.stride] & (0x80000000 >>> (n & 31))) ||
            (this.data[(m >>> 5) + n * this.stride] & (0x80000000 >>> (m & 31)))) !== 0;
    }

    set(m: number, n: number, v = true) {
        const id = (n >>> 5) + m * this.stride,
            mask = 0x80000000 >>> (n & 31);
        if (v) {
            this.data[id] |= mask;
        } else {
            this.data[id] &= ~mask;
        }
        return this;
    }

    setSym(m: number, n: number, v = true) {
        const id1 = (n >>> 5) + m * this.stride,
            id2 = (m >>> 5) + n * this.stride,
            m1 = 0x80000000 >>> (n & 31),
            m2 = 0x80000000 >>> (m & 31);
        if (v) {
            this.data[id1] |= m1;
            this.data[id2] |= m2;
        } else {
            this.data[id1] &= ~m1;
            this.data[id2] &= ~m2;
        }
        return this;
    }

    valence(m: number) {
        m *= this.stride;
        let res = 0;
        for (let i = m + this.stride - 1; i >= m; i--) {
            const v = this.data[i];
            v !== 0 && (res += bitCount(v));
        }
        return res;
    }

    neighbors(m: number) {
        m *= this.stride;
        let res: number[] = [];
        for (let i = this.n - 1, j = m + this.stride - 1; i >= 0; i -= 32, j--) {
            const v = this.data[j];
            if (v !== 0) {
                for (let k = 31 - Math.clz32(v); k >= 0; k--) {
                    (v & (1 << k)) !== 0 && res.push(i - k);
                }
            }
        }
        return res;
    }

    edges() {
        const res: number[][] = [];
        for (let i = this.n - 1; i >= 0; i--) {
            for (let n of this.neighbors(i)) {
                res.push([i, n]);
            }
        }
        return res;
    }

    edgesSym() {
        const res: number[][] = [];
        for (let i = this.n - 1; i >= 0; i--) {
            for (let n of this.neighbors(i)) {
                n > i && res.push([i, n]);
            }
        }
        return res;
    }

    toString() {
        const res: string[] = [],
            s = this.stride;
        for (let i = 0, j = 0; i < this.n; i++ , j += s) {
            res.push([...this.data.slice(j, j + s)].map((x) => ZPAD(x.toString(2))).join(""));
        }
        return res.join("\n");
    }
}

function padleft(n: number, c = " ") {
    const str = new Array(n).fill(c).join("");
    return (x) => str.substr(0, n - x.length) + x;
}

function bitCount(x: number) {
    x = x - ((x >>> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >>> 2) & 0x33333333);
    return ((x + (x >>> 4) & 0xf0f0f0f) * 0x1010101) >>> 24;
}

// function bitCount8(x: number) {
//     x = x - ((x >> 1) & 0x55);
//     x = (x & 0x33) + ((x >> 2) & 0x33);
//     return x + (x >> 4) & 0x0f;
// }

const ZPAD = padleft(32, "0");
