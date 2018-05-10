import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

import { iterator } from "./iterator";

export function ensureIterable(x: any): IterableIterator<any> {
    if (!(x != null && x[Symbol.iterator])) {
        illegalArgs(`value is not iterable: ${x}`);
    }
    return x;
}

export function ensureIterator(x: any) {
    return ensureIterable(iterator(x));
}
