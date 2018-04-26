import { IEquiv, Predicate, Watch } from "@thi.ng/api/api";
import { illegalState } from "@thi.ng/api/error";
import { IWatch } from "@thi.ng/api/mixins/iwatch";
import { Path, setIn, updateIn } from "@thi.ng/paths";

import {
    IAtom,
    IView,
    SwapFn,
    ViewTransform
} from "./api";
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
    protected valid: Predicate<T>;
    protected _watches: any;

    constructor(val?: T, valid?: Predicate<T>) {
        if (valid && !valid(val)) {
            illegalState("initial state value did not validate");
        }
        this.value = val;
        this.valid = valid;
    }

    deref() {
        return this.value;
    }

    equiv(o: any) {
        return this === o;
    }

    reset(val: T) {
        const old = this.value;
        if (this.valid && !this.valid(val)) {
            return old;
        }
        this.value = val;
        this.notifyWatches(old, val);
        return val;
    }

    resetIn<V>(path: Path, val: V) {
        return this.reset(setIn(this.value, path, val));
    }

    swap(fn: SwapFn<T>, ...args: any[]) {
        return this.reset(fn.apply(null, [this.value, ...args]));
    }

    swapIn<V>(path: Path, fn: SwapFn<V>, ...args: any[]) {
        return this.reset(updateIn(this.value, path, fn, ...args));
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
