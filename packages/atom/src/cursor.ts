import { IID, IRelease, Watch } from "@thi.ng/api/api";
import { illegalArgs, illegalArity } from "@thi.ng/api/error";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { getter, Path, setter } from "@thi.ng/paths";

import {
    CursorOpts,
    IAtom,
    IView,
    SwapFn,
    ViewTransform
} from "./api";
import { Atom } from "./atom";
import { View } from "./view";

/**
 * A cursor provides read/write access to a path location within a
 * nested parent state (Atom or another Cursor). Cursors behave like
 * Atoms for all practical purposes, i.e. support `deref()`, `reset()`,
 * `swap()`, `addWatch()` etc. However, when updating a cursor's value,
 * the parent state will be updated at the cursor's path as well (incl.
 * triggering any watches and/or validators) attached to the parent.
 * Likewise, when the parent state is modified externally, the cursor's
 * value will automatically update as well. The update order of cursor's
 * sharing a common parent is undefined, but can be overridden by
 * extending this class with a custom `notifyWatches()` implementation.
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
export class Cursor<T> implements
    IAtom<T>,
    IID<string>,
    IRelease {

    static NEXT_ID = 0;

    readonly id: string;
    parent: IAtom<any>;

    protected local: Atom<T>;
    protected lookup: (s: any) => T;
    protected selfUpdate: boolean;

    constructor(opts: CursorOpts<T>);
    constructor(parent: IAtom<any>, path: Path);
    constructor(parent: IAtom<any>, lookup: (s: any) => T, update: (s: any, v: T) => any);
    constructor(...args: any[]) {
        let parent, id, lookup, update, validate, opts: CursorOpts<T>;
        switch (args.length) {
            case 1:
                opts = args[0];
                id = opts.id;
                parent = opts.parent;
                validate = opts.validate;
                if (opts.path) {
                    if (isArray(opts.path) && isFunction(opts.path[0])) {
                        [lookup, update] = opts.path;
                    } else {
                        lookup = getter(<Path>opts.path);
                        update = setter(<Path>opts.path);
                    }
                } else {
                    illegalArgs("missing path config");
                }
                break;
            case 2:
                parent = args[0];
                lookup = getter(args[1]);
                update = setter(args[1]);
                break;
            case 3:
                [parent, lookup, update] = args;
                break;
            default:
                illegalArity(args.length);
        }
        this.parent = parent;
        this.id = id || `cursor-${Cursor.NEXT_ID++}`;
        this.selfUpdate = false;
        if (!lookup || !update) {
            illegalArgs();
        }
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
                const cval = lookup(curr);
                if (cval !== lookup(prev)) {
                    this.local.reset(cval);
                }
            }
        });
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

    resetIn<V>(path: Path, val: V) {
        return this.local.resetIn(path, val);
    }

    swap(fn: SwapFn<T>, ...args: any[]): T {
        return this.local.swap(fn, ...args);
    }

    swapIn<V>(path: Path, fn: SwapFn<V>, ...args: any[]) {
        return this.local.swapIn(path, fn, ...args);
    }

    addWatch(id: string, fn: Watch<T>) {
        return this.local.addWatch(id, fn);
    }

    removeWatch(id: string): boolean {
        return this.local.removeWatch(id);
    }

    /* istanbul ignore next */
    notifyWatches(oldState: T, newState: T) {
        return this.local.notifyWatches(oldState, newState);
    }

    addView<V>(path: Path, tx?: ViewTransform<V>, lazy = true): IView<V> {
        return new View<V>(this, path, tx, lazy);
    }
}
