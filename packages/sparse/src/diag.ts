import { AMatrix } from "./amatrix";
import { CSR } from "./csr";
import { SparseVec } from "./vec";

export class Diag extends AMatrix {

    static identity(m: number) {
        return new Diag(new Array(m).fill(1));
    }

    data: SparseVec;

    constructor(data: SparseVec | number[]) {
        if (data instanceof SparseVec) {
            super(data.m);
        } else {
            super(data.length);
            data = SparseVec.fromDense(data);
        }
        this.data = data;
    }

    at(m: number, n: number, safe = true) {
        safe && this.ensureIndex(m, n);
        return m === n ? this.data.get(m, false) : 0;
    }

    setAt(m: number, n: number, v: number, safe = true) {
        safe && this.ensureIndex(m, n);
        m === n && this.data.set(m, v, false);
        return this;
    }

    toDense() {
        const n = this.n,
            d = this.data,
            res = new Array(n * n).fill(0);
        for (let i = 0; i < n; i++) {
            res[i * n + i] = d.get(i, false);
        }
        return res;
    }

    toCSR() {
        return CSR.diag(this.data.toDense());
    }
}
