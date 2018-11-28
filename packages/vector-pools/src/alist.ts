import { IVector, Vec } from "@thi.ng/vectors3/api";
import { wrap } from "./wrap";
import { VecFactory } from "./api";

export abstract class AVecList<T extends IVector<any>> {

    buffer: Vec;
    factory: VecFactory;

    start: number;
    capacity: number;
    curr: number;
    size: number;
    estride: number;
    cstride: number;

    _free: T[];

    constructor(
        buffer: Vec,
        capacity: number,
        size: number,
        factory: VecFactory = wrap,
        cstride = 1,
        estride = size,
        start = 0) {

        this.buffer = buffer;
        this.size = size;
        this.factory = factory;
        this.cstride = cstride;
        this.estride = estride;
        this.start = this.curr = start;
        this.capacity = capacity;
        this._free = [];
    }

    abstract [Symbol.iterator](): IterableIterator<T>;

    abstract get length(): number;

    abstract add(): T;

    abstract insert(i: number): T;

    abstract remove(v: T): boolean;

    indices(res: Vec = [], i = 0, local = true) {
        const start = this.start;
        const estride = this.estride;
        if (local) {
            for (let v of this) {
                res[i++] = (v.i - start) / estride;
            }
        } else {
            for (let v of this) {
                res[i++] = v.i;
            }
        }
        return res;
    }

    protected alloc() {
        let v: T;
        if (this._free.length > 0) {
            v = this._free.pop();
        } else {
            if (this.length < this.capacity) {
                v = <T>this.factory(this.buffer, this.size, this.curr, this.cstride);
                this.curr += this.estride;
            }
        }
        return v;
    }
}
