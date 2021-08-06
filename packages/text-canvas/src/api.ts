import type { Fn, FnN, NumOrString } from "@thi.ng/api";

export enum Align {
    LEFT,
    RIGHT,
    CENTER,
}

export enum Border {
    NONE = 0,
    H = 1,
    V = 2,
    ALL = 3,
    FRAME = 4,
    FRAME_H = 5,
    FRAME_V = 6,
}

export interface TableOpts {
    cols: { width: number /* align?: Align*/ }[];
    style?: StrokeStyle;
    format?: number;
    formatHead?: number;
    border?: Border;
    padding?: number[];
    hard?: boolean;
}

export interface TextBoxOpts {
    format: number;
    padding: number[];
    style: StrokeStyle;
    hard?: boolean;
}

export interface ImageOpts {
    /**
     * Target characters in order of increasing brightness (assuming
     * white text on black bg).
     *
     * @defaultValue {@link SHADES_BLOCK}
     */
    chars: string | NumOrString[];
    /**
     * Format to apply to each pixel. If a function is given, it will be called
     * for each pixel value, normalized to [0..1] interval (and after gamma
     * correction). The function MUST return a valid format ID.
     */
    format: number | FnN;
    /**
     * Gamma correction value / exponent. All source pixel values will
     * be raised by this exponent.
     *
     * @defaultValue 1
     */
    gamma: number;
    /**
     * If true, uses inverted pixel values.
     *
     * @defaultValue false
     */
    invert: boolean;
    /**
     * Number of bits/pixel in source image (only grayscale supported)
     *
     * @defaultValue 8
     */
    bits: number;
}

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
     * Format end string (e.g. to ANSI reset or `</span>`).
     */
    end: string;
    /**
     * Prefix for each canvas row / line result string
     */
    prefix: string;
    /**
     * Suffix for each canvas row / line result string (e.g. linebreak)
     */
    suffix: string;
    /**
     * If true, DON'T skip 0-valued format IDs during formatting.
     *
     * @remarks
     * This is needed for various custom color-only formats, e.g. in order to
     * reproduce black in `FMT_ANSI565`. In the default format, a zero refers to
     * the default format of the target.
     *
     * @defaultValue false
     */
    zero?: boolean;
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
     * Delimiter between individual formatting terms (e.g. `;` for CSS
     * rules or ` ` for CSS class names).
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
    /**
     * Bold format string
     */
    bold: string;
    /**
     * Dimmed format string
     */
    dim: string;
    /**
     * Underline format string
     */
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
export const FG_LIGHT_GRAY = 8;

export const FG_GRAY = 0x11;
export const FG_LIGHT_RED = 0x12;
export const FG_LIGHT_GREEN = 0x13;
export const FG_LIGHT_YELLOW = 0x14;
export const FG_LIGHT_BLUE = 0x15;
export const FG_LIGHT_MAGENTA = 0x16;
export const FG_LIGHT_CYAN = 0x17;
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
export const BG_LIGHT_RED = 0x240;
export const BG_LIGHT_GREEN = 0x260;
export const BG_LIGHT_YELLOW = 0x280;
export const BG_LIGHT_BLUE = 0x2a0;
export const BG_LIGHT_MAGENTA = 0x2c0;
export const BG_LIGHT_CYAN = 0x2e0;
export const BG_WHITE = 0x300;

export const BOLD = 0x400;
export const DIM = 0x800;
export const UNDERLINE = 0x1000;

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

export const STYLE_ASCII: StrokeStyle = {
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
    dot: ".",
};

export const STYLE_THIN: StrokeStyle = {
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
    dot: "•",
};

export const STYLE_THIN_ROUNDED: StrokeStyle = {
    ...STYLE_THIN,
    tl: "╭",
    tr: "╮",
    bl: "╰",
    br: "╯",
};

export const STYLE_DASHED: StrokeStyle = {
    ...STYLE_THIN,
    hl: "╌",
    vl: "┆",
};

export const STYLE_DASHED_ROUNDED: StrokeStyle = {
    ...STYLE_DASHED,
    tl: "╭",
    tr: "╮",
    bl: "╰",
    br: "╯",
};

export const STYLE_DOUBLE: StrokeStyle = {
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
    dot: "•",
};

export const ENDINGS = "()[]{}<>^v◀▶▲▼•●";

export const BARS_H = " ▏▎▍▌▋▊▉█";
export const BARS_V = " ▁▂▃▄▅▆▇█";

export const SHADES_ASCII_10 = " .-:=+*#%@";
export const SHADES_ASCII_16 = " .,:|+*=il3GOWQ0";

export const SHADES_BLOCK = " ░▒▓█";
export const SHADES_BLOCK_ALT = " ▖▞▟█";
