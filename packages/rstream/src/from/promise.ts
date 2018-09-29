import { State } from "../api";
import { Stream } from "../stream";
import { Subscription } from "../subscription";

/**
 * Yields a single-value stream of the resolved promise and then
 * automatically marks itself done. It doesn't matter if the promise
 * resolves before the first subscriber has attached.
 *
 * @param src
 */
export function fromPromise<T>(src: Promise<T>) {
    let canceled = false;
    let isError = false;
    let err: any = {};
    src.catch(
        (e) => {
            err = e;
            isError = true;
        }
    );
    return new Stream<T>((stream) => {
        src.then(
            (x) => {
                if (!canceled && stream.getState() < State.DONE) {
                    if (isError) {
                        stream.error(err);
                        err = null;
                    } else {
                        stream.next(x);
                        stream.done();
                    }
                }
            },
            (e) => stream.error(e)
        );
        return () => { canceled = true; };
    }, `promise-${Subscription.NEXT_ID++}`);
}
