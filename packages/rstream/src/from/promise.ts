import { State } from "../api";
import { Stream } from "../stream";

export function fromPromise<T>(src: Promise<T>) {
    let canceled = false;
    return new Stream<T>((stream) => {
        src.then(
            (x) => {
                if (!canceled && stream.getState() < State.DONE) {
                    stream.next(x);
                    stream.done();
                }
            },
            (e) => stream.error(e)
        );
        return () => { canceled = true; };
    }, `promise-${Stream.NEXT_ID++}`);
}
