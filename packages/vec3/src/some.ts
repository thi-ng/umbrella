import type { BVecOpRoV } from "@thi.ng/vec-api";

/**
 * Returns true if at least one vector component is truthy.
 */
export const some3: BVecOpRoV<boolean> = (a) => a[0] || a[1] || a[2];