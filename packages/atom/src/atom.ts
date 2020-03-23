import { IWatchMixin } from "@thi.ng/api";
import { illegalState } from "@thi.ng/errors";
import { setIn, updateIn } from "@thi.ng/paths";
import type {
    IEquiv,
    Keys,
    Keys1,
    Keys2,
    Keys3,
    Keys4,
    Keys5,
    Keys6,
    Keys7,
    NumOrString,
    Predicate,
    Val1,
    Val2,
    Val3,
    Val4,
    Val5,
    Val6,
    Val7,
    Val8,
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

    resetIn<A extends Keys<T>>(path: readonly [A], val: Val1<T, A>): T;
    resetIn<A extends Keys<T>, B extends Keys1<T, A>>(
        path: readonly [A, B],
        val: Val2<T, A, B>
    ): T;
    resetIn<A extends Keys<T>, B extends Keys1<T, A>, C extends Keys2<T, A, B>>(
        path: readonly [A, B, C],
        val: Val3<T, A, B, C>
    ): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>
    >(path: readonly [A, B, C, D], val: Val4<T, A, B, C, D>): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>
    >(path: readonly [A, B, C, D, E], val: Val5<T, A, B, C, D, E>): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>
    >(path: readonly [A, B, C, D, E, F], val: Val6<T, A, B, C, D, E, F>): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>
    >(
        path: readonly [A, B, C, D, E, F, G],
        val: Val7<T, A, B, C, D, E, F, G>
    ): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>,
        H extends Keys7<T, A, B, C, D, E, F, G>
    >(
        path: readonly [A, B, C, D, E, F, G, H],
        val: Val8<T, A, B, C, D, E, F, G, H>
    ): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>,
        H extends Keys7<T, A, B, C, D, E, F, G>
    >(path: readonly [A, B, C, D, E, F, G, H, ...NumOrString[]], val: any): T;
    resetIn(path: AtomPath, val: any) {
        return this.reset(setIn(this._value, path, val));
    }

    resetInUnsafe(path: string | AtomPath, val: any): T {
        return this.reset(setIn(this._value, path, val));
    }

    swap(fn: SwapFn<T>, ...args: any[]) {
        return this.reset(fn.apply(null, [this._value, ...args]));
    }

    swapIn<A extends Keys<T>>(
        path: readonly [A],
        fn: SwapFn<Val1<T, A>>,
        ...args: any[]
    ): T;
    swapIn<A extends Keys<T>, B extends Keys1<T, A>>(
        path: readonly [A, B],
        fn: SwapFn<Val2<T, A, B>>,
        ...args: any[]
    ): T;
    swapIn<A extends Keys<T>, B extends Keys1<T, A>, C extends Keys2<T, A, B>>(
        path: readonly [A, B, C],
        fn: SwapFn<Val3<T, A, B, C>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>
    >(
        path: readonly [A, B, C, D],
        fn: SwapFn<Val4<T, A, B, C, D>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>
    >(
        path: readonly [A, B, C, D, E],
        fn: SwapFn<Val5<T, A, B, C, D, E>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>
    >(
        path: readonly [A, B, C, D, E, F],
        fn: SwapFn<Val6<T, A, B, C, D, E, F>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>
    >(
        path: readonly [A, B, C, D, E, F, G],
        fn: SwapFn<Val7<T, A, B, C, D, E, F, G>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>,
        H extends Keys7<T, A, B, C, D, E, F, G>
    >(
        path: readonly [A, B, C, D, E, F, G, H],
        fn: SwapFn<Val8<T, A, B, C, D, E, F, G, H>>,
        ...args: any[]
    ): T;
    swapIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>,
        G extends Keys6<T, A, B, C, D, E, F>,
        H extends Keys7<T, A, B, C, D, E, F, G>
    >(
        path: readonly [A, B, C, D, E, F, G, H, ...PropertyKey[]],
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
