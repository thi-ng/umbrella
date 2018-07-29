import { Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { drop } from "@thi.ng/transducers/xform/drop";
import { map } from "@thi.ng/transducers/xform/map";
import { multiplex } from "@thi.ng/transducers/xform/multiplex";
import { partition } from "@thi.ng/transducers/xform/partition";

import { mse } from "./mse";
import { sma } from "./sma";

/**
 * Moving standard deviation, calculates mean square error to SMA and
 * yields sequence of `sqrt(error / period)`.
 *
 * https://en.wikipedia.org/wiki/Bollinger_Bands
 *
 * Note: the number of results will be `period-1` less than the number
 * of processed inputs.
 *
 * @param period
 */
export function sd(period = 20, scale = 1): Transducer<number, any> {
    return comp(
        multiplex(partition(period, 1), sma(period)),
        drop(period - 1),
        map(([window, mean]) => Math.sqrt(mse(window, mean) / period) * scale)
    );
};
