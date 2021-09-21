import type { Event, IClear, INotify, Listener } from "@thi.ng/api";
import { INotifyMixin } from "@thi.ng/api/mixins/inotify";
import { assert } from "@thi.ng/errors/assert";

export const EVENT_ADDED = "added";
export const EVENT_REMOVED = "removed";

@INotifyMixin
export class IDGen implements Iterable<number>, IClear, INotify {
    readonly ids: number[];

    protected nextID: number;
    protected _freeID: number;
    protected start: number;
    protected num: number;
    protected _capacity: number;
    protected mask: number;
    protected vmask: number;
    protected shift: number;

    constructor(bits = 32, vbits = 32 - bits, cap = 2 ** bits, start = 0) {
        const maxCap = 2 ** bits;
        assert(bits > 0 && bits + vbits <= 32, "wrong total bit size [1..32]");
        assert(
            cap <= maxCap,
            `requested capacity too large for bit size (max. ${maxCap})`
        );
        this.ids = [];
        this.nextID = start;
        this.start = start;
        this._capacity = cap;
        this.num = 0;
        this.mask = maxCap - 1;
        this.vmask = (1 << vbits) - 1;
        this.shift = bits;
        this._freeID = -1;
    }

    /**
     * Extract actual ID (without version bits).
     *
     * @param id
     */
    id(id: number) {
        return id & this.mask;
    }

    /**
     * Extract version from ID
     *
     * @param id
     */
    version(id: number) {
        return (id >>> this.shift) & this.vmask;
    }

    get capacity() {
        return this._capacity;
    }

    /**
     * Attempts to set new capacity to given value. Capacity can only be
     * increased and the operation is only supported for unversioned
     * instances (i.e. vbits = 0).
     */
    set capacity(newCap: number) {
        assert(!this.vmask, "can't change capacity w/ versioning enabled");
        if (newCap >= this.mask + 1) {
            const bits = Math.ceil(Math.log2(newCap));
            assert(
                bits > 0 && bits <= 32,
                "wrong bit size for new capacity [1..32]"
            );
            this._capacity = newCap;
            this.mask = 2 ** bits - 1;
            this.shift = bits;
        } else {
            throw new Error("can't reduce capacity");
        }
    }

    /**
     * Number of remaining available IDs.
     */
    get available() {
        return this._capacity - this.num - this.start;
    }

    /**
     * Number of currently used IDs.
     */
    get used() {
        return this.num;
    }

    /**
     * Next available free ID.
     */
    get freeID() {
        return this._freeID;
    }

    *[Symbol.iterator]() {
        const { ids, mask } = this;
        for (let i = this.nextID; --i >= 0; ) {
            const id = ids[i];
            if ((id & mask) === i) yield id;
        }
    }

    /**
     * Frees all existing IDs and resets counter to original start ID.
     */
    clear() {
        this.ids.length = 0;
        this.nextID = this.start;
        this.num = 0;
        this._freeID = -1;
    }

    /**
     * Returns next available ID or throws error (assertion) if no further IDs
     * are currently available. Emits {@link EVENT_ADDED} if successful.
     */
    next() {
        let id: number;
        if (this._freeID !== -1) {
            id = this._freeID;
            const rawID = id & this.mask;
            this._freeID = this.ids[rawID];
            this.ids[rawID] = id;
        } else {
            assert(this.nextID < this._capacity, "max capacity reached");
            id = this.nextID++;
            this.ids[id] = id;
        }
        this.num++;
        this.notify({ id: EVENT_ADDED, target: this, value: id });
        return id;
    }

    /**
     * Marks given ID as available again and increases its version (if
     * versioning is enabled). Emits {@link EVENT_REMOVED} if successful.
     *
     * @param id
     */
    free(id: number) {
        if (!this.has(id)) return false;
        this.ids[id & this.mask] = this._freeID;
        this._freeID = this.nextVersion(id);
        this.num--;
        this.notify({ id: EVENT_REMOVED, target: this, value: id });
        return true;
    }

    /**
     * Returns true iff the given ID is valid and currently used.
     *
     * @param id
     */
    has(id: number) {
        const rawID = id & this.mask;
        return id >= 0 && rawID < this.nextID && this.ids[rawID] === id;
    }

    /** {@inheritDoc @thi.ng/api#INotify.addListener} */
    // @ts-ignore: mixin
    addListener(id: string, fn: Listener, scope?: any): boolean {}

    /** {@inheritDoc @thi.ng/api#INotify.removeListener} */
    // @ts-ignore: mixin
    removeListener(id: string, fn: Listener, scope?: any): boolean {}

    /** {@inheritDoc @thi.ng/api#INotify.notify} */
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

/**
 * Returns a new {@link IDGen} instance configured to use given counter &
 * version bits.
 *
 * @remarks
 * Overall ID range/capacity can be explicitly limited using `cap` (default and
 * maximum: 2^bits). The start ID can be defined via `start` (default: 0) and
 * MUST be < `cap`.
 *
 * @param bits
 * @param vbits
 * @param cap
 * @param start
 */
export const idgen = (
    bits: number,
    vbits?: number,
    cap?: number,
    start?: number
) => new IDGen(bits, vbits, cap, start);
