import type { BVecOpRoV } from "@thi.ng/vec-api";

/**
 * Returns true if all vector components are truthy.
 */
export const every: BVecOpRoV<boolean> = (v) => {
  for (let i = v.length;i-- > 0; )
    if (!v[i])
      return !1;
  return !0;
};