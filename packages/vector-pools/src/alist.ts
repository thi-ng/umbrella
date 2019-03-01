import { StridedVec, Vec } from "@thi.ng/vectors";
import { VecFactory } from "./api";
import { wrap } from "./wrap";

export abstract class AVecList<T extends StridedVec> {
    buffer: Vec;
    factory: VecFactory;

    start: number;
    capacity: number;
    curr: number;
    size: number;
    estride: number;
    cstride: number;

    freeIDs: number[];

    /**
     *
     * @param buffer
     * @param capacity
     * @param size
     * @param start
     * @param cstride
     * @param estride
     * @param factory
     */
    constructor(
        buffer: Vec,
        capacity: number,
        size: number,
        start = 0,
        cstride = 1,
        estride = size,
        factory: VecFactory = wrap
    ) {
        this.buffer = buffer || new Float32Array(size * capacity);
        this.size = size;
        this.factory = factory;
        this.cstride = cstride;
        this.estride = estride;
        this.start = this.curr = start;
        this.capacity = capacity;
        this.freeIDs = [];
    }

    abstract [Symbol.iterator](): IterableIterator<T>;

    abstract get length(): number;

    abstract add(): T;

    abstract insert(i: number): T;

    abstract remove(v: T): boolean;

    abstract has(v: T): boolean;

    abstract nth(n: number): T;

    indices(res: Vec = [], i = 0, local = true) {
        const start = this.start;
        const estride = this.estride;
        if (local) {
            for (let v of this) {
                res[i++] = (v.offset - start) / estride;
            }
        } else {
            for (let v of this) {
                res[i++] = v.offset;
            }
        }
        return res;
    }

    protected alloc() {
        let idx: number;
        if (this.freeIDs.length > 0) {
            idx = this.freeIDs.pop();
        } else if (this.length >= this.capacity) {
            return;
        } else {
            idx = this.curr;
            this.curr += this.estride;
        }
        return <T>this.factory(this.buffer, this.size, idx, this.cstride);
    }
}
