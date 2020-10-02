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
export const pointOnRay = (
    out: Vec | null,
    rayOrigin: Vec,
    rayDir: Vec,
    dist: number
) => {
    return maddN(out, rayDir, dist, rayOrigin);
};

export const pointOnRay2 = (
    out: Vec | null,
    rayOrigin: Vec,
    rayDir: Vec,
    dist: number
) => {
    return maddN2(out, rayDir, dist, rayOrigin);
};

export const pointOnRay3 = (
    out: Vec | null,
    rayOrigin: Vec,
    rayDir: Vec,
    dist: number
) => {
    return maddN3(out, rayDir, dist, rayOrigin);
};
