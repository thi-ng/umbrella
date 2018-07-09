import { Reducer } from "../api";
import { reducer } from "../reduce";

export function mean(): Reducer<number, number> {
    let n = 0;
    return reducer(() => 0, (acc, x) => (n++ , acc + x));
}
