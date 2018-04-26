import { Predicate } from "@thi.ng/api/api";

import { ISubscriber } from "../api";
import { Subscription } from "../subscription";

export function bisect<T>(pred: Predicate<T>, a?: ISubscriber<T>, b?: ISubscriber<T>) {
    return new Subscription<T, T>({
        next(x) {
            const sub = pred(x) ? a : b;
            sub.next && sub.next(x);
        },
        done() {
            a.done && a.done();
            b.done && b.done();
        }
    });
}
