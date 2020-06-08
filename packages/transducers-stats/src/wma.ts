import { isNumber } from "@thi.ng/checks";
import {
    comp,
    iterator1,
    map,
    partition,
    range,
    Transducer,
} from "@thi.ng/transducers";
import { dot } from "./dot";

/**
 * {@link https://en.wikipedia.org/wiki/Moving_average#Weighted_moving_average}
 *
 * Note: the number of results will be `period-1` less than the number
 * of processed inputs.
 *
 * @param weights - period or array of weights
 */
export function wma(weights: number | number[]): Transducer<number, number>;
export function wma(
    weights: number | number[],
    src: Iterable<number>
): IterableIterator<number>;
export function wma(weights: number | number[], src?: Iterable<number>): any {
    if (src) {
        return iterator1(wma(weights), src);
    }
    let period: number, wsum: number;
    if (isNumber(weights)) {
        period = weights | 0;
        weights = [...range(1, period + 1)];
        wsum = (period * (period + 1)) / 2;
    } else {
        period = weights.length;
        wsum = weights.reduce((acc, x) => acc + x, 0);
    }
    return comp<number, number[], number>(
        partition(period, 1),
        map((window) => dot(window, <number[]>weights) / wsum)
    );
}
