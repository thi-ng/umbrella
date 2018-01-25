import { Stream } from "../stream";

export function fromEvent(src: EventTarget, id: string) {
    return new Stream<Event>((stream) => {
        let listener = (e) => stream.next(e);
        src.addEventListener(id, listener);
        return () => src.removeEventListener(id, listener);
    }, `event-${id}-${Stream.NEXT_ID++}`);
}
