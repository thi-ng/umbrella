import { DCons } from "@thi.ng/dcons/dcons";
import type { ChannelItem, IBuffer } from "./api";

export class FixedBuffer<T> implements IBuffer<T> {
    buf: DCons<ChannelItem<T>>;
    limit: number;

    constructor(limit = 1) {
        this.buf = new DCons();
        this.limit = limit;
    }

    get length() {
        return this.buf.length;
    }

    isEmpty() {
        return this.buf.length === 0;
    }

    isFull() {
        return this.buf.length >= this.limit;
    }

    release() {
        return this.buf.release();
    }

    push(x: ChannelItem<T>) {
        if (!this.isFull()) {
            this.buf.push(x);
            return true;
        }
        return false;
    }

    drop() {
        if (!this.isEmpty()) {
            return this.buf.drop();
        }
    }
}

export class DroppingBuffer<T> extends FixedBuffer<T> {
    constructor(limit = 1) {
        super(limit);
    }

    isFull() {
        return false;
    }

    push(x: ChannelItem<T>) {
        if (this.buf.length < this.limit) {
            this.buf.push(x);
        }
        return true;
    }
}

export class SlidingBuffer<T> extends FixedBuffer<T> {
    constructor(limit = 1) {
        super(limit);
    }

    isFull() {
        return false;
    }

    push(x: ChannelItem<T>) {
        if (this.buf.length >= this.limit) {
            this.buf.drop();
        }
        this.buf.push(x);
        return true;
    }
}
