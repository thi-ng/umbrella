export abstract class AMatrix {

    readonly m: number;
    readonly n: number;

    constructor(m: number, n = m) {
        this.m = m;
        this.n = n;
    }

    abstract at(m: number, n: number, safe?: boolean): number;

    abstract setAt(m: number, n: number, v: number, safe?: boolean): this;

    abstract toDense(): ArrayLike<number>[];

    protected ensureIndex(m: number, n: number) {
        if (m < 0 || m >= this.m || n < 0 || n >= this.n) {
            throw new Error(`index out of bounds (${m}, ${n})`);
        }
    }
}
