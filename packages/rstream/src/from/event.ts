import { Stream } from "../stream";

export function fromEvent(src: EventTarget, id: string) {
    return new Stream<Event>((o) => {
        let listener = (e) => o.next(e);
        src.addEventListener(id, listener);
        return () => src.removeEventListener(id, listener);
    }, `event-${Stream.NEXT_ID++}`);
}
