import { CommonOpts } from "../api";
import { Stream } from "../stream";
import { optsWithID } from "../utils/idgen";

/**
 * Creates a new stream of events attached to given element / event
 * target and using given event listener options (same as supported by
 * `addEventListener()`, default: false).
 *
 * @param src event target
 * @param name event name
 * @param listenerOpts listener opts
 * @param streamOpts stream opts
 */
export const fromEvent = (
    src: EventTarget,
    name: string,
    listenerOpts: boolean | AddEventListenerOptions = false,
    streamOpts?: Partial<CommonOpts>
) =>
    new Stream<Event>((stream) => {
        let listener = (e: Event) => stream.next(e);
        src.addEventListener(name, listener, listenerOpts);
        return () => src.removeEventListener(name, listener, listenerOpts);
    }, optsWithID(`event-${name}-`, streamOpts));

/**
 * Same as `fromEvent`, however only supports well-known DOM event
 * names. Returned stream instance will use corresponding concrete event
 * type in its type signature, whereas `fromEvent` will only use the
 * generic `Event`.
 *
 * ```
 * fromDOMEvent(document.body, "mousemove"); // Stream<MouseEvent>
 * fromEvent(document.body, "mousemove"); // Stream<Event>
 * ```
 *
 * @see fromEvent
 *
 * @param src
 * @param name
 * @param listenerOpts
 * @param streamOpts
 */
export const fromDOMEvent = <K extends keyof GlobalEventHandlersEventMap>(
    src: EventTarget,
    name: K,
    listenerOpts: boolean | AddEventListenerOptions = false,
    streamOpts?: Partial<CommonOpts>
): Stream<GlobalEventHandlersEventMap[K]> =>
    <any>fromEvent(src, name, listenerOpts, streamOpts);
