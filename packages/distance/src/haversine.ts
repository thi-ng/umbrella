// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec } from "@thi.ng/vectors";
import {
	distHaversineLatLon,
	distHaversineLonLat,
} from "@thi.ng/vectors/dist-haversine";
import { Untransformed } from "./untransformed.js";

/**
 * Distance metric for geo locations given as `[lat,lon]` vectors.
 */
export const HAVERSINE_LATLON = new Untransformed<ReadonlyVec>(
	distHaversineLatLon
);

/**
 * Distance metric for geo locations given as `[lon,lat]` vectors.
 */
export const HAVERSINE_LONLAT = new Untransformed<ReadonlyVec>(
	distHaversineLonLat
);
