import { Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { partition } from "@thi.ng/transducers/xform/partition";
import { map } from "@thi.ng/transducers/xform/map";

/**
 * Computes min/max values for sliding window.
 *
 * https://en.wikipedia.org/wiki/Donchian_channel
 *
 * Note: the number of results will be `period-1` less than the
 * number of processed inputs and no outputs will be produced if there
 * were less than `period` input values.
 *
 * @param period
 */
export function donchian(period: number): Transducer<number, [number, number]> {
    return comp(
        partition(period, 1),
        map((window) => {
            let min = window[0];
            let max = min;
            for (let i = 1; i < period; i++) {
                const v = window[i];
                min = Math.min(min, v);
                max = Math.max(max, v);
            }
            return [min, max];
        })
    );
};
