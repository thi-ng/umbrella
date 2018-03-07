import * as api from "@thi.ng/api/api";
import { IDeref, IID, IRelease } from "@thi.ng/api/api";

export type Path = PropertyKey | PropertyKey[];

export type SwapFn<T> = (curr: T, ...args: any[]) => T;

export type ViewTransform<T> = (x: any) => T;

export type InterceptorFn = (state: any, e: Event, fx?: any) => any;
export type InterceptorPredicate = (state: any, e: Event, fx?: any) => boolean;

export type SideEffect = (x: any) => void;
export type EventDef = Interceptor | InterceptorFn | (Interceptor | InterceptorFn)[];
export type EffectDef = SideEffect | [SideEffect, number];
export type EffectPriority = [string, number];

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

export interface Event extends Array<any> {
    [0]: string;
    [1]?: any;
}

export interface Interceptor {
    pre?: InterceptorFn;
    post?: InterceptorFn;
}

export const FX_STATE = "state";
export const FX_DISPACH_NOW = "dispatch-now";
export const FX_DISPATCH = "dispatch";
export const FX_CANCEL = "cancel";
