import { getter, setter } from "@thi.ng/paths";
import { Atom } from "./atom";
import { nextID } from "./idgen";
import type {
    IID,
    IRelease,
    Keys,
    Keys1,
    Keys2,
    Keys3,
    Keys4,
    Keys5,
    Keys6,
    Keys7,
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
import type { AtomPath, CursorOpts, IAtom, SwapFn } from "./api";

export function defCursor<T, A extends Keys<T>>(
    parent: IAtom<T>,
    path: readonly [A],
    opts?: Partial<CursorOpts<Val1<T, A>>>
): Cursor<Val1<T, A>>;
export function defCursor<T, A extends Keys<T>, B extends Keys1<T, A>>(
    parent: IAtom<T>,
    path: readonly [A, B],
    opts?: Partial<CursorOpts<Val2<T, A, B>>>
): Cursor<Val2<T, A, B>>;
export function defCursor<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
>(
    parent: IAtom<T>,
    path: readonly [A, B, C],
    opts?: Partial<CursorOpts<Val3<T, A, B, C>>>
): Cursor<Val3<T, A, B, C>>;
export function defCursor<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
>(
    parent: IAtom<T>,
    path: readonly [A, B, C, D],
    opts?: Partial<CursorOpts<Val4<T, A, B, C, D>>>
): Cursor<Val4<T, A, B, C, D>>;
export function defCursor<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
>(
    parent: IAtom<T>,
    path: readonly [A, B, C, D, E],
    opts?: Partial<CursorOpts<Val5<T, A, B, C, D, E>>>
): Cursor<Val5<T, A, B, C, D, E>>;
export function defCursor<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>
>(
    parent: IAtom<T>,
    path: readonly [A, B, C, D, E, F],
    opts?: Partial<CursorOpts<Val6<T, A, B, C, D, E, F>>>
): Cursor<Val6<T, A, B, C, D, E, F>>;
export function defCursor<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>
>(
    parent: IAtom<T>,
    path: readonly [A, B, C, D, E, F, G],
    opts?: Partial<CursorOpts<Val7<T, A, B, C, D, E, F, G>>>
): Cursor<Val7<T, A, B, C, D, E, F, G>>;
export function defCursor<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(
    parent: IAtom<T>,
    path: readonly [A, B, C, D, E, F, G, H],
    opts?: Partial<CursorOpts<Val8<T, A, B, C, D, E, F, G, H>>>
): Cursor<Val8<T, A, B, C, D, E, F, G, H>>;
export function defCursor<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>,
    F extends Keys5<T, A, B, C, D, E>,
    G extends Keys6<T, A, B, C, D, E, F>,
    H extends Keys7<T, A, B, C, D, E, F, G>
>(
    parent: IAtom<T>,
    path: readonly [A, B, C, D, E, F, G, H, ...PropertyKey[]],
    opts?: Partial<CursorOpts<any>>
): Cursor<any>;
export function defCursor(
    parent: IAtom<any>,
    path: AtomPath,
    opts?: Partial<CursorOpts<any>>
): Cursor<any> {
    return new Cursor(parent, path, opts);
}

export function defCursorUnsafe<T = any>(
    parent: IAtom<any>,
    path: string | AtomPath,
    opts?: Partial<CursorOpts<any>>
) {
    return new Cursor<T>(parent, path, opts);
}

/**
 * A cursor provides read/write access to a path location within a
 * nested (Atom-like) parent state.
 *
 * @remarks
 * Cursors behave like Atoms for all practical purposes, i.e. support
 * {@link @thi.ng/api#IDeref.deref}, {@link IReset.reset},
 * {@link ISwap.swap}, {@link @thi.ng/api#IWatch.addWatch} etc. However,
 * when updating a cursor's value, the parent state will be updated at
 * the cursor's path as well (incl. triggering any watches and/or
 * validators) attached to the parent. Likewise, when the parent state
 * is modified externally, the cursor's value will automatically update
 * as well. The update order of cursor's sharing a common parent is
 * undefined, but can be overridden by extending this class with a
 * custom {@link @thi.ng/api#IWatch.notifyWatches} implementation.
 *
 * If creating multiple cursors w/ a shared parent and each cursor
 * configured with a custom ID (provided via config object to ctor),
 * it's the user's responsibility to ensure the given IDs are unique.
 * Cursors are implemented by attaching a watch to the parent and the ID
 * is used to identify each watch.
 *
 * When using the optional validator predicate (also specified via
 * config object to ctor), the cursor's validator MUST NOT conflict with
 * the one assigned to the parent or else both will go out-of-sync.
 * Therefore, when requiring validation and updating values via cursors
 * it's recommended to only specify validators for leaf-level cursors in
 * the hierarchy.
 */
export class Cursor<T> implements IAtom<T>, IID<string>, IRelease {
    readonly id: string;
    parent: IAtom<any>;

    protected local: Atom<T>;
    protected selfUpdate: boolean;

    constructor(
        parent: IAtom<any>,
        path: string | AtomPath,
        opts: Partial<CursorOpts<T>> = {}
    ) {
        const validate = opts.validate;
        const lookup = getter(path);
        const update = setter(path);
        this.parent = parent;
        this.id = opts.id || `cursor-${nextID()}`;
        this.selfUpdate = false;
        this.local = new Atom<T>(lookup(parent.deref()), validate);
        this.local.addWatch(this.id, (_, prev, curr) => {
            if (prev !== curr) {
                this.selfUpdate = true;
                parent.swap((state) => update(state, curr));
                this.selfUpdate = false;
            }
        });
        parent.addWatch(this.id, (_, prev, curr) => {
            if (!this.selfUpdate) {
                const cval = lookup!(curr);
                if (cval !== lookup!(prev)) {
                    this.local.reset(cval);
                }
            }
        });
    }

    get value() {
        return this.deref();
    }

    set value(val: T) {
        this.reset(val);
    }

    deref() {
        return this.local.deref();
    }

    release() {
        this.local.release();
        this.parent.removeWatch(this.id);
        delete this.local;
        delete this.parent;
        return true;
    }

    reset(val: T) {
        return this.local.reset(val);
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
    >(path: readonly [A, B, C, D, E, F, G, H, ...PropertyKey[]], val: any): T;
    resetIn(path: AtomPath, val: any) {
        return this.local.resetInUnsafe(path, val);
    }

    resetInUnsafe(path: string | AtomPath, val: any) {
        return this.local.resetInUnsafe(path, val);
    }

    swap(fn: SwapFn<T>, ...args: any[]): T {
        return this.local.swap(fn, ...args);
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
        return this.local.swapInUnsafe(path, fn, ...args);
    }

    swapInUnsafe(path: string | AtomPath, fn: SwapFn<any>, ...args: any[]) {
        return this.local.swapInUnsafe(path, fn, ...args);
    }

    addWatch(id: string, fn: Watch<T>) {
        return this.local.addWatch(id, fn);
    }

    removeWatch(id: string): boolean {
        return this.local.removeWatch(id);
    }

    notifyWatches(oldState: T, newState: T) {
        return this.local.notifyWatches(oldState, newState);
    }
}
