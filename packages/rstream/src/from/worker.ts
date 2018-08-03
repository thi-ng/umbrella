import { DEBUG } from "../api";
import { Stream } from "../stream";
import { makeWorker } from "../utils/worker";

/**
 * Returns a new `Stream` instance which adds "message" and "error"
 * event listeners to given `worker` and then passes received values
 * downstream. If `terminate` is true (default), the worker will be
 * terminated when the stream is being closed (either directly or
 * indirectly, i.e. if the user called `.done()` on the stream or the
 * last child subscription has unsubscribed).
 *
 * As with `postWorker()`, the `worker` can be an existing `Worker`
 * instance, a JS source code `Blob` or an URL string. In the latter two
 * cases, a worker is created automatically using `utils/makeWorker()`.
 *
 * ```
 *
 * ```
 *
 * @param worker
 * @param terminate
 */
export function fromWorker<T>(worker: Worker | Blob | string, terminate = true) {
    const _worker = makeWorker(worker);
    return new Stream<T>((stream) => {
        const ml = (e: MessageEvent) => { stream.next(e.data); };
        const el = (e: MessageEvent) => { stream.error(e.data); };
        _worker.addEventListener("message", ml);
        _worker.addEventListener("error", el);
        return () => {
            _worker.removeEventListener("message", ml);
            _worker.removeEventListener("error", el);
            if (terminate) {
                DEBUG && console.log("terminating worker", _worker);
                _worker.terminate();
            }
        };
    });
}
