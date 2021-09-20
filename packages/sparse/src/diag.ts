import { assert } from "@thi.ng/errors/assert";
import { ensureIndex2 } from "@thi.ng/errors/out-of-bounds";
import { ASparseMatrix } from "./amatrix";
import type { NzEntry } from "./api";
import { CSC } from "./csc";
import { CSR } from "./csr";
import { SparseVec } from "./vec";

export class Diag extends ASparseMatrix {
    static identity(m: number) {
        return new Diag(new Array(m).fill(1));
    }

    data: SparseVec;

    constructor(data: SparseVec | number[]) {
        if (data instanceof SparseVec) {
            super(data.m, data.m);
            this.data = data;
        } else {
            super(data.length, data.length);
            this.data = SparseVec.fromDense(data);
        }
    }

    *nzEntries() {
        for (let e of this.data.nzEntries()) {
            yield <NzEntry>[e[0], e[0], e[2]];
        }
    }

    at(m: number, n: number, safe = true) {
        safe && ensureIndex2(m, n, this.m, this.n);
        return m === n ? this.data.at(m, false) : 0;
    }

    setAt(m: number, n: number, v: number, safe = true) {
        safe &&
            assert(m === n && m >= 0 && m < this.m, `invalid index: ${m},${n}`);
        this.data.setAt(m, v, false);
        return this;
    }

    nnz(): number {
        return this.data.length;
    }

    nnzCol(n: number): number {
        return this.data.at(n) !== 0 ? 1 : 0;
    }

    nnzRow(m: number): number {
        return this.nnzCol(m);
    }

    nzColRows(n: number): number[] {
        return this.data.at(n) !== 0 ? [n] : [];
    }

    nzColVals(n: number): number[] {
        const x = this.data.at(n);
        return x !== 0 ? [x] : [];
    }
    nzRowCols(m: number): number[] {
        return this.nzColRows(m);
    }

    nzRowVals(m: number): number[] {
        return this.nzColVals(m);
    }

    toDense() {
        const { data, n } = this;
        const res = new Array(n * n).fill(0);
        for (let i = 0; i < n; i++) {
            res[i * n + i] = data.at(i, false);
        }
        return res;
    }

    toCSC() {
        return CSC.diag(this.data.toDense());
    }

    toCSR() {
        return CSR.diag(this.data.toDense());
    }
}
