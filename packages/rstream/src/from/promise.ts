import { CloseMode, CommonOpts, State } from "../api";
import { Stream } from "../stream";
import { optsWithID } from "../utils/idgen";

/**
 * Yields a single-value stream of the resolved promise and then
 * automatically marks itself done. It doesn't matter if the promise
 * resolves before the first subscriber has attached.
 *
 * @param src
 * @param opts
 */
export const fromPromise = <T>(src: Promise<T>, opts?: Partial<CommonOpts>) => {
    let canceled = false;
    let isError = false;
    let err: any = {};
    src.catch((e) => {
        err = e;
        isError = true;
    });
    return new Stream<T>((stream) => {
        src.then(
            (x) => {
                if (!canceled && stream.getState() < State.DONE) {
                    if (isError) {
                        stream.error(err);
                        err = null;
                    } else {
                        stream.next(x);
                        stream.closeIn !== CloseMode.NEVER && stream.done();
                    }
                }
            },
            (e) => stream.error(e)
        );
        return () => {
            canceled = true;
        };
    }, optsWithID("promise-", opts));
};
