import { partition } from "@thi.ng/iterators/partition";
import { Triple } from "./api";
import { AMatrix } from "./amatrix";
import { CSR } from "./csr";

export class COO extends AMatrix {

    public static fromDense(m: number, n: number, data: ArrayLike<number>) {
        const res = [];
        for (let i = 0, k = 0; i < m; i++) {
            for (let j = 0; j < n; j++ , k++) {
                if (data[k] !== 0) {
                    res.push(i, j, data[k]);
                }
            }
        }
        return new COO(m, n, res);
    }

    public static identity(m: number) {
        return COO.diag(new Array(m).fill(1));
    }

    public static diag(vals: ArrayLike<number>) {
        const res = [],
            n = vals.length;
        for (let i = 0; i < n; i++) {
            res.push(i, i, vals[i]);
        }
        return new COO(n, n, res);
    }

    public data: number[];

    constructor(m: number, n = m, data?: number[]) {
        super(m, n);
        this.data = data || [];
    }

    public triples() {
        return <IterableIterator<Triple>>partition(3, 3, this.data);
    }

    public at(m: number, n: number, safe = true) {
        safe && this.ensureIndex(m, n);
        const d = this.data;
        for (let i = 0, l = d.length; i < l && d[i] <= m; i += 3) {
            if (d[i] === m && d[i + 1] === n) {
                return d[i + 2];
            }
        }
        return 0;
    }

    public setAt(m: number, n: number, v: number, safe = true) {
        safe && this.ensureIndex(m, n);
        const d = this.data;
        for (let i = 0, l = d.length; i < l; i += 3) {
            const r = d[i],
                c = d[i + 1];
            if (m < r || (m === r && n < c)) {
                v !== 0 && d.splice(i, 0, m, n, v);
                return this;
            } else if (m === r && n === c) {
                v !== 0 ? (d[i + 2] = v) : d.splice(i, 3);
                return this;
            }
        }
        v !== 0 && d.push(m, n, v);
        return this;
    }

    public mulV(v: number[]) {
        const res = new Array(this.m).fill(0),
            d = this.data;
        for (let i = d.length - 3; i >= 0; i -= 3) {
            res[d[i]] += d[i + 2] * v[d[i + 1]];
        }
        return res;
    }

    public toDense() {
        const n = this.n,
            d = this.data,
            res = new Array(this.m * this.n).fill(0);
        for (let i = d.length - 3; i >= 0; i -= 3) {
            res[d[i] * n + d[i + 1]] = d[i + 2];
        }
        return res;
    }

    public toCSR() {
        const d = [],
            r = [0],
            c = [],
            s = this.data;
        for (let i = 0, lr = 0; i < s.length; i += 3) {
            if (s[i] !== lr) {
                lr = s[i];
                r.push(d.length);
            }
            c.push(s[i + 1]);
            d.push(s[i + 2]);
        }
        r.push(d.length);
        return new CSR(this.m, this.n, d, r, c);
    }

    protected ensureIndex(m: number, n: number) {
        if (m < 0 || m >= this.m || n < 0 || n >= this.n) {
            throw new Error(`index out of bounds (${m}, ${n})`);
        }
    }
}
