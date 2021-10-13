import type { NumOrString } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import { liangBarsky2Raw } from "@thi.ng/geom-clip-line/liang-barsky";
import type { Canvas } from "./canvas.js";
import { charCode } from "./utils.js";

/**
 * Draws a line between `ax`,`ay` and `bx`,`by`, using `char` and taking
 * the current clip rect and format into account. If `char` is not
 * given, uses current style's `dot` char.
 *
 * @param canvas
 * @param ax
 * @param ay
 * @param bx
 * @param by
 * @param char
 */
export const line = (
    canvas: Canvas,
    ax: number,
    ay: number,
    bx: number,
    by: number,
    char?: NumOrString,
    format = canvas.format
) => {
    const { x1, y1, x2, y2 } = peek(canvas.clipRects);
    const clipped = liangBarsky2Raw(ax, ay, bx, by, x1, y1, x2, y2);
    if (!clipped) return;
    ax = clipped[0] | 0;
    ay = clipped[1] | 0;
    bx = clipped[2] | 0;
    by = clipped[3] | 0;
    const dx = Math.abs(bx - ax);
    const dy = -Math.abs(by - ay);
    const w = canvas.width;

    let sx = ax < bx ? 1 : -1;
    let sy = ay < by ? 1 : -1;
    let err = dx + dy;

    char = charCode(
        char !== undefined ? char : peek(canvas.styles).dot,
        format
    );

    while (true) {
        canvas.buf[ax + ay * w] = char;
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
