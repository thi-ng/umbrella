import type { UIntArray } from "@thi.ng/api";
import { INotifyMixin } from "@thi.ng/api/mixins/inotify";
import { assert } from "@thi.ng/errors/assert";
import type { IMemPoolArray } from "@thi.ng/malloc";
import type { ObjectComponentOpts } from "../api";
import { AComponent } from "./acomponent";

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

    resize(pool: IMemPoolArray, cap: number) {
        assert(cap >= this.dense.length, "can't decrease capacity");
        if (cap === this.dense.length) return;
        const sparse = pool.reallocArray(this.sparse, cap);
        const dense = pool.reallocArray(this.dense, cap);
        assert(!!(sparse && dense), `couldn't resize component: ${this.id}`);
        this.sparse = sparse!;
        this.dense = dense!;
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
