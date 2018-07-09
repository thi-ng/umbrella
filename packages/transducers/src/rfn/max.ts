import { Reducer } from "../api";
import { reducer } from "../reduce";

export function max(): Reducer<number, number> {
    return reducer(() => Number.NEGATIVE_INFINITY, (acc, x) => Math.max(acc, x));
}
