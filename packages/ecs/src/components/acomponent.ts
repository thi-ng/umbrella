import type { Event, IID, INotify, Listener, UIntArray } from "@thi.ng/api";
import { INotifyMixin } from "@thi.ng/api/mixins/inotify";
import { isFunction } from "@thi.ng/checks/is-function";
import type { IMemPoolArray } from "@thi.ng/malloc";
import {
    ComponentDefaultValue,
    EVENT_ADDED,
    EVENT_CHANGED,
    EVENT_PRE_DELETE,
    IComponent,
} from "../api.js";

@INotifyMixin
export abstract class AComponent<K extends string, VALUES, GET, SET>
    implements IComponent<K, VALUES, GET, SET>, INotify
{
    readonly id: K;
    abstract readonly size: number;
    abstract readonly stride: number;

    sparse: UIntArray;
    dense: UIntArray;
    vals: VALUES;
    n: number;

    default?: ComponentDefaultValue<SET>;
    owner?: IID<string>;

    constructor(id: K, sparse: UIntArray, dense: UIntArray, vals: VALUES) {
        this.id = id;
        this.sparse = sparse;
        this.dense = dense;
        this.vals = vals;
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

    abstract resize(pool: IMemPoolArray, newCap: number): void;

    has(id: number): boolean {
        const i = this.sparse[id];
        return i < this.n && this.dense[i] === id;
    }

    abstract get(id: number): GET | undefined;

    abstract getIndex(i: number): GET | undefined;

    valueIndexForID(id: number) {
        const i = this.sparse[id];
        return i < this.n && this.dense[i] === id ? i * this.stride : -1;
    }

    valueIndexForIDUnsafe(id: number) {
        return this.sparse[id] * this.stride;
    }

    set(id: number, val: SET) {
        const i = this.sparse[id];
        if (i < this.n && this.dense[i] === id) {
            this.setIndexUnsafe(i, val);
            return true;
        }
        return false;
    }

    setIndex(i: number, val: SET) {
        const id = this.dense[i];
        if (i < this.n && this.sparse[id] === i) {
            this.setIndexUnsafe(i, val);
            return true;
        }
        return false;
    }

    abstract setIndexUnsafe(i: number, val: SET, notify?: boolean): void;

    add(id: number, val?: SET) {
        const { dense, sparse, n } = this;
        const max = dense.length;
        const i = sparse[id];
        if (id < max && n < max && !(i < n && dense[i] === id)) {
            dense[n] = id;
            sparse[id] = n;
            this.n++;
            const def = this.default;
            const initVal = val || (isFunction(def) ? def() : def);
            initVal !== undefined && this.setIndexUnsafe(n, initVal, false);
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
            this.moveIndex(n, i);
            return true;
        }
        return false;
    }

    // @ts-ignore: arguments
    addListener(id: string, fn: Listener, scope?: any): boolean {}

    /** {@inheritDoc @thi.ng/api#INotify.removeListener} */
    // @ts-ignore: arguments
    removeListener(id: string, fn: Listener, scope?: any): boolean {}

    /** {@inheritDoc @thi.ng/api#INotify.notify} */
    // @ts-ignore: arguments
    notify(event: Event) {}

    notifyChange(id: number) {
        this.notify({ id: EVENT_CHANGED, target: this, value: id });
    }

    abstract swapIndices(src: number, dest: number): boolean;

    protected abstract moveIndex(src: number, dest: number): void;
}
