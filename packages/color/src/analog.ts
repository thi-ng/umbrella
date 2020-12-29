import type { FnN } from "@thi.ng/api";
import { clamp01 } from "@thi.ng/math";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { setC4 } from "@thi.ng/vectors";
import type { Color, ReadonlyColor } from "./api";
import { ensureAlpha } from "./internal/ensure-alpha";
import { ensureHue } from "./internal/ensure-hue";

const $analog = (x: number, delta: number, rnd: IRandom, post: FnN = clamp01) =>
    delta !== 0 ? post(x + rnd.norm(delta)) : x;

const $alpha = (a: number, delta: number, rnd: IRandom) =>
    delta !== 0
        ? clamp01((a !== undefined ? a : 1) + rnd.norm(delta))
        : ensureAlpha(a);

/**
 * Similar to {@link analogRGB}. Returns an analog color based on given HSVA
 * color,with each channel randomly varied by given delta amounts (and
 * optionally given {@link @thi.ng/random#IRandom} PRNG).
 *
 * @remarks
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
export const analogHSV = (
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
        $analog(src[0], deltaH, rnd, ensureHue),
        $analog(src[1], deltaS, rnd),
        $analog(src[2], deltaV, rnd),
        $alpha(src[3], deltaA, rnd)
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
export const analogRGB = (
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
        $analog(src[0], deltaR, rnd),
        $analog(src[1], deltaG, rnd),
        $analog(src[2], deltaB, rnd),
        $alpha(src[3], deltaA, rnd)
    );
