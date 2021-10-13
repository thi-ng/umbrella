import type { Fn } from "./fn.js";
import type { IID } from "./id.js";

/**
 * Event listener.
 */
export type Listener = Fn<Event, void>;

export interface Event extends IID<PropertyKey> {
    target?: any;
    canceled?: boolean;
    value?: any;
}

/**
 * Interface to provide event emitter functionality. Also see
 * {@link INotifyMixin} decorator mixin.
 */
export interface INotify {
    addListener(id: string, fn: Listener, scope?: any): boolean;
    removeListener(id: string, fn: Listener, scope?: any): boolean;
    notify(event: Event): void;
}
