import type { StridedVec, Vec } from "../api";

export abstract class AVec implements StridedVec {
    buf: Vec;
    offset: number;
    stride: number;

    constructor(buf: Vec, offset = 0, stride = 1) {
        this.buf = buf;
        this.offset = offset;
        this.stride = stride;
    }

    abstract get length(): number;

    abstract [Symbol.iterator](): IterableIterator<number>;
}
