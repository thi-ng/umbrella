import type { Fn, Keys } from "@thi.ng/api";
import {
    FG_BLACK,
    FG_BLUE,
    FG_CYAN,
    FG_GRAY,
    FG_GREEN,
    FG_LIGHT_BLUE,
    FG_LIGHT_CYAN,
    FG_LIGHT_GRAY,
    FG_LIGHT_GREEN,
    FG_LIGHT_MAGENTA,
    FG_LIGHT_RED,
    FG_LIGHT_YELLOW,
    FG_MAGENTA,
    FG_RED,
    FG_WHITE,
    FG_YELLOW,
    StringFormat,
} from "./api";
import type { Canvas } from "./canvas";

/**
 * Convenience {@link StringFormat} which ignores any formatting and results in
 * plain text.
 */
export const FMT_NONE: StringFormat = {
    prefix: "",
    suffix: "",
    start: () => "",
    end: "",
};

/**
 * Returns string representation of canvas, optionally using given string
 * formatter. If none is given, returns plain string representation, ignoring
 * any character format data.
 *
 * @param canvas
 * @param format
 */
export const toString = (canvas: Canvas, format?: StringFormat) => {
    const { buf, width, height } = canvas;
    const res: string[] = [];
    if (format) {
        const { start, end, prefix, suffix, zero } = format;
        let prevID: number, ch: number, id: number;
        const check = zero ? () => prevID !== -1 : () => prevID !== 0;
        for (let y = 0, i = 0; y < height; y++) {
            prevID = zero ? -1 : 0;
            res.push(prefix);
            for (let x = 0; x < width; x++, i++) {
                ch = buf[i];
                id = ch >>> 16;
                if (id != prevID) {
                    check() && res.push(end);
                    (zero || id) && res.push(start(id));
                    prevID = id;
                }
                res.push(String.fromCharCode(ch & 0xffff));
            }
            check() && res.push(end);
            res.push(suffix);
        }
        return res.join("");
    } else {
        for (let y = 0, i = 0; y < height; y++) {
            for (let x = 0; x < width; x++, i++) {
                res.push(String.fromCharCode(buf[i] & 0xffff));
            }
            res.push("\n");
        }
        return res.join("");
    }
};

/**
 * HOF format function. Returns a single-arg function which wraps a given value
 * into a fully prefixed & suffixed format string using given
 * {@link StringFormat} impl.
 *
 * @example
 * ```ts
 * const red = defFormat(FMT_ANSI16, FG_RED);
 *
 * red("hello");
 * // "\x1B[31mhello\x1B[0m"
 * ```
 *
 * @param fmt
 * @param code
 */
export const defFormat = (fmt: StringFormat, code: number) => (x: any) =>
    fmt.start(code) + x + fmt.end;

const PRESETS = {
    black: FG_BLACK,
    red: FG_RED,
    green: FG_GREEN,
    yellow: FG_YELLOW,
    blue: FG_BLUE,
    magenta: FG_MAGENTA,
    cyan: FG_CYAN,
    lightGray: FG_LIGHT_GRAY,
    gray: FG_GRAY,
    lightRed: FG_LIGHT_RED,
    lightGreen: FG_LIGHT_GREEN,
    lightYellow: FG_LIGHT_YELLOW,
    lightBlue: FG_LIGHT_BLUE,
    lightMagenta: FG_LIGHT_MAGENTA,
    lightCyan: FG_LIGHT_CYAN,
    white: FG_WHITE,
};

type PresetID = Keys<typeof PRESETS>;

/**
 * Takes a {@link StringFormat} impl supporting preset format ID constants (e.g.
 * {@link FG_GREEN}) and returns an object of formatting functions for each
 * `FG_XXX` preset ID.
 *
 * @param fmt
 */
export const defFormatPresets = (fmt: StringFormat) =>
    <Record<PresetID, Fn<any, string>>>(
        Object.keys(PRESETS).reduce(
            (acc, id) => (
                (acc[id] = defFormat(fmt, PRESETS[<PresetID>id])), acc
            ),
            <any>{}
        )
    );
