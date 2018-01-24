import { State } from "../api";
import { Stream } from "../stream";

export function fromPromise<T>(src: Promise<T>) {
    return new Stream<T>((o) => {
        src.then((x) => {
            if (o.getState() !== State.DONE) {
                o.next(x);
                o.done();
            }
        }).catch(e => o.error(null, e));
        return () => o.done();
    }, `promise-${Stream.NEXT_ID++}`);
}
