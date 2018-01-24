import { IID } from "@thi.ng/api/api";
import { Transducer } from "@thi.ng/transducers/api";

import { Subscription } from "./subscription";
import { Stream } from "./stream";

export enum State {
    IDLE,
    ACTIVE,
    DONE,
    ERROR,
}

export type Fn<T> = (x: T) => void;

export interface ISubscriber<T> {
    next: (x: T) => void;
    error?: (sub: ISubscribable<T>, e: Error) => void;
    done?: () => void;
}

export interface ISubscribable<T> extends IID<string> {
    subscribe<C>(xform: Transducer<T, C>, id?: string): Subscription<T, C>;
    subscribe<C>(sub: ISubscriber<T>, xform: Transducer<T, C>, id?: string): Subscription<T, C>;
    subscribe(sub: ISubscriber<T>, id?: string): Subscription<T, T>;
    unsubscribe(sub?: ISubscriber<T>): boolean;
    getState(): State;
}

export interface IStream<T> extends ISubscriber<T> {
    cancel: StreamCancel;
}

export type StreamCancel = () => void;
export type StreamSource<T> = (sub: Stream<T>) => StreamCancel;
