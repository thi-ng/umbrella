import { Reducer } from "../api";
import { reducer } from "../reduce";

export function count(offset = 0, step = 1): Reducer<number, any> {
    return reducer(() => offset, (acc, _) => acc + step);
}
