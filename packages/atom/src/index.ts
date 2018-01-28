import * as api from "@thi.ng/api/api";
import { IWatch } from "@thi.ng/api/mixins/iwatch";

/**
 * Mutable wrapper for an (usually) immutable value.
 * Support for watches.
 */
@IWatch
export class Atom<T> implements
    api.IDeref<T>,
    api.IEquiv,
    api.IWatch<T> {

    protected value: T;

    constructor(val?: T) {
        this.value = val;
    }

    public deref() {
        return this.value;
    }

    public equiv(o: any) {
        return this === o;
    }

    public reset(val: T) {
        const old = this.value;
        this.value = val;
        this.notifyWatches(old, val);
        return this.value;
    }

    public swap(fn: (curr: T, ...args: any[]) => T, ...args: any[]) {
        const old = this.value;
        args.unshift(old);
        this.value = fn.apply(null, args);
        this.notifyWatches(old, this.value);
        return this.value;
    }

    // mixin stub
    public addWatch(id: string, fn: (id: string, oldState: T, newState: T) => void) {
        return false;
    }

    // mixin stub
    public removeWatch(id: string) {
        return false;
    }

    // mixin stub
    public notifyWatches(oldState: T, newState: T) { }
}
