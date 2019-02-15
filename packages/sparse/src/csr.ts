import { Triple } from "./api";

export class CSR {

    /**
     * Constructs CSR from dense row-major matrix values.
     *
     * @param m rows
     * @param n columns
     * @param dense matrix values
     */
    static fromDense(m: number, n: number, dense: ArrayLike<number>) {
        const a: number[] = [],
            ia: number[] = [0],
            ja: number[] = [];
        for (let i = 0, row = 0; row < m; row++) {
            let nnz = 0;
            for (let col = 0; col < n; i++ , col++) {
                if (dense[i] !== 0) {
                    a.push(dense[i]);
                    ja.push(col);
                    nnz++;
                }
            }
            ia.push(ia[ia.length - 1] + nnz);
        }
        return new CSR(m, n, a, ia, ja);
    }

    static empty(m: number, n = m) {
        return new CSR(m, n, [], new Array(m + 1).fill(0), []);
    }

    static identity(m: number) {
        return CSR.diag(new Array(m).fill(1));
    }

    static diag(vals: number[]) {
        const n = vals.length,
            ia: number[] = [],
            ja: number[] = [];
        for (let i = 0; i < n; i++) {
            ia.push(i);
            ja.push(i);
        }
        ia.push(n);
        return new CSR(n, n, vals, ia, ja);
    }


    /**
     * Rows
     */
    m: number;
    /**
     * Columns
     */
    n: number;

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

    constructor(m: number, n: number, data: number[], rows: number[], cols: number[]) {
        this.m = m;
        this.n = n;
        this.data = data;
        this.rows = rows;
        this.cols = cols;
    }

    copy() {
        return new CSR(this.m, this.n, this.data.slice(), this.rows.slice(), this.cols.slice());
    }

    zero() {
        this.data.length = this.cols.length = 0;
        this.rows.fill(0);
        return this;
    }

    *triples() {
        const rows = this.rows,
            cols = this.cols,
            data = this.data;
        for (let i = 0; i < this.m; i++) {
            const jj = rows[i + 1];
            for (let j = rows[i]; j < jj; j++) {
                yield <Triple>[i, cols[j], data[j]];
            }
        }
    }

