import { Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { drop } from "@thi.ng/transducers/xform/drop";
import { map } from "@thi.ng/transducers/xform/map";
import { multiplex } from "@thi.ng/transducers/xform/multiplex";
import { partition } from "@thi.ng/transducers/xform/partition";

import { mse } from "./mse";
import { sma } from "./sma";

export interface BollingerBand {
    min: number;
    max: number;
    mean: number;
    pb: number;
}

/**
 * Computes Bollinger bands using sliding window.
 *
 * https://en.wikipedia.org/wiki/Bollinger_Bands
 *
 * Note: the number of results will be `period-1` less than the
 * number of processed inputs.
 *
 * @param period
 */
export function bollinger(period = 20, sd = 2): Transducer<number, BollingerBand> {
    return comp(
        multiplex(partition(period, 1), sma(period)),
        drop(period - 1),
        map(([window, mean]) => {
            const std = Math.sqrt(mse(window, mean) / period) * sd;
            const min = mean - std;
            const max = mean + std;
            const pb = (window[period - 1] - min) / (max - min);
            return { min, max, mean, pb };
        })
    );
};
