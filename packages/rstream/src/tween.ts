import { Fn2 } from "@thi.ng/api";
import { dedupe, reducer, scan } from "@thi.ng/transducers";
import { CloseMode } from "./api";
import { fromInterval } from "./from/interval";
import { sync } from "./stream-sync";
import { Subscription } from "./subscription";

/**
 * Takes an existing stream/subscription `src` and attaches new
 * subscription which interpolates between incoming values from `src`
 * using the given `mix` function. The returned subscription produces
 * values at a fixed frequency, defined by `delay` (in ms, default
 * 16ms). In general, that frequency should be higher than that of
 * `src`.
 *
 * If `stop` is given as well, no values will be passed downstream if
 * that function returns true. This can be used to limit traffic once
 * the tween target value has been reached.
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
 * @param delay
 */
export const tween = <T>(
    src: Subscription<any, T>,
    initial: T,
    mix: Fn2<T, T, T>,
    stop: Fn2<T, T, boolean>,
    delay = 16
) =>
    sync({
        src: { src, _: fromInterval(delay) },
        close: CloseMode.FIRST
    }).transform(
        scan(reducer(() => initial, (acc, { src }) => mix(acc, src))),
        dedupe(stop || (() => false))
    );
