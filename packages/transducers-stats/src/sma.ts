import { DCons } from "@thi.ng/dcons";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { Reducer, Transducer } from "@thi.ng/transducers/api";
import { compR } from "@thi.ng/transducers/func/compr";

/**
 * Like @thi.ng/transducers `movingAverage`, but using more efficient
 * linked list as sliding window buffer.
 *
 * Note: the number of results will be `period-1` less than the number
 * of processed inputs.
 *
 * @param period
 */
export function sma(period: number): Transducer<number, number> {
    period |= 0;
    period < 2 && illegalArgs("period must be >= 2");
    return (rfn: Reducer<any, number>) => {
        const reduce = rfn[2];
        const window = new DCons<number>();
        let sum = 0;
        return compR(
            rfn,
            (acc, x) => {
                window.push(x);
                const n = window.length;
                sum += x;
                n > period && (sum -= window.drop());
                return n >= period ? reduce(acc, sum / period) : acc;
            }
        );
    }
};
