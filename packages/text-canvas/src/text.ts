import { peek } from "@thi.ng/arrays";
import { clamp0 } from "@thi.ng/math";
import { wordWrap } from "@thi.ng/transducers";
import type { TextBoxOpts } from "./api";
import { beginClip, beginStyle, Canvas, endClip, endStyle } from "./canvas";
import { fillRect, strokeRect } from "./rect";

/**
 * Writes given string at position `x`,`y`, taking the current clip rect
 * and format into account. The string MUST not include linebreaks or
 * other control chars.
 *
 * @param canvas
 * @param x
 * @param y
 * @param line
 */
export const textLine = (
    canvas: Canvas,
    x: number,
    y: number,
    line: string,
    format = canvas.format
) => {
    x |= 0;
    y |= 0;
    const { x1, y1, x2, y2 } = peek(canvas.clipRects);
    if (y < y1 || y >= y2 || x >= x2) return;
    let i = 0;
    if (x < x1) {
        i = x1 - x;
        x = x1;
    }
    const { buf, width } = canvas;
    const n = line.length;
    format <<= 16;
    for (let idx = x + y * width; i < n && x < x2; i++, x++, idx++) {
        buf[idx] = line.charCodeAt(i) | format;
    }
};

export const textLines = (
    canvas: Canvas,
    x: number,
    y: number,
    lines: string[],
    format = canvas.format
) => {
    for (let line of lines) {
        textLine(canvas, x, y, line, format);
        y++;
    }
    return y;
};

/**
 * Writes multiline string at position `x`,`y` and using column `width`,
 * also taking the current clip rect and format into account. Applies
 * word wrapping.
 *
 * @param canvas
 * @param x
 * @param y
 * @param width
 * @param txt
 */
export const textColumn = (
    canvas: Canvas,
    x: number,
    y: number,
    width: number,
    txt: string,
    format = canvas.format
) => {
    x |= 0;
    y |= 0;
    width |= 0;
    const height = canvas.height;
    for (let line of txt.split("\n")) {
        for (let words of wordWrap(width, line.split(" "))) {
            textLine(canvas, x, y, words.join(" "), format);
            y++;
            if (y >= height) return y;
        }
    }
    return y;
};

export const textBox = (
    canvas: Canvas,
    x: number,
    y: number,
    width: number,
    height: number,
    txt: string,
    opts?: Partial<TextBoxOpts>
) => {
    const { format, style, padding } = {
        format: canvas.format,
        padding: [0, 0],
        ...opts,
    };
    const currFmt = canvas.format;
    canvas.format = format;
    style && beginStyle(canvas, style);
    x |= 0;
    y |= 0;
    width |= 0;
    let innerW = width - 2 - 2 * padding[0];
    let innerH = 0;
    const lines = wordWrappedLines(innerW, txt);
    if (height < 0) {
        innerH = lines.length + 2;
        height = innerH + 2 * padding[1];
    } else {
        innerH = clamp0(height - 2);
    }
    strokeRect(canvas, x, y, width, height);
    fillRect(canvas, x + 1, y + 1, width - 2, height - 2, " ");
    x += 1 + padding[0];
    y += 1 + padding[1];
    beginClip(canvas, x, y, innerW, innerH);
    y = textLines(canvas, x, y, lines);
    endClip(canvas);
    style && endStyle(canvas);
    canvas.format = currFmt;
    return y + height;
};

export const wordWrappedLines = (width: number, txt: string) => {
    const lines: string[] = [];
    for (let line of txt.split("\n")) {
        for (let words of wordWrap(width, { always: false }, line.split(" "))) {
            lines.push(words.join(" "));
        }
    }
    return lines;
};
