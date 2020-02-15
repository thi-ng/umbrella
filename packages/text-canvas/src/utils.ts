import { NumOrString } from "@thi.ng/api";
import { ClipRect } from "./api";

export const charCode = (x: NumOrString, format: number[]) =>
    (typeof x === "string" ? x.charCodeAt(0) : x) |
    (format[format.length - 1] << 16);

export const intersectRect = (a: ClipRect, b: ClipRect): ClipRect => {
    const x1 = Math.max(a.x1, b.x1);
    const y1 = Math.max(a.y1, b.y1);
    const x2 = Math.min(a.x2, b.x2);
    const y2 = Math.min(a.y2, b.y2);
    return { x1, y1, x2, y2, w: Math.max(x2 - x1, 0), h: Math.max(y2 - y1, 0) };
};

const axis = (a: number, b: number, c: number) =>
    (a < b ? a - b : a > b + c ? a - b - c : 0) ** 2;

export const intersectRectCircle = (
    x: number,
    y: number,
    w: number,
    h: number,
    cx: number,
    cy: number,
    r: number
) => axis(cx, x, w) + axis(cy, y, h) <= r * r;
