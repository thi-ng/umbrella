import { Reducer } from "../api";
import { reducer } from "../reduce";

export function mul(): Reducer<number, number> {
    return reducer(() => 1, (acc, x) => acc * x);
}
