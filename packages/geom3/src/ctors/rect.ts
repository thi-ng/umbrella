import { sub2, Vec } from "@thi.ng/vectors3";
import { Attribs, Rect } from "../api";
import { argsVV } from "../internal/args";

export function rect(pos: Vec, size: number | Vec, attribs?: Attribs): Rect;
export function rect(size: number | Vec, attribs?: Attribs): Rect;
export function rect(attribs?: Attribs): Rect;
export function rect(...args: any[]) {
    return new Rect(...argsVV(args));
}

export const rectFromMinMax =
    (min: Vec, max: Vec, attribs?: Attribs) =>
        new Rect(min, sub2([], max, min), attribs);
