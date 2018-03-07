import { InterceptorFn, InterceptorPredicate, FX_CANCEL } from "./api";
import { getIn } from "./path";

///////////////////////////////////////////////////////////////////////
// re-usable interceptors

// this one simply logs the current event
export const trace = (_, e) => console.log("event:", e);

// higher-order interceptor for validation purposes
// takes a predicate function and an optional interceptor function
// which will be called if the predicate fails for a given event
// by default the FX_CANCEL side effect is triggered if there is a failure
// ensuring the actual event handler for the failed event will not be
// executed anymore
export const ensurePred = (pred: InterceptorPredicate, err?: InterceptorFn) =>
    (state, e) => {
        if (!pred(state, e)) {
            return { [FX_CANCEL]: true, ...(err ? err(state, e) : null) };
        }
    };

// specialization of `ensurePred()` to ensure a value less than given max
export const ensureLessThan = (max: number, err: InterceptorFn) =>
    ensurePred((state, e) => getIn(state, e[1]) < max, err);

// specialization of `ensurePred()` to ensure a value greater than given min
export const ensureGreaterThan = (min: number, err: InterceptorFn) =>
    ensurePred((state, e) => getIn(state, e[1]) > min, err);
