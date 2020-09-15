import type { NumOrString } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays";
import { Canvas } from "./canvas";
import { hline } from "./hvline";
import { charCode, intersectRectCircle } from "./utils";

/**
 * Draws a circle (filled or outline) at given center position and
 * radius and taking the current clip rect and format into account. If
 * `char` is not given, uses current style's `dot` char.
 *
 * @param canvas
 * @param cx
 * @param cy
 * @param r
 * @param char
 * @param fill
 */
export const circle = (
    canvas: Canvas,
    cx: number,
    cy: number,
    r: number,
    char?: NumOrString,
    fill = false,
    format = canvas.format
) => {
    if (r < 1) return;
    cx |= 0;
    cy |= 0;
    r |= 0;

    const { x1, y1, x2, y2, w: clipw, h: cliph } = peek(canvas.clipRects);
    if (!intersectRectCircle(x1, y1, clipw, cliph, cx, cy, r)) return;

    char = charCode(
        char !== undefined ? char : peek(canvas.styles).dot,
        format
    );

    let x = 0;
    let y = r;
    let ymax = r * r;
    let sum = ymax + r;
    let dx2 = 1;
    let dy2 = 2 * r - 1;

    const { buf, width } = canvas;

    const $ = (ox: number, oy: number) =>
        ox >= x1 &&
        oy >= y1 &&
        ox < x2 &&
        oy < y2 &&
        (buf[ox + oy * width] = <number>char!);

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
