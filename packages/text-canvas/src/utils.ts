// thing:no-export
import type { FnN3, FnU2, FnU7, NumOrString } from "@thi.ng/api";
import type { ClipRect } from "./api.js";

export const charCode = (x: NumOrString, format: number) =>
    (typeof x === "string" ? x.charCodeAt(0) : x) | (format << 16);

export const intersectRect: FnU2<ClipRect> = (a, b) => {
    const x1 = Math.max(a.x1, b.x1);
    const y1 = Math.max(a.y1, b.y1);
    const x2 = Math.min(a.x2, b.x2);
    const y2 = Math.min(a.y2, b.y2);
    return { x1, y1, x2, y2, w: Math.max(x2 - x1, 0), h: Math.max(y2 - y1, 0) };
};

const axis: FnN3 = (a, b, c) =>
    (a < b ? a - b : a > b + c ? a - b - c : 0) ** 2;

export const intersectRectCircle: FnU7<number, boolean> = (
    x,
    y,
    w,
    h,
    cx,
    cy,
    r
) => axis(cx, x, w) + axis(cy, y, h) <= r * r;
