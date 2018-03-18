import { IEquiv, Watch } from "@thi.ng/api/api";
import { IWatch } from "@thi.ng/api/mixins/iwatch";
import { Path, setIn, updateIn } from "@thi.ng/paths";

import { IAtom, IView, SwapFn, ViewTransform } from "./api";
import { View } from "./view";

/**
 * Mutable wrapper for an (usually) immutable value. Support for
 * watches.
 */
@IWatch
export class Atom<T> implements
    IAtom<T>,
    IEquiv {

    protected value: T;
    protected _watches: any;

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
        return val;
    }

    resetIn<V>(path: Path, val: V) {
        const old = this.value;
        this.value = setIn(this.value, path, val);
        this.notifyWatches(old, this.value);
        return this.value;
    }

    swap(fn: SwapFn<T>, ...args: any[]) {
        const old = this.value;
        args.unshift(old);
        this.value = fn.apply(null, args);
        this.notifyWatches(old, this.value);
        return this.value;
    }

    swapIn<V>(path: Path, fn: SwapFn<V>, ...args: any[]) {
        const old = this.value;
        this.value = updateIn(this.value, path, fn, ...args);
        this.notifyWatches(old, this.value);
        return this.value;
    }

    // mixin stub
    /* istanbul ignore next */
    addWatch(id: string, fn: Watch<T>) {
        return false;
    }

    // mixin stub
    /* istanbul ignore next */
    removeWatch(id: string) {
        return false;
    }

    // mixin stub
    /* istanbul ignore next */
    notifyWatches(oldState: T, newState: T) { }

    addView<V>(path: Path, tx?: ViewTransform<V>, lazy = true): IView<V> {
        return new View<V>(this, path, tx, lazy);
    }

    release() {
        delete this._watches;
        delete this.value;
        return true;
    }
}
