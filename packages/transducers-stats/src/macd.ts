import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/compr";
import { __iter } from "@thi.ng/transducers/iterator";
import { step } from "@thi.ng/transducers/step";
import { ema } from "./ema.js";

export interface MACD {
    /**
     * Main MACD value: `ema(fast) - ema(slow)`
     */
    macd: number;
    /**
     * Smoothed MACD, i.e. EMA(smooth) of `macd` value
     */
    signal: number;
    /**
     * Divergence (histogram), i.e. `macd - signal`
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
 * {@link https://en.wikipedia.org/wiki/MACD}
 *
 * @param fast - fast EMA period
 * @param slow - slow EMA period
 * @param smooth - signal smoothing EMA period
 */
export function macd(
    fast?: number,
    slow?: number,
    smooth?: number
): Transducer<number, MACD>;
export function macd(src: Iterable<number>): IterableIterator<MACD>;
export function macd(
    fast: number,
    slow: number,
    smooth: number,
    src: Iterable<number>
): IterableIterator<MACD>;
export function macd(...args: any[]): any {
    return (
        __iter(macd, args) ||
        ((rfn: Reducer<any, MACD>) => {
            const reduce = rfn[2];
            const maFast = step(ema(args[0] || 12));
            const maSlow = step(ema(args[1] || 26));
            const maSmooth = step(ema(args[2] || 9));
            return compR(rfn, (acc, x: number) => {
                const fast = <number>maFast(x);
                const slow = <number>maSlow(x);
                if (slow == null) return acc;
                const macd = fast - slow;
                const signal = <number>maSmooth(macd);
                if (signal == null) return acc;
                return reduce(acc, {
                    macd,
                    signal,
                    div: macd - signal,
                    fast,
                    slow,
                });
            });
        })
    );
}
