import { mix as _mix } from "@thi.ng/math";
import { mixN4, setC4 } from "@thi.ng/vectors";
import type { Color, ReadonlyColor } from "../api";

/**
 * Channelwise linear interpolation between colors `a` and `b` using `t` [0..1]
 * as blend factor.
 *
 * @remarks
 * The {@link @thi.ng/math#} package provides various easing functions to create
 * non-linear interpolations. For example:
 *
 * @example
 * ```ts
 * import { circular } from "@thi.ng/math";
 *
 * mix([], RED, GREEN, 0.5);
 * // [ 0.5, 0.5, 0, 1 ]
 *
 * mix([], RED, GREEN, circular(0.5));
 * // [ 0.1339745962155614, 0.8660254037844386, 0, 1 ]
 * ```
 *
 * @param out -
 * @param a -
 * @param b -
 * @param t -
 */
export const mix: (
    out: Color | null,
    a: ReadonlyColor,
    b: ReadonlyColor,
    t: number
) => Color = mixN4;

/**
 * Similar to {@link mix}, but uses `a`'s alpha channel as interpolation factor.
 * Result color alpha will also be that of `a`.
 *
 * @remarks
 * See {@link @thi.ng/porter-duff#} for more advanced blending operations (RGB
 * only).
 *
 * @param out -
 * @param a -
 * @param b -
 */
export const mixAlpha = (
    out: Color | null,
    a: ReadonlyColor,
    b: ReadonlyColor
) =>
    setC4(
        out || a,
        _mix(a[0], b[0], a[3]),
        _mix(a[0], b[0], a[3]),
        _mix(a[0], b[0], a[3]),
        a[3]
    );
