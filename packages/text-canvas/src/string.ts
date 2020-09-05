import type { StringFormat } from "./api";
import { Canvas } from "./canvas";

/**
 * Returns string representation of canvas, optionally using given
 * string formatter. If none is given, returns plain string
 * representation, ignoring any character format data.
 *
 * @param canvas
 * @param format
 */
export const toString = (canvas: Canvas, format?: StringFormat) => {
    const { buf, width, height } = canvas;
    const res: string[] = [];
    if (format) {
        const { start, end, prefix, suffix } = format;
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
