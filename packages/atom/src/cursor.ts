import { IID, IRelease, Watch } from "@thi.ng/api/api";
import { IAtom, SwapFn } from "./api";
import { Atom } from "./atom";

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

    constructor(parent: IAtom<any>, lookup: (s: any) => T, update: (s: any, v: T) => any) {
        this.parent = parent;
        this.id = `cursor-${Cursor.NEXT_ID++}`;
        this.selfUpdate = false;
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
        throw new Error("Method not implemented.");
    }

    notifyWatches(oldState: T, newState: T) {
        throw new Error("Method not implemented.");
    }
}
