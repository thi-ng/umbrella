import { assert } from "@thi.ng/api";
import { setIn, updateIn } from "@thi.ng/paths";
import { nextID } from "./idgen";
import type {
    DeepPath,
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
import type { AtomPath, IAtom, SwapFn } from "./api";

export const defTransacted = <T>(parent: IAtom<T>) => new Transacted(parent);

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
        this.id = `tx-${nextID()}`;
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

    resetIn(path: Path0, val: T): T;
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
        this.ensureTx();
        return this.reset(setIn(this.current, path, val));
    }

    resetInUnsafe(path: string | AtomPath, val: any) {
        return this.resetIn(<any>path, val);
    }

    swap(fn: SwapFn<T>, ...args: any[]) {
        this.ensureTx();
        return this.reset(fn.apply(null, [this.current!, ...args]));
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
        this.ensureTx();
        return this.reset(updateIn(this.current, path, fn, ...args));
    }

    swapInUnsafe(path: AtomPath, fn: SwapFn<any>, ...args: any[]) {
        return this.swapIn(<any>path, fn, ...args);
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
