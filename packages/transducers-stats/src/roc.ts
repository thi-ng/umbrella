import { DCons } from "@thi.ng/dcons/dcons";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { Reducer, Transducer } from "@thi.ng/transducers";
import { compR } from "@thi.ng/transducers/func/compr";
import { iterator1 } from "@thi.ng/transducers/iterator";

/**
 * Rate of change.
 *
 * {@link https://en.wikipedia.org/wiki/Momentum_(technical_analysis)}
 *
 * Note: the number of results will be `period` less than the number
 * of processed inputs and no outputs will be produced if there were
 * less than `period` input values.
 *
 * @param period -
 */
export function roc(period: number): Transducer<number, number>;
export function roc(
    period: number,
    src: Iterable<number>
): IterableIterator<number>;
export function roc(period: number, src?: Iterable<number>): any {
    if (src) {
        return iterator1(roc(period), src);
    }
    period < 1 && illegalArgs("period must be >= 1");
    return (rfn: Reducer<any, number>) => {
        const reduce = rfn[2];
        const window = new DCons<number>();
        return compR(rfn, (acc, x: number) => {
            window.push(x);
            if (window.length <= period) {
                return acc;
            }
            const prev = window.drop()!;
            return reduce(acc, (x - prev) / prev);
        });
    };
}
