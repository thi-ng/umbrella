import { assert } from "@thi.ng/api";
import { ASparseMatrix } from "./amatrix";
import { NzEntry } from "./api";

export class CSC extends ASparseMatrix {

    /**
     * Constructs CSC from dense column-major matrix values.
     *
     * @param m rows
     * @param n columns
     * @param dense matrix values
     */
    static fromDense(m: number, n: number, dense: ArrayLike<number>) {
        const a: number[] = [];
        const cols: number[] = [0];
        const rows: number[] = [];
        for (let i = 0, col = 0; col < n; col++) {
            let nnz = 0;
            for (let row = 0; row < m; i++ , row++) {
                if (dense[i] !== 0) {
                    a.push(dense[i]);
                    rows.push(row);
                    nnz++;
                }
            }
            cols.push(cols[cols.length - 1] + nnz);
        }
        return new CSC(m, n, a, cols, rows);
    }

    static empty(m: number, n = m) {
        return new CSC(m, n, [], new Array<number>(n + 1).fill(0), []);
    }

    static identity(m: number) {
        return CSC.diag(new Array<number>(m).fill(1));
    }

    static diag(trace: number[]) {
        const n = trace.length;
        const cols: number[] = [];
        const rows: number[] = [];
        for (let i = 0; i < n; i++) {
            cols.push(i);
            rows.push(i);
        }
        cols.push(n);
        return new CSC(n, n, trace, cols, rows);
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

    constructor(m: number, n: number, data: number[], cols: number[], rows: number[]) {
        super(m, n);
        this.cols = cols;
        this.rows = rows;
        this.data = data;
    }

    copy() {
        return new CSC(this.m, this.n, this.data.slice(), this.cols.slice(), this.rows.slice());
    }

    zero() {
        this.data.length = this.rows.length = 0;
        this.cols.fill(0);
        return this;
    }

    *nzEntries() {
        const cols = this.cols;
        const rows = this.rows;
        const data = this.data;
        for (let i = 0; i < this.n; i++) {
            for (let j = cols[i], jj = cols[i + 1]; j < jj; j++) {
                yield <NzEntry>[rows[j], i, data[j]];
            }
        }
    }

    at(m: number, n: number, safe = true) {
        safe && this.ensureIndex(m, n);
        const rows = this.rows;
        const ii = this.cols[n + 1];
        for (let i = this.cols[n]; i < ii; i++) {
            if (rows[i] === m) {
                return this.data[i];
            }
        }
        return 0;
    }

    setAt(m: number, n: number, x: number, safe = true, compact = true) {
        safe && this.ensureIndex(m, n);
        const rows = this.rows;
        const notZero = x !== 0;
        const ii = this.cols[n + 1];
        for (let i = this.cols[n]; i < ii; i++) {
            const j = rows[i];
            if (j === m) {
                if (notZero || !compact) {
                    this.data[i] = x;
                } else {
                    this.remove(n, i);
                }
                return this;
            } else if (j > m && notZero) {
                this.insert(m, n, x, i);
                return this;
            }
        }
        if (notZero) {
            this.insert(m, n, x, ii);
        }
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
        assert(this.m === vec.length, `vector length != ${this.m}`);
        const cols = this.cols;
        const rows = this.rows;
        const data = this.data;
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
        for (let i = rows.length; --i >= 0;) {
            if (rows[i] === m) {
                res++;
            }
        }
        return res;
    }

    nzRowVals(m: number) {
        const rows = this.rows;
        const data = this.data;
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
        const rows = this.rows;
        const data = this.data;
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
        const rows = this.rows;
        const data = this.data;
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

    protected insert(m: number, n: number, x: number, idx: number) {
        this.data = this.data.slice(0, idx).concat([x], this.data.slice(idx));
        this.rows = this.rows.slice(0, idx).concat([m], this.rows.slice(idx));
        for (let i = n + 1; i <= this.n; i++) {
            this.cols[i]++;
        }
    }

    protected remove(n: number, idx: number) {
        this.data.splice(idx, 1);
        this.rows.splice(idx, 1);
        for (let i = n + 1; i <= this.n; i++) {
            this.cols[i]--;
        }
    }
}
