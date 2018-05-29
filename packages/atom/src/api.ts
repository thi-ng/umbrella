import * as api from "@thi.ng/api/api";
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
    api.IDeref<T>,
    api.IID<string>,
    api.IRelease {

    readonly path: PropertyKey[];

    view(): T;
    changed(): boolean;
};

export interface IViewable {
    addView<T>(path: Path, tx?: ViewTransform<T>, lazy?: boolean): IView<T>;
}

export interface CursorOpts<T> {
    parent: IAtom<any>;
    path: Path | [(s: any) => T, (s: any, v: T) => any];
    validate?: api.Predicate<T>;
    id?: string;
}

export interface IHistory<T> extends
    IAtom<T>,
    api.INotify {

    canUndo(): boolean;
    canRedo(): boolean;

    undo(): T;
    redo(): T;
    clear(): void;

    record(): void;
}