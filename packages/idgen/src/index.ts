import {
    assert,
    Event,
    Fn,
    INotify,
    INotifyMixin
} from "@thi.ng/api";

export const EVENT_ADDED = "added";
export const EVENT_REMOVED = "removed";

@INotifyMixin
export class IDGen implements Iterable<number>, INotify {
    readonly capacity: number;
    readonly ids: number[];

    protected nextID: number;
    protected _freeID: number;
    protected num: number;
    protected mask: number;
    protected vmask: number;
    protected shift: number;

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
        this._freeID = -1;
    }

    id(id: number) {
        return id & this.mask;
    }

    version(id: number) {
        return (id >>> this.shift) & this.vmask;
    }

    get available() {
        return this.capacity - this.num;
    }

    get used() {
        return this.num;
    }

    get freeID() {
        return this._freeID;
    }

    *[Symbol.iterator]() {
        for (let i = this.nextID; --i >= 0; ) {
            const id = this.ids[i];
            if (this.id(id) === i) yield id;
        }
    }

    next() {
        let id: number;
        if (this._freeID !== -1) {
            id = this._freeID;
            const rawID = this.id(id);
            this._freeID = this.ids[rawID];
            this.ids[rawID] = id;
        } else {
            assert(this.nextID < this.capacity, "max capacity reached");
            id = this.nextID++;
            this.ids[id] = id;
        }
        this.num++;
        this.notify({ id: EVENT_ADDED, target: this, value: id });
        return id;
    }

    free(id: number) {
        if (!this.has(id)) return false;
        this.ids[this.id(id)] = this._freeID;
        this._freeID = this.nextVersion(id);
        this.num--;
        this.notify({ id: EVENT_REMOVED, target: this, value: id });
        return true;
    }

    has(id: number) {
        const rawID = this.id(id);
        return id >= 0 && rawID < this.nextID && this.ids[rawID] === id;
    }

    // @ts-ignore: mixin
    addListener(id: string, fn: Fn<Event, void>, scope?: any): boolean {}

    // @ts-ignore: mixin
    removeListener(id: string, fn: Fn<Event, void>, scope?: any): boolean {}

    // @ts-ignore: mixin
    notify(event: Event) {}

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
