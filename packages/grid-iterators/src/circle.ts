import { asInt } from "@thi.ng/api/typedarray";
import { clipped, intersectRectCircle } from "./clipping.js";
import { hline } from "./hvline.js";

export function* circle(cx: number, cy: number, r: number, fill = true) {
    [cx, cy, r] = asInt(cx, cy, r);
    if (r < 1) return;
    let x = 0;
    let y = r;
    let y2 = r * r;
    let sum = y2 + r;
    let dx2 = 1;
    let dy2 = 2 * r - 1;

    while (x <= y) {
        if (fill) {
            yield* hline(cx - y, cy + x, y << 1);
            if (x) yield* hline(cx - y, cy - x, y << 1);
        } else {
            yield [cx - y, cy + x];
            if (y) yield [cx + y, cy + x];
            if (x) {
                yield [cx - y, cy - x];
                if (y) yield [cx + y, cy - x];
            }
            if (x !== y) {
                yield [cx - x, cy - y];
                if (x) yield [cx + x, cy - y];
                if (y) {
                    yield [cx - x, cy + y];
                    if (x) yield [cx + x, cy + y];
                }
            }
        }
        sum -= dx2;
        if (sum <= y2) {
            if (fill && x !== y) {
                yield* hline(cx - x, cy - y, x << 1);
                if (y) yield* hline(cx - x, cy + y, x << 1);
            }
            y--;
            y2 -= dy2;
            dy2 -= 2;
        }
        x++;
        dx2 += 2;
    }
}

/**
 * Version of {@link circle} yielding only coordinates in rect defined by
 * `left,top`..`right,bottom`. Returns undefined if circle lies completely
 * outside given clip rectangle.
 *
 * @param cx
 * @param cy
 * @param r
 * @param left
 * @param top
 * @param right
 * @param bottom
 * @param fill
 */
export const circleClipped = (
    cx: number,
    cy: number,
    r: number,
    left: number,
    top: number,
    right: number,
    bottom: number,
    fill = true
) => {
    return intersectRectCircle(left, top, right, bottom, cx, cy, r)
        ? clipped(circle(cx, cy, r, fill), left, top, right, bottom)
        : undefined;
};
