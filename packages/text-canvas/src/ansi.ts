import { memoize1 } from "@thi.ng/memoize";
import type { StringFormat } from "./api";
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

export const FMT_ANSI256: StringFormat = {
    start: (x: number) => `\x1b[38;5;${x & 0xff};48;5;${x >>> 8}m`,
    end: ANSI_RESET,
    prefix: ANSI_RESET,
    suffix: "\n",
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
