import { IID, IRelease, Watch } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isString } from "@thi.ng/checks/is-string";

import { IAtom, SwapFn } from "./api";
import { Atom } from "./atom";
import { getter, setter } from "./path";

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
        let lookup, update;
        if (isString(opts[0]) || isArray(opts[0])) {
            lookup = getter(opts[0]);
            update = setter(opts[0]);
        } else if (isFunction(opts[0]) && isFunction(opts[1])) {
            [lookup, update] = opts;
        } else {
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
        this.local.removeWatch(this.id);
        this.parent.removeWatch(this.id);
        delete this.local;
        return true;
    }

    reset(val: T) {
        return this.local.reset(val);
    }

    swap(fn: SwapFn<T>, ...args: any[]) {
        return this.local.swap.apply(this.local, [fn, ...args]);
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
