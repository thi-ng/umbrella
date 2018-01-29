import { IEquiv, Watch } from "@thi.ng/api/api";
import { IWatch } from "@thi.ng/api/mixins/iwatch";

import { IAtom, SwapFn } from "./api";

/**
 * Mutable wrapper for an (usually) immutable value.
 * Support for watches.
 */
@IWatch
export class Atom<T> implements
    IAtom<T>,
    IEquiv {

    protected value: T;

    constructor(val?: T) {
        this.value = val;
    }

    deref() {
        return this.value;
    }

    equiv(o: any) {
        return this === o;
    }

    reset(val: T) {
        const old = this.value;
        this.value = val;
        this.notifyWatches(old, val);
        return this.value;
    }

    swap(fn: SwapFn<T>, ...args: any[]) {
        const old = this.value;
        args.unshift(old);
        this.value = fn.apply(null, args);
        this.notifyWatches(old, this.value);
        return this.value;
    }

    // mixin stub
    addWatch(id: string, fn: Watch<T>) {
        return false;
    }

    // mixin stub
    removeWatch(id: string) {
        return false;
    }

    // mixin stub
    notifyWatches(oldState: T, newState: T) { }
}
