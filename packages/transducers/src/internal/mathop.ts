import { FnAny } from "@thi.ng/api";
import { Reducer, ReductionFn } from "../api";
import { $$reduce, reducer } from "../reduce";

export const __mathop = (
    rfn: FnAny<Reducer<number, number>>,
    fn: ReductionFn<number, number>,
    initDefault: number,
    args: any[]
) => {
    const res = $$reduce(rfn, args);
    if (res !== undefined) {
        return res;
    }
    const init = args[0] || initDefault;
    return reducer(() => init, fn);
};
