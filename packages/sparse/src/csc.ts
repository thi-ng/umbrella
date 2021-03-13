import { assert } from "@thi.ng/api";
import { ensureIndex2 } from "@thi.ng/errors";
import { ASparseMatrix } from "./amatrix";
import type { NzEntry } from "./api";
import { at, compress, diag, setAt } from "./compressed";

export class CSC extends ASparseMatrix {
    /**
     * Constructs CSC from dense column-major matrix values.
     *
     * @param m - rows
     * @param n - columns
     * @param dense - matrix values
     */
    static fromDense(m: number, n: number, dense: ArrayLike<number>) {
        const [cols, rows, data] = compress(m, n, dense);
        return new CSC(m, n, data, cols, rows);
    }

    static empty(m: number, n = m) {
        return new CSC(m, n, [], new Array<number>(n + 1).fill(0), []);
    }

    static identity(m: number) {
        return CSC.diag(new Array<number>(m).fill(1));
    }

    static diag(vals: number[]) {
        const [cols, rows] = diag(vals);
        return new CSC(vals.length, vals.length, vals, cols, rows);
    }

    /**
     * Non-zero matrix values
     */
    data: number[];
    /**
     * Column start indices into A
     */
    cols: number[];
    /**
     * Row indices for values in A
     */
    rows: number[];

    constructor(
        m: number,
        n: number,
        data: number[],
        cols: number[],
        rows: number[]
    ) {
        super(m, n);
        this.cols = cols;
        this.rows = rows;
        this.data = data;
    }

    copy() {
        return new CSC(
            this.m,
            this.n,
            this.data.slice(),
            this.cols.slice(),
            this.rows.slice()
        );
    }

    zero() {
        this.data.length = this.rows.length = 0;
        this.cols.fill(0);
        return this;
    }

    *nzEntries() {
        const { cols, rows, data } = this;
        for (let i = 0; i < this.n; i++) {
            for (let j = cols[i], jj = cols[i + 1]; j < jj; j++) {
                yield <NzEntry>[rows[j], i, data[j]];
            }
        }
    }

    at(m: number, n: number, safe = true) {
        safe && ensureIndex2(m, n, this.m, this.n);
        return at(n, m, this.cols, this.rows, this.data);
    }

    setAt(m: number, n: number, x: number, safe = true, compact = true) {
        safe && ensureIndex2(m, n, this.m, this.n);
        const state = setAt(
            n,
            m,
            this.n,
            x,
            this.cols,
            this.rows,
            this.data,
            compact
        );
        this.cols = state[0];
        this.rows = state[1];
        this.data = state[2];
        return this;
    }

    mul(mat: CSC) {
        assert(this.n === mat.m, "incompatible matrix sizes");
        const res = CSC.empty(this.m, mat.n);
        for (let j = 0; j < mat.n; j++) {
            if (mat.nnzCol(j) > 0) {
                for (let k = 0; k < mat.m; k++) {
                    const bkj = mat.at(k, j);
                    if (bkj !== 0) {
                        for (let i = 0; i < this.m; i++) {
                            const aik = this.at(i, k, false);
                            if (aik !== 0) {
                                res.setAt(
                                    i,
                                    j,
                                    res.at(i, j, false) + aik * bkj,
                                    false
                                );
                            }
                        }
                    }
                }
            }
        }
        return res;
    }

    mulV(vec: number[]) {
        assert(this.m === vec.length, `vector length != ${this.m}`);
        const { cols, rows, data } = this;
        const res = new Array(this.m).fill(0);
        for (let i = 0; i < this.n; i++) {
            const jj = cols[i + 1];
            for (let j = cols[i]; j < jj; j++) {
                res[rows[j]] += data[j] * vec[i];
            }
        }
        return res;
    }

    nnz() {
        return this.data.length;
    }

    nnzCol(n: number) {
        return this.cols[n + 1] - this.cols[n];
    }

    nzColRows(n: number) {
        return this.rows.slice(this.cols[n], this.cols[n + 1]);
    }

    nzColVals(n: number) {
        return this.data.slice(this.cols[n], this.cols[n + 1]);
    }

    nnzRow(m: number) {
        const rows = this.rows;
        let res = 0;
        for (let i = rows.length; --i >= 0; ) {
            if (rows[i] === m) {
                res++;
            }
        }
        return res;
    }

    nzRowVals(m: number) {
        const { rows, data } = this;
        const res = [];
        for (let i = 0, num = rows.length; i < num; i++) {
            if (rows[i] === m) {
                res.push(data[i]);
            }
        }
        return res;
    }

    nzRowCols(m: number) {
        const res = [];
        for (let i = 0; i < this.n; i++) {
            if (this.at(m, i, false) !== 0) {
                res.push(i);
            }
        }
        return res;
    }

    transpose() {
        const res = CSC.empty(this.n, this.m);
        const { rows, data } = this;
        for (let i = 0; i < this.n; i++) {
            const jj = this.cols[i + 1];
            for (let j = this.cols[i]; j < jj; j++) {
                res.setAt(i, rows[j], data[j]);
            }
        }
        return res;
    }

    denseCol(n: number) {
        const res = new Array(this.m).fill(0);
        const ii = this.cols[n + 1];
        const { rows, data } = this;
        for (let i = this.cols[n]; i < ii; i++) {
            res[rows[i]] = data[i];
        }
        return res;
    }

    denseRow(m: number) {
        const res = new Array(this.n);
        for (let i = 0; i < this.n; i++) {
            res[i] = this.at(m, i, false);
        }
        return res;
    }

    toDense() {
        let res: number[] = [];
        for (let i = 0; i < this.n; i++) {
            res = res.concat(this.denseCol(i));
        }
        return res;
    }

    toString() {
        const res: string[] = [];
        for (let i = 0; i < this.m; i++) {
            res.push(this.denseRow(i).join(" "));
        }
        return res.join("\n");
    }
}
