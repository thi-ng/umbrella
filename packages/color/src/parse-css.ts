import type { IDeref } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors";
import { clamp01 } from "@thi.ng/math";
import { maybeParseFloat, maybeParseInt } from "@thi.ng/strings";
import type { Color } from "./api";
import { INV8BIT } from "./constants";
import { hslaRgba } from "./hsla-rgba";
import { int32Rgba } from "./int-rgba";
import { CSS_NAMES } from "./names";

const RE_HEX = /^#?([0-9a-f]{3,8})$/i;
const RE_CSS = /^(rgb|hsl)a?\(\s*([0-9.]+?),\s*([0-9.]+%?),\s*([0-9.]+%?),?\s*([0-9.]+)?\s*\)$/;

export const parseCss = (col: string | IDeref<string>) => {
    col = typeof col === "string" ? col : col.deref();
    if (col.charAt(0) === "#") {
        return int32Rgba([], parseHex(col));
    } else {
        const match = RE_CSS.exec(col);
        if (match) {
            if (match[1] === "rgb" || match[1] === "rgba") {
                return <Color>[
                    parseChannel(match[2]),
                    parseChannel(match[3]),
                    parseChannel(match[4]),
                    maybeParseFloat(match[5], 1),
                ];
            } else {
                return hslaRgba(null, [
                    maybeParseFloat(match[2]) / 360,
                    parseChannel(match[3]),
                    parseChannel(match[4]),
                    maybeParseFloat(match[5], 1),
                ]);
            }
        } else {
            const c = CSS_NAMES[col];
            !c && illegalArgs(`invalid color: "${col}"`);
            return int32Rgba([], parseHex(c));
        }
    }
};

export const parseHex = (src: string): number => {
    const match = RE_HEX.exec(src);
    if (match) {
        const hex = match[1];
        switch (hex.length) {
            case 3: {
                const [r, g, b] = hex;
                return (
                    (maybeParseInt(`${r}${r}${g}${g}${b}${b}`, 0, 16) |
                        0xff000000) >>>
                    0
                );
            }
            case 4: {
                const [a, r, g, b] = hex;
                return (
                    maybeParseInt(`${a}${a}${r}${r}${g}${g}${b}${b}`, 0, 16) >>>
                    0
                );
            }
            case 6:
                return (maybeParseInt(hex, 0, 16) | 0xff000000) >>> 0;
            case 8:
                return maybeParseInt(hex, 0, 16) >>> 0;
            default:
        }
    }
    return illegalArgs(`invalid hex color: "${src}"`);
};

const parseChannel = (c: string) =>
    clamp01(
        c.indexOf("%") > 0
            ? maybeParseFloat(c) * 0.01
            : maybeParseFloat(c) * INV8BIT
    );
