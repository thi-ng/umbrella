import * as api from "@thi.ng/api/api";
import { IDeref, IID, IRelease } from "@thi.ng/api/api";

export type Path = PropertyKey | PropertyKey[];

export type SwapFn<T> = (curr: T, ...args: any[]) => T;

export type ViewTransform<T> = (x: any) => T;

export type InterceptorFn = (state: any, e: Event, fx?: InterceptorContext, bus?: IDispatch) => InterceptorContext | void;
export type InterceptorPredicate = (state: any, e: Event, fx?: any) => boolean;

export type SideEffect = (x: any, bus?: IDispatch) => any;
export type EventDef = Interceptor | InterceptorFn | (Interceptor | InterceptorFn)[];
export type EffectDef = SideEffect | [SideEffect, number];
export type AsyncEffectDef = [string, any, string, string];
export type EffectPriority = [string, number];

export const EV_SET_VALUE = "--set-value";
export const EV_UPDATE_VALUE = "--update-value";

export const FX_STATE = "--state";
export const FX_DISPATCH = "--dispatch";
export const FX_DISPATCH_ASYNC = "--dispatch-async";
export const FX_DISPATCH_NOW = "--dispatch-now";
export const FX_CANCEL = "--cancel";

export interface ReadonlyAtom<T> extends
    api.IDeref<T>,
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

export interface IDispatch {
    readonly state: ReadonlyAtom<any>;
    dispatch(event: Event);
    dispatchNow(event: Event);
}

export interface Event extends Array<any> {
    [0]: string;
    [1]?: any;
}

export interface Interceptor {
    pre?: InterceptorFn;
    post?: InterceptorFn;
}

export interface InterceptorContext {
    [FX_STATE]?: any;
    [FX_CANCEL]?: boolean;
    [FX_DISPATCH]?: Event | Event[];
    [FX_DISPATCH_NOW]?: Event | Event[];
    [FX_DISPATCH_ASYNC]?: AsyncEffectDef | AsyncEffectDef[];
    [id: string]: any;
}
