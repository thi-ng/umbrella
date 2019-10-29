import {
    Event,
    Fn,
    IID,
    INotify,
    INotifyMixin,
    Type,
    TypedArray,
    typedArray,
    TypedArrayTypeMap,
    UIntArray
} from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";
import { zeroes } from "@thi.ng/vectors";
import { ComponentDefaultValue, ComponentOpts, ICache } from "./api";

let NEXT_ID = 0;

@INotifyMixin
export class Component<V extends TypedArray> implements IID<string>, INotify {
    readonly id: string;

    sparse: UIntArray;
    dense: UIntArray;
    vals: V;
    n: number;

    readonly size: number;
    readonly stride: number;
    default: ComponentDefaultValue;

    owner?: IID<string>;

    cache?: ICache<V>;

    constructor(
        sparse: UIntArray,
        dense: UIntArray,
        opts: Partial<ComponentOpts> = {}
    ) {
        this.sparse = sparse;
        this.dense = dense;
        opts = {
            type: Type.F32,
            size: 1,
            byteOffset: 0,
            ...opts
        };
        this.id = opts.id || `comp-${NEXT_ID++}`;
        this.size = opts.size!;
        this.stride = opts.stride || this.size;
        this.default = opts.default || zeroes(this.size);
        this.vals = opts.buf
            ? <V>(
                  typedArray(
                      opts.type!,
                      opts.buf,
                      opts.byteOffset!,
                      dense.length * this.stride
                  )
              )
            : <V>typedArray(opts.type!, dense.length * this.stride);
        this.cache = <ICache<V>>opts.cache;
        this.n = 0;
    }

    keys() {
        return this.dense.slice(0, this.n);
    }

    *values() {
        for (let i = this.n; --i >= 0; ) {
            yield this.getIndex(i);
        }
    }

    packedValues() {
        return <V>this.vals.subarray(0, this.n * this.stride);
    }

    add(key: number, val?: ArrayLike<number>) {
        const { dense, sparse, n } = this;
        const max = dense.length;
        const i = sparse[key];
        if (key < max && n < max && !(i < n && dense[i] === key)) {
            dense[n] = key;
            sparse[key] = n;
            const addr = n * this.stride;
            const def = this.default;
            this.vals.set(val || (isFunction(def) ? def() : def), addr);
            this.n++;
            this.notify({ id: "add", target: this, value: key });
        }
        return this;
    }

    delete(key: number) {
        let { dense, sparse, n } = this;
        let i = sparse[key];
        if (i < n && dense[i] === key) {
            // notify listeners prior to removal to allow restructure / swaps
            this.notify({ id: "delete", target: this, value: key });
            // get possibly updated slot
            i = sparse[key];
            const j = dense[--n];
            dense[i] = j;
            sparse[j] = i;
            this.n = n;
            const s = this.stride;
            n *= s;
            this.vals.copyWithin(i * s, n, n + this.size);
            return true;
        }
        return false;
    }

    has(key: number): boolean {
        const i = this.sparse[key];
        return i < this.n && this.dense[i] === key;
    }

    get(key: number) {
        let i = this.sparse[key];
        return i < this.n && this.dense[i] === key
            ? this.cache
                ? this.cache.getSet(i, () => {
                      i *= this.stride;
                      return <V>this.vals.subarray(i, i + this.size);
                  })
                : ((i *= this.stride), <V>this.vals.subarray(i, i + this.size))
            : undefined;
    }

    getIndex(i: number) {
        return i < this.n
            ? this.cache
                ? this.cache.getSet(i, () => {
                      i *= this.stride;
                      return <V>this.vals.subarray(i, i + this.size);
                  })
                : ((i *= this.stride), <V>this.vals.subarray(i, i + this.size))
            : undefined;
    }

    /**
     * Swaps slots of `src` & `dest` indices. The given args are NOT
     * keys, but indices in the `dense` array. The corresponding sparse
     * & value slots are swapped too.
     *
     * @param src
     * @param dest
     */
    swapIndices(src: number, dest: number) {
        if (src === dest) return;
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
}

const uintType = (num: number) =>
    num <= 0x100 ? Type.U8 : num <= 0x10000 ? Type.U16 : Type.U32;

export const defComponent = <T extends Type = Type.F32>(
    cap: number,
    opts: Partial<ComponentOpts>
) => {
    const utype = uintType(cap);
    return new Component<TypedArrayTypeMap[T]>(
        typedArray(utype, cap),
        typedArray(utype, cap),
        opts
    );
};
