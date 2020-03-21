import { assert } from "@thi.ng/api";
import { setIn, updateIn } from "@thi.ng/paths";
import { nextID } from "./idgen";
import { View } from "./view";
import type {
    Keys,
    Keys1,
    Keys2,
    Keys3,
    Keys4,
    Keys5,
    Keys6,
    Keys7,
    Path,
    Val1,
    Val2,
    Val3,
    Val4,
    Val5,
    Val6,
    Val7,
    Val8,
    Watch
} from "@thi.ng/api";
import type {
    IAtom,
    IView,
    SwapFn,
    ViewTransform
} from "./api";

export class Transacted<T> implements IAtom<T> {
    parent: IAtom<T>;
    current: T | undefined;
    protected id: string;
    protected isActive: boolean;
    protected _watches: any;

    constructor(parent: IAtom<T>) {
        this.parent = parent;
        this.current = undefined;
        this.isActive = false;
        this.id = `tx${nextID()}-`;
    }

    get value() {
        return this.deref();
    }

    set value(val: T) {
        this.reset(val);
    }

    get isTransaction() {
        return this.isActive;
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
    resetIn(path: Readonly<Path>, val: any) {
        this.ensureTx();
        return this.reset(setIn(this.current, path, val));
    }

    swap(fn: SwapFn<T>, ...args: any[]) {
        this.ensureTx();
        return this.reset(fn.apply(null, [this.current!, ...args]));
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
    swapIn(path: Readonly<Path>, fn: SwapFn<any>, ...args: any[]) {
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
        return this.parent.addWatch(this.id + id, (_, prev, curr) =>
            watch(id, prev, curr)
        );
    }

    removeWatch(id: string) {
        return this.parent.removeWatch(this.id + id);
    }

    notifyWatches(old: T, curr: T) {
        this.parent.notifyWatches(old, curr);
    }

    addView<V>(path: Path, tx?: ViewTransform<V>, lazy = true): IView<V> {
        return new View<V>(this, path, tx, lazy);
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
