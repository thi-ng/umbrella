import { assert, INotifyMixin, typedArray, uintType } from "@thi.ng/api";
import { AComponent } from "./acomponent";
import type { UIntArray } from "@thi.ng/api";
import type { ObjectComponentOpts } from "../api";

@INotifyMixin
export class ObjectComponent<K extends string, T> extends AComponent<
    K,
    T[],
    T,
    T
> {
    constructor(
        sparse: UIntArray,
        dense: UIntArray,
        opts: ObjectComponentOpts<K, T>
    ) {
        super(opts.id, sparse, dense, new Array<T>(dense.length));
        this.default = opts.default;
    }

    get size() {
        return 1;
    }
    get stride() {
        return 1;
    }

    packedValues() {
        return this.vals.slice(0, this.n);
    }

    resize(cap: number) {
        assert(cap >= this.dense.length, "can't decrease capacity");
        if (cap === this.dense.length) return;
        const utype = uintType(cap);
        const sparse = typedArray(utype, cap);
        const dense = typedArray(utype, cap);
        sparse.set(this.sparse);
        dense.set(this.dense);
        this.sparse = sparse;
        this.dense = dense;
    }

    get(id: number) {
        let i = this.sparse[id];
        return i < this.n && this.dense[i] === id ? this.vals[i] : undefined;
    }

    getIndex(i: number) {
        return i < this.n ? this.vals[i] : undefined;
    }

    setIndexUnsafe(i: number, v: T, notify = true) {
        this.vals[i] = v;
        notify && this.notifyChange(this.dense[i]);
    }

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

    protected moveIndex(src: number, dest: number) {
        const vals = this.vals;
        vals[dest] = vals[src];
        delete vals[src];
    }
}
