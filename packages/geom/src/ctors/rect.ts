import { Attribs } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom-poly-utils";
import { SQRT2_2, SQRT3 } from "@thi.ng/math";
import {
    dist,
    ReadonlyVec,
    sub2,
    subN2,
    Vec
} from "@thi.ng/vectors";
import { Circle } from "../api/circle";
import { Polygon } from "../api/polygon";
import { Rect } from "../api/rect";
import { argsVV } from "../internal/args";

export function rect(pos: Vec, size: number | Vec, attribs?: Attribs): Rect;
export function rect(size: number | Vec, attribs?: Attribs): Rect;
export function rect(attribs?: Attribs): Rect;
export function rect(...args: any[]) {
    return new Rect(...argsVV(args));
}

export const rectFromMinMax = (min: Vec, max: Vec, attribs?: Attribs) =>
    new Rect(min, sub2([], max, min), attribs);

/**
 * Returns square inscribed in given circle instance. The circle can also be
 * given as centroid & radius.
 *
 * @param circle -
 */
export function inscribedSquare(circle: Circle): Rect;
export function inscribedSquare(pos: ReadonlyVec, r: number): Rect;
export function inscribedSquare(...args: any[]) {
    let pos: ReadonlyVec, r: number;
    if (args.length === 1) {
        const c: Circle = args[0];
        pos = c.pos;
        r = c.r;
    } else {
        [pos, r] = args;
    }
    r *= SQRT2_2;
    return rect(subN2([], pos, r), r * 2);
}

/**
 * Returns square inscribed in given (unrotated) hexagon. The hexagon
 * can be given as {@link Polygon} or centroid and edge length.
 *
 * @param hex -
 */
export function inscribedSquareHex(hex: Polygon): Rect;
export function inscribedSquareHex(pos: ReadonlyVec, len: number): Rect;
export function inscribedSquareHex(...args: any[]) {
    let pos: ReadonlyVec, l: number;
    if (args.length === 1) {
        const pts = (<Polygon>args[0]).points;
        pos = centroid(pts);
        l = dist(pts[0], pts[1]);
    } else {
        [pos, l] = args;
    }
    l *= 3 - SQRT3;
    return rect(subN2([], pos, l / 2), l);
}
