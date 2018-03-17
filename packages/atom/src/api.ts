import * as api from "@thi.ng/api/api";
import { IDeref, IID, IRelease } from "@thi.ng/api/api";
import { Path } from "@thi.ng/paths";

export type SwapFn<T> = (curr: T, ...args: any[]) => T;

export type ViewTransform<T> = (x: any) => T;

export interface ReadonlyAtom<T> extends
    api.IDeref<T>,
    api.IRelease,
    api.IWatch<T>,
    IViewable {
}

export interface IAtom<T> extends
    ReadonlyAtom<T>,
    IReset<T>,
    ISwap<T> {
}

export interface IReset<T> {
    reset(val: T): T;
    resetIn<V>(path: Path, val: V): T;
}

export interface ISwap<T> {
    swap(fn: SwapFn<T>, ...args: any[]): T;
    swapIn<V>(path: Path, fn: SwapFn<V>, ...args: any[]): T;
}

export interface IView<T> extends
    IDeref<T>,
    IID<string>,
    IRelease {

    readonly path: PropertyKey[];

    view(): T;
    changed(): boolean;
};

export interface IViewable {
    addView<T>(path: Path, tx?: ViewTransform<T>): IView<T>;
}
