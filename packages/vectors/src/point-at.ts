import { Vec, maddN } from ".";
import { maddN2, maddN3 } from "./maddn";

/**
 * Calculates the point laying on ray at given distance
 *
 *
 * @param out -
 * @param rayDir -
 * @param rayOrigin -
 * @param dist -
 */
export function pointAtOnRay(
    out: Vec | null,
    rayDir: Vec,
    rayOrigin: Vec,
    dist: number
) {
    return maddN(out, rayDir, dist, rayOrigin);
}

export function pointAtOnRay2(
    out: Vec | null,
    rayDir: Vec,
    rayOrigin: Vec,
    dist: number
) {
    return maddN2(out, rayDir, dist, rayOrigin);
}

export function pointAtOnRay3(
    out: Vec | null,
    rayDir: Vec,
    rayOrigin: Vec,
    dist: number
) {
    return maddN3(out, rayDir, dist, rayOrigin);
}
