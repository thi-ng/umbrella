import { assert } from "@thi.ng/api";

export class IDGen {
    ids: number[];
    nextID: number;
    capacity: number;

    constructor(cap = Infinity, next = 0) {
        this.ids = [];
        this.capacity = cap;
        this.nextID = next;
    }

    next() {
        return this.ids.length
            ? this.ids.pop()!
            : this.nextID < this.capacity
            ? this.nextID++
            : undefined;
    }

    free(id: number) {
        if (this.isValid(id)) {
            this.ids.push(id);
            return true;
        }
        return false;
    }

    isValid(id: number) {
        return id < this.nextID && !this.ids.includes(id);
    }

    numUsed() {
        return this.nextID - this.ids.length;
    }

    numAvailable() {
        return this.capacity - this.numUsed();
    }
}

export class VersionedIdGen extends IDGen {
    mask: number;
    shift: number;

    constructor(bits: number, cap = (1 << bits) >>> 0, next = 0) {
        const maxCap = (1 << bits) >>> 0;
        assert(cap <= maxCap, "capacity too large for given bit size");
        super(cap, next);
        this.mask = maxCap - 1;
        this.shift = bits;
    }

    id(id: number) {
        return id & this.mask;
    }

    version(id: number) {
        return id >>> this.shift;
    }

    next() {
        if (this.ids.length) {
            const id = this.ids.pop()!;
            return (
                ((id & this.mask) | ((id & ~this.mask) + (1 << this.shift))) >>>
                0
            );
        }
        assert(this.nextID < this.capacity, "max capacity reached");
        return this.nextID++;
    }

    free(id: number) {
        if ((id & this.mask) < this.nextID) {
            this.ids.push(id);
            return true;
        }
        return false;
    }

    isValid(id: number) {
        return super.isValid(id & this.mask);
    }
}
