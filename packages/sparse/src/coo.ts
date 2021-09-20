import { ensureIndex2 } from "@thi.ng/errors/out-of-bounds";
import { partition } from "@thi.ng/transducers/partition";
import { ASparseMatrix } from "./amatrix";
import type { NzEntry } from "./api";
import { CSC } from "./csc";
import { CSR } from "./csr";

export class COO extends ASparseMatrix {
    static fromDense(m: number, n: number, data: ArrayLike<number>) {
        const res = [];
        for (let i = 0, k = 0; i < m; i++) {
            for (let j = 0; j < n; j++, k++) {
                if (data[k] !== 0) {
                    res.push(i, j, data[k]);
                }
            }
        }
        return new COO(m, n, res);
    }

    static identity(m: number) {
        return COO.diag(new Array(m).fill(1));
    }

    static diag(vals: ArrayLike<number>) {
        const res = [];
        const n = vals.length;
        for (let i = 0; i < n; i++) {
            res.push(i, i, vals[i]);
        }
        return new COO(n, n, res);
    }

    data: number[];

    constructor(m: number, n = m, data?: number[]) {
        super(m, n);
        this.data = data || [];
    }

    nzEntries() {
        return <IterableIterator<NzEntry>>partition(3, 3, this.data);
    }

    at(m: number, n: number, safe = true) {
        safe && ensureIndex2(m, n, this.m, this.n);
        const d = this.data;
        for (let i = 0, l = d.length; i < l && d[i] <= m; i += 3) {
            if (d[i] === m && d[i + 1] === n) {
                return d[i + 2];
            }
        }
        return 0;
    }

    setAt(m: number, n: number, v: number, safe = true) {
        safe && ensureIndex2(m, n, this.m, this.n);
        const d = this.data;
        for (let i = 0, l = d.length; i < l; i += 3) {
            const r = d[i];
            const c = d[i + 1];
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

    mulV(v: number[]) {
        const res = new Array(this.m).fill(0);
        for (let d = this.data, i = d.length - 3; i >= 0; i -= 3) {
            res[d[i]] += d[i + 2] * v[d[i + 1]];
        }
        return res;
    }

    nnz(): number {
        return this.data.length / 3;
    }

    nnzCol(_: number): number {
        throw new Error("Method not implemented.");
    }

    nnzRow(_: number): number {
        throw new Error("Method not implemented.");
    }

    nzColRows(_: number): number[] {
        throw new Error("Method not implemented.");
    }

    nzColVals(_: number): number[] {
        throw new Error("Method not implemented.");
    }

    nzRowCols(_: number): number[] {
        throw new Error("Method not implemented.");
    }

    nzRowVals(_: number): number[] {
        throw new Error("Method not implemented.");
    }

    toDense() {
        const { data, n } = this;
        const res = new Array(this.m * n).fill(0);
        for (let i = data.length - 3; i >= 0; i -= 3) {
            res[data[i] * n + data[i + 1]] = data[i + 2];
        }
        return res;
    }

    toCSC() {
        const dest = [];
        const cols = [0];
        const rows = [];
        const src = [...this.nzEntries()].sort((a, b) => a[1] - b[1]);
        for (let i = 0, lr = 0; i < src.length; i++) {
            const s = src[i];
            if (s[1] !== lr) {
                lr = s[1];
                cols.push(dest.length);
            }
            rows.push(s[0]);
            dest.push(s[2]);
        }
        cols.push(dest.length);
        return new CSC(this.m, this.n, dest, cols, rows);
    }

    toCSR() {
        const dest = [];
        const rows = [0];
        const cols = [];
        const src = this.data;
        for (let i = 0, lr = 0; i < src.length; i += 3) {
            if (src[i] !== lr) {
                lr = src[i];
                rows.push(dest.length);
            }
            cols.push(src[i + 1]);
            dest.push(src[i + 2]);
        }
        rows.push(dest.length);
        return new CSR(this.m, this.n, dest, rows, cols);
    }
}
