import {
    Event,
    Fn,
    IID,
    INotify,
    INotifyMixin,
    Type,
    typedArray,
    TypedArray,
    UIntArray
} from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";
import {
    ComponentDefaultValue,
    EVENT_ADDED,
    EVENT_CHANGED,
    EVENT_PRE_DELETE,
    ICache,
    IComponent,
    MemMappedComponentOpts
} from "./api";

@INotifyMixin
export class MemMappedComponent<K extends string>
    implements IComponent<K, TypedArray, ArrayLike<number>>, INotify {
    readonly id: K;

    sparse: UIntArray;
    dense: UIntArray;
    vals: TypedArray;
    n: number;

    readonly size: number;
    readonly stride: number;
    default?: ComponentDefaultValue<ArrayLike<number>>;

    owner?: IID<string>;

    cache?: ICache<TypedArray>;

    constructor(
        sparse: UIntArray,
        dense: UIntArray,
        opts: MemMappedComponentOpts<K>
    ) {
        this.sparse = sparse;
        this.dense = dense;
        opts = {
            type: <any>Type.F32,
            size: 1,
            byteOffset: 0,
            ...opts
        };
        this.id = opts.id;
        this.size = opts.size!;
        this.stride = opts.stride || this.size;
        this.default = opts.default; // || zeroes(this.size);
        this.vals = opts.buf
            ? typedArray(
                  opts.type!,
                  opts.buf,
                  opts.byteOffset!,
                  dense.length * this.stride
              )
            : typedArray(opts.type!, dense.length * this.stride);
        this.cache = opts.cache;
        this.n = 0;
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
        return this.vals.subarray(0, this.n * this.stride);
    }

    // TODO add version support via IDGen
    add(id: number, val?: ArrayLike<number>) {
        const { dense, sparse, n } = this;
        const max = dense.length;
        const i = sparse[id];
        if (id < max && n < max && !(i < n && dense[i] === id)) {
            dense[n] = id;
            sparse[id] = n;
            const def = this.default;
            const initVal = val || (isFunction(def) ? def() : def);
            initVal && this.vals.set(initVal, n * this.stride);
            this.n++;
            this.notify({ id: EVENT_ADDED, target: this, value: id });
            return true;
        }
        return false;
    }

    delete(id: number) {
        let { dense, sparse, n } = this;
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
            const s = this.stride;
            n *= s;
            this.vals.copyWithin(i * s, n, n + this.size);
            this.cache && this.cache.delete(i);
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
        return i < this.n && this.dense[i] === id
            ? this.cache
                ? this.cache.getSet(i, () => {
                      i *= this.stride;
                      return this.vals.subarray(i, i + this.size);
                  })
                : ((i *= this.stride), this.vals.subarray(i, i + this.size))
            : undefined;
    }

    getIndex(i: number) {
        return i < this.n
            ? this.cache
                ? this.cache.getSet(i, () => {
                      i *= this.stride;
                      return this.vals.subarray(i, i + this.size);
                  })
                : ((i *= this.stride), this.vals.subarray(i, i + this.size))
            : undefined;
    }

    set(id: number, val: ArrayLike<number>) {
        let i = this.sparse[id];
        if (i < this.n && this.dense[i] === id) {
            this.vals.set(val, i * this.stride);
            this.notifyChange(id);
            return true;
        }
        return false;
    }

    setIndex(i: number, val: ArrayLike<number>) {
        return this.set(this.dense[i], val);
    }

    /**
     * Swaps slots of `src` & `dest` indices. The given args are NOT
     * entity IDs, but indices in the `dense` array. The corresponding
     * sparse & value slots are swapped too. Returns true if swap
     * happened (false, if `src` and `dest` are equal)
     *
     * @param src -
     * @param dest -
     */
    swapIndices(src: number, dest: number) {
        if (src === dest) return false;
        const { dense, sparse, vals, size, stride } = this;
        const ss = dense[src];
        const sd = dense[dest];
        dense[src] = sd;
        dense[dest] = ss;
        sparse[ss] = dest;
        sparse[sd] = src;
        src *= stride;
        dest *= stride;
        const tmp = vals.slice(src, src + size);
        vals.copyWithin(src, dest, dest + size);
        vals.set(tmp, dest);
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
