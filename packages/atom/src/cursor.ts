import { IID, IRelease, Watch } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { isSymbol } from "@thi.ng/checks/is-symbol";
import { Path, getter, setter } from "@thi.ng/paths";

import { IAtom, SwapFn, IView, ViewTransform } from "./api";
import { Atom } from "./atom";
import { View } from "./view";

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

    constructor(parent: IAtom<any>, path: PropertyKey | PropertyKey[]);
    constructor(parent: IAtom<any>, lookup: (s: any) => T, update: (s: any, v: T) => any);
    constructor(parent: IAtom<any>, ...opts: any[]) {
        this.parent = parent;
        this.id = `cursor-${Cursor.NEXT_ID++}`;
        this.selfUpdate = false;
        let [a, b] = opts, lookup, update;
        if (isString(a) || isArray(a) || isNumber(a) || isSymbol(a)) {
            lookup = getter(<any>a);
            update = setter(<any>a);
        } else if (isFunction(a) && isFunction(b)) {
            lookup = a;
            update = b;
        } else {
            /* istanbul ignore next */
            throw new Error("illegal args");
        }
        this.local = new Atom<T>(lookup(parent.deref()));
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
