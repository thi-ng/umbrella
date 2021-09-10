import type { FnN2 } from "@thi.ng/api";
import { assert } from "@thi.ng/api/assert";
import { ensureIndex } from "@thi.ng/errors/out-of-bounds";
import type { NzEntry } from "./api";

export type BinOp = FnN2;

const ADD: BinOp = (a, b) => a + b;
const SUB: BinOp = (a, b) => a - b;
const MUL: BinOp = (a, b) => a * b;
const DIV: BinOp = (a, b) => a / b;

export class SparseVec {
    static fromDense(dense: ArrayLike<number>) {
        const sparse: number[] = [];
        const n = dense.length;
        for (let i = 0; i < n; i++) {
            const v = dense[i];
            v !== 0 && sparse.push(i, v);
        }
        return new SparseVec(n, sparse);
    }

    m: number;
    data: number[];

    constructor(m: number, data?: number[]) {
        this.m = m;
        this.data = data || [];
    }

    copy() {
        return new SparseVec(this.m, this.data.slice());
    }

    get length() {
        return this.m;
    }

    get nnz() {
        return this.data.length >>> 1;
    }

    *nzEntries() {
        const d = this.data;
        for (let i = 0, n = d.length; i < n; i += 2) {
            yield <NzEntry>[d[i], 0, d[i + 1]];
        }
    }

    at(m: number, safe = true) {
        safe && ensureIndex(m, 0, this.m);
        const d = this.data;
        for (let i = 0, n = d.length; i < n && d[i] <= m; i += 2) {
            if (m === d[i]) {
                return d[i + 1];
            }
        }
        return 0;
    }

    setAt(m: number, v: number, safe = true) {
        safe && ensureIndex(m, 0, this.m);
        const d = this.data;
        for (let i = 0, n = d.length; i < n; i += 2) {
            if (m < d[i]) {
                v !== 0 && d.splice(i, 0, m, v);
                return this;
            } else if (m === d[i]) {
                v !== 0 ? (d[i + 1] = v) : d.splice(i, 2);
                return this;
            }
        }
        v !== 0 && d.push(m, v);
        return this;
    }

    binopN(op: BinOp, n: number) {
        const { data, m } = this;
        const res = [];
        for (let i = 0, j = 0, k = data[j]; i < m; i++) {
            let v = op(i === k ? ((j += 2), (k = data[j]), data[j - 1]) : 0, n);
            v !== 0 && res.push(i, v);
        }
        return new SparseVec(this.m, res);
    }

    binop(op: BinOp, v: SparseVec) {
        this.ensureSize(v);
        const da = this.data;
        const db = v.data;
        const res = [];
        for (
            let i = 0, j = 0, la = da.length, lb = db.length;
            i < la || j < lb;

        ) {
            const ia = da[i],
                ib = db[j];
            if (ia === ib) {
                const v = op(da[i + 1], db[j + 1]);
                v !== 0 && res.push(ia, v);
                i += 2;
                j += 2;
            } else {
                if (ib === undefined || ia < ib) {
                    const v = op(da[i + 1], 0);
                    v !== 0 && res.push(ia, v);
                    i += 2;
                } else {
                    const v = op(0, db[j + 1]);
                    v !== 0 && res.push(ib, v);
                    j += 2;
                }
            }
        }
        return new SparseVec(this.m, res);
    }

    add(v: SparseVec) {
        return this.binop(ADD, v);
    }

    sub(v: SparseVec) {
        return this.binop(SUB, v);
    }

    mul(v: SparseVec) {
        return this.binop(MUL, v);
    }

    div(v: SparseVec) {
        return this.binop(DIV, v);
    }

    addN(n: number) {
        return this.binopN(ADD, n);
    }

    subN(n: number) {
        return this.binopN(SUB, n);
    }

    mulN(n: number) {
        const d = this.data,
            l = d.length,
            res = new Array(l);
        for (let i = 0; i < l; i += 2) {
            res[i] = d[i];
            res[i + 1] = d[i + 1] * n;
        }
        return new SparseVec(this.m, res);
    }

    divN(n: number) {
        const d = this.data,
            l = d.length,
            res = new Array(l);
        for (let i = 0; i < l; i += 2) {
            res[i] = d[i];
            res[i + 1] = d[i + 1] / n;
        }
        return new SparseVec(this.m, res);
    }

    dot(v: SparseVec) {
        this.ensureSize(v);
        const da = this.data;
        const db = v.data;
        let res = 0;
        for (let i = da.length - 2, j = db.length - 2; i >= 0 && j >= 0; ) {
            const ia = da[i],
                ib = db[j];
            if (ia === ib) {
                res += da[i + 1] * db[j + 1];
                i -= 2;
                j -= 2;
            } else {
                ia > ib ? (i -= 2) : (j -= 2);
            }
        }
        return res;
    }

    magSquared() {
        const d = this.data;
        let mag = 0;
        for (let i = d.length - 1; i >= 1; i -= 2) {
            mag += d[i] * d[i];
        }
        return mag;
    }

    mag() {
        return Math.sqrt(this.magSquared());
    }

    normalize(n = 1) {
        const mag = this.magSquared();
        if (mag > 1e-9) {
            n /= Math.sqrt(mag);
            const d = this.data;
            for (let i = d.length - 1; i >= 1; i -= 2) {
                d[i] *= n;
            }
        }
        return this;
    }

    toDense() {
        const res = new Array(this.m).fill(0);
        const d = this.data;
        for (let i = d.length - 2; i >= 0; i -= 2) {
            res[d[i]] = d[i + 1];
        }
        return res;
    }

    protected ensureSize(v: SparseVec) {
        assert(this.m === v.m, `wrong vector size: ${v.m}`);
    }
}
