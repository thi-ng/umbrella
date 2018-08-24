import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { Reducer, Transducer } from "@thi.ng/transducers/api";
import { compR } from "@thi.ng/transducers/func/compr";
import { iterator1 } from "@thi.ng/transducers/iterator";

/**
 * https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
 *
 * Note: the number of results will be `period-1` less than the number
 * of processed inputs.
 *
 * @param period
 */
export function ema(period: number): Transducer<number, number>;
export function ema(period: number, src: Iterable<number>): IterableIterator<number>;
export function ema(period: number, src?: Iterable<number>): any {
    if (src) {
        return iterator1(ema(period), src);
    }
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
            (acc, x: number) => {
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
