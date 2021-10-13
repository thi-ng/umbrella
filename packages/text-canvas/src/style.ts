import type { StrokeStyle } from "./api.js";

export const horizontalOnly = ({ hl, dot }: StrokeStyle): StrokeStyle => ({
    hl: hl,
    vl: " ",
    tl: hl,
    tr: hl,
    bl: hl,
    br: hl,
    tjl: hl,
    tjr: hl,
    tjt: hl,
    tjb: hl,
    jct: hl,
    dot,
});

export const verticalOnly = ({ vl, dot }: StrokeStyle): StrokeStyle => ({
    hl: " ",
    vl: vl,
    tl: vl,
    tr: vl,
    bl: vl,
    br: vl,
    tjl: vl,
    tjr: vl,
    tjt: vl,
    tjb: vl,
    jct: vl,
    dot,
});
