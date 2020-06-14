import { memoize1 } from "@thi.ng/memoize";
import type { StringFormat } from "./api";

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
