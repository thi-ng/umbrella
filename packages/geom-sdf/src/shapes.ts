import { isFunction } from "@thi.ng/checks/is-function";
import { distSq2, ReadonlyVec } from "@thi.ng/vectors";
import { sub2 } from "@thi.ng/vectors/sub";
import type { SDFAttribs, SDFn } from "./api.js";
import { withBoundingCircle } from "./bounds.js";
import {
    distArc2,
    distBox2,
    distCircle2,
    distEllipse2,
    distPolygon2,
    distPolyline2,
    distQuadratic2,
    distSegment2,
} from "./dist.js";
import { abs as $abs, flip as $flip, round as $round } from "./ops.js";

/** @internal */
export const DEFAULT_ATTRIBS: SDFAttribs = {
    abs: false,
    combine: "union",
    flip: false,
    round: 0,
    smooth: 0,
};

/**
 * Applies any SDF modifiers specified via {@link SDFAttribs} to the given
 * distance function. Returns a possibly updated distance function.
 *
 * @remarks
 * Order of application is: abs, round, flip
 *
 * @param fn
 * @param attribs
 */
export const withSDFAttribs = (fn: SDFn, attribs?: Partial<SDFAttribs>) => {
    if (attribs) {
        const { abs, flip, round } = { ...DEFAULT_ATTRIBS, ...attribs };
        if (abs) fn = $abs(fn);
        if (isFunction(round) || round > 0) fn = $round(fn, round);
        if (flip) fn = $flip(fn);
    }
    return fn;
};

export const arc2 = (
    apert: ReadonlyVec,
    ra: number,
    rb: number,
    attribs?: Partial<SDFAttribs>
): SDFn => withSDFAttribs((p) => distArc2(p, apert, ra, rb), attribs);

export const box2 = (
    center: ReadonlyVec,
    size: ReadonlyVec,
    attribs?: Partial<SDFAttribs>
): SDFn => withSDFAttribs((p) => distBox2(sub2([], p, center), size), attribs);

export const circle2 = (
    center: ReadonlyVec,
    radius: number,
    attribs?: Partial<SDFAttribs>
): SDFn =>
    withSDFAttribs((p) => distCircle2(sub2([], p, center), radius), attribs);

export const ellipse2 = (
    center: ReadonlyVec,
    radii: ReadonlyVec,
    attribs?: Partial<SDFAttribs>
): SDFn =>
    withSDFAttribs((p) => distEllipse2(sub2([], p, center), radii), attribs);

export const line2 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    attribs?: Partial<SDFAttribs>
): SDFn => withSDFAttribs((p) => distSegment2(a, b, p), attribs);

export const points2 = (
    pts: ReadonlyVec[],
    attribs?: Partial<SDFAttribs>
): SDFn =>
    withBoundingCircle(
        withSDFAttribs(
            (p) =>
                pts.reduce((acc, q) => Math.min(acc, distSq2(p, q)), Infinity),
            attribs
        ),
        pts
    );

export const polygon2 = (
    pts: ReadonlyVec[],
    attribs?: Partial<SDFAttribs>
): SDFn =>
    withBoundingCircle(
        withSDFAttribs((p) => distPolygon2(pts, p), attribs),
        pts
    );

export const polyline2 = (
    pts: ReadonlyVec[],
    attribs?: Partial<SDFAttribs>
): SDFn =>
    withBoundingCircle(
        withSDFAttribs((p) => distPolyline2(pts, p), attribs),
        pts
    );

export const quadratic2 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    attribs?: Partial<SDFAttribs>
): SDFn => withSDFAttribs((p) => distQuadratic2(p, a, b, c), attribs);
