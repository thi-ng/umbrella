import type {
    DeepPath,
    IClear,
    IDeref,
    IID,
    INotify,
    IRelease,
    IWatch,
    NumOrString,
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
    Predicate,
} from "@thi.ng/api";

export type AtomPath = Readonly<NumOrString[]>;

export type SwapFn<T> = (curr: T, ...args: any[]) => T;

export interface ReadonlyAtom<T> extends IDeref<T>, IRelease, IWatch<T> {}

export interface IAtom<T> extends ReadonlyAtom<T>, IReset<T>, ISwap<T> {}

export interface IReset<T> {
    reset(val: T): T;

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

    resetInUnsafe(path: string | AtomPath, val: any): T;
}

export interface ISwap<T> {
    swap(fn: SwapFn<T>, ...args: any[]): T;

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

    swapInUnsafe(path: string | AtomPath, fn: SwapFn<any>, ...args: any[]): T;
}

export interface IView<T> extends IDeref<T | undefined>, IID<string>, IRelease {
    readonly path: AtomPath;
    readonly value: T | undefined;

    view(): T | undefined;
    changed(): boolean;
}

export interface CursorOpts<T> {
    validate: Predicate<T>;
    id: string;
}

export interface IHistory<T> extends IAtom<T>, IClear, INotify {
    canUndo(): boolean;
    canRedo(): boolean;

    undo(): T | undefined;
    redo(): T | undefined;

    record(): void;
}
