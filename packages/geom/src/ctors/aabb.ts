import { Attribs } from "@thi.ng/geom-api";
import { SQRT2_2 } from "@thi.ng/math";
import {
    ReadonlyVec,
    sub3,
    subN3,
    Vec
} from "@thi.ng/vectors";
import { AABB } from "../api/aabb";
import { Sphere } from "../api/sphere";
import { argsVV } from "../internal/args";

export function aabb(pos: Vec, size: number | Vec, attribs?: Attribs): AABB;
export function aabb(size: number | Vec, attribs?: Attribs): AABB;
export function aabb(attribs?: Attribs): AABB;
export function aabb(...args: any[]) {
    return new AABB(...argsVV(args));
}

export const aabbFromMinMax = (min: Vec, max: Vec, attribs?: Attribs) =>
    new AABB(min, sub3([], max, min), attribs);

/**
 * Returns square inscribed in given circle instance. The circle can also be
 * given as centroid & radius.
 *
 * @param circle
 */
export function inscribedAABB(sphere: Sphere): AABB;
export function inscribedAABB(pos: ReadonlyVec, r: number): AABB;
export function inscribedAABB(...args: any[]) {
    let pos: ReadonlyVec, r: number;
    if (args.length === 1) {
        const c: Sphere = args[0];
        pos = c.pos;
        r = c.r;
    } else {
        [pos, r] = args;
    }
    r *= SQRT2_2;
    return aabb(subN3([], pos, r), r * 2);
}
