import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

export function ensureIterable(x: any): IterableIterator<any> {
    if (!(x != null && x[Symbol.iterator])) {
        illegalArgs(`value is not iterable: ${x}`);
    }
    return x;
}
