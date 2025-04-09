import type { BVecOpRoV } from "@thi.ng/vec-api";

/**
 * Returns true if all vector components are truthy.
 */
export const every3: BVecOpRoV<boolean> = (a) => a[0] && a[1] && a[2];