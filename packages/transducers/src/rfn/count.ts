import { Reducer } from "../api";
import { reducer } from "../reduce";

/**
 * Reducer which ignores incoming values and instead only counts them,
 * optionally using given `start` and `step` counter values.
 *
 * @param offset
 * @param step
 */
export function count(offset = 0, step = 1): Reducer<number, any> {
    return reducer(() => offset, (acc, _) => acc + step);
}
