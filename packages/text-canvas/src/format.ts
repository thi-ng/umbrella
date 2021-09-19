import type { StringFormat } from "@thi.ng/text-format";
import type { Canvas } from "./canvas";

/**
 * Returns string representation of canvas, optionally using given string
 * formatter. If none is given, returns plain string representation, ignoring
 * any character format data.
 *
 * @param canvas
 * @param format
 */
export const formatCanvas = (canvas: Canvas, format?: StringFormat) => {
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