    reshape(m: number, n = m) {
        const data = this.data,
            rows = this.rows,
            cols = this.cols;
        if (m > this.m) {
            for (let i = m - this.m, nnz = this.nnz(); i > 0; i--) {
                rows.push(nnz);
            }
        } else if (m < this.m) {
            const idx = this.rows[m];
            data.length = idx;
            cols.length = idx;
            rows.length = m + 1;
        }
        this.m = m;
        if (n < this.n) {
            for (let i = 0; i < m; i++) {
                for (let j = this.rows[i], jj = rows[i + 1]; j < jj;) {
                    if (cols[j] >= n) {
                        this.remove(i, cols[j], j);
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
        const srows = this.rows,
            scols = this.cols,
            sdata = this.data,
            drows = [0],
            dcols = [],
            ddata = [],
            maxcol = n + cols;
        for (let i = m, maxrow = m + rows; i < maxrow; i++) {
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
        safe && this.ensureIndex(m, n);
        const ii = this.rows[m + 1],
            cols = this.cols;
        for (let i = this.rows[m]; i < ii; i++) {
            if (cols[i] === n) {
                return this.data[i];
            }
        }
        return 0;
    }

    setAt(m: number, n: number, x: number, safe = true, compact = true) {
        safe && this.ensureIndex(m, n);
        const ii = this.rows[m + 1],
            cols = this.cols,
            notZero = x !== 0;
        for (let i = this.rows[m]; i < ii; i++) {
            const j = cols[i];
            if (j === n) {
                if (notZero || !compact) {
                    this.data[i] = x;
                } else {
                    this.remove(m, n, i);
                }
                return this;
            } else if (j > n && notZero) {
                this.insert(m, n, x, i);
                return this;
            }
        }
        if (notZero) {
            this.insert(m, n, x, ii);
        }
        return this;
    }

    denseRow(m: number) {
        const res = new Array(this.n).fill(0),
            ii = this.rows[m + 1],
            cols = this.cols,
            data = this.data;
        for (let i = this.rows[m]; i < ii; i++) {
            res[cols[i]] = data[i];
        }
        return res;
    }

    denseCol(n: number) {
        const res = new Array(this.m);
        for (let i = 0; i < this.m; i++) {
            res[i] = this.at(i, n, false);
        }
        return res;
    }

    trace() {
        let trace = 0;
        for (let i = 0; i < this.m; i++) {
            trace += this.at(i, i, false);
        }
        return trace;
    }

    add(mat: CSR) {
        if (this === mat) {
            return this.mulN(2);
        }
        this.ensureSize(mat);
        if (mat.nnz() === 0) {
            return this;
        }
        for (let i = 0; i < this.m; i++) {
            const jj = mat.rows[i + 1];
            outer:
            for (let j = mat.rows[i]; j < jj; j++) {
                const n = mat.cols[j],
                    kk = this.rows[i + 1];
                for (let k = this.rows[i]; k < kk; k++) {
                    if (this.cols[k] === n) {
                        this.setAt(i, n, this.data[k] + mat.data[j], false);
                        continue outer;
                    }
                }
                this.setAt(i, n, mat.data[j], false);
            }
        }
        return this;
    }

    sub(mat: CSR) {
        if (this === mat) {
            return this.zero();
        }
        this.ensureSize(mat);
        if (mat.nnz() === 0) {
            return this;
        }
        for (let i = 0; i < this.m; i++) {
            const jj = mat.rows[i + 1];
            outer:
            for (let j = mat.rows[i]; j < jj; j++) {
                const n = mat.cols[j],
                    kk = this.rows[i + 1];
                for (let k = this.rows[i]; k < kk; k++) {
                    if (this.cols[k] === n) {
                        this.setAt(i, n, this.data[k] - mat.data[j], false);
                        continue outer;
                    }
                }
                this.setAt(i, n, -mat.data[j], false);
            }
        }
        return this;
    }

    // https://stackoverflow.com/questions/22649361/sparse-matrix-matrix-multiplication
    mul(mat: CSR) {
        if (this.n !== mat.m) {
            throw new Error("incompatible matrix sizes");
        }
        const res = CSR.empty(this.m, mat.n);
        for (let j = 0; j < mat.n; j++) {
            if (mat.nnzCol(j) > 0) {
                for (let k = 0; k < mat.m; k++) {
                    const bkj = mat.at(k, j);
                    if (bkj !== 0) {
                        for (let i = 0; i < this.m; i++) {
                            const aik = this.at(i, k, false);
                            if (aik !== 0) {
                                res.setAt(i, j, res.at(i, j, false) + aik * bkj, false);
                            }
                        }
                    }
                }
            }
        }
        return res;
    }

    mulV(vec: number[]) {
        if (this.m !== vec.length) {
            throw new Error(`vector length != ${this.m}`);
        }
        const rows = this.rows,
            cols = this.cols,
            data = this.data,
            res = new Array(vec.length).fill(0);
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
            return this.zero();
        }
        const a = this.data;
        for (let i = a.length - 1; i >= 0; i--) {
            a[i] *= n;
        }
        return this;
    }

    neg() {
        return this.mulN(-1);
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
        const cols = this.cols,
            data = this.data,
            res = [];
        for (let i = cols.length - 1; i >= 0; i--) {
            if (cols[i] === n) {
                res.push(data[i]);
            }
        }
    }

    nzColRows(n: number) {
        const res = new Array();
        for (let i = 0; i < this.m; i++) {
            if (this.at(i, n, false) !== 0) {
                res.push(i);
            }
        }
        return res;
    }

    transpose() {
        const res = CSR.empty(this.n, this.m),
            cols = this.cols,
            data = this.data;
        for (let i = 0; i < this.m; i++) {
            const jj = this.rows[i + 1];
            for (let j = this.rows[i]; j < jj; j++) {
                res.setAt(cols[j], i, data[j]);
            }
        }
        return res;
    }

    toDense() {
        let res = [];
        for (let i = 0; i < this.m; i++) {
            res = res.concat(this.denseRow(i));
        }
        return res;
    }

    toString() {
        const dense = this.toDense(),
            res = [];
        for (let i = 0; i < this.m; i++) {
            res.push(dense.slice(i * this.n, (i + 1) * this.n).join(" "));
        }
        return res.join("\n");
    }

    protected ensureIndex(m: number, n: number) {
        if (m < 0 || m >= this.m || n < 0 || n >= this.n) {
            throw new Error(`index out of bounds: (${m},${n})`);
        }
    }

    protected ensureSize(mat: CSR) {
        if (mat.m !== this.m || mat.n !== this.n) {
            throw new Error(`incompatible size: (${mat.m},${mat.n})`);
        }
    }
    protected ensureNotSame(mat: CSR) {
        if (mat === this) {
            throw new Error("given matrix can't be same instance");
        }
    }

    protected insert(m: number, n: number, x: number, idx: number) {
        // console.log(`insert at: ${m},${n} @ ${idx}`);
        this.data = this.data.slice(0, idx).concat([x], this.data.slice(idx));
        this.cols = this.cols.slice(0, idx).concat([n], this.cols.slice(idx));
        for (let i = m + 1; i <= this.m; i++) {
            this.rows[i]++;
        }
    }

    protected remove(m: number, n: number, idx: number) {
        console.log(`remove at: ${m},${n} @ ${idx}`);
        this.data.splice(idx, 1);
        this.cols.splice(idx, 1);
        for (let i = m + 1; i <= this.m; i++) {
            this.rows[i]--;
        }
    }
}

// export const a = CSR.fromDense(4, 4, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
// console.log(a.toString());
// a.reshape(3, 2);
// console.log(a.toString());
