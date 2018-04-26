import { IDeref, IID } from "@thi.ng/api/api";
import { Transducer } from "@thi.ng/transducers/api";

import { Stream } from "./stream";
import { Subscription } from "./subscription";

export enum State {
    IDLE,
    ACTIVE,
    DONE,
    ERROR,
    DISABLED, // TODO currently unused
}

export type Fn<T> = (x: T) => void;

export interface ISubscriber<T> {
    next: (x: T) => void;
    error?: (e: any) => void;
    done?: () => void;
    [id: string]: any;
}

export interface ISubscribable<T> extends
    IDeref<T>,
    IID<string> {

    subscribe<C>(xform: Transducer<T, C>, id?: string): Subscription<T, C>;
    subscribe<C>(sub: Partial<ISubscriber<T>>, xform: Transducer<T, C>, id?: string): Subscription<T, C>;
    subscribe(sub: Partial<ISubscriber<T>>, id?: string): Subscription<T, T>;
    unsubscribe(sub?: Partial<ISubscriber<T>>): boolean;
    getState(): State;
}

export interface ISubscribableSubscriber<T> extends
    ISubscriber<T>,
    ISubscribable<any> {
}

export interface IStream<T> extends ISubscriber<T> {
    cancel: StreamCancel;
}

export type StreamCancel = () => void;
export type StreamSource<T> = (sub: Stream<T>) => StreamCancel;

export let DEBUG = false;
