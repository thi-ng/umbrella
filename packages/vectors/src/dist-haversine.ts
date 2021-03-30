import type { ReadonlyVec } from "./api";
import { radians2 } from "./radians";

/**
 * Returns distance between 2 points along a great circle on a sphere, using the
 * Haversine formula, with each point given as [lon, lat] (in degrees). Uses
 * Earth's radius `r=6371` by default, therefore returns distance in km (by
 * default).
 *
 * @remarks
 * References:
 * - https://en.wikipedia.org/wiki/Haversine_formula
 * - https://stackoverflow.com/a/21623206
 *
 * @param a
 * @param b
 * @param r
 */
export const distHaversine = (a: ReadonlyVec, b: ReadonlyVec, r = 6371) => {
    const [lon1, lat1] = radians2([], a);
    const [lon2, lat2] = radians2([], b);
    const dlat = 0.5 - Math.cos(lat2 - lat1) * 0.5;
    const dlon = (1 - Math.cos(lon2 - lon1)) * 0.5;
    const combined = dlat + Math.cos(lat1) * Math.cos(lat2) * dlon;
    return 2 * r * Math.asin(Math.sqrt(combined));
};
