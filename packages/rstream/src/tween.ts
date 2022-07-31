import type { Fn2 } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { dedupe } from "@thi.ng/transducers/dedupe";
import { reducer } from "@thi.ng/transducers/reduce";
import { scan } from "@thi.ng/transducers/scan";
import { CloseMode, ISubscribable } from "./api.js";
import { fromInterval } from "./interval.js";
import { fromRAF } from "./raf.js";
import { sync } from "./sync.js";

/**
 * Takes an existing stream/subscription `src` and attaches new
 * subscription which interpolates between incoming values from `src`
 * using the given `mix` function.
 *
 * @remarks
 * The returned construct produces values at a rate controlled by the
 * `clock` stream or frequency. If omitted, `clock` defaults to
 * {@link fromRAF} (~60Hz). If the `clock` is given as number, creates a
 * {@link fromInterval} or else uses the given `clock` stream directly.
 * In general, the frequency of the `clock` should always be higher than
 * that of `src` or else interpolation will have undefined behavior.
 *
 * If `stop` is given as well, no values will be passed downstream if
 * that function returns true. This can be used to limit traffic once
 * the tween target value has been reached.
 *
 * The returned subscription closes automatically when either `src` or
 * `clock` are exhausted.
 *
 * @example
 * ```ts
 * val = stream();
 *
 * tween(
 *   // consume from `val` stream
 *   val,
 *   // initial start value to interpolate from
 *   0,
 *   // interpolation fn (LERP)
 *   (a, b) => a + (b - a) * 0.5,
 *   // stop emitting values if difference to previous result < 0.01
 *   (a, b) => Math.abs(a - b) < 0.01
 * ).subscribe(trace("tweened"))
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
 * @param src -
 * @param initial -
 * @param mix -
 * @param stop -
 * @param clock -
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
					: clock,
		},
		closeIn: CloseMode.FIRST,
	}).transform(
		scan(
			reducer(
				() => initial,
				(acc, { src }) => mix(acc, src)
			)
		),
		dedupe(stop || (() => false))
	);

/**
 * Convenience version of {@link tween} for its most common use case, tweening
 * of numeric streams.
 *
 * @param src -
 * @param init -
 * @param speed -
 * @param eps -
 * @param clock -
 */
export const tweenNumber = (
	src: ISubscribable<number>,
	init = 0,
	speed = 0.05,
	eps = 1e-3,
	clock?: ISubscribable<any> | number
) =>
	tween(
		src,
		init,
		(a, b) => a + (b - a) * speed,
		(a, b) => Math.abs(a - b) < eps,
		clock
	);
