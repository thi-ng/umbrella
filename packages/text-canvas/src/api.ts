import { Fn, IObjectOf } from "@thi.ng/api";

export interface ClipRect {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    w: number;
    h: number;
}

export interface StringFormat {
    /**
     * Function translating canvas character format codes to the actual
     * output format. This function will only be called when needed,
     * i.e. when a character's format is different than that of the
     * previous.
     */
    start: Fn<number, string>;
    /**
     * Format end string.
     */
    end: string;
    /**
     * Prefix for entire canvas result string
     */
    prefix: string;
    /**
     * Suffix for entire canvas result string
     */
    suffix: string;
}

export interface HtmlFormatOpts {
    /**
     * Array of 16 color strings, in this order: black, red, green,
     * yellow, blue, magenta, cyan, white, then repeated as bright
     * versions.
     */
    colors: string[];
    /**
     * HTML attrib name.
     */
    attrib: string;
    /**
     * Delimiter between individual formatting terms, e.g. `;` for CSS
     * rules or ` ` for CSS class names.
     */
    delim: string;
    /**
     * Prefix string for foreground colors
     */
    fg: string;
    /**
     * Prefix string for background colors
     */
    bg: string;
    bold: string;
    dim: string;
    underline: string;
}

// bits 0-3: fg
// bit 3: bright fg
// bits 4-7: bg
// bit 8: bright bg
// bit 9: bold
// bit 10: dim
// bit 11: underline

export const NONE = 0;
export const FG_BLACK = 1;
export const FG_RED = 2;
export const FG_GREEN = 3;
export const FG_YELLOW = 4;
export const FG_BLUE = 5;
export const FG_MAGENTA = 6;
export const FG_CYAN = 7;
export const FG_WHITE = 8;

export const BG_BLACK = 1 << 5;
export const BG_RED = 2 << 5;
export const BG_GREEN = 3 << 5;
export const BG_YELLOW = 4 << 5;
export const BG_BLUE = 5 << 5;
export const BG_MAGENTA = 6 << 5;
export const BG_CYAN = 7 << 5;
export const BG_WHITE = 8 << 5;

export const FG_BRIGHT = 1 << 4;
export const BG_BRIGHT = 1 << 9;

export const BOLD = 1 << 10;
export const DIM = 1 << 11;
export const UNDERLINE = 1 << 12;

export const ENDINGS = "()[]{}<>◀▶▲▼•●";

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
