import type { FnN3, FnU4 } from "@thi.ng/api";
import { mixN4, setC4 } from "@thi.ng/vectors";
import type { ColorMixFn } from "../api";
import { ensureHue } from "../internal/ensure-hue";

/**
 * HOF color mix function. Takes 4 scalar mix fns (one per color channel) and
 * returns new {@link ColorMixFn}.
 *
 * @param x
 * @param y
 * @param z
 * @param alpha
 */
export const defMix: FnU4<FnN3, ColorMixFn> = (x, y, z, alpha) => (
    out,
    a,
    b,
    t
) =>
    setC4(
        out || a,
        x(a[0], b[0], t),
        y(a[1], b[1], t),
        z(a[2], b[2], t),
        alpha(a[3], b[3], t)
    );

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
export const mix: ColorMixFn = mixN4;

export const mixHue: FnN3 = (a, b, t) => {
    a = ensureHue(a);
    b = ensureHue(b);
    const delta = b - a;
    return ensureHue(
        a +
            (Math.abs(delta) > 0.5
                ? delta < 0
                    ? delta + 1
                    : -(1 - delta)
                : delta) *
                t
    );
};

export const mixScalar: FnN3 = (a, b, t) => a + (b - a) * t;

export const mixHsl = defMix(mixHue, mixScalar, mixScalar, mixScalar);

export const mixLch = defMix(mixScalar, mixScalar, mixHue, mixScalar);
