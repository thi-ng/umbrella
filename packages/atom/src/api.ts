import * as api from "@thi.ng/api/api";

export type SwapFn<T> = (curr: T, ...args: any[]) => T;

export interface ReadonlyAtom<T> extends
    api.IDeref<T>,
    api.IWatch<T> {
}

export interface IAtom<T> extends ReadonlyAtom<T> {
    reset(val: T): T;
    swap(fn: SwapFn<T>, ...args: any[]): T;
}
