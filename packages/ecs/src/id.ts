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

export class VersionedIDGen {
    ids: number[];
    nextID: number;
    capacity: number;
    mask: number;
    vmask: number;
    shift: number;
    freeID: number;

    constructor(
        bits: number,
        vbits = 32 - bits,
        cap = (1 << bits) >>> 0,
        next = 0
    ) {
        assert(bits + vbits <= 32, "too many combined bits");
        const maxCap = (1 << bits) >>> 0;
        assert(cap <= maxCap, "capacity too large for given bit size");
        this.ids = [];
        this.nextID = next;
        this.capacity = cap;
        this.mask = maxCap - 1;
        this.vmask = (1 << vbits) - 1;
        this.shift = bits;
        this.freeID = -1;
    }

    id(id: number) {
        return id & this.mask;
    }

    version(id: number) {
        return (id >>> this.shift) & this.vmask;
    }

    next() {
        if (this.freeID !== -1) {
            const id = this.freeID;
            const rawID = this.id(id);
            this.freeID = this.ids[rawID];
            this.ids[rawID] = id;
            return id;
        } else {
            assert(this.nextID < this.capacity, "max capacity reached");
            const id = this.nextID++;
            this.ids[id] = id;
            return id;
        }
    }

    free(id: number) {
        if (!this.has(id)) return false;
        this.ids[this.id(id)] = this.freeID;
        this.freeID = this.nextVersion(id);
        return true;
    }

    has(id: number) {
        const rawID = this.id(id);
        const storedID = this.ids[rawID];
        return id >= 0 && rawID < this.nextID && storedID === id;
    }

    protected nextVersion(id: number) {
        return (
            ((id & this.mask) |
                (((this.version(id) + 1) & this.vmask) << this.shift)) >>>
            0
        );
    }
}
