import { Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { ema } from "./ema";
import { roc } from "./roc";

/**
 * https://en.wikipedia.org/wiki/Trix_(technical_analysis)
 *
 * Note: the number of results will be `3 * (period - 1) + 1` less than
 * the number of processed inputs.
 *
 * @param period
 */
export function trix(period: number): Transducer<number, number> {
    return comp(
        ema(period),
        ema(period),
        ema(period),
        roc(1),
    );
};
