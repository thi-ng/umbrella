import { Stream } from "../stream";

export function fromIterable<T>(src: Iterable<T>, delay = 0) {
    return new Stream<T>((stream) => {
        const iter = src[Symbol.iterator](),
            id = setInterval(() => {
                let val: IteratorResult<T>;
                if ((val = iter.next()).done) {
                    clearInterval(id);
                    stream.done();
                } else {
                    stream.next(val.value);
                }
            }, delay);
        return () => clearInterval(id);
    }, `iterable-${Stream.NEXT_ID++}`);
}
