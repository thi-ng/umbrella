import { isTransferable } from "@thi.ng/checks/is-transferable";
import { isTypedArray } from "@thi.ng/checks/is-typedarray";

import { DEBUG, ISubscriber } from "../api";
import { makeWorker } from "../utils/worker";

/**
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