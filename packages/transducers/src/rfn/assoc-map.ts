import { Reducer } from "../api";
import { reducer } from "../reduce";

export function assocMap<A, B>(): Reducer<Map<A, B>, [A, B]> {
    return reducer(() => new Map(), (acc, [k, v]) => acc.set(k, v));
}
