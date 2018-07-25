import { isNumber } from "@thi.ng/checks/is-number";
import { Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { range } from "@thi.ng/transducers/iter/range";
import { map } from "@thi.ng/transducers/xform/map";
import { partition } from "@thi.ng/transducers/xform/partition";

import { dot } from "./dot";

/**
 * https://en.wikipedia.org/wiki/Moving_average#Weighted_moving_average
 *
 * Note: the number of results will be `period-1` less than the number
 * of processed inputs.
 *
 * @param weights period or array of weights
 */
export function wma(weights: number | number[]): Transducer<number, number> {
    let period, wsum;
    if (isNumber(weights)) {
        period = weights | 0;
        weights = [...range(1, period + 1)];
        wsum = (period * (period + 1)) / 2;
    } else {
        period = weights.length;
        wsum = weights.reduce((acc, x) => acc + x, 0);
    }
    return comp(
        partition(period, 1),
        map((window) => dot(window, <number[]>weights) / wsum)
    );
};
