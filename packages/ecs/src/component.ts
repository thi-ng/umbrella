import {
    Event,
    Fn,
    IID,
    INotify,
    INotifyMixin,
    UIntArray
} from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";
import {
    ComponentDefaultValue,
    EVENT_ADDED,
    EVENT_CHANGED,
    EVENT_PRE_DELETE,
    IComponent,
    ObjectComponentOpts
} from "./api";

@INotifyMixin
export class Component<K extends string, T>
    implements IComponent<K, T, T>, IID<K>, INotify {
    readonly id: K;

    sparse: UIntArray;
    dense: UIntArray;
    vals: T[];
    n: number;

    default?: ComponentDefaultValue<T>;
    owner?: IID<string>;

    constructor(
        sparse: UIntArray,
        dense: UIntArray,
        opts: ObjectComponentOpts<K, T>
    ) {
        this.sparse = sparse;
        this.dense = dense;
        this.id = opts.id;
        this.default = opts.default;
        this.vals = new Array<T>(this.dense.length);
        this.n = 0;
    }

    get size() {
        return 1;
    }
    get stride() {
        return 1;
    }

    keys() {
        return this.dense.slice(0, this.n);
    }

    *values() {
        for (let i = this.n; --i >= 0; ) {
            yield this.getIndex(i)!;
        }
    }

    packedValues() {
        return this.vals.slice(0, this.n);
    }

    // TODO add version support via IDGen
    add(id: number, val?: T) {
        const { dense, sparse, n } = this;
        const max = dense.length;
        const i = sparse[id];
        if (id < max && n < max && !(i < n && dense[i] === id)) {
            dense[n] = id;
            sparse[id] = n;
            const def = this.default;
            const initVal = val || (isFunction(def) ? def() : def);
            initVal && (this.vals[n] = initVal);
            this.n++;
            this.notify({ id: EVENT_ADDED, target: this, value: id });
            return true;
        }
        return false;
    }

    delete(id: number) {
        let { dense, sparse, vals, n } = this;
        let i = sparse[id];
        if (i < n && dense[i] === id) {
            // notify listeners prior to removal to allow restructure / swaps
            this.notify({ id: EVENT_PRE_DELETE, target: this, value: id });
            // get possibly updated slot
            i = sparse[id];
            const j = dense[--n];
            dense[i] = j;
            sparse[j] = i;
            this.n = n;
            vals[i] = vals[n];
            delete vals[n];
            return true;
        }
        return false;
    }

    has(id: number): boolean {
        const i = this.sparse[id];
        return i < this.n && this.dense[i] === id;
    }

    get(id: number) {
        let i = this.sparse[id];
        return i < this.n && this.dense[i] === id ? this.vals[i] : undefined;
    }

    getIndex(i: number) {
        return i < this.n ? this.vals[i] : undefined;
    }

    set(id: number, val: T) {
        let i = this.sparse[id];
        if (i < this.n && this.dense[i] === id) {
            this.vals[i] = val;
            this.notifyChange(id);
            return true;
        }
        return false;
    }

    setIndex(i: number, val: T) {
        return this.set(this.dense[i], val);
    }

    /**
     * Swaps slots of `src` & `dest` indices. The given args are NOT
     * keys, but indices in the `dense` array. The corresponding sparse
     * & value slots are swapped too. Returns true if swap happened
     * (false, if `src` and `dest` are equal)
     *
     * @param src
     * @param dest
     */
    swapIndices(src: number, dest: number) {
        if (src === dest) return false;
        const { dense, sparse, vals } = this;
        const ss = dense[src];
        const sd = dense[dest];
        dense[src] = sd;
        dense[dest] = ss;
        sparse[ss] = dest;
        sparse[sd] = src;
        const tmp = vals[src];
        vals[src] = vals[dest];
        vals[dest] = tmp;
        return true;
    }

    // @ts-ignore: arguments
    addListener(id: string, fn: Fn<Event, void>, scope?: any): boolean {
        return false;
    }

    // @ts-ignore: arguments
    removeListener(id: string, fn: Fn<Event, void>, scope?: any): boolean {
        return false;
    }

    // @ts-ignore: arguments
    notify(event: Event) {}

    notifyChange(id: number) {
        this.notify({ id: EVENT_CHANGED, target: this, value: id });
    }
}
