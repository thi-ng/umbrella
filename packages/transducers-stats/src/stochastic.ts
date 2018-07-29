import { Reducer, Transducer } from "@thi.ng/transducers/api";
import { compR } from "@thi.ng/transducers/func/compr";
import { step } from "@thi.ng/transducers/step";

import { donchian } from "./donchian";
import { sma } from "./sma";

/**
 * Stochastic oscillator. Yields tuples of `[%K, %D1, %D2]`, where:
 *
 * - %K = (curr - L5) / (H5 - L5)
 * - %D1 = SMA(%K, periodD1)
 * - %D2 = SMA(%D1, periodD2)
 *
 * https://en.wikipedia.org/wiki/Stochastic_oscillator
 *
 * @param periodK
 * @param periodD1
 * @param periodD2
 */
export function stochastic(periodK: number, periodD1: number, periodD2: number): Transducer<number, any> {
    return (rfn: Reducer<any, number[]>) => {
        const reduce = rfn[2];
        const xfD = step(donchian(periodK));
        const ma1 = step(sma(periodD1));
        const ma2 = step(sma(periodD2));
        return compR(
            rfn,
            (acc, x) => {
                const b = <number[]>xfD(x);
                if (b == null) return acc;
                const k = (x - b[0]) / (b[1] - b[0]);
                const d1 = <number>ma1(k);
                if (d1 == null) return acc;
                const d2 = <number>ma2(d1);
                if (d2 == null) return acc;
                return reduce(acc, [k, d1, d2]);
            }
        );
    }
}
