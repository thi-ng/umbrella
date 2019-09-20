import { assert, Path, Watch } from "@thi.ng/api";
import { setIn, updateIn } from "@thi.ng/paths";
import {
    IAtom,
    IView,
    SwapFn,
    ViewTransform
} from "./api";
import { View } from "./view";

export class Transacted<T> implements IAtom<T> {
    parent: IAtom<T>;
    current: T | undefined;
    protected isActive: boolean;
    protected _watches: any;

    constructor(parent: IAtom<T>) {
        this.parent = parent;
        this.current = undefined;
        this.isActive = false;
    }

    get value() {
        return this.deref();
    }

    set value(val: T) {
        this.reset(val);
    }

    deref() {
        return this.isActive ? this.current! : this.parent.deref();
    }

    equiv(o: any) {
        return this === o;
    }

    reset(val: T) {
        this.ensureTx();
        this.current = val;
        return val;
    }

    resetIn<V>(path: Path, val: V) {
        this.ensureTx();
        return this.reset(setIn(this.current, path, val));
    }

    swap(fn: SwapFn<T>, ...args: any[]) {
        this.ensureTx();
        return this.reset(fn.apply(null, [this.current!, ...args]));
    }

    swapIn<V>(path: Path, fn: SwapFn<V>, ...args: any[]) {
        this.ensureTx();
        return this.reset(updateIn(this.current, path, fn, ...args));
    }

    begin() {
        assert(!this.isActive, "transaction already started");
        this.current = this.parent.deref();
        this.isActive = true;
    }

    commit() {
        this.ensureTx();
        const val = this.current!;
        this.parent.reset(this.current!);
        this.isActive = false;
        this.current = undefined;
        return val;
    }

    cancel() {
        this.ensureTx();
        this.isActive = false;
        this.current = undefined;
    }

    addWatch(id: string, watch: Watch<T>) {
        return this.parent.addWatch(id, watch);
    }

    removeWatch(id: string) {
        return this.parent.removeWatch(id);
    }

    notifyWatches(old: T, curr: T) {
        this.parent.notifyWatches(old, curr);
    }

    addView<V>(path: Path, tx?: ViewTransform<V>, lazy = true): IView<V> {
        return new View<V>(this.parent, path, tx, lazy);
    }

    release() {
        delete this.parent;
        delete this.current;
        delete this.isActive;
        delete this._watches;
        return true;
    }

    protected ensureTx() {
        assert(this.isActive, "no active transaction");
    }
}
