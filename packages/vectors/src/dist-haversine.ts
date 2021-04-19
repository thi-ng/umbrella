import type { FnN5 } from "@thi.ng/api";
import type { ReadonlyVec } from "./api";
import { radians2 } from "./radians";

/**
 * Returns distance between 2 points along a great circle on a sphere, using the
 * Haversine formula, with each point given as [lat, lon] (in WGS84 format).
 * Uses Earth's radius `r=6371` by default, therefore returns distance in km (by
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
export const distHaversineLatLon = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    r = 6371
) => {
    a = radians2([], a);
    b = radians2([], b);
    return dist(a[0], a[1], b[0], b[1], r);
};

/**
 * Same as {@link distHaversineLatLon}, only for coordinates defined in
 * [lon,lat] order.
 *
 * @param a
 * @param b
 * @param r
 * @returns
 */
export const distHaversineLonLat = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    r = 6371
) => {
    a = radians2([], a);
    b = radians2([], b);
    return dist(a[1], a[0], b[1], b[0], r);
};

/**
 * @deprecated use {@link distHaversineLonLat} instead
 */
export const distHaversine = distHaversineLonLat;

const dist: FnN5 = (lat1, lon1, lat2, lon2, r) => {
    const dlat = 0.5 - Math.cos(lat2 - lat1) * 0.5;
    const dlon = (1 - Math.cos(lon2 - lon1)) * 0.5;
    const combined = dlat + Math.cos(lat1) * Math.cos(lat2) * dlon;
    return 2 * r * Math.asin(Math.sqrt(combined));
};
