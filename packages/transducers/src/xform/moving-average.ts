import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { iterator1 } from "../iterator";

/**
 * Computes the Simple Moving Average of given period.
 * https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average
 *
 * Note: the number of results will be `period-1` less than the number
 * of processed inputs and no outputs will be produced if there were
 * less than `period` input values.
 *
 * Also see the @thi.ng/transducers-stats package for more optimized and
 * alternative MAs.
 *
 * @param period
 * @param src
 */
export function movingAverage(period: number): Transducer<number, number>;
export function movingAverage(period: number, src: Iterable<number>): IterableIterator<number>;
export function movingAverage(period: number, src?: Iterable<number>): any {
    return src ?
        iterator1(movingAverage(period), src) :
        (rfn: Reducer<any, number>) => {
            period |= 0;
            period < 2 && illegalArgs("period must be >= 2");
            const reduce = rfn[2];
            const window = [];
            let sum = 0;
            return compR(
                rfn,
                (acc, x: number) => {
                    const n = window.push(x);
                    sum += x;
                    n > period && (sum -= window.shift());
                    return n >= period ? reduce(acc, sum / period) : acc;
                }
            );
        };
};
