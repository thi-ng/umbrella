import { assert } from "@thi.ng/errors/assert";
import type { NzEntry } from "./api";

export abstract class ASparseMatrix {
    m: number;
    n: number;

    constructor(m: number, n: number) {
        this.m = m;
        this.n = n;
    }

    abstract nzEntries(): IterableIterator<NzEntry>;

    abstract at(m: number, n: number, safe?: boolean): number;

    abstract setAt(m: number, n: number, v: number, safe?: boolean): this;

    abstract nnz(): number;

    abstract nnzCol(n: number): number;

    abstract nnzRow(m: number): number;

    abstract nzColRows(n: number): number[];

    abstract nzColVals(n: number): number[];

    abstract nzRowCols(m: number): number[];

    abstract nzRowVals(m: number): number[];

    abstract toDense(): number[];

    trace() {
        assert(this.m === this.n, "matrix is non-square");
        let trace = 0;
        for (let i = this.m; --i >= 0; ) {
            trace += this.at(i, i, false);
        }
        return trace;
    }

    protected ensureSize(mat: ASparseMatrix) {
        assert(
            mat.m === this.m && mat.n === this.n,
            `incompatible size: (${mat.m},${mat.n})`
        );
    }
}
