import { illegalArgs } from "@thi.ng/errors";

/**
 * Attempts to obtain an iterator from `x` and throws error if `x` is
 * not iterable.
 *
 * @param x
 */
export const ensureIterable = (x: any): IterableIterator<any> => {
    if (!(x != null && x[Symbol.iterator])) {
        illegalArgs(`value is not iterable: ${x}`);
    }
    return x;
};
