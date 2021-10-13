import type { Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/comp";
import { iterator1 } from "@thi.ng/transducers/iterator";
import { ema } from "./ema.js";
import { roc } from "./roc.js";

/**
 * {@link https://en.wikipedia.org/wiki/Trix_(technical_analysis)}
 *
 * Note: the number of results will be `3 * (period - 1) + 1` less than
 * the number of processed inputs.
 *
 * @param period -
 */
export function trix(period: number): Transducer<number, number>;
export function trix(
    period: number,
    src: Iterable<number>
): IterableIterator<number>;
export function trix(period: number, src?: Iterable<number>): any {
    return src
        ? iterator1(trix(period), src)
        : comp(ema(period), ema(period), ema(period), roc(1));
}
