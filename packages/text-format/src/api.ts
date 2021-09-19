import type { Fn, Keys } from "@thi.ng/api";

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

export const PRESETS_TPL = {
    black: FG_BLACK,
    blue: FG_BLUE,
    cyan: FG_CYAN,
    gray: FG_GRAY,
    green: FG_GREEN,
    magenta: FG_MAGENTA,
    red: FG_RED,
    white: FG_WHITE,
    yellow: FG_YELLOW,
    lightBlue: FG_LIGHT_BLUE,
    lightCyan: FG_LIGHT_CYAN,
    lightGray: FG_LIGHT_GRAY,
    lightGreen: FG_LIGHT_GREEN,
    lightMagenta: FG_LIGHT_MAGENTA,
    lightRed: FG_LIGHT_RED,
    lightYellow: FG_LIGHT_YELLOW,
};

export type PresetID = Keys<typeof PRESETS_TPL>;

export type FormatPresets = Record<PresetID, Fn<any, string>>;

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
