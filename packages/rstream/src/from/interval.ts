import { Stream } from "../stream";

export function fromInterval(delay: number, count = Number.POSITIVE_INFINITY) {
    return new Stream<number>((stream) => {
        let i = 0;
        let id = setInterval(() => {
            stream.next(i++);
            if (--count <= 0) {
                clearInterval(id);
                stream.done();
            }
        }, delay);
        return () => clearInterval(id);
    }, `interval-${Stream.NEXT_ID++}`);
}
