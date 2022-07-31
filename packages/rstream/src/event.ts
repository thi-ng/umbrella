import type { CommonOpts } from "./api.js";
import { __optsWithID } from "./idgen.js";
import { stream, Stream } from "./stream.js";

/**
 * Creates a {@link Stream} of events attached to given element / event
 * target and using given event listener options (same as supported by
 * `addEventListener()`, default: false).
 *
 * @param src - event target
 * @param name - event name
 * @param listenerOpts - listener opts
 * @param streamOpts - stream opts
 */
export const fromEvent = (
	src: EventTarget,
	name: string,
	listenerOpts: boolean | AddEventListenerOptions = false,
	streamOpts?: Partial<CommonOpts>
) =>
	stream<Event>((stream) => {
		let listener = (e: Event) => stream.next(e);
		src.addEventListener(name, listener, listenerOpts);
		return () => src.removeEventListener(name, listener, listenerOpts);
	}, __optsWithID(`event-${name}`, streamOpts));

/**
 * Same as {@link fromEvent}, however only supports well-known DOM event
 * names. Returned stream instance will use corresponding concrete event
 * type in its type signature, whereas {@link fromEvent} will only use the
 * generic `Event`.
 *
 * @example
 * ```ts
 * fromDOMEvent(document.body, "mousemove"); // Stream<MouseEvent>
 * fromEvent(document.body, "mousemove"); // Stream<Event>
 * ```
 *
 * Also see: {@link fromEvent}
 *
 * @param src -
 * @param name -
 * @param listenerOpts -
 * @param streamOpts -
 */
export const fromDOMEvent = <K extends keyof GlobalEventHandlersEventMap>(
	src: EventTarget,
	name: K,
	listenerOpts: boolean | AddEventListenerOptions = false,
	streamOpts?: Partial<CommonOpts>
): Stream<GlobalEventHandlersEventMap[K]> =>
	<any>fromEvent(src, name, listenerOpts, streamOpts);
