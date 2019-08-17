import { CloseMode, CommonOpts } from "../api";
import { Stream } from "../stream";
import { optsWithID } from "../utils/idgen";

/**
 * Returns a new `Stream` which emits a monotonically increasing counter
 * value at given `delay` interval, up to an optionally defined max
 * value (default: ∞), after which the stream is closed. The stream only
 * starts when the first subscriber becomes available.
 *
 * @param delay
 * @param count
 * @param opts
 */
export const fromInterval = (
    delay: number,
    count = Infinity,
    opts?: Partial<CommonOpts>
) =>
    new Stream<number>((stream) => {
        let i = 0;
        stream.next(i++);
        let id = setInterval(() => {
            stream.next(i++);
            if (--count <= 0) {
                clearInterval(id);
                stream.closeIn !== CloseMode.NEVER && stream.done();
            }
        }, delay);
        return () => clearInterval(id);
    }, optsWithID("interval-", opts));
