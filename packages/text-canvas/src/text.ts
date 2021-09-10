import { peek } from "@thi.ng/arrays/peek";
import { clamp0 } from "@thi.ng/math/interval";
import { wordWrapLines } from "@thi.ng/strings/word-wrap";
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
 * @param format
 * @param hardWrap
 */
export const textColumn = (
    canvas: Canvas,
    x: number,
    y: number,
    width: number,
    txt: string,
    format = canvas.format,
    hard = false
) => {
    x |= 0;
    y |= 0;
    width |= 0;
    const height = canvas.height;
    for (let line of wordWrapLines(txt, { width, hard })) {
        textLine(canvas, x, y, line.toString(), format);
        y++;
        if (y >= height) break;
    }
    return y;
};

/**
 * Draws a text box at given position and dimension. If `height < 0`, the inner
 * box height will be set to the number of lines required to fit the given (word
 * wrapped) text.
 *
 * @remarks
 * The width and height will include any configured padding and the box frame.
 *
 * @param canvas
 * @param x
 * @param y
 * @param width
 * @param height
 * @param txt
 * @param opts
 */
export const textBox = (
    canvas: Canvas,
    x: number,
    y: number,
    width: number,
    height: number,
    txt: string,
    opts?: Partial<TextBoxOpts>
) => {
    const {
        format,
        style,
        padding: [padX, padY],
        hard,
    } = {
        format: canvas.format,
        padding: [0, 0],
        hard: false,
        ...opts,
    };
    const currFmt = canvas.format;
    canvas.format = format;
    style && beginStyle(canvas, style);
    x |= 0;
    y |= 0;
    width |= 0;
    let innerW = width - 2 - 2 * padX;
    let innerH = 0;
    const lines = wordWrapLines(txt, { width: innerW, hard }).map((l) =>
        l.toString()
    );
    if (height < 0) {
        innerH = lines.length + 2;
        height = innerH + 2 * padY;
    } else {
        innerH = clamp0(height - 2);
    }
    strokeRect(canvas, x, y, width, height);
    fillRect(canvas, x + 1, y + 1, width - 2, height - 2, " ");
    x += 1 + padX;
    y += 1 + padY;
    beginClip(canvas, x, y, innerW, innerH);
    y = textLines(canvas, x, y, lines);
    endClip(canvas);
    style && endStyle(canvas);
    canvas.format = currFmt;
    return y + height;
};
