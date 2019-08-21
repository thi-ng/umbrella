import { Fn } from "@thi.ng/api";
import { ReductionFn } from "../api";
import { isReduced } from "../reduced";

/**
 * Helper HOF yielding a buffer drain completion function for some
 * transducers.
 *
 * @param buf
 * @param complete
 * @param reduce
 */
export const __drain = <T>(
    buf: T[],
    complete: Fn<any, any>,
    reduce: ReductionFn<any, T>
) => (acc: T[]) => {
    while (buf.length && !isReduced(acc)) {
        acc = reduce(acc, buf.shift()!);
    }
    return complete(acc);
};
