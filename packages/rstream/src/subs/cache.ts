import { IDeref } from "@thi.ng/api/api";
import { Transducer } from "@thi.ng/transducers/api";

import { Subscription } from "../subscription";

/**
 * Deprecated since v1.1.0. Subscriptions now store last received value
 * and new subs will receive the last value stored in parent as their
 * first value (if there is one).
 */
export class Cache<T> extends Subscription<any, T> implements
    IDeref<T> {

    value: T;

    constructor(xf?: Transducer<any, T>, id?: string) {
        super(null, xf, null, id || `cache-${Subscription.NEXT_ID++}`);
    }

    deref(): T {
        return this.value;
    }

    dispatch(x: T) {
        this.value = x;
        super.dispatch(x);
    }
}

export function cache<T>(xf?: Transducer<any, T>, id?: string) {
    return new Cache(xf, id);
}
