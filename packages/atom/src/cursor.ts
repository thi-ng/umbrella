import { getter, setter } from "@thi.ng/paths";
import { Atom } from "./atom";
import { nextID } from "./idgen";
import type {
    DeepPath,
    IID,
    IRelease,
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
    Watch,
} from "@thi.ng/api";
import type { AtomPath, CursorOpts, IAtom, SwapFn } from "./api";

export function defCursor<T, A>(
    parent: IAtom<T>,
    path: Path1<T, A>,
    opts?: Partial<CursorOpts<PathVal1<T, A>>>
): Cursor<PathVal1<T, A>>;
export function defCursor<T, A, B>(
    parent: IAtom<T>,
    path: Path2<T, A, B>,
    opts?: Partial<CursorOpts<PathVal2<T, A, B>>>
): Cursor<PathVal2<T, A, B>>;
export function defCursor<T, A, B, C>(
    parent: IAtom<T>,
    path: Path3<T, A, B, C>,
    opts?: Partial<CursorOpts<PathVal3<T, A, B, C>>>
): Cursor<PathVal3<T, A, B, C>>;
export function defCursor<T, A, B, C, D>(
    parent: IAtom<T>,
    path: Path4<T, A, B, C, D>,
    opts?: Partial<CursorOpts<PathVal4<T, A, B, C, D>>>
): Cursor<PathVal4<T, A, B, C, D>>;
export function defCursor<T, A, B, C, D, E>(
    parent: IAtom<T>,
    path: Path5<T, A, B, C, D, E>,
    opts?: Partial<CursorOpts<PathVal5<T, A, B, C, D, E>>>
): Cursor<PathVal5<T, A, B, C, D, E>>;
export function defCursor<T, A, B, C, D, E, F>(
    parent: IAtom<T>,
    path: Path6<T, A, B, C, D, E, F>,
    opts?: Partial<CursorOpts<PathVal6<T, A, B, C, D, E, F>>>
): Cursor<PathVal6<T, A, B, C, D, E, F>>;
export function defCursor<T, A, B, C, D, E, F, G>(
    parent: IAtom<T>,
    path: Path7<T, A, B, C, D, E, F, G>,
    opts?: Partial<CursorOpts<PathVal7<T, A, B, C, D, E, F, G>>>
): Cursor<PathVal7<T, A, B, C, D, E, F, G>>;
export function defCursor<T, A, B, C, D, E, F, G, H>(
    parent: IAtom<T>,
    path: Path8<T, A, B, C, D, E, F, G, H>,
    opts?: Partial<CursorOpts<PathVal8<T, A, B, C, D, E, F, G, H>>>
): Cursor<PathVal8<T, A, B, C, D, E, F, G, H>>;
export function defCursor<T, A, B, C, D, E, F, G, H>(
    parent: IAtom<T>,
    path: DeepPath<T, A, B, C, D, E, F, G, H>,
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
        return this.local.resetInUnsafe(path, val);
    }

    resetInUnsafe(path: string | AtomPath, val: any) {
        return this.local.resetInUnsafe(path, val);
    }

    swap(fn: SwapFn<T>, ...args: any[]): T {
        return this.local.swap(fn, ...args);
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
