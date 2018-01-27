import { Reducer } from "../api";
import { isReduced, reduced } from "../reduced";

export function reductions<A, B>([init, complete, reduce]: Reducer<A, B>): Reducer<A[], B> {
    return [
        () => [init()],
        (acc) => (acc[acc.length - 1] = complete(acc[acc.length - 1]), acc),
        (acc, x) => {
            const res = reduce(acc[acc.length - 1], x);
            if (isReduced(res)) {
                acc.push(res.deref());
                return reduced(acc);
            }
            acc.push(res);
            return acc;
        }
    ];
}
