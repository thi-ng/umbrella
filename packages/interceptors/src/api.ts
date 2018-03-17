import { ReadonlyAtom } from "@thi.ng/atom/api";

export type InterceptorFn = (state: any, e: Event, bus?: IDispatch) => InterceptorContext | void;
export type InterceptorPredicate = (state: any, e: Event, fx?: any) => boolean;

export type SideEffect = (x: any, bus?: IDispatch) => any;
export type EventDef = Interceptor | InterceptorFn | (Interceptor | InterceptorFn)[];
export type EffectDef = SideEffect | [SideEffect, number];
export type AsyncEffectDef = [string, any, string, string];
export type EffectPriority = [string, number];

// Built-in event ID constants

export const EV_SET_VALUE = "--set-value";
export const EV_UPDATE_VALUE = "--update-value";

// Built-in side effect ID constants

export const FX_CANCEL = "--cancel";
export const FX_DISPATCH = "--dispatch";
export const FX_DISPATCH_ASYNC = "--dispatch-async";
export const FX_DISPATCH_NOW = "--dispatch-now";
export const FX_DELAY = "--delay";
export const FX_FETCH = "--fetch";
export const FX_STATE = "--state";

/**
 * Currently unused
 */
export const FX_REDO_RESTORE = "--redo-restore";

/**
 * Currently unused
 */
export const FX_UNDO_STORE = "--undo-store";

/**
 * Currently unused
 */
export const FX_UNDO_RESTORE = "--undo-restore";

export interface Event extends Array<any> {
    [0]: string;
    [1]?: any;
}

export interface IDispatch {
    readonly state: ReadonlyAtom<any>;
    dispatch(event: Event);
    dispatchNow(event: Event);
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
