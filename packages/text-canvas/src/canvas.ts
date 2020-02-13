import { peek } from "@thi.ng/arrays";
import { clamp } from "@thi.ng/math";
import { STROKE_STYLES, StrokeStyle } from "./api";

interface ClipRect {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    w: number;
    h: number;
}

export class Canvas {
    buf: string[];
    width: number;
    height: number;
    styles: StrokeStyle[];
    clipRects: ClipRect[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.buf = new Array(width * height).fill(" ");
        this.styles = [STROKE_STYLES.thin];
        this.clipRects = [];
        beginClip(this, 0, 0, width, height);
    }

    toString() {
        const { buf, width, height } = this;
        const res: string[] = [];
        for (let i = 0, y = 0; y < height; y++, i += width) {
            res.push(buf.slice(i, i + width).join(""));
        }
        return res.join("\n");
    }
}

export const clear = (canvas: Canvas, char = " ") => canvas.buf.fill(char);

export const beginClip = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number
) => {
    const { width, height } = canvas;
    const x2 = clamp(x + w, 0, width);
    const y2 = clamp(y + h, 0, height);
    const x1 = clamp(x, 0, width);
    const y1 = clamp(y, 0, height);
    canvas.clipRects.push({ x1, y1, x2, y2, w: x2 - x1, h: y2 - y1 });
};

export const endClip = (canvas: Canvas) => {
    if (canvas.clipRects.length > 1) {
        canvas.clipRects.pop();
    }
};

export const beginStyle = (canvas: Canvas, style: StrokeStyle) => {
    canvas.styles.push(style);
};

export const endStyle = (canvas: Canvas) => {
    if (canvas.styles.length > 1) {
        canvas.styles.pop();
    }
};

export const writeLine = (
    canvas: Canvas,
    x: number,
    y: number,
    line: string
) => {
    const { x1, y1, x2, y2 } = peek(canvas.clipRects);
    if (y < y1 || y >= y2 || x >= x2) return;
    let i = 0;
    if (x < x1) {
        i = x1 - x;
        x = x1;
    }
    const { buf, width } = canvas;
    for (
        let n = line.length, idx = x + y * width;
        i < n && x < x2;
        i++, x++, idx++
    ) {
        buf[idx] = line.charAt(i);
    }
};

export const fillRect = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number,
    char: string
) => {
    if (x < 0) {
        w += x;
        x = 0;
    }
    if (y < 0) {
        h += y;
        y = 0;
    }
    const { buf, width, height } = canvas;
    if (w < 1 || h < 1 || x >= width || y >= height) return;
    w = Math.min(w, width - x);
    h = Math.min(h, height - y);
    for (; --h >= 0; y++) {
        const idx = x + y * width;
        buf.fill(char, idx, idx + w);
    }
};

export const strokeRect = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number
) => {
    if (w < 2 || h < 2) return;
    const style = peek(canvas.styles);
    hline(canvas, x, y, w, style.tl, style.tr);
    hline(canvas, x, y + h - 1, w, style.bl, style.br);
    vline(canvas, x, y + 1, h - 2);
    vline(canvas, x + w - 1, y + 1, h - 2);
};

export const hline = (
    canvas: Canvas,
    x: number,
    y: number,
    len: number,
    s?: string,
    e?: string,
    m?: string
) => {
    const { buf, width, height } = canvas;
    if (len < 1 || y < 0 || y >= height || x >= width) return;
    const style = peek(canvas.styles);
    let idx: number;
    if (x < 0) {
        len += x;
        x = 0;
        idx = y * width;
    } else {
        idx = x + y * width;
        buf[idx++] = s !== undefined && len > 1 ? s : style.hl;
        x++;
        len--;
    }
    len--;
    m = m != undefined ? m : style.hl;
    for (let i = 0; i < len && x < width; i++, x++, idx++) {
        buf[idx] = m;
    }
    if (len >= 0 && x < width) {
        buf[idx] = e !== undefined ? e : style.vl;
    }
};

export const vline = (
    canvas: Canvas,
    x: number,
    y: number,
    len: number,
    s?: string,
    e?: string,
    m?: string
) => {
    const { buf, width, height } = canvas;
    if (len < 1 || x < 0 || x >= width || y >= height) return;
    const style = peek(canvas.styles);
    let idx: number;
    if (y < 0) {
        len += y;
        y = 0;
        idx = x;
    } else {
        idx = x + y * width;
        buf[idx] = s !== undefined && len > 1 ? s : style.vl;
        idx += width;
        y++;
        len--;
    }
    len--;
    m = m != undefined ? m : style.vl;
    for (let i = 0; i < len && y < height; i++, y++, idx += width) {
        buf[idx] = m;
    }
    if (len >= 0 && y < height) {
        buf[idx] = e !== undefined ? e : style.vl;
    }
};
