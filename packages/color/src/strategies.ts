import { clamp, clamp01 } from "@thi.ng/math/interval";
import { lch, LCH } from "./lch/lch.js";
import { rotate } from "./rotate.js";

const DELTA_L = 0.1;
const DELTA_C = -0.1;

const $ = (src: LCH, l = DELTA_L, c = DELTA_C) => {
    src.l = clamp01(src.l + l);
    src.c = clamp(src.c + c, 0, 1.312);
    return src;
};

export const complementaryStrategy = (
    src: LCH,
    theta = 1 / 2,
    deltaL?: number,
    deltaC?: number
) => [src, $(<LCH>rotate(lch(), src, theta), deltaL, deltaC)];

export const splitComplementaryStrategy = (
    src: LCH,
    theta = 1 / 12,
    deltaL?: number,
    deltaC?: number
) => [
    src,
    $(<LCH>rotate(lch(), src, 0.5 - theta), deltaL, deltaC),
    $(<LCH>rotate(lch(), src, 0.5 + theta), deltaL, deltaC),
];

export const monochromeStrategy = (src: LCH, deltaC = 0) => {
    let [_, c, h, a] = src;
    c = clamp(c + deltaC, 0, 1.312);
    return [
        lch(0.025, c, h, a),
        lch(0.2, c, h, a),
        lch(0.5, c, h, a),
        lch(0.75, c, h, a),
        lch(1, c, h, a),
    ];
};

export const triadicStrategy = (src: LCH, deltaL?: number, deltaC?: number) =>
    splitComplementaryStrategy(src, 1 / 6, deltaL, deltaC);

export const tetradicStrategy = (
    src: LCH,
    theta = 1 / 12,
    deltaL?: number,
    deltaC?: number
) => [
    src,
    $(<LCH>rotate(lch(), src, theta), deltaL, deltaC),
    $(<LCH>rotate(lch(), src, 0.5), deltaL, deltaC),
    $(<LCH>rotate(lch(), src, 0.5 + theta), deltaL, deltaC),
];

export const squareStrategy = (src: LCH, deltaL?: number, deltaC?: number) =>
    tetradicStrategy(src, 0.25, deltaL, deltaC);
