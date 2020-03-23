import type {
    IClear,
    IDeref,
    IID,
    INotify,
    IRelease,
    IWatch,
    Keys,
    Keys1,
    Keys2,
    Keys3,
    Keys4,
    Keys5,
    Keys6,
    Keys7,
    NumOrString,
    Predicate,
    Val1,
    Val2,
    Val3,
    Val4,
    Val5,
    Val6,
    Val7,
    Val8,
} from "@thi.ng/api";

export type AtomPath = Readonly<NumOrString[]>;

export type SwapFn<T> = (curr: T, ...args: any[]) => T;

export interface ReadonlyAtom<T> extends IDeref<T>, IRelease, IWatch<T> {}

export interface IAtom<T> extends ReadonlyAtom<T>, IReset<T>, ISwap<T> {}

export interface IReset<T> {
    reset(val: T): T;

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
    >(
        path: readonly [A, B, C, D],
        val: Val4<T, A, B, C, D>
    ): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>
    >(
        path: readonly [A, B, C, D, E],
        val: Val5<T, A, B, C, D, E>
    ): T;
    resetIn<
        A extends Keys<T>,
        B extends Keys1<T, A>,
        C extends Keys2<T, A, B>,
        D extends Keys3<T, A, B, C>,
        E extends Keys4<T, A, B, C, D>,
        F extends Keys5<T, A, B, C, D, E>
    >(
        path: readonly [A, B, C, D, E, F],
        val: Val6<T, A, B, C, D, E, F>
    ): T;
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
    >(
        path: readonly [A, B, C, D, E, F, G, H, ...NumOrString[]],
        val: any
    ): T;

    resetInUnsafe(path: string | AtomPath, val: any): T;
}

export interface ISwap<T> {
    swap(fn: SwapFn<T>, ...args: any[]): T;

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
