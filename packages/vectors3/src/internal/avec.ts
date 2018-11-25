import { Vec } from "../api";

export abstract class AVec {

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

    get dim() {
        return 1;
    }

    get offset() {
        return this.i;
    }

    get shape() {
        return [this.length];
    }

    get stride() {
        return [this.s];
    }
}
