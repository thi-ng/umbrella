import { assert } from "@thi.ng/errors/assert";
import { ensureIndex2 } from "@thi.ng/errors/out-of-bounds";
import { ASparseMatrix } from "./amatrix";
import type { NzEntry } from "./api";
import { at, compress, diag, remove, setAt } from "./compressed";

export class CSR extends ASparseMatrix {
    /**
     * Constructs CSR from dense row-major matrix values.
     *
     * @param m - rows
     * @param n - columns
     * @param dense - matrix values
     */
    static fromDense(m: number, n: number, dense: ArrayLike<number>) {
        const [rows, cols, data] = compress(m, n, dense);
        return new CSR(m, n, data, rows, cols);
    }

    static empty(m: number, n = m) {
        return new CSR(m, n, [], new Array<number>(m + 1).fill(0), []);
    }

    static identity(size: number) {
        return CSR.diag(new Array<number>(size).fill(1));
    }

    static diag(vals: number[]) {
        const [rows, cols] = diag(vals);
        return new CSR(vals.length, vals.length, vals, rows, cols);
    }

    /**
     * Non-zero matrix values
     */
    data: number[];
    /**
     * Row start indices into A
     */
    rows: number[];
    /**
     * Column indices for values in A
     */
    cols: number[];

    constructor(
        m: number,
        n: number,
        data: number[],
        rows: number[],
        cols: number[]
    ) {
        super(m, n);
        this.rows = rows;
        this.cols = cols;
        this.data = data;
    }

    copy() {
        return new CSR(
            this.m,
            this.n,
            this.data.slice(),
            this.rows.slice(),
            this.cols.slice()
        );
    }

    zero() {
        this.data.length = this.cols.length = 0;
        this.rows.fill(0);
        return this;
    }

    *nzEntries() {
        const { cols, rows, data } = this;
        for (let i = 0; i < this.m; i++) {
            for (let j = rows[i], jj = rows[i + 1]; j < jj; j++) {
                yield <NzEntry>[i, cols[j], data[j]];
            }
        }
    }

    reshape(m: number, n = m) {
        const { cols, rows, data } = this;
        if (m > this.m) {
            for (let i = m - this.m, nnz = this.nnz(); i > 0; i--) {
                rows.push(nnz);
            }
        } else if (m < this.m) {
            const idx = rows[m];
            data.length = idx;
            cols.length = idx;
            rows.length = m + 1;
        }
        this.m = m;
        if (n < this.n) {
            for (let i = 0; i < m; i++) {
                for (let j = rows[i], jj = rows[i + 1]; j < jj; ) {
                    if (cols[j] >= n) {
                        remove(i, m, j, rows, cols, data);
                        jj--;
                    } else {
                        j++;
                    }
                }
            }
        }
        this.n = n;
        return this;
    }

    extract(m: number, n: number, rows: number, cols: number) {
        const maxrow = m + rows;
        const maxcol = n + cols;
        //assert(maxrow <= this.m && maxcol <= this.n, "invalid region");
        const { cols: scols, rows: srows, data: sdata } = this;
        const drows = [0];
        const dcols = [];
        const ddata = [];
        for (let i = m; i < maxrow; i++) {
            if (i < this.m) {
                const jj = srows[i + 1];
                for (let j = srows[i]; j < jj; j++) {
                    const c = scols[j];
                    if (c >= n && c < maxcol) {
                        ddata.push(sdata[j]);
                        dcols.push(c - n);
                    }
                }
            }
            drows.push(ddata.length);
        }
        return new CSR(rows, cols, ddata, drows, dcols);
    }

    at(m: number, n: number, safe = true) {
        safe && ensureIndex2(m, n, this.m, this.n);
        return at(m, n, this.rows, this.cols, this.data);
    }

    setAt(m: number, n: number, x: number, safe = true, compact = true) {
        safe && ensureIndex2(m, n, this.m, this.n);
        const state = setAt(
            m,
            n,
            this.m,
            x,
            this.rows,
            this.cols,
            this.data,
            compact
        );
        this.rows = state[0];
        this.cols = state[1];
        this.data = state[2];
        return this;
    }

    denseRow(m: number) {
        const res = new Array<number>(this.n).fill(0);
        const { cols, data } = this;
        for (let i = this.rows[m], ii = this.rows[m + 1]; i < ii; i++) {
            res[cols[i]] = data[i];
        }
        return res;
    }

