import { IWatchMixin } from "@thi.ng/api";
import { illegalState } from "@thi.ng/errors";
import { setIn, updateIn } from "@thi.ng/paths";
import type {
    DeepPath,
    IEquiv,
    Path0,
    Path1,
    Path2,
    Path3,
    Path4,
    Path5,
    Path6,
    Path7,
    Path8,
    PathVal1,
    PathVal2,
    PathVal3,
    PathVal4,
    PathVal5,
    PathVal6,
    PathVal7,
    PathVal8,
    Predicate,
    Watch,
} from "@thi.ng/api";
import type { AtomPath, IAtom, SwapFn } from "./api";

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

    resetIn<A>(path: Path0, val: T): T;
    resetIn<A>(path: Path1<T, A>, val: PathVal1<T, A>): T;
    resetIn<A, B>(path: Path2<T, A, B>, val: PathVal2<T, A, B>): T;
    resetIn<A, B, C>(path: Path3<T, A, B, C>, val: PathVal3<T, A, B, C>): T;
    resetIn<A, B, C, D>(
        path: Path4<T, A, B, C, D>,
        val: PathVal4<T, A, B, C, D>
    ): T;
    resetIn<A, B, C, D, E>(
        path: Path5<T, A, B, C, D, E>,
        val: PathVal5<T, A, B, C, D, E>
    ): T;
    resetIn<A, B, C, D, E, F>(
        path: Path6<T, A, B, C, D, E, F>,
        val: PathVal6<T, A, B, C, D, E, F>
    ): T;
    resetIn<A, B, C, D, E, F, G>(
        path: Path7<T, A, B, C, D, E, F, G>,
        val: PathVal7<T, A, B, C, D, E, F, G>
    ): T;
    resetIn<A, B, C, D, E, F, G, H>(
        path: Path8<T, A, B, C, D, E, F, G, H>,
        val: PathVal8<T, A, B, C, D, E, F, G, H>
    ): T;
    resetIn<A, B, C, D, E, F, G, H>(
        path: DeepPath<T, A, B, C, D, E, F, G, H>,
        val: any
    ): T;
    resetIn(path: AtomPath, val: any) {
        return this.reset(setIn(this._value, path, val));
    }

    resetInUnsafe(path: string | AtomPath, val: any): T {
        return this.reset(setIn(this._value, path, val));
    }

    swap(fn: SwapFn<T>, ...args: any[]) {
        return this.reset(fn.apply(null, [this._value, ...args]));
    }

    swapIn<A>(path: Path0, fn: SwapFn<T>, ...args: any[]): T;
    swapIn<A>(path: Path1<T, A>, fn: SwapFn<PathVal1<T, A>>, ...args: any[]): T;
    swapIn<A, B>(
        path: Path2<T, A, B>,
        fn: SwapFn<PathVal2<T, A, B>>,
        ...args: any[]
    ): T;
    swapIn<A, B, C>(
        path: Path3<T, A, B, C>,
        fn: SwapFn<PathVal3<T, A, B, C>>,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D>(
        path: Path4<T, A, B, C, D>,
        fn: SwapFn<PathVal4<T, A, B, C, D>>,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D, E>(
        path: Path5<T, A, B, C, D, E>,
        fn: SwapFn<PathVal5<T, A, B, C, D, E>>,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D, E, F>(
        path: Path6<T, A, B, C, D, E, F>,
        fn: SwapFn<PathVal6<T, A, B, C, D, E, F>>,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D, E, F, G>(
        path: Path7<T, A, B, C, D, E, F, G>,
        fn: SwapFn<PathVal7<T, A, B, C, D, E, F, G>>,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D, E, F, G, H>(
        path: Path8<T, A, B, C, D, E, F, G, H>,
        fn: SwapFn<PathVal8<T, A, B, C, D, E, F, G, H>>,
        ...args: any[]
    ): T;
    swapIn<A, B, C, D, E, F, G, H>(
        path: DeepPath<T, A, B, C, D, E, F, G, H>,
        fn: SwapFn<any>,
        ...args: any[]
    ): T;
    swapIn(path: AtomPath, fn: SwapFn<any>, ...args: any[]) {
        return this.reset(updateIn(this._value, path, fn, ...args));
    }

    swapInUnsafe(path: string | AtomPath, fn: SwapFn<any>, ...args: any[]) {
        return this.reset(updateIn(this._value, path, fn, ...args));
    }

    // @ts-ignore: mixin
    addWatch(id: string, fn: Watch<T>): boolean {}

    // @ts-ignore: mixin
    removeWatch(id: string): boolean {}

    // @ts-ignore: mixin
    notifyWatches(old: T, prev: T) {}

    release() {
        delete this._watches;
        delete this._value;
        return true;
    }
}
