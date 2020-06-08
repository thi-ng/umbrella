import { SQRT2_2 } from "@thi.ng/math";
import {
    add3,
    max3,
    min3,
    ReadonlyVec,
    sub3,
    subN3,
    Vec,
    ZERO3,
} from "@thi.ng/vectors";
import { AABB } from "../api/aabb";
import { Sphere } from "../api/sphere";
import { argsVV } from "../internal/args";
import type { Attribs } from "@thi.ng/geom-api";

export function aabb(pos: Vec, size: number | Vec, attribs?: Attribs): AABB;
export function aabb(size: number | Vec, attribs?: Attribs): AABB;
export function aabb(attribs?: Attribs): AABB;
export function aabb(...args: any[]) {
    return new AABB(...argsVV(args));
}

export const aabbFromMinMax = (min: Vec, max: Vec, attribs?: Attribs) =>
    new AABB(min, sub3([], max, min), attribs);

/**
 * Returns the intersection AABB of given inputs or `undefined` if they
 * are non-overlapping.
 *
 * @param a
 * @param b
 */
export const intersectionAABB = (a: AABB, b: AABB) => {
    const p = max3([], a.pos, b.pos);
    const q = min3(null, add3([], a.pos, a.size), add3([], b.pos, b.size));
    const size = max3(null, sub3(null, q, p), ZERO3);
    return size[0] > 0 && size[1] > 0 && size[2] > 0
        ? new AABB(p, size)
        : undefined;
};

/**
 * Returns square inscribed in given circle instance. The circle can also be
 * given as centroid & radius.
 *
 * @param sphere - target sphere
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
