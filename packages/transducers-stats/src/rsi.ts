import { Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { drop } from "@thi.ng/transducers/xform/drop";
import { map } from "@thi.ng/transducers/xform/map";
import { multiplex } from "@thi.ng/transducers/xform/multiplex";
import { momentum } from "./momentum";
import { sma } from "./sma";

/**
 * https://en.wikipedia.org/wiki/Relative_strength_index
 *
 * Note: the number of results will be `period` less than the
 * number of processed inputs.
 *
 * @param period
 */
export function rsi(period: number): Transducer<number, number> {
    return comp(
        momentum(1),
        multiplex(
            comp(map((x) => x > 0 ? x : 0), sma(period)),
            comp(map((x) => x < 0 ? -x : 0), sma(period)),
        ),
        drop(period - 1),
        map((hl) => 100 - 100 / (1 + hl[0] / Math.max(1e-6, hl[1])))
    );
};
