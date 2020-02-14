import { IObjectOf } from "@thi.ng/api";

export const ENDINGS = "▶◀▲▼•●";

export interface StrokeStyle {
    hl: string;
    vl: string;
    tl: string;
    tr: string;
    bl: string;
    br: string;
    tjl: string;
    tjr: string;
    tjt: string;
    tjb: string;
    jct: string;
    dot: string;
}

// https://en.wikipedia.org/wiki/Box-drawing_character

export const STROKE_STYLES: IObjectOf<StrokeStyle> = {
    ascii: {
        hl: "-",
        vl: "|",
        tl: "+",
        tr: "+",
        bl: "+",
        br: "+",
        tjl: "+",
        tjr: "+",
        tjt: "+",
        tjb: "+",
        jct: "+",
        dot: "."
    },
    thin: {
        hl: "─",
        vl: "│",
        tl: "┌",
        tr: "┐",
        bl: "└",
        br: "┘",
        tjl: "├",
        tjr: "┤",
        tjt: "┬",
        tjb: "┴",
        jct: "┼",
        dot: "·"
    },
    double: {
        hl: "═",
        vl: "║",
        tl: "╔",
        tr: "╗",
        bl: "╚",
        br: "╝",
        tjl: "╠",
        tjr: "╣",
        tjt: "╦",
        tjb: "╩",
        jct: "╬",
        dot: "·"
    }
};
