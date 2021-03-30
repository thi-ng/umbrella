import { distHaversine, ReadonlyVec } from "@thi.ng/vectors";
import { Eucledian } from "./eucledian";

/**
 * Distance metric for geo locations given as [lon,lat] vectors.
 */
export const HAVERSINE = new Eucledian<ReadonlyVec>(distHaversine);
