import { Fn2 } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import { dedupe, reducer, scan } from "@thi.ng/transducers";
import { CloseMode, ISubscribable } from "./api";
import { fromInterval } from "./from/interval";
import { fromRAF } from "./from/raf";
import { sync } from "./stream-sync";

/**
 * Takes an existing stream/subscription `src` and attaches new
 * subscription which interpolates between incoming values from `src`
 * using the given `mix` function. The returned construct produces
 * values at a rate controlled by the `clock` stream or frequency. If
 * omitted, `clock` defaults to `fromRAF()` (~60Hz). If given as number,
 * creates a `fromInterval(clock)` or else uses the given `clock` stream
 * directly. In general, the frequency of the `clock` should always be
 * higher than that of `src`.
 *
 * If `stop` is given as well, no values will be passed downstream if
 * that function returns true. This can be used to limit traffic once
 * the tween target value has been reached.
 *
 * The returned subscription closes automatically when either `src` or
 * `clock` is exhausted.
 *
 * ```
 * val = stream();
 *
 * rs.tween(
 *   // consume from `val` stream
 *   val,
 *   // initial start value to interpolate from
 *   0,
 *   // interpolation fn (LERP)
 *   (a, b) => a + (b - a) * 0.5,
 *   // stop emitting values if difference to previous result < 0.01
 *   (a, b) => Math.abs(a - b) < 0.01
 * ).subscribe(rs.trace("tweened"))
 *
 * a.next(10)
 * // 5
 * // 7.5
 * // ...
 * // 9.98046875
 *
 * a.next(100)
 * // 55
 * // 77.5
 * // ...
 * // 99.989013671875
 * ```
 *
 * @param src
 * @param initial
 * @param mix
 * @param stop
 * @param clock
 */
export const tween = <T>(
    src: ISubscribable<T>,
    initial: T,
    mix: Fn2<T, T, T>,
    stop?: Fn2<T, T, boolean>,
    clock?: ISubscribable<any> | number
) =>
    sync({
        src: {
            src,
            _:
                clock == null
                    ? fromRAF()
                    : isNumber(clock)
                    ? fromInterval(clock)
                    : clock
        },
        close: CloseMode.FIRST
    }).transform(
        scan(reducer(() => initial, (acc, { src }) => mix(acc, src))),
        dedupe(stop || (() => false))
    );
