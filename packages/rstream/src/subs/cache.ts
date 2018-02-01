import { IDeref } from "@thi.ng/api/api";
import { Transducer } from "@thi.ng/transducers/api";

import { Subscription } from "../subscription";

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
