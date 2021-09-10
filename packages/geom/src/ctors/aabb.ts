import type { Attribs } from "@thi.ng/geom-api";
import { SQRT2_2 } from "@thi.ng/math/api";
import { add3 } from "@thi.ng/vectors/add";
import { ReadonlyVec, Vec, ZERO3 } from "@thi.ng/vectors/api";
import { max3 } from "@thi.ng/vectors/max";
import { min3 } from "@thi.ng/vectors/min";
import { sub3 } from "@thi.ng/vectors/sub";
import { subN3 } from "@thi.ng/vectors/subn";
import { AABB } from "../api/aabb";
import type { Sphere } from "../api/sphere";
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