    denseCol(n: number) {
        const res = new Array<number>(this.m);
        for (let i = 0; i < this.m; i++) {
            res[i] = this.at(i, n, false);
        }
        return res;
    }

    add(mat: CSR) {
        this.ensureSize(mat);
        if (this === mat) {
            return this.mulN(2);
        }
        if (mat.nnz() === 0) {
            return this.copy();
        }
        const res = CSR.empty(this.m, this.n);
        for (let i = 0; i < this.m; i++) {
            const jj = mat.rows[i + 1];
            outer: for (let j = mat.rows[i]; j < jj; j++) {
                const n = mat.cols[j];
                const kk = this.rows[i + 1];
                for (let k = this.rows[i]; k < kk; k++) {
                    if (this.cols[k] === n) {
                        res.setAt(i, n, this.data[k] + mat.data[j], false);
                        continue outer;
                    }
                }
                res.setAt(i, n, mat.data[j], false);
            }
        }
        return res;
    }

    sub(mat: CSR) {
        this.ensureSize(mat);
        const res = CSR.empty(this.m, this.n);
        if (this === mat || mat.nnz() === 0) {
            return res;
        }
        for (let i = 0; i < this.m; i++) {
            const jj = mat.rows[i + 1];
            outer: for (let j = mat.rows[i]; j < jj; j++) {
                const n = mat.cols[j];
                const kk = this.rows[i + 1];
                for (let k = this.rows[i]; k < kk; k++) {
                    if (this.cols[k] === n) {
                        res.setAt(i, n, this.data[k] - mat.data[j], false);
                        continue outer;
                    }
                }
                res.setAt(i, n, -mat.data[j], false);
            }
        }
        return res;
    }

    // https://stackoverflow.com/questions/22649361/sparse-matrix-matrix-multiplication
    mul(mat: CSR) {
        assert(this.n === mat.m, "incompatible matrix sizes");
        const res = CSR.empty(this.m, mat.n);
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
        const res = new Array(vec.length).fill(0);
        for (let i = 0; i < this.m; i++) {
            const jj = rows[i + 1];
            for (let j = rows[i]; j < jj; j++) {
                res[i] += data[j] * vec[cols[j]];
            }
        }
        return res;
    }

    mulN(n: number) {
        if (n === 0) {
            return CSR.empty(this.m, this.n);
        }
        const res = this.copy();
        const a = res.data;
        for (let i = a.length; --i >= 0; ) {
            a[i] *= n;
        }
        return res;
    }

    nnz() {
        return this.data.length;
    }

    nnzRow(m: number) {
        return this.rows[m + 1] - this.rows[m];
    }
    nzRowCols(m: number) {
        return this.cols.slice(this.rows[m], this.rows[m + 1]);
    }

    nzRowVals(m: number) {
        return this.data.slice(this.rows[m], this.rows[m + 1]);
    }

    nnzCol(n: number) {
        const cols = this.cols;
        let res = 0;
        for (let i = cols.length - 1; i >= 0; i--) {
            if (cols[i] === n) {
                res++;
            }
        }
        return res;
    }

    nzColVals(n: number) {
        const { cols, data } = this;
        const res = [];
        for (let i = 0, num = cols.length; i < num; i++) {
            if (cols[i] === n) {
                res.push(data[i]);
            }
        }
        return res;
    }

    nzColRows(n: number) {
        const res = [];
        for (let i = 0; i < this.m; i++) {
            if (this.at(i, n, false) !== 0) {
                res.push(i);
            }
        }
        return res;
    }

    transpose() {
        const res = CSR.empty(this.n, this.m);
        const { cols, data } = this;
        for (let i = 0; i < this.m; i++) {
            const jj = this.rows[i + 1];
            for (let j = this.rows[i]; j < jj; j++) {
                res.setAt(cols[j], i, data[j]);
            }
        }
        return res;
    }

    toDense() {
        let res: number[] = [];
        for (let i = 0; i < this.m; i++) {
            res = res.concat(this.denseRow(i));
        }
        return res;
    }

    toString() {
        const dense = this.toDense();
        const res = [];
        for (let i = 0; i < this.m; i++) {
            res.push(dense.slice(i * this.n, (i + 1) * this.n).join(" "));
        }
        return res.join("\n");
    }
}
