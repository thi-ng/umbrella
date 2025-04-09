import type { BVecOpRoV } from "@thi.ng/vec-api";

/**
 * Returns true if at least one vector component is truthy.
 */
export const some: BVecOpRoV<boolean> = (v) => {
  for (let i = v.length;i-- > 0; )
    if (v[i])
      return !0;
  return !1;
};