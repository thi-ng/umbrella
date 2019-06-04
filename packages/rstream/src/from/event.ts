import { Stream } from "../stream";
import { nextID } from "../utils/idgen";

/**
 * Creates a new stream of DOM events attached to given element / event
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
