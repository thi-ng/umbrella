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
	notify(event: Event): boolean;
}
