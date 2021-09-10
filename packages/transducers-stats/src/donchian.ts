import type { Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/func/comp";
import { iterator } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/xform/map";
import { partition } from "@thi.ng/transducers/xform/partition";
import { bounds } from "./bounds";

/**
 * Computes Donchian channel, i.e. min/max values for sliding window.
 *
 * {@link https://en.wikipedia.org/wiki/Donchian_channel}
 *
 * Note: the number of results will be `period-1` less than the
 * number of processed inputs.
 *
 * @param period -
 * @param src -
 */
export function donchian(period: number): Transducer<number, [number, number]>;
export function donchian(
    period: number,
    src: Iterable<number>
): IterableIterator<[number, number]>;
export function donchian(period: number, src?: Iterable<number>): any {
    return src
        ? iterator(donchian(period), src)
        : comp<number, number[], number[]>(partition(period, 1), map(bounds));
}
