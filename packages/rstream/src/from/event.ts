import { Stream } from "../stream";

/**
 * Creates a new stream of DOM events attached to given element / event
 * target and using given event listener options (same as supported by
 * `addEventListener()`, default: false).
 *
 * @param src event target
 * @param name event name
 * @param opts listener opts
 */
export function fromEvent(src: EventTarget, name: string, opts: boolean | AddEventListenerOptions = false) {
    return new Stream<Event>((stream) => {
        let listener = (e) => stream.next(e);
        src.addEventListener(name, listener, opts);
        return () => src.removeEventListener(name, listener, opts);
    }, `event-${name}-${Stream.NEXT_ID++}`);
}
