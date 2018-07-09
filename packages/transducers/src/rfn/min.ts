import { Reducer } from "../api";
import { reducer } from "../reduce";

export function min(): Reducer<number, number> {
    return reducer(() => Number.POSITIVE_INFINITY, (acc, x) => Math.min(acc, x));
}
