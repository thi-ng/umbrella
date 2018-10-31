import { Vec } from "./api";

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

    extract(dest: Vec = []) {
        for (let n = this.length - 1, s = this.s, i = this.i + n * s; n >= 0; i -= s, n--) {
            dest[n] = this.buf[i];
        }
        return dest;
    }
}
