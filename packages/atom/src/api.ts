import * as api from "@thi.ng/api/api";
import { IDeref, IID, IRelease } from "@thi.ng/api/api";

export type Path = PropertyKey | PropertyKey[];

export type SwapFn<T> = (curr: T, ...args: any[]) => T;

export type ViewTransform<T> = (x: any) => T;

export interface ReadonlyAtom<T> extends
    api.IDeref<T>,
    api.IWatch<T> {
}

export interface IAtom<T> extends
    ReadonlyAtom<T>,
    IReset<T>,
    ISwap<T>,
    IViewable {
}

export interface IReset<T> {
    reset(val: T): T;
}

export interface ISwap<T> {
    swap(fn: SwapFn<T>, ...args: any[]): T;
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
