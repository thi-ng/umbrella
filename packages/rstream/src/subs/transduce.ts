import { Reducer, Transducer } from "@thi.ng/transducers/api";
import { isReduced } from "@thi.ng/transducers/reduced";

import { Subscription } from "../subscription";

export function transduce<A, B, C>(src: Subscription<any, A>, tx: Transducer<A, B>, rfn: Reducer<C, B>, init?: C): Promise<C> {
    let acc = init !== undefined ? init : rfn[0]();
    let sub: Subscription<A, B>;

    return new Promise<C>((resolve, reject) => {
        sub = src.subscribe({
            next(x) {
                const _acc = rfn[2](acc, x);
                if (isReduced(_acc)) {
                    resolve(_acc.deref());
                } else {
                    acc = _acc;
                }
            },
            done() {
                resolve(acc);
            },
            error(e) {
                reject(e);
            }
        }, tx);
    }).then(
        (fulfilled) => {
            sub.unsubscribe();
            return fulfilled;
        },
        (rejected) => {
            sub.unsubscribe();
            throw rejected;
        }
    );
}
