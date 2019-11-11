import { assert } from "@thi.ng/api";

export class IDGen {
    protected ids: number[];
    protected nextID: number;
    protected capacity: number;
    protected num: number;
    protected mask: number;
    protected vmask: number;
    protected shift: number;
    protected freeID: number;

    constructor(
        bits: number,
        vbits = 32 - bits,
        cap = (1 << bits) >>> 0,
        next = 0
    ) {
        assert(bits + vbits <= 32, "too many bits in total (max. 32)");
        const maxCap = (1 << bits) >>> 0;
        assert(
            cap <= maxCap,
            `requested capacity too large for given bit size (max. ${maxCap})`
        );
        this.ids = [];
        this.nextID = next;
        this.capacity = cap;
        this.num = 0;
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

    numAvailable() {
        return this.capacity - this.num;
    }

    numUsed() {
        return this.num;
    }

    *[Symbol.iterator]() {
        for (let i = this.nextID; --i >= 0; ) {
            const id = this.ids[i];
            if (this.id(id) === i) yield id;
        }
    }

    next() {
        if (this.freeID !== -1) {
            const id = this.freeID;
            const rawID = this.id(id);
            this.freeID = this.ids[rawID];
            this.ids[rawID] = id;
            this.num++;
            return id;
        } else {
            assert(this.nextID < this.capacity, "max capacity reached");
            const id = this.nextID++;
            this.ids[id] = id;
            this.num++;
            return id;
        }
    }

    free(id: number) {
        if (!this.has(id)) return false;
        this.ids[this.id(id)] = this.freeID;
        this.freeID = this.nextVersion(id);
        this.num--;
        return true;
    }

    has(id: number) {
        const rawID = this.id(id);
        return id >= 0 && rawID < this.nextID && this.ids[rawID] === id;
    }

    protected nextVersion(id: number) {
        return (
            ((id & this.mask) |
                (((this.version(id) + 1) & this.vmask) << this.shift)) >>>
            0
        );
    }
}

export const idgen = (
    bits: number,
    vbits?: number,
    cap?: number,
    next?: number
) => new IDGen(bits, vbits, cap, next);
