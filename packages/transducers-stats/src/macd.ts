import { Reducer, Transducer } from "@thi.ng/transducers/api";
import { compR } from "@thi.ng/transducers/func/compr";
import { step } from "@thi.ng/transducers/step";

import { ema } from "./ema";

export interface MACD {
    /**
     * MACD signal: `ema(fast) - ema(slow)`
     */
    signal: number;
    /**
     * Smoothed MACD signal, i.e. EMA of `signal` value
     */
    smooth: number;
    /**
     * Divergence (histogram), i.e. `signal - smooth`
     */
    div: number;
    /**
     * Fast EMA value
     */
    fast: number;
    /**
     * Slow EMA value
     */
    slow: number;
}

/**
 * Computes the Moving Average Convergence/Divergence (MACD) using given
 * periods.
 *
 * Note: the number of results will be `slow + smooth - 2` less than the
 * number of processed inputs.
 *
 * https://en.wikipedia.org/wiki/MACD
 *
 * @param fast fast EMA period
 * @param slow slow EMA period
 * @param smooth signal smoothing EMA period
 */
export const macd = (fast = 12, slow = 26, smooth = 9): Transducer<number, MACD> =>
    (rfn: Reducer<any, MACD>) => {
        const reduce = rfn[2];
        const maFast = step(ema(fast));
        const maSlow = step(ema(slow));
        const maSmooth = step(ema(smooth));
        return compR(
            rfn,
            (acc, x) => {
                const fast = <number>maFast(x);
                const slow = <number>maSlow(x);
                if (slow == null) return acc;
                const signal = fast - slow;
                const smooth = <number>maSmooth(signal);
                if (smooth == null) return acc;
                return reduce(acc, { signal, smooth, div: signal - smooth, fast, slow });
            }
        );
    };
