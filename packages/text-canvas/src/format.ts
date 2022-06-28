import type { StringFormat } from "@thi.ng/text-format";
import { format, formatNone } from "@thi.ng/text-format/format";
import type { Canvas } from "./canvas.js";

/**
 * Returns string representation of canvas, optionally using given string
 * formatter. If none is given, returns plain string representation, ignoring
 * any character format data.
 *
 * @param canvas -
 * @param fmt -
 */
export const formatCanvas = (canvas: Canvas, fmt?: StringFormat) => {
    const { data, width, height } = canvas;
    const res: string[] = [];
    if (fmt) {
        for (let y = 0; y < height; y++) {
            res.push(format(fmt, data, width, y * width));
        }
    } else {
        for (let y = 0; y < height; y++) {
            res.push(formatNone(data, width, y * width));
        }
    }
    return res.join("");
};
