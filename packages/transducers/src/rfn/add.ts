import { Reducer } from "../api";
import { reducer } from "../reduce";

/**
 * Reducer to compute sum of values.
 */
export function add(): Reducer<number, number> {
    return reducer(() => 0, (acc, x) => acc + x);
}
