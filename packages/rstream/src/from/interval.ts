import { Stream } from "../stream";

export function fromInterval(delay: number, count = Number.POSITIVE_INFINITY) {
    return new Stream<number>((o) => {
        let i = 0;
        let id = setInterval(() => {
            o.next(i++);
            if (--count <= 0) {
                clearInterval(id);
                o.done();
            }
        }, delay);
        return () => clearInterval(id);
    }, `interval-${Stream.NEXT_ID++}`);
}
