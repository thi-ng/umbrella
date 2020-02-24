import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

/**
 * Tessellation function. Receives a point array representing a polygon
 * / cell and yields an array of point arrays, representing the
 * subdivided cells.
 */
export type Tessellator = (points: ReadonlyVec[]) => Vec[][];
