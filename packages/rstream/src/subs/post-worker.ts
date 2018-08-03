import { isTransferable } from "@thi.ng/checks/is-transferable";
import { isTypedArray } from "@thi.ng/checks/is-typedarray";

import { DEBUG, ISubscriber } from "../api";
import { makeWorker } from "../utils/worker";

/**
 * Creates a subscriber which forwards received values to given worker.
 * The `worker` can be an existing `Worker` instance, a JS source code
 * `Blob` or an URL string. In the latter two cases, a worker is created
 * automatically using `utils/makeWorker()`. If `transfer` is true, the
 * received values will be marked as *transferrable* and the host app
 * loses all access permissions to the transferred values. See
 * `Worker.postMessage()` for details.
 *
 * If `terminate` is set to a positive number, then the worker will be
 * automatically terminated after the stated number of milliseconds
 * **after** the parent subscription is done.
 *
 * ```
 * // worker source code
 * src = `self.onmessage = (e) => console.log("worker", e.data);`;
 *
 * a = rs.stream();
 * a.subscribe(
 *   rs.postWorker(new Blob([src], {type: "application/javascript"}))
 * );
 *
 * a.next(42)
 * // worker 42
 * ```
 *
 * @param worker
 * @param transfer
 * @param terminate worker termination delay (ms)
 */
export function postWorker<T>(worker: Worker | Blob | string, transfer = false, terminate = 0): ISubscriber<T> {
    const _worker = makeWorker(worker);
    return {
        next(x) {
            if (x instanceof Promise) {
                x.then((y) => this.next(y));
                return;
            }
            let tx;
            if (transfer) {
                const ta = isTypedArray(x);
                if (ta || isTransferable(x)) {
                    tx = [ta ? (<any>x).buffer : x];
                }
            }
            _worker.postMessage(x, tx);
        },
        done() {
            if (terminate > 0) {
                setTimeout(() => {
                    DEBUG && console.log("terminating worker...");
                    _worker.terminate();
                }, terminate);
            }
        }
    };
}