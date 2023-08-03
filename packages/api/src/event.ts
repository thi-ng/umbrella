import type { Fn } from "./fn.js";
import type { IID } from "./id.js";

/**
 * Event listener for {@link Event}.
 */
export type Listener<T extends string = string> = Fn<Event<T>, void>;

/**
 * Event type used in combination with {@link INotify}.
 */
export interface Event<T extends string = string> extends IID<T> {
	target?: any;
	canceled?: boolean;
	value?: any;
}

/**
 * Interface to provide event emitter functionality. Also see
 * {@link INotifyMixin} decorator mixin.
 *
 * The type param `T` can be used to constrain the event type/id.
 */
export interface INotify<T extends string = string> {
	addListener(id: T, fn: Listener<T>, scope?: any): boolean;
	removeListener(id: T, fn: Listener<T>, scope?: any): boolean;
	/**
	 * Broadcasts all registered listeners for given event type (in order
	 * registration) and returns true if any of them have been successfully
	 * notified.
	 *
	 * @remarks
	 * If a listener canceled the event (by setting {@link Event.canceled}), the
	 * function will stop notifying other listeners and return false. If no
	 * listeners are registered for the event, the function will also return
	 * false.
	 *
	 * @param event
	 */
	notify(event: Event<T>): boolean;
}
