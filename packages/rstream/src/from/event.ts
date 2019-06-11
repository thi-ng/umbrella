import { Stream } from "../stream";
import { nextID } from "../utils/idgen";

/**
 * Creates a new stream of events attached to given element / event
 * target and using given event listener options (same as supported by
 * `addEventListener()`, default: false).
 *
 * @param src event target
 * @param name event name
 * @param opts listener opts
 */
export const fromEvent = (
    src: EventTarget,
    name: string,
    opts: boolean | AddEventListenerOptions = false
) =>
    new Stream<Event>((stream) => {
        let listener = (e: Event) => stream.next(e);
        src.addEventListener(name, listener, opts);
        return () => src.removeEventListener(name, listener, opts);
    }, `event-${name}-${nextID()}`);

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
 * @param src
 * @param name
 * @param opts
 */
export const fromDOMEvent = <K extends keyof GlobalEventHandlersEventMap>(
    src: EventTarget,
    name: K,
    opts: boolean | AddEventListenerOptions = false
): Stream<GlobalEventHandlersEventMap[K]> => fromEvent(src, name, opts);
