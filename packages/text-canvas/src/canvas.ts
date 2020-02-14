import { peek } from "@thi.ng/arrays";
import { clamp } from "@thi.ng/math";
import { wordWrap } from "@thi.ng/transducers";
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
        this.clipRects = [
            { x1: 0, y1: 0, x2: width, y2: height, w: width, h: height }
        ];
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

export const clear = (canvas: Canvas, char = " ") => {
    if (canvas.clipRects.length > 1) {
        const { x1, y1, w, h } = peek(canvas.clipRects);
        fillRect(canvas, x1, y1, w, h, char);
    } else {
        canvas.buf.fill(char);
    }
};

const intersectRect = (a: ClipRect, b: ClipRect): ClipRect => {
    const x1 = Math.max(a.x1, b.x1);
    const y1 = Math.max(a.y1, b.y1);
    const x2 = Math.min(a.x2, b.x2);
    const y2 = Math.min(a.y2, b.y2);
    return { x1, y1, x2, y2, w: Math.max(x2 - x1, 0), h: Math.max(y2 - y1, 0) };
};

export const beginClip = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number
) => {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    const { width, height } = canvas;
    const x2 = clamp(x + w, 0, width);
    const y2 = clamp(y + h, 0, height);
    const x1 = clamp(x, 0, width);
    const y1 = clamp(y, 0, height);
    canvas.clipRects.push(
        intersectRect(
            { x1, y1, x2, y2, w: x2 - x1, h: y2 - y1 },
            peek(canvas.clipRects)
        )
    );
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

export const setAt = (canvas: Canvas, x: number, y: number, char: string) => {
    x |= 0;
    y |= 0;
    const { x1, y1, x2, y2 } = peek(canvas.clipRects);
    if (x < x1 || y < y1 || x >= x2 || y >= y2) return;
    canvas.buf[x + y * canvas.width] = char;
};

export const textLine = (
    canvas: Canvas,
    x: number,
    y: number,
    line: string
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
    for (
        let n = line.length, idx = x + y * width;
        i < n && x < x2;
        i++, x++, idx++
    ) {
        buf[idx] = line.charAt(i);
    }
};

export const textColumn = (
    canvas: Canvas,
    x: number,
    y: number,
    width: number,
    txt: string
) => {
    x |= 0;
    y |= 0;
    width |= 0;
    const height = canvas.height;
    for (let line of txt.split("\n")) {
        for (let words of wordWrap(width, line.split(" "))) {
            textLine(canvas, x, y, words.join(" "));
            y++;
            if (y >= height) return y;
        }
    }
    return y;
};

export const fillRect = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number,
    char: string
) => {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    const { x1, y1, x2, y2 } = peek(canvas.clipRects);
    if (x < x1) {
        w += x - x1;
        x = x1;
    }
    if (y < y1) {
        h += y - y1;
        y = y1;
    }
    const { buf, width } = canvas;
    if (w < 1 || h < 1 || x >= x2 || y >= y2) return;
    w = Math.min(w, x2 - x);
    h = Math.min(h, y2 - y);
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
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
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
    x |= 0;
    y |= 0;
    len |= 0;
    const { x1, y1, x2, y2 } = peek(canvas.clipRects);
    const { buf, width } = canvas;
    if (len < 1 || y < y1 || y >= y2 || x >= x2) return;
    _hvline(buf, x, y, 1, width, x1, x2, len, peek(canvas.styles).hl, s, e, m);
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
    x |= 0;
    y |= 0;
    len |= 0;
    const { x1, x2, y1, y2 } = peek(canvas.clipRects);
    const { buf, width } = canvas;
    if (len < 1 || x < x1 || x >= x2 || y >= y2) return;
    _hvline(buf, y, x, width, 1, y1, y2, len, peek(canvas.styles).vl, s, e, m);
};

const _hvline = (
    buf: string[],
    a: number,
    b: number,
    astride: number,
    bstride: number,
    amin: number,
    amax: number,
    len: number,
    style: string,
    s?: string,
    e?: string,
    m?: string
) => {
    let idx: number;
    if (a < amin) {
        len += a - amin;
        a = amin;
        idx = a * astride + b * bstride;
    } else {
        idx = a * astride + b * bstride;
        buf[idx] = s !== undefined && len > 1 ? s : style;
        idx += astride;
        a++;
        len--;
    }
    len--;
    m = m != undefined ? m : style;
    for (let i = 0; i < len && a < amax; i++, a++, idx += astride) {
        buf[idx] = m;
    }
    if (len >= 0 && a < amax) {
        buf[idx] = e !== undefined ? e : style;
    }
};

export const line = (
    canvas: Canvas,
    ax: number,
    ay: number,
    bx: number,
    by: number,
    char?: string
) => {
    ax |= 0;
    ay |= 0;
    bx |= 0;
    by |= 0;
    const dx = Math.abs(bx - ax);
    const dy = -Math.abs(by - ay);
    const w = canvas.width;
    const { x1, y1, x2, y2 } = peek(canvas.clipRects);

    let sx = ax < bx ? 1 : -1;
    let sy = ay < by ? 1 : -1;
    let err = dx + dy;

    char = char !== undefined ? char : peek(canvas.styles).dot;

    while (true) {
        if (ax >= x1 && ay >= y1 && ax < x2 && ay < y2) {
            canvas.buf[ax + ay * w] = char;
        }
        if (ax === bx && ay === by) return;
        let t = err << 1;
        if (t < dx) {
            err += dx;
            ay += sy;
        }
        if (t > dy) {
            err += dy;
            ax += sx;
        }
    }
};

export const circle = (
    canvas: Canvas,
    cx: number,
    cy: number,
    r: number,
    char?: string,
    fill = false
) => {
    if (r < 1) return;
    cx |= 0;
    cy |= 0;
    r |= 0;
    char = char !== undefined ? char : peek(canvas.styles).dot;

    let x = 0;
    let y = r;
    let ymax = r * r;
    let sum = ymax + r;
    let dx2 = 1;
    let dy2 = 2 * r - 1;

    const { buf, width } = canvas;
    const { x1, y1, x2, y2 } = peek(canvas.clipRects);

    const $ = (ox: number, oy: number) =>
        ox >= x1 &&
        oy >= y1 &&
        ox < x2 &&
        oy < y2 &&
        (buf[ox + oy * width] = char!);

    while (x <= y) {
        if (fill) {
            hline(canvas, cx - y, cy + x, y << 1, char, char, char);
            x && hline(canvas, cx - y, cy - x, y << 1, char, char, char);
        } else {
            $(cx - y, cy + x);
            y && $(cx + y, cy + x);
            if (x) {
                $(cx - y, cy - x);
                y && $(cx + y, cy - x);
            }
            if (x !== y) {
                $(cx - x, cy - y);
                x && $(cx + x, cy - y);
                if (y) {
                    $(cx - x, cy + y);
                    x && $(cx + x, cy + y);
                }
            }
        }
        sum -= dx2;
        if (sum <= ymax) {
            if (fill && x !== y) {
                hline(canvas, cx - x, cy - y, x << 1, char, char, char);
                y && hline(canvas, cx - x, cy + y, x << 1, char, char, char);
            }
            y--;
            ymax -= dy2;
            dy2 -= 2;
        }
        x++;
        dx2 += 2;
    }
};
