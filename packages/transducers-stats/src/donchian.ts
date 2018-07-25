import { Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { partition } from "@thi.ng/transducers/xform/partition";
import { map } from "@thi.ng/transducers/xform/map";

import { bounds } from "./bounds";

/**
 * Computes Donchian channel, i.e. min/max values for sliding window.
 *
 * https://en.wikipedia.org/wiki/Donchian_channel
 *
 * Note: the number of results will be `period-1` less than the
 * number of processed inputs.
 *
 * @param period
 */
export function donchian(period: number): Transducer<number, [number, number]> {
    return comp(partition(period, 1), map(bounds));
};
