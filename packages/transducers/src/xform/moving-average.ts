import { Transducer } from "../api";
import { comp } from "../func/comp";
import { reduce } from "../reduce";
import { mean } from "../rfn/mean";
import { map } from "./map";
import { partition } from "./partition";

// TODO optimize, see @thi.ng/indicators/sma
export function movingAverage(n: number): Transducer<number, number> {
    return comp(partition(n, 1, true), map((x) => reduce(mean(), x)));
}
