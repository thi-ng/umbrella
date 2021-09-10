import {
    Type,
    typedArray,
    TypedArray,
    UIntArray,
} from "@thi.ng/api/api/typedarray";
import { assert } from "@thi.ng/api/assert";
import { INotifyMixin } from "@thi.ng/api/mixins/inotify";
import type { IMemPoolArray } from "@thi.ng/malloc";
import type { ICache, MemMappedComponentOpts } from "../api";
import { AComponent } from "./acomponent";

@INotifyMixin
export class MemMappedComponent<K extends string> extends AComponent<
    K,
    TypedArray,
    TypedArray,
    ArrayLike<number>
> {
    readonly type: Type;
    readonly size: number;
    readonly stride: number;

    cache?: ICache<TypedArray>;

    constructor(
        sparse: UIntArray,
        dense: UIntArray,
        opts: MemMappedComponentOpts<K>
    ) {
        opts = {
            size: 1,
            byteOffset: 0,
            ...opts,
        };
        const size = opts.size!;
        const stride = opts.stride || size;
        super(
            opts.id,
            sparse,
            dense,
            opts.buf
                ? typedArray(
                      opts.type!,
                      opts.buf,
                      opts.byteOffset!,
                      dense.length * stride
                  )
                : typedArray(opts.type!, dense.length * stride)
        );
        this.type = opts.type!;
        this.size = size;
        this.stride = stride;
        this.default = opts.default;
        this.cache = opts.cache;
    }

    packedValues() {
        return this.vals.subarray(0, this.n * this.stride);
    }

    resize(pool: IMemPoolArray, cap: number) {
        assert(cap >= this.dense.length, "can't decrease capacity");
        if (cap === this.dense.length) return;
        const sparse = pool.reallocArray(this.sparse, cap);
        const dense = pool.reallocArray(this.dense, cap);
        const vals = pool.reallocArray(this.vals, cap * this.stride);
        assert(
            !!(sparse && dense && vals),
            `couldn't resize component: ${this.id}`
        );
        this.sparse = sparse!;
        this.dense = dense!;
        this.vals = vals!;
        this.cache && this.cache.clear();
    }

    get(id: number) {
        let i = this.sparse[id];
        return this.dense[i] === id ? this.getIndex(i) : undefined;
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

    setIndexUnsafe(i: number, val: ArrayLike<number>, notify = true) {
        this.vals.set(val, i * this.stride);
        notify && this.notifyChange(this.dense[i]);
    }

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

    protected moveIndex(src: number, dest: number) {
        const s = this.stride;
        src *= s;
        this.vals.copyWithin(dest * s, src, src + this.size);
        this.cache && this.cache.delete(dest);
    }
}
