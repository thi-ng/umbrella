import type { Fn3, Fn4, FnN, FnU3 } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { clamp01, fract } from "@thi.ng/math";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { setC4 } from "@thi.ng/vectors";
import type { Color, ReadonlyColor, TypedColor } from "../api";
import { ensureAlpha } from "../internal/ensure-alpha";

/** @internal */
const analogN = (x: number, delta: number, rnd: IRandom, post: FnN = clamp01) =>
    delta !== 0 ? post(x + rnd.norm(delta)) : x;

/** @internal */
const analogH = (x: number, delta: number, rnd: IRandom) =>
    analogN(x, delta, rnd, fract);

/** @internal */
const analogA = (a: number, delta: number, rnd: IRandom) =>
    delta !== 0
        ? clamp01((a !== undefined ? a : 1) + rnd.norm(delta))
        : ensureAlpha(a);

export const defAnalog: FnU3<
    Fn3<number, number, IRandom, number>,
    Fn4<Color | null, TypedColor<any>, number, IRandom | undefined, Color>
> = (x, y, z) => (out, src, delta, rnd = SYSTEM) =>
    setC4(
        out || src,
        x(src[0], delta, rnd),
        y(src[1], delta, rnd),
        z(src[2], delta, rnd),
        ensureAlpha(src[3])
    );

/** @internal */
const analogHNN = defAnalog(analogH, analogN, analogN);

/** @internal */
const analogNNN = defAnalog(analogN, analogN, analogN);

/**
 * Returns a random analog color based on given `src` color and variance
 * `delta`. Each channel will be randomized by +/- `delta`, optionally using
 * provided {@link @thi.ng/random#IRandom} PRNG.
 */
export const analog = defmulti<
    Color | null,
    TypedColor<any>,
    number,
    IRandom | undefined,
    Color
>((_: Color | null, src: TypedColor<any>) => src.mode);

analog.add(DEFAULT, analogNNN);

analog.addAll({
    hcy: analogHNN,
    hsi: analogHNN,
    hsl: analogHNN,
    hsv: analogHNN,
    lch: defAnalog(analogN, analogN, analogH),
});

/**
 * Similar to {@link analogRGB}. Returns an analog color based on given HSVA
 * color, with each channel randomly varied by given channel-specific delta
 * amounts (and optionally given {@link @thi.ng/random#IRandom} PRNG).
 *
 * @remarks
 * This function provides more user control than {@link analog}, but the latter
 * is recommended for most use cases.
 *
 * By default (unless `deltaS`, `deltaV`, `deltaA` are provided) only the hue of
 * the color will be modulated.
 *
 * @param out
 * @param src
 * @param deltaH
 * @param deltaS
 * @param deltaV
 * @param deltaA
 * @param rnd
 */
export const analogHsv = (
    out: Color | null,
    src: ReadonlyColor,
    deltaH: number,
    deltaS = 0,
    deltaV = 0,
    deltaA = 0,
    rnd: IRandom = SYSTEM
) =>
    setC4(
        out || src,
        analogN(src[0], deltaH, rnd, fract),
        analogN(src[1], deltaS, rnd),
        analogN(src[2], deltaV, rnd),
        analogA(src[3], deltaA, rnd)
    );

/**
 * Similar to {@link analogHSV}. Returns an analog color based on given RGBA
 * color, with each channel randomly varied by given delta amounts (and
 * optionally given {@link @thi.ng/random#IRandom} PRNG).
 *
 * @remarks
 * By default the green and blue channel variance will be the same as `deltaR`.
 *
 * @param out
 * @param src
 * @param deltaR
 * @param deltaG
 * @param deltaB
 * @param deltaA
 * @param rnd
 */
export const analogRgb = (
    out: Color | null,
    src: ReadonlyColor,
    deltaR: number,
    deltaG = deltaR,
    deltaB = deltaR,
    deltaA = 0,
    rnd: IRandom = SYSTEM
) =>
    setC4(
        out || src,
        analogN(src[0], deltaR, rnd),
        analogN(src[1], deltaG, rnd),
        analogN(src[2], deltaB, rnd),
        analogA(src[3], deltaA, rnd)
    );
