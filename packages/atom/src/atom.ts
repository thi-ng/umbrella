import type {
    DeepPath,
    IEquiv,
    OptPathVal,
    Path,
    Path0,
    Path1,
    Path2,
    Path3,
    Path4,
    Path5,
    Path6,
    Path7,
    Path8,
    PathVal,
    Predicate,
    Watch,
} from "@thi.ng/api";
import { IWatchMixin } from "@thi.ng/api/mixins/iwatch";
import { illegalState } from "@thi.ng/errors/illegal-state";
import { setInUnsafe } from "@thi.ng/paths/set-in";
import { updateInUnsafe } from "@thi.ng/paths/update-in";
import type { IAtom, SwapFn } from "./api";

export const defAtom = <T>(value: T, valid?: Predicate<T>) =>
    new Atom<T>(value, valid);

/**
 * Mutable wrapper for an (usually) immutable value. Support for
 * watches.
 */
@IWatchMixin
export class Atom<T> implements IAtom<T>, IEquiv {
    protected _value: T;
    protected valid: Predicate<T> | undefined;
    protected _watches: any;

    constructor(val: T, valid?: Predicate<T>) {
        if (valid && !valid(val)) {
            illegalState("initial state value did not validate");
        }
        this._value = val;
        this.valid = valid;
    }

    get value() {
        return this._value;
    }

    set value(val: T) {
        this.reset(val);
    }

    deref() {
        return this._value;
    }

    equiv(o: any) {
        return this === o;
    }

    reset(val: T) {
        const old = this._value;
        if (this.valid && !this.valid(val)) {
            return old;
        }
        this._value = val;
        this.notifyWatches(old, val);
        return val;
    }

    resetIn(path: Path0, val: T): T;
    resetIn<A>(path: Path1<T, A>, val: PathVal<T, [A]>): T;
    resetIn<A, B>(path: Path2<T, A, B>, val: PathVal<T, [A, B]>): T;
    resetIn<A, B, C>(path: Path3<T, A, B, C>, val: PathVal<T, [A, B, C]>): T;
    resetIn<A, B, C, D>(
        path: Path4<T, A, B, C, D>,
        val: PathVal<T, [A, B, C, D]>
    ): T;
    resetIn<A, B, C, D, E>(
        path: Path5<T, A, B, C, D, E>,
        val: PathVal<T, [A, B, C, D, E]>
    ): T;
    resetIn<A, B, C, D, E, F>(
        path: Path6<T, A, B, C, D, E, F>,
        val: PathVal<T, [A, B, C, D, E, F]>
    ): T;
    resetIn<A, B, C, D, E, F, G>(
        path: Path7<T, A, B, C, D, E, F, G>,
        val: PathVal<T, [A, B, C, D, E, F, G]>
    ): T;
    resetIn<A, B, C, D, E, F, G, H>(
        path: Path8<T, A, B, C, D, E, F, G, H>,
        val: PathVal<T, [A, B, C, D, E, F, G, H]>
    ): T;
    resetIn<A, B, C, D, E, F, G, H>(
        path: DeepPath<T, A, B, C, D, E, F, G, H>,
        val: any
    ): T;
    resetIn(path: Path, val: any) {
        return this.reset(setInUnsafe(this._value, path, val));
    }

    resetInUnsafe(path: Path, val: any): T {
        return this.reset(setInUnsafe(this._value, path, val));
    }

    swap(fn: SwapFn<T, T>, ...args: any[]) {
        return this.reset(fn.apply(null, [this._value, ...args]));
    }

    swapIn<A>(path: Path0, fn: SwapFn<T, T>, ...args: any[]): T;
    swapIn<A>(
        path: Path1<T, A>,
        fn: SwapFn<OptPathVal<T, [A]>, PathVal<T, [A]>>,
        ...args: any[]
    ): T;
    swapIn<A, B>(
        path: Path2<T, A, B>,
        fn: SwapFn<OptPathVal<T, [A, B]>, PathVal<T, [A, B]>>,
        ...args: any[]
    ): T;
    swapIn<A, B, C>(
        path: Path3<T, A, B, C>,
        fn: SwapFn<OptPathVal<T, [A, B, C]>, PathVal<T, [A, B, C]>>,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D>(
        path: Path4<T, A, B, C, D>,
        fn: SwapFn<OptPathVal<T, [A, B, C, D]>, PathVal<T, [A, B, C, D]>>,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D, E>(
        path: Path5<T, A, B, C, D, E>,
        fn: SwapFn<OptPathVal<T, [A, B, C, D, E]>, PathVal<T, [A, B, C, D, E]>>,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D, E, F>(
        path: Path6<T, A, B, C, D, E, F>,
        fn: SwapFn<
            OptPathVal<T, [A, B, C, D, E, F]>,
            PathVal<T, [A, B, C, D, E, F]>
        >,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D, E, F, G>(
        path: Path7<T, A, B, C, D, E, F, G>,
        fn: SwapFn<
            OptPathVal<T, [A, B, C, D, E, F, G]>,
            PathVal<T, [A, B, C, D, E, F, G]>
        >,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D, E, F, G, H>(
        path: Path8<T, A, B, C, D, E, F, G, H>,
        fn: SwapFn<
            OptPathVal<T, [A, B, C, D, E, F, G, H]>,
            PathVal<T, [A, B, C, D, E, F, G, H]>
        >,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D, E, F, G, H>(
        path: DeepPath<T, A, B, C, D, E, F, G, H>,
        fn: SwapFn<any, any>,
        ...args: any[]
    ): T;
    swapIn(path: Path, fn: SwapFn<any, any>, ...args: any[]) {
        return this.reset(updateInUnsafe(this._value, path, fn, ...args));
    }

    swapInUnsafe(path: Path, fn: SwapFn<any, any>, ...args: any[]) {
        return this.reset(updateInUnsafe(this._value, path, fn, ...args));
    }

    // @ts-ignore: mixin
    addWatch(id: string, fn: Watch<T>): boolean {}

    // @ts-ignore: mixin
    removeWatch(id: string): boolean {}

    // @ts-ignore: mixin
    notifyWatches(old: T, prev: T) {}

    release() {
        delete this._watches;
        delete (<any>this)._value;
        return true;
    }
}
