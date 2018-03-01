import * as api from "@thi.ng/api/api";

export type SwapFn<T> = (curr: T, ...args: any[]) => T;

export type ViewTransform<A, B> = (x: A) => B;

export interface ReadonlyAtom<T> extends
    api.IDeref<T>,
    api.IWatch<T> {
}

export interface IAtom<T> extends
    ReadonlyAtom<T>,
    IReset<T>,
    ISwap<T> {
}

export interface IReset<T> {
    reset(val: T): T;
}

export interface ISwap<T> {
    swap(fn: SwapFn<T>, ...args: any[]): T;
}
