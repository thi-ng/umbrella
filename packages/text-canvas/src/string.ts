import { StringFormat } from "./api";
import { Canvas } from "./canvas";

/**
 * Returns string representation of canvas using given formatter.
 *
 * @param canvas
 * @param format
 */
export const toFormattedString = (canvas: Canvas, format: StringFormat) => {
    const { buf, width, height } = canvas;
    const { start, end, prefix, suffix } = format;
    const res: string[] = [];
    for (let y = 0, i = 0; y < height; y++) {
        let prevID = 0;
        res.push(prefix);
        for (let x = 0; x < width; x++, i++) {
            const ch = buf[i];
            const id = ch >>> 16;
            if (id != prevID) {
                prevID && res.push(end);
                id && res.push(start(id));
                prevID = id;
            }
            res.push(String.fromCharCode(ch & 0xffff));
        }
        prevID && res.push(end);
        res.push(suffix);
    }
    return format.prefix + res.join("") + format.suffix;
};

/**
 * Returns plain string representation of given canvas ignoring any
 * character formatting data.
 *
 * @param canvas
 */
export const toString = (canvas: Canvas) => {
    const { buf, width, height } = canvas;
    const res: string[] = [];
    for (let y = 0, i = 0; y < height; y++) {
        for (let x = 0; x < width; x++, i++) {
            res.push(String.fromCharCode(buf[i] & 0xffff));
        }
        res.push("\n");
    }
    return res.join("");
};
