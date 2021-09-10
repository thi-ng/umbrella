import type { Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/func/comp";
import { $iter } from "@thi.ng/transducers/iterator";
import { drop } from "@thi.ng/transducers/xform/drop";
import { map } from "@thi.ng/transducers/xform/map";
import { multiplex } from "@thi.ng/transducers/xform/multiplex";
import { partition } from "@thi.ng/transducers/xform/partition";
import { mse } from "./mse";
import { sma } from "./sma";

/**
 * Moving standard deviation, calculates mean square error to SMA and
 * yields sequence of `sqrt(error / period)`.
 *
 * {@link https://en.wikipedia.org/wiki/Bollinger_Bands}
 *
 * Note: the number of results will be `period-1` less than the number
 * of processed inputs.
 *
 * @param period -
 * @param scale -
 * @param src -
 */
export function sd(period?: number, scale?: number): Transducer<number, number>;
export function sd(src: Iterable<number>): IterableIterator<number>;
export function sd(
    period: number,
    scale: number,
    src: Iterable<number>
): IterableIterator<number>;
export function sd(...args: any[]): any {
    const iter = $iter(sd, args);
    if (iter) {
        return iter;
    }
    const period: number = args[0] || 20;
    const scale: number = args[1] || 1;
    return comp(
        multiplex(partition(period, 1), sma(period)),
        drop(period - 1),
        map(
            ([window, mean]: [number[], number]) =>
                Math.sqrt(mse(window, mean) / period) * scale
        )
    );
}
