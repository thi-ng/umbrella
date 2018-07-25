import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { Reducer, Transducer } from "@thi.ng/transducers/api";
import { compR } from "@thi.ng/transducers/func/compr";

/**
 * https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
 *
 * Note: the number of results will be `period-1` less than the number
 * of processed inputs.
 *
 * @param period
 */
export function ema(period: number): Transducer<number, number> {
    period |= 0;
    period < 2 && illegalArgs("period must be >= 2");
    const k = 2 / (period + 1);
    return (rfn: Reducer<any, number>) => {
        const reduce = rfn[2];
        let window = [];
        let sum = 0;
        let ema: number;
        return compR(
            rfn,
            (acc, x) => {
                if (ema != null) {
                    ema += (x - ema) * k;
                    return rfn[2](acc, ema);
                } else {
                    window.push(x);
                    sum += x;
                    if (window.length == period) {
                        ema = sum / period;
                        window = null;
                        return reduce(acc, ema);
                    }
                    return acc;
                }
            });
    };
};
