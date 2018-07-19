import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

/**
 * Computes the Simple Moving Average of given period.
 * https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average
 *
 * Note: the number of results will be `period-1` less than the number
 * of processed inputs and no outputs will be produced if there were
 * less than `period` input values.
 *
 * @param period
 */
export function movingAverage(period: number): Transducer<number, number> {
    period |= 0;
    period < 2 && illegalArgs("period must be >= 2");
    return (rfn: Reducer<any, number>) => {
        const reduce = rfn[2];
        const window = [];
        let sum = 0;
        return compR(
            rfn,
            (acc, x) => {
                const n = window.push(x);
                sum += x;
                n > period && (sum -= window.shift());
                return n >= period ? reduce(acc, sum / period) : acc;
            }
        );
    }
};
