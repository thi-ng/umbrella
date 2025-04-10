import type { BVecOpRoV } from "@thi.ng/vec-api";

/**
 * Returns true if all vector components are truthy.
 */
export const every2: BVecOpRoV<boolean> = (a) => !!(a[0] && a[1]);
