import { Fn } from "@thi.ng/api";

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
// bit 4: bright fg
// bits 5-8: bg
// bit 9: bright bg
// bit 10: bold
// bit 11: dim
// bit 12: underline

export const NONE = 0;

export const FG_BLACK = 1;
export const FG_RED = 2;
export const FG_GREEN = 3;
export const FG_YELLOW = 4;
export const FG_BLUE = 5;
export const FG_MAGENTA = 6;
export const FG_CYAN = 7;
export const FG_LIGHT_GRAT = 8;

export const FG_GRAY = 0x11;
export const FG_BRIGHT_RED = 0x12;
export const FG_BRIGHT_GREEN = 0x13;
export const FG_BRIGHT_YELLOW = 0x14;
export const FG_BRIGHT_BLUE = 0x15;
export const FG_BRIGHT_MAGENTA = 0x16;
export const FG_BRIGHT_CYAN = 0x17;
export const FG_WHITE = 0x18;

export const BG_BLACK = 0x20;
export const BG_RED = 0x40;
export const BG_GREEN = 0x60;
export const BG_YELLOW = 0x80;
export const BG_BLUE = 0xa0;
export const BG_MAGENTA = 0xc0;
export const BG_CYAN = 0xe0;
export const BG_LIGHT_GRAY = 0x100;

export const BG_GRAY = 0x220;
export const BG_BRIGHT_RED = 0x240;
export const BG_BRIGHT_GREEN = 0x260;
export const BG_BRIGHT_YELLOW = 0x280;
export const BG_BRIGHT_BLUE = 0x2a0;
export const BG_BRIGHT_MAGENTA = 0x2c0;
export const BG_BRIGHT_CYAN = 0x2e0;
export const BG_WHITE = 0x300;

export const BOLD = 0x400;
export const DIM = 0x800;
export const UNDERLINE = 0x1000;

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

export const STROKE_STYLES: Record<"ascii" | "thin" | "double", StrokeStyle> = {
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
        dot: "•"
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
        dot: "•"
    }
};
