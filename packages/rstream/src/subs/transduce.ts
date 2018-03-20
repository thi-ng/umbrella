import { Reducer, Transducer } from "@thi.ng/transducers/api";
import { isReduced } from "@thi.ng/transducers/reduced";

import { Subscription } from "../subscription";

export function transduce<A, B, C>(src: Subscription<any, A>, tx: Transducer<A, B>, rfn: Reducer<C, B>, init?: C): Promise<C> {
    let acc = init !== undefined ? init : rfn[0]();
    return new Promise((resolve, reject) => {
        const sub = src.subscribe({
            next(x) {
                const _acc = rfn[2](acc, x);
                if (isReduced(_acc)) {
                    sub.unsubscribe();
                    resolve(_acc.deref());
                } else {
                    acc = _acc;
                }
            },
            done() {
                sub.unsubscribe();
                resolve(acc);
            },
            error(e) {
                reject(e);
            }
        }, tx);
    });
}
