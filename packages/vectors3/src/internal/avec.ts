import { StridedVec, Vec } from "../api";

export abstract class AVec implements StridedVec {

    buf: Vec;
    i: number;
    s: number;

    constructor(buf: Vec, i = 0, s = 1) {
        this.buf = buf;
        this.i = i;
        this.s = s;
    }

    abstract get length(): number;

    abstract [Symbol.iterator](): IterableIterator<number>;
}
