import type { Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/comp";
import { drop } from "@thi.ng/transducers/drop";
import { iterator1 } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/map";
import { multiplex } from "@thi.ng/transducers/multiplex";
import { momentum } from "./momentum";
import { sma } from "./sma";

/**
 * {@link https://en.wikipedia.org/wiki/Relative_strength_index}
 *
 * Note: the number of results will be `period` less than the
 * number of processed inputs.
 *
 * @param period -
 * @param src -
 */
export function rsi(period: number): Transducer<number, number>;
export function rsi(
    period: number,
    src: Iterable<number>
): IterableIterator<number>;
export function rsi(period: number, src?: Iterable<number>): any {
    return src
        ? iterator1(rsi(period), src)
        : comp(
              momentum(1),
              multiplex(
                  comp(
                      map((x) => (x > 0 ? x : 0)),
                      sma(period)
                  ),
                  comp(
                      map((x) => (x < 0 ? -x : 0)),
                      sma(period)
                  )
              ),
              drop(period - 1),
              map((hl) => 100 - 100 / (1 + hl[0] / Math.max(1e-6, hl[1])))
          );
}
