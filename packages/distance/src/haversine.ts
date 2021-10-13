import type { ReadonlyVec } from "@thi.ng/vectors";
import {
    distHaversineLatLon,
    distHaversineLonLat,
} from "@thi.ng/vectors/dist-haversine";
import { Eucledian } from "./eucledian.js";

/**
 * Distance metric for geo locations given as [lat,lon] vectors.
 */
export const HAVERSINE_LATLON = new Eucledian<ReadonlyVec>(distHaversineLatLon);

/**
 * Distance metric for geo locations given as [lon,lat] vectors.
 */
export const HAVERSINE_LONLAT = new Eucledian<ReadonlyVec>(distHaversineLonLat);
