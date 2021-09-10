import { memoize1 } from "@thi.ng/memoize/memoize1";
import { U8 } from "@thi.ng/strings/radix";
import type { HtmlFormatOpts, StringFormat } from "./api";
import { defFormat } from "./string";

const ANSI_RESET = `\x1b[0m`;

const ANSI_FLAGS = ["", "1", "2", "1;2", "4", "1;4", "2;4", "1;2;4"];

/**
 * String format preset, translating canvas format info to ANSI 4bit
 * control sequences.
 *
 * https://stackoverflow.com/a/33206814/294515
 */
export const FMT_ANSI16: StringFormat = {
    start: memoize1((x: number) => {
        let res = [];
        let y = x & 0xf;
        y && res.push(29 + ((x >> 4) & 1) * 60 + y);
        y = (x >> 5) & 0xf;
        y && res.push(39 + ((x >> 9) & 1) * 60 + y);
        y = x >> 10;
        y && res.push(ANSI_FLAGS[y]);
        return "\x1b[" + res.join(";") + "m";
    }),
    end: ANSI_RESET,
    prefix: ANSI_RESET,
    suffix: "\n",
};

/**
 * String format preset, translating canvas format info to ANSI 8bit control
 * sequences. Only foreground/background colors are supported, no other
 * formatting (e.g. bold etc.).
 *
 * @remarks
 * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
 *
 * Also see {@link format256}.
 */
export const FMT_ANSI256: StringFormat = {
    start: (x: number) => `\x1b[38;5;${x & 0xff};48;5;${x >>> 8}m`,
    end: ANSI_RESET,
    prefix: ANSI_RESET,
    suffix: "\n",
    zero: true,
};

const F5 = 255 / 31;
const F6 = 255 / 63;

/**
 * String format preset, interpreting the canvas 16bit format info as text color
 * and translating it into ANSI 24bit control sequences. No other formatting
 * (e.g. bold etc.) supported in this mode.
 *
 * @remarks
 * This mode is intended for image displays, e.g. using thi.ng/pixel and
 * {@link imageRaw}. Also see {@link format556} and {@link format565_8bit}.
 *
 * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
 */
export const FMT_ANSI565: StringFormat = {
    start: (x: number) =>
        `\x1b[38;2;${(((x >> 11) & 31) * F5) | 0};${
            (((x >> 5) & 63) * F6) | 0
        };${((x & 31) * F5) | 0}m`,
    end: ANSI_RESET,
    prefix: ANSI_RESET,
    suffix: "\n",
    zero: true,
};

/**
 * Takes 2 ANSI256 values and returns a combined 16bit format ID.
 *
 * @remarks
 * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
 *
 * @param fg
 * @param bg
 */
export const format256 = (fg: number, bg = 0) =>
    ((bg & 0xff) << 8) | (fg & 0xff);

/**
 * Takes _normalized_ RGB values ([0..1] range) and converts them into an RGB565
 * value for later use with {@link FMT_ANSI565} or {@link FMT_HTML_565}. Does
 * NOT perform clipping!
 *
 * @param r
 * @param g
 * @param b
 */
export const format565 = (r: number, g: number, b: number) =>
    ((r * 0x1f) << 11) | ((g * 0x3f) << 5) | (b * 0x1f);

/**
 * Converts RGB (8bit channels) into a 16bit RGB565 value for later use with
 * {@link FMT_ANSI565} or {@link FMT_HTML_565}. Does NOT perform clipping!
 *
 * @param r
 * @param g
 * @param b
 */
export const format565_8bit = (r: number, g: number, b: number) =>
    ((r << 8) & 0xf800) | ((g << 3) & 0x7e0) | (b >> 3);

/**
 * Syntax sugar for `defFormat(FMT_ANSI16, ...)`
 *
 * @param col
 */
export const defAnsi16 = (col: number) => defFormat(FMT_ANSI16, col);

/**
 * Syntax sugar for `defFormat(FMT_ANSI256, ...)`
 *
 * @param col
 */
export const defAnsi256 = (col: number) => defFormat(FMT_ANSI256, col);

/**
 * Syntax sugar for `defFormat(FMT_ANSI565, ...)`
 *
 * @param col
 */
export const defAnsi565 = (col: number) => defFormat(FMT_ANSI565, col);

/**
 * Constructs an HTML formatter using given config options and for use w/
 * default format IDs only.
 *
 * @param opts
 */
export const formatHtml = ({
    colors,
    attrib,
    delim,
    fg,
    bg,
    bold,
    dim,
    underline,
}: HtmlFormatOpts): StringFormat => ({
    start: memoize1((x: number) => {
        let y = x & 0xf;
        let res = `<span ${attrib}="${fg}${
            colors[(y - 1) | ((x >> 1) & 0x8)]
        }${delim}`;
        y = (x >> 5) & 0x0f;
        y && (res += `${bg}${colors[(y - 1) | ((x >> 6) & 0x8)]}${delim}`);
        x & 0x400 && (res += bold + delim);
        x & 0x800 && (res += dim + delim);
        x & 0x1000 && (res += underline + delim);
        return res + '">';
    }),
    end: "</span>",
    prefix: "",
    suffix: "<br/>",
});

/**
 * Preset HTML string formatter for use w/ default format IDs, generating
 * `<span>` elements with inline CSS.
 */
export const FMT_HTML_INLINE_CSS = formatHtml({
    colors: [
        "#000",
        "#a00",
        "#0a0",
        "#aa0",
        "#00a",
        "#a0a",
        "#0aa",
        "#aaa",
        "#555",
        "#f55",
        "#5f5",
        "#ff5",
        "#55f",
        "#f5f",
        "#5ff",
        "#fff",
    ],
    attrib: "style",
    delim: ";",
    fg: "color:",
    bg: "background:",
    bold: "font-weight:bold",
    dim: "opacity:0.5",
    underline: "text-decoration:underline",
});

/**
 * Preset HTML formatter for use w/ default format IDs, generating `<span>`
 * elements with Tachyons CSS classes.
 */
export const FMT_HTML_TACHYONS = formatHtml({
    colors: [
        "black",
        "dark-red",
        "dark-green",
        "gold",
        "dark-blue",
        "dark-pink",
        "light-blue",
        "moon-gray",
        "mid-gray",
        "red",
        "green",
        "yellow",
        "blue",
        "hot-pink",
        "lightest-blue",
        "white",
    ],
    attrib: "class",
    delim: " ",
    fg: "",
    bg: "bg-",
    bold: "b",
    dim: "o-50",
    underline: "underline",
});

/**
 * Higher order custom HTML formatter for 16bit (RGB565) colors (without
 * additional formatting flags). By default assigns text color, but can be
 * assigned to any CSS property via given `prop` argument.
 *
 * @param prop
 */
export const FMT_HTML565 = (prop = "color"): StringFormat => ({
    start: memoize1(
        (x) =>
            `<span style="${prop}:#${U8((x >> 11) * F5)}${U8(
                ((x >> 5) & 0x3f) * F6
            )}${U8((x & 0x1f) * F5)}">`
    ),
    end: "</span>",
    prefix: "",
    suffix: "<br/>",
    zero: true,
});
