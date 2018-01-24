import { Predicate } from "@thi.ng/api/api";
import { ISubscriber } from "../api";
import { Subscription } from "../subscription";

// TODO wrap A & B and attach as children? else, how to propagate teardown?
export function bisect<T>(pred: Predicate<T>, a?: ISubscriber<T>, b?: ISubscriber<T>) {
    return new Subscription<T, T>({
        next(x) {
            (pred(x) ? a : b).next(x);
        },
        done() {
            a.done();
            b.done();
        }
    });
}
